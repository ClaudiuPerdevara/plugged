/**
 * ============================================================================
 * PLUGGED. — Data access layer
 * ----------------------------------------------------------------------------
 * Catalog reads (`fetchAllBundles`, `fetchBundleDetails`) are served from the
 * static `PRODUCTS` list — bundles are a fixed, curated catalog, not dynamic
 * DB rows. User-owned bundles (`fetchUserBundles`) are sourced from the
 * `purchases` table via Prisma, scoped to the authenticated session.
 * ============================================================================
 */

import {
  PRODUCTS,
  getProduct,
  type Product,
} from "@/lib/products"
import { db } from "@/lib/db"
import { getSession } from "@/lib/session"

/** All bundles in the catalog. */
export async function fetchAllBundles(): Promise<Product[]> {
  return PRODUCTS
}

/** A single bundle by id, or null if it doesn't exist. */
export async function fetchBundleDetails(
  id: string,
): Promise<Product | null> {
  return getProduct(id) ?? null
}

/**
 * Bundles the current session user owns (their vault). Sourced from the
 * `purchases` table and joined against the static catalog for full details.
 * Returns an empty list when there is no session.
 */
export async function fetchUserBundles(): Promise<Product[]> {
  const session = await getSession()
  if (!session) return []

  const purchases = await db.purchase.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: { bundleId: true, createdAt: true },
  })

  // Preserve purchase order (most recent first); drop any purchase whose
  // bundleId no longer exists in the catalog.
  return purchases
    .map((p) => getProduct(p.bundleId))
    .filter((p): p is Product => Boolean(p))
}

export type AccountInfo = {
  email: string
  name: string
  image: string | null
  /** True when the user has an email/password credential (not Google-only). */
  hasPassword: boolean
}

/** Profile + auth method flags for the account settings tab. */
export async function fetchAccountInfo(): Promise<AccountInfo | null> {
  const session = await getSession()
  if (!session) return null

  const credential = await db.account.findFirst({
    where: { userId: session.user.id, providerId: "credential" },
    select: { password: true },
  })

  return {
    email: session.user.email,
    name: session.user.name,
    image: session.user.image ?? null,
    hasPassword: Boolean(credential?.password),
  }
}
