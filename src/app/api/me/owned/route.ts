import { NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { getOwnedBundleIds } from "@/lib/purchases"

/**
 * GET /api/me/owned — bundle ids the signed-in user owns (empty for guests).
 * Used client-side so catalog cards can swap "Add to cart" for a "View" link
 * on bundles the user already purchased.
 */
export const runtime = "nodejs"

export async function GET() {
  try {
    const session = await getSession()
    if (!session) return NextResponse.json({ owned: [] })
    const owned = await getOwnedBundleIds(session.user.id)
    return NextResponse.json({ owned })
  } catch (err) {
    console.error("[me/owned] failed:", err)
    return NextResponse.json({ owned: [] })
  }
}
