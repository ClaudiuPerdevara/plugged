import { NextResponse } from "next/server"
import { z } from "zod"
import Stripe from "stripe"
import { getProduct } from "@/lib/products"
import { getSession } from "@/lib/session"
import { grantBundleAccess, getOwnedBundleIds } from "@/lib/purchases"
import { lookupVoucher, recordRedemption } from "@/lib/vouchers"

/**
 * ============================================================================
 * POST /api/checkout — Stripe Checkout session
 * ----------------------------------------------------------------------------
 * The cart POSTs an array of bundle ids (and optionally a voucher code).
 * We validate them server-side, require an authenticated user, then:
 *
 *   1. If a voucher is supplied → re-validate it server-side (we never trust
 *      the client). If it's 100% off, we BYPASS Stripe entirely: grant every
 *      requested bundle, record the redemption, and bounce the user to
 *      /success.
 *   2. If a voucher is < 100% off → forward to Stripe Checkout with a
 *      dynamically created one-time coupon (`percent_off`). The voucher is
 *      recorded once the webhook confirms payment.
 *   3. No voucher → standard Stripe Checkout session.
 *
 * STRIPE_SECRET_KEY is REQUIRED. Without it, checkout responds with 503.
 * ============================================================================
 */

export const runtime = "nodejs"

const BodySchema = z.object({
  items: z.array(z.string()).min(1, "Cart is empty"),
  voucherCode: z.string().trim().max(64).optional(),
})

export async function POST(req: Request) {
  // 1. Authenticate.
  const session = await getSession()
  if (!session) {
    return NextResponse.json(
      { error: "Sign in to complete your purchase." },
      { status: 401 },
    )
  }

  // 2. Parse + validate body.
  let json: unknown
  try {
    json = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
  const parsed = BodySchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request" },
      { status: 400 },
    )
  }

  // 3. Resolve products server-side (never trust client prices).
  const products = parsed.data.items
    .map((id) => getProduct(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .filter((p, idx, arr) => arr.findIndex((q) => q.id === p.id) === idx)

  if (products.length === 0) {
    return NextResponse.json({ error: "No valid bundles" }, { status: 400 })
  }

  // Block re-purchase: drop any bundle the signed-in user already owns.
  const ownedIds = new Set(await getOwnedBundleIds(session.user.id))
  const buyable = products.filter((p) => !ownedIds.has(p.id))
  if (buyable.length === 0) {
    return NextResponse.json(
      { error: "You already own these — find them in your vault." },
      { status: 400 },
    )
  }

  const totalUsd = buyable.reduce((sum, p) => sum + p.price, 0)
  const origin = new URL(req.url).origin
  const bundleIds = buyable.map((p) => p.id)

  // 4. Re-validate voucher server-side (the client check is just UX).
  let voucherId: string | null = null
  let voucherPercent: number | null = null
  if (parsed.data.voucherCode) {
    const info = await lookupVoucher(parsed.data.voucherCode)
    if (info.status !== "valid" || !info.voucher) {
      return NextResponse.json(
        { error: info.message || "This voucher can't be used." },
        { status: 400 },
      )
    }
    voucherId = info.voucher.id
    voucherPercent = info.voucher.discountPercent
  }

  // 5. 100%-off voucher → bypass Stripe entirely.
  if (voucherId && voucherPercent === 100) {
    await Promise.all(
      buyable.map((p) =>
        grantBundleAccess({
          userId: session.user.id,
          bundleId: p.id,
          amount: 0,
        }),
      ),
    )
    await recordRedemption({
      voucherId,
      userId: session.user.id,
      bundleIds,
      percent: 100,
    })
    return NextResponse.json({
      url: `${origin}/success?bundles=${encodeURIComponent(bundleIds.join(","))}`,
      total: 0,
      mode: "voucher",
    })
  }

  // 6. Stripe is required for everything else.
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Checkout is unavailable. Stripe is not configured." },
      { status: 503 },
    )
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    // 6a. Optional dynamic Stripe coupon for partial-discount vouchers.
    const discounts: { coupon: string }[] = []
    if (voucherId && voucherPercent !== null && voucherPercent < 100) {
      const coupon = await stripe.coupons.create({
        percent_off: voucherPercent,
        duration: "once",
        name: `PLUGGED voucher ${voucherPercent}%`,
        max_redemptions: 1,
      })
      discounts.push({ coupon: coupon.id })
    }

    const checkout = await stripe.checkout.sessions.create({
      mode: "payment",
      // Stripe-native promotion codes only when no custom voucher is applied
      // (can't mix `discounts` and `allow_promotion_codes`).
      ...(discounts.length === 0
        ? { allow_promotion_codes: true }
        : { discounts }),
      line_items: buyable.map((p) => ({
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(p.price * 100),
          product_data: {
            name: p.name,
            description: p.description,
            images: [
              p.image.startsWith("http") ? p.image : `${origin}${p.image}`,
            ],
          },
        },
      })),
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      metadata: {
        userId: session.user.id,
        bundleIds: bundleIds.join(","),
        voucherId: voucherId ?? "",
        voucherPercent: voucherPercent !== null ? String(voucherPercent) : "",
      },
      customer_email: session.user.email,
    })

    return NextResponse.json({
      url: checkout.url,
      total: totalUsd,
      mode: "stripe",
    })
  } catch (err) {
    console.error("[checkout] Stripe session creation failed:", err)
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 502 },
    )
  }
}
