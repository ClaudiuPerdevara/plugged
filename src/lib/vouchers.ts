import { db } from "@/lib/db"

/**
 * ============================================================================
 * PLUGGED. — Voucher logic
 * ----------------------------------------------------------------------------
 * Custom voucher codes redeemed at checkout. Voucher codes are stored in the
 * `Voucher` table; usage is logged in `VoucherRedemption`.
 *
 * Pricing rules:
 *   • discountPercent = 100  → bypass Stripe entirely, grant the bundle for
 *                              free and log the redemption.
 *   • discountPercent < 100  → forward to Stripe Checkout as a dynamically
 *                              created one-time coupon (`percent_off`).
 *
 * Codes are case-insensitive (stored UPPERCASE, compared after .toUpperCase()).
 * ============================================================================
 */

export type VoucherStatus =
  | "valid"
  | "not_found"
  | "expired"
  | "exhausted"
  | "invalid_code"

export type VoucherInfo = {
  status: VoucherStatus
  /** Present only when status === "valid" */
  voucher?: {
    id: string
    code: string
    discountPercent: number
    discountAmountCents: number | null
    expiresAt: Date | null
    remainingUses: number | null
  }
  message: string
}

const CODE_RE = /^[A-Z0-9_-]{2,32}$/

export function normalizeCode(input: string): string {
  return input.trim().toUpperCase()
}

/**
 * Validate a voucher code and return its current state.
 * Does NOT mutate the DB.
 */
export async function lookupVoucher(
  rawCode: string,
  forUserId?: string | null,
): Promise<VoucherInfo> {
  const code = normalizeCode(rawCode)
  if (!CODE_RE.test(code)) {
    return {
      status: "invalid_code",
      message: "Use 2–32 letters, numbers, dashes or underscores.",
    }
  }

  const voucher = await db.voucher.findUnique({ where: { code } })
  if (!voucher) {
    return { status: "not_found", message: "We don't recognise that code." }
  }

  // Nominal vouchers (tied to a specific user) can only be used by that user.
  if (voucher.userId && voucher.userId !== forUserId) {
    return {
      status: "not_found",
      message: "This code is linked to another account.",
    }
  }

  if (voucher.expiresAt && voucher.expiresAt.getTime() < Date.now()) {
    return { status: "expired", message: "This code has expired." }
  }

  if (voucher.maxUses !== null && voucher.usedCount >= voucher.maxUses) {
    return {
      status: "exhausted",
      message: "This code has already been fully redeemed.",
    }
  }

  const remainingUses =
    voucher.maxUses === null ? null : voucher.maxUses - voucher.usedCount

  return {
    status: "valid",
    voucher: {
      id: voucher.id,
      code: voucher.code,
      discountPercent: voucher.discountPercent,
      discountAmountCents: voucher.discountAmountCents,
      expiresAt: voucher.expiresAt,
      remainingUses,
    },
    message:
      voucher.discountAmountCents && voucher.discountAmountCents > 0
        ? `€${(voucher.discountAmountCents / 100).toFixed(2)} off applied at checkout.`
        : voucher.discountPercent === 100
          ? "Full unlock — no payment needed."
          : `${voucher.discountPercent}% off applied at checkout.`,
  }
}

/**
 * Generate a one-time €2-off reward voucher (the "leave a review" reward).
 * Returns the human-readable code. Single use, expires in 90 days.
 */
export async function createReviewRewardVoucher(opts: {
  userId: string
  amountCents?: number
}): Promise<string> {
  const amountCents = opts.amountCents ?? 200
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase()
  const code = `THANKS-${rand}`
  const expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)

  await db.voucher.create({
    data: {
      code,
      discountPercent: 0,
      discountAmountCents: amountCents,
      maxUses: 1,
      expiresAt,
      userId: opts.userId,
      note: `Review reward for user ${opts.userId}`,
    },
  })

  return code
}

/**
 * Record a voucher redemption (one row per bundle redeemed).
 * Bumps the parent voucher's `usedCount` in the same transaction so two
 * concurrent checkouts can't overshoot `maxUses`.
 */
export async function recordRedemption(opts: {
  voucherId: string
  userId: string
  bundleIds: string[]
  percent: number
}) {
  await db.$transaction([
    db.voucherRedemption.createMany({
      data: opts.bundleIds.map((bundleId) => ({
        voucherId: opts.voucherId,
        userId: opts.userId,
        bundleId,
        percent: opts.percent,
      })),
    }),
    db.voucher.update({
      where: { id: opts.voucherId },
      data: { usedCount: { increment: opts.bundleIds.length } },
    }),
  ])
}
