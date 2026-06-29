import { NextResponse } from "next/server"
import { lookupVoucher } from "@/lib/vouchers"

/**
 * GET /api/voucher/validate?code=XYZ
 * Lightweight, read-only check used by the cart to live-validate a voucher
 * before the user clicks Checkout. The real, authoritative validation
 * happens again in /api/checkout so this endpoint can't be used to fake an
 * applied voucher.
 */
export const runtime = "nodejs"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const code = (url.searchParams.get("code") ?? "").trim()
  if (!code) {
    return NextResponse.json(
      { ok: false, status: "invalid_code", message: "Enter a code." },
      { status: 400 },
    )
  }
  const info = await lookupVoucher(code)
  return NextResponse.json({
    ok: info.status === "valid",
    status: info.status,
    message: info.message,
    voucher: info.voucher
      ? {
          code: info.voucher.code,
          discountPercent: info.voucher.discountPercent,
        }
      : null,
  })
}
