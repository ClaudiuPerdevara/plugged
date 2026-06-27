import Stripe from "stripe"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SuccessView } from "@/components/success-view"
import { getProduct } from "@/lib/products"
import { db } from "@/lib/db"
import { getSession } from "@/lib/session"
import { grantBundleAccess } from "@/lib/purchases"

export const metadata = {
  title: "Order Confirmed",
  description: "Your supplier bundles are unlocked.",
  robots: { index: false },
}

export const dynamic = "force-dynamic"

/**
 * /success — shown after a completed checkout.
 *
 * DEMO mode: the checkout route redirects here with `?bundles=y2k,opium`, so
 * we read the bundle ids straight from the query string.
 *
 * STRIPE mode: Stripe redirects here with `?session_id=...`. We retrieve the
 * Checkout Session from Stripe and, if it's paid, grant the purchased bundles
 * right here. This makes access reliable even when the webhook isn't reachable
 * (e.g. previews). `grantBundleAccess` is idempotent, so a later webhook
 * delivery is a safe no-op.
 */
export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ bundles?: string; session_id?: string }>
}) {
  const { bundles, session_id } = await searchParams

  // 1. Demo mode: bundle ids are in the query string.
  let bundleIds = (bundles?.split(",") ?? [])
    .map((id) => id.trim())
    .filter(Boolean)

  // 2. Stripe mode: verify the session and grant access on return.
  if (bundleIds.length === 0 && session_id && process.env.STRIPE_SECRET_KEY) {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
      const checkout = await stripe.checkout.sessions.retrieve(session_id)

      const isPaid =
        checkout.payment_status === "paid" || checkout.status === "complete"
      const userId = checkout.metadata?.userId
      const paidBundleIds = (checkout.metadata?.bundleIds ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)

      if (isPaid && userId && paidBundleIds.length > 0) {
        await Promise.all(
          paidBundleIds.map((bundleId) => {
            const product = getProduct(bundleId)
            return grantBundleAccess({
              userId,
              bundleId,
              amount: product ? Math.round(product.price * 100) : 0,
              stripeCheckoutSessionId: checkout.id,
            })
          }),
        )
        bundleIds = paidBundleIds
      }
    } catch (err) {
      console.error("[success] could not verify Stripe session:", err)
    }
  }

  // 3. Fallback: read what the signed-in user actually owns.
  if (bundleIds.length === 0) {
    const session = await getSession()
    if (session) {
      const purchases = await db.purchase.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        select: { bundleId: true },
      })
      bundleIds = purchases.map((p) => p.bundleId)
    }
  }

  const bundleNames = bundleIds
    .map((id) => getProduct(id)?.name)
    .filter((name): name is string => Boolean(name))

  return (
    <main className="relative flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <SuccessView bundleNames={bundleNames} />
      <SiteFooter />
    </main>
  )
}
