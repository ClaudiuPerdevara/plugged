import { db } from "@/lib/db"

/**
 * ============================================================================
 * PLUGGED. — Internal bundle / supplier reviews
 * ----------------------------------------------------------------------------
 * Buyers can rate and comment on the suppliers inside a bundle they OWN. These
 * reviews are visible only to other owners of the same bundle (a private "batch
 * quality" board), and leaving one grants a one-time €2-off reward voucher.
 *
 * Ownership is always re-checked against the `Purchase` table on the server —
 * the client can never read or write reviews for a bundle it doesn't own.
 * ============================================================================
 */

export async function ownsBundle(
  userId: string,
  bundleId: string,
): Promise<boolean> {
  const row = await db.purchase.findFirst({
    where: { userId, bundleId },
    select: { id: true },
  })
  return Boolean(row)
}

/**
 * Store owner(s) who can moderate (delete) any review. Set ADMIN_EMAILS in the
 * environment (comma-separated) to your account email(s).
 */
export function isAdmin(email?: string | null): boolean {
  if (!email) return false
  const admins = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
  return admins.includes(email.toLowerCase())
}

export type PublicReview = {
  id: string
  authorName: string
  rating: number
  comment: string
  supplier: string | null
  createdAt: string
  /** True when this review belongs to the requesting user. */
  mine: boolean
  /** True when the requester may delete this review (author or store owner). */
  canDelete: boolean
}

export async function getBundleReviews(
  bundleId: string,
  currentUserId: string,
  canModerate = false,
): Promise<PublicReview[]> {
  const rows = await db.review.findMany({
    where: { bundleId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      userId: true,
      authorName: true,
      rating: true,
      comment: true,
      supplier: true,
      createdAt: true,
    },
  })
  return rows.map((r) => ({
    id: r.id,
    authorName: r.authorName,
    rating: r.rating,
    comment: r.comment,
    supplier: r.supplier,
    createdAt: r.createdAt.toISOString(),
    mine: r.userId === currentUserId,
    canDelete: r.userId === currentUserId || canModerate,
  }))
}

export async function hasReviewed(
  userId: string,
  bundleId: string,
): Promise<boolean> {
  const row = await db.review.findUnique({
    where: { userId_bundleId: { userId, bundleId } },
    select: { id: true },
  })
  return Boolean(row)
}
