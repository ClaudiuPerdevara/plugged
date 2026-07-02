import { NextResponse } from "next/server"
import { z } from "zod"
import Stripe from "stripe"
import { getProduct } from "@/lib/products"
import { getSession } from "@/lib/session"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { grantBundleAccess, getOwnedBundleIds } from "@/lib/purchases"
import { lookupVoucher, recordRedemption } from "@/lib/vouchers"

/**
 * ============================================================================
 * POST /api/checkout — Stripe Checkout session
 * ----------------------------------------------------------------------------
 * Supports both signed-in users AND guest checkout:
 *   • Signed in  → purchase is attached to the session user.
 *   • Guest      → the caller passes an `email`. We find that user, or create
 *                  a fresh account for them (Better Auth), auto-sign them in
 *                  (new accounts only) and email a "set your password" link so
 *                  they can return to their vault later. The purchase is then
 *                  attached to that user id exactly like a normal checkout.
 *
 * Apple Pay / Google Pay: we do NOT restrict `payment_method_types`, so Stripe
 * Checkout shows every wallet the buyer's device supports automatically.
 *
 * STRIPE_SECRET_KEY is REQUIRED for paid checkouts. Without it → 503.
 * ============================================================================
 */

export const runtime = "nodejs"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const BodySchema = z.object({
  items: z.array(z.string()).min(1, "Cart is empty"),
  voucherCode: z.string().trim().max(64).optional(),
  email: z.string().trim().max(200).optional(),
})

function appendCookies(res: NextResponse, cookies: string[]) {
  for (const c of cookies) res.headers.append("set-cookie", c)
  return res
}

export async function POST(req: Request) {
  const origin = new URL(req.url).origin

  // 1. Parse + validate body first (we may need `email` for guest checkout).
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

  // 2. Resolve the buyer: existing session, or guest (find-or-create by email).
  const session = await getSession()
  let userId: string
  let userEmail: string
  const guestCookies: string[] = []

  if (session) {
    userId = session.user.id
    userEmail = session.user.email
  } else {
    const email = parsed.data.email?.toLowerCase().trim()
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Enter a valid email to continue to checkout." },
        { status: 400 },
      )
    }
    const existing = await db.user
      .findUnique({ where: { email } })
      .catch((err: unknown) => {
        console.error("[checkout] user lookup failed:", err)
        return undefined
      })
    if (existing === undefined) {
      // DB unreachable (not "no row" — that's `null`). Fail gracefully.
      return NextResponse.json(
        { error: "Checkout is temporarily unavailable. Please try again." },
        { status: 503 },
      )
    }
    if (existing) {
      // Attach the purchase to their account; they sign in normally to view it
      // (we never auto-login into a pre-existing account for security).
      userId = existing.id
      userEmail = existing.email
    } else {
      try {
        const signUp = await auth.api.signUpEmail({
          body: {
            email,
            name: email.split("@")[0],
            password: `${crypto.randomUUID()}${crypto.randomUUID()}`,
          },
          returnHeaders: true,
        })
        userId = signUp.response.user.id
        userEmail = email
        const sc = signUp.headers.getSetCookie?.() ?? []
        guestCookies.push(...sc)
      } catch (err) {
        console.error("[checkout] guest signup failed:", err)
        return NextResponse.json(
          { error: "Could not start guest checkout. Try creating an account." },
          { status: 400 },
        )
      }
      // Email a set-your-password link so they can log into the vault later.
      auth.api
        .requestPasswordReset({
          body: { email, redirectTo: `${origin}/reset-password` },
        })
        .catch((err) => console.error("[checkout] reset email failed:", err))
    }
  }

  // 3. Resolve products server-side (never trust client prices).
  const products = parsed.data.items
    .map((id) => getProduct(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .filter((p, idx, arr) => arr.findIndex((q) => q.id === p.id) === idx)

  if (products.length === 0) {
    return NextResponse.json({ error: "No valid bundles" }, { status: 400 })
  }

  // Block re-purchase + coming-soon: drop owned and not-yet-live bundles.
  const ownedIds = new Set(await getOwnedBundleIds(userId))
  const buyable = products.filter((p) => !ownedIds.has(p.id) && !p.comingSoon)
  if (buyable.length === 0) {
    return NextResponse.json(
      { error: "You already own these — find them in your vault." },
      { status: 400 },
    )
  }

  const totalUsd = buyable.reduce((sum, p) => sum + p.price, 0)
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
        grantBundleAccess({ userId, bundleId: p.id, amount: 0 }),
      ),
    )
    await recordRedemption({ voucherId, userId, bundleIds, percent: 100 })
    return appendCookies(
      NextResponse.json({
        url: `${origin}/success?bundles=${encodeURIComponent(bundleIds.join(","))}`,
        total: 0,
        mode: "voucher",
      }),
      guestCookies,
    )
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
      // No `payment_method_types` → Stripe auto-enables every method the buyer
      // can use (card + Apple Pay + Google Pay + any others enabled in the
      // Dashboard). Restricting to ["card"] would hide the wallets.
      ...(discounts.length === 0
        ? { allow_promotion_codes: true }
        : { discounts }),
      line_items: buyable.map((p) => ({
        quantity: 1,
        price_data: {
          currency: "eur",
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
        userId,
        bundleIds: bundleIds.join(","),
        voucherId: voucherId ?? "",
        voucherPercent: voucherPercent !== null ? String(voucherPercent) : "",
      },
      customer_email: userEmail,
    })

    return appendCookies(
      NextResponse.json({ url: checkout.url, total: totalUsd, mode: "stripe" }),
      guestCookies,
    )
  } catch (err) {
    console.error("[checkout] Stripe session creation failed:", err)
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 502 },
    )
  }
}
