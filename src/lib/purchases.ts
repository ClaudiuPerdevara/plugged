import { db } from "@/lib/db"
import { getProduct } from "@/lib/products"

/**
 * Grant a user access to a bundle by inserting into the `purchases` table.
 *
 * Idempotent: if the user already owns the bundle, the unique
 * `(userId, bundleId)` constraint is respected via an upsert no-op, so
 * replayed webhooks or double-clicks never create duplicate grants.
 */
export async function grantBundleAccess(opts: {
  userId: string
  bundleId: string
  /** Price in USD cents actually paid. */
  amount: number
  stripeCheckoutSessionId?: string | null
}) {
  const product = getProduct(opts.bundleId)
  try {
    await db.purchase.upsert({
      where: {
        userId_bundleId: {
          userId: opts.userId,
          bundleId: opts.bundleId,
        },
      },
      update: {}, // already owned — leave the row untouched
      create: {
        userId: opts.userId,
        bundleId: opts.bundleId,
        bundleName: product?.name ?? opts.bundleId,
        amount: opts.amount,
        stripeCheckoutSessionId: opts.stripeCheckoutSessionId ?? null,
      },
    })
    return { granted: true as const, product }
  } catch (err) {
    console.error("[purchases] grantBundleAccess failed:", err)
    return { granted: false as const, product, error: err }
  }
}
