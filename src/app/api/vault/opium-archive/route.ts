import { NextResponse } from "next/server"
import { readFile } from "node:fs/promises"
import path from "node:path"
import { getSession } from "@/lib/session"
import { db } from "@/lib/db"

/**
 * GET /api/vault/opium-archive
 * ----------------------------------------------------------------------------
 * Authenticated, ownership-gated download of the large Opium vendor archive.
 * The file lives OUTSIDE /public (in /private) so it is never part of the
 * crawlable static surface — only buyers of the "opium" bundle can stream it.
 * This removes the "bulk-document drive-by download" reputation heuristic.
 */
export const runtime = "nodejs"

export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json(
      { error: "Sign in to download this archive." },
      { status: 401 },
    )
  }

  const owns = await db.purchase.findFirst({
    where: { userId: session.user.id, bundleId: "opium" },
    select: { id: true },
  })
  if (!owns) {
    return NextResponse.json(
      { error: "Purchase the Opium bundle to access this archive." },
      { status: 403 },
    )
  }

  try {
    const filePath = path.join(process.cwd(), "private", "Opium_Vendor_List.xlsx")
    const file = await readFile(filePath)
    return new NextResponse(new Uint8Array(file), {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="Opium_Vendor_List.xlsx"',
        "Cache-Control": "private, no-store",
      },
    })
  } catch (err) {
    console.error("[opium-archive] read failed:", err)
    return NextResponse.json(
      { error: "Archive temporarily unavailable." },
      { status: 500 },
    )
  }
}
