import { NextResponse } from "next/server"
import Stripe from "stripe"
import { grantBundleAccess } from "@/lib/purchases"
import { getProduct } from "@/lib/products"
import { recordRedemption } from "@/lib/vouchers"
import { db } from "@/lib/db"

/**
 * ============================================================================
 * POST /api/webhook — Stripe webhook listener
 * ============================================================================
 * Stripe calls this endpoint after events like `checkout.session.completed`.
 * This is where we grant the buyer access to the bundles they paid for.
 *
 * IMPORTANT: the raw request body is read with `req.text()` so Stripe's
 * signature can be verified — do NOT call `req.json()` before that.
 *
 * On `checkout.session.completed` we read `userId` + `bundleIds` from the
 * session `metadata` (set by /api/checkout) and insert a `purchases` row
 * for each bundle. `grantBundleAccess` is idempotent, so duplicate webhook
 * deliveries are safe.
 * ============================================================================
 */

export const runtime = "nodejs"

export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature")
  const rawBody = await req.text()

  // Not configured — acknowledge so Stripe CLI tests don't retry.
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.log("[webhook] hit but STRIPE_WEBHOOK_SECRET is not set")
    return NextResponse.json({ received: true, configured: false })
  }
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    event = await stripe.webhooks.constructEventAsync(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    )
  } catch (err) {
    console.error("[webhook] signature verification failed:", err)
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 },
    )
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId
        const bundleIds = (session.metadata?.bundleIds ?? "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)

        if (!userId || bundleIds.length === 0) {
          console.warn(
            "[webhook] checkout.session.completed missing metadata",
            { id: session.id, metadata: session.metadata },
          )
          break
        }

        // Resolve the user's email as a fallback for receipts/lookup.
        const user = await db.user.findUnique({ where: { id: userId } })
        if (!user) {
          console.warn("[webhook] user not found for id", userId)
          break
        }

        // Grant each bundle. Idempotent — replays are safe.
        await Promise.all(
          bundleIds.map(async (bundleId) => {
            const product = getProduct(bundleId)
            await grantBundleAccess({
              userId,
              bundleId,
              amount: product ? Math.round(product.price * 100) : 0,
              stripeCheckoutSessionId: session.id,
            })
          }),
        )

        // Record voucher redemption (discount path). 100%-off vouchers bypass
        // Stripe entirely so they're already recorded in /api/checkout. Any
        // other voucher (percent OR fixed-amount, e.g. the €2 review reward) is
        // recorded here so its single-use cap is enforced.
        const voucherId = session.metadata?.voucherId
        const voucherPercent = Number(session.metadata?.voucherPercent ?? "0")
        if (voucherId) {
          await recordRedemption({
            voucherId,
            userId,
            bundleIds,
            percent: Number.isFinite(voucherPercent) ? voucherPercent : 0,
          }).catch((err) => {
            console.error("[webhook] recordRedemption failed:", err)
          })
        }
        break
      }
      default:
        // Unhandled event type — acknowledge so Stripe doesn't retry.
        break
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error("[webhook] handler error:", err)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
