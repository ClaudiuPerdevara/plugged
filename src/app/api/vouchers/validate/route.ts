import { NextResponse } from "next/server"
import { z } from "zod"
import { getSession } from "@/lib/session"
import { lookupVoucher } from "@/lib/vouchers"

/**
 * POST /api/vouchers/validate — preview a voucher for the current user.
 *
 * Used by the cart to show the discount BEFORE checkout. Nominal (per-user)
 * vouchers are validated against the signed-in user's id. Always returns JSON.
 */
export const runtime = "nodejs"

const BodySchema = z.object({ code: z.string().trim().min(1).max(64) })

export async function POST(req: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json(
        { valid: false, message: "Sign in to use a voucher code." },
        { status: 401 },
      )
    }

    let json: unknown
    try {
      json = await req.json()
    } catch {
      return NextResponse.json(
        { valid: false, message: "Invalid request." },
        { status: 400 },
      )
    }
    const parsed = BodySchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json(
        { valid: false, message: "Enter a voucher code." },
        { status: 400 },
      )
    }

    const info = await lookupVoucher(parsed.data.code, session.user.id)
    if (info.status !== "valid" || !info.voucher) {
      return NextResponse.json({ valid: false, message: info.message })
    }

    return NextResponse.json({
      valid: true,
      code: info.voucher.code,
      discountAmountCents: info.voucher.discountAmountCents,
      discountPercent: info.voucher.discountPercent,
      message: info.message,
    })
  } catch (err) {
    console.error("[vouchers/validate] failed:", err)
    return NextResponse.json(
      { valid: false, message: "Couldn't check that code right now." },
      { status: 500 },
    )
  }
}
