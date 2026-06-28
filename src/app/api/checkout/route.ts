import { NextResponse } from "next/server"
import { z } from "zod"
import Stripe from "stripe"
import { getProduct } from "@/lib/products"
import { getSession } from "@/lib/session"
import { grantBundleAccess } from "@/lib/purchases"
import { isDemoCheckout } from "@/lib/checkout-mode"

/**
 * ============================================================================
 * POST /api/checkout — Stripe Checkout session (or demo grant)
 * ============================================================================
 * The cart POSTs an array of bundle ids. We validate them server-side,
 * require an authenticated user, and then either:
 *
 *   • DEMO mode  (no STRIPE_SECRET_KEY): grant every requested bundle to the
 *                 user immediately by inserting into `purchases`, then
 *                 redirect to /success. Lets the full flow run end-to-end
 *                 without a payment provider.
 *
 *   • STRIPE mode (STRIPE_SECRET_KEY set): create a Stripe Checkout session.
 *                 Bundle access is granted later, in /api/webhook, when
 *                 Stripe confirms `checkout.session.completed`. The bundle
 *                 ids and userId are passed through `metadata` so the webhook
 *                 can attribute the purchase.
 * ============================================================================
 */

export const runtime = "nodejs"

const BodySchema = z.object({
  items: z.array(z.string()).min(1, "Cart is empty"),
})

export async function POST(req: Request) {
  // 1. Authenticate — checkout requires a session.
  const session = await getSession()
  if (!session) {
    return NextResponse.json(
      { error: "Sign in to complete your purchase." },
      { status: 401 },
    )
  }

  // 2. Parse + validate the request body.
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

  // 3. Resolve + validate products server-side (never trust client prices).
  const products = parsed.data.items
    .map((id) => getProduct(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .filter((p, idx, arr) => arr.findIndex((q) => q.id === p.id) === idx) // dedupe

  if (products.length === 0) {
    return NextResponse.json({ error: "No valid bundles" }, { status: 400 })
  }

  const totalUsd = products.reduce((sum, p) => sum + p.price, 0)
  const totalCents = Math.round(totalUsd * 100)
  const origin = new URL(req.url).origin
  const bundleIds = products.map((p) => p.id)

  // 4. DEMO mode — grant immediately and bounce to /success.
  if (isDemoCheckout()) {
    await Promise.all(
      products.map((p) =>
        grantBundleAccess({
          userId: session.user.id,
          bundleId: p.id,
          amount: Math.round(p.price * 100),
        }),
      ),
    )

    return NextResponse.json({
      url: `${origin}/success?bundles=${encodeURIComponent(bundleIds.join(","))}`,
      total: totalUsd,
      mode: "demo",
    })
  }

  // 5. STRIPE mode — create a Checkout session. Access is granted in the
  //    webhook (NOT here) so we never grant bundles for failed/uncaptured
  //    payments.
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const checkout = await stripe.checkout.sessions.create({
      mode: "payment",
      allow_promotion_codes: true,
      line_items: products.map((p) => ({
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(p.price * 100),
          product_data: {
            name: p.name,
            description: p.description,
            images: [
              p.image.startsWith("http")
                ? p.image
                : `${origin}${p.image}`,
            ],
          },
        },
      })),
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      // Attribute the purchase to this user + these bundles in the webhook.
      metadata: {
        userId: session.user.id,
        bundleIds: bundleIds.join(","),
      },
      // Stripe can also recover the customer email for receipt purposes.
      customer_email: session.user.email,
    })

    return NextResponse.json({ url: checkout.url, total: totalUsd, mode: "stripe" })
  } catch (err) {
    console.error("[checkout] Stripe session creation failed:", err)
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 502 },
    )
  }
}
