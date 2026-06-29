// @ts-check
/**
 * scripts/create-voucher.mjs
 * -------------------------------------------------------------------
 * Create / update a voucher code from the CLI. No admin UI required.
 *
 *   npm run voucher:create -- --code=FRIENDS --percent=100
 *   npm run voucher:create -- --code=LAUNCH50 --percent=50 --maxUses=100 --expiresIn=30d
 *   npm run voucher:create -- --code=VIP --percent=100 --note="Team comp"
 *
 * Flags:
 *   --code       (required) the literal code users will type. Uppercased.
 *   --percent    (required) 1–100. 100 = full bypass (no Stripe payment).
 *   --maxUses    (optional) total redemptions allowed across all users.
 *   --expiresIn  (optional) e.g. 30d, 12h, 45m. Omit = never expires.
 *   --note       (optional) free-text audit label.
 */
import { PrismaClient } from "@prisma/client"

const args = Object.fromEntries(
  process.argv
    .slice(2)
    .filter((a) => a.startsWith("--"))
    .map((a) => {
      const [k, ...rest] = a.replace(/^--/, "").split("=")
      return [k, rest.join("=")]
    }),
)

function parseDuration(s) {
  if (!s) return null
  const m = s.match(/^(\d+)\s*([dhmDHM])$/)
  if (!m) throw new Error(`--expiresIn must look like 30d, 12h, 45m (got "${s}")`)
  const n = Number(m[1])
  const unit = m[2].toLowerCase()
  const ms =
    unit === "d" ? n * 86_400_000 : unit === "h" ? n * 3_600_000 : n * 60_000
  return new Date(Date.now() + ms)
}

async function main() {
  const code = (args.code ?? "").trim().toUpperCase()
  const percent = Number(args.percent)
  const maxUses = args.maxUses ? Number(args.maxUses) : null
  const expiresAt = parseDuration(args.expiresIn)
  const note = args.note ?? null

  if (!/^[A-Z0-9_-]{2,32}$/.test(code)) {
    throw new Error(
      "--code must be 2–32 chars (letters, digits, dashes or underscores).",
    )
  }
  if (!Number.isInteger(percent) || percent < 1 || percent > 100) {
    throw new Error("--percent must be an integer between 1 and 100.")
  }
  if (maxUses !== null && (!Number.isInteger(maxUses) || maxUses < 1)) {
    throw new Error("--maxUses must be a positive integer when provided.")
  }

  const db = new PrismaClient()
  try {
    const voucher = await db.voucher.upsert({
      where: { code },
      update: { discountPercent: percent, maxUses, expiresAt, note },
      create: { code, discountPercent: percent, maxUses, expiresAt, note },
    })
    console.log("✓ voucher saved")
    console.table([
      {
        code: voucher.code,
        percent: voucher.discountPercent,
        maxUses: voucher.maxUses,
        usedCount: voucher.usedCount,
        expiresAt: voucher.expiresAt?.toISOString() ?? "never",
        note: voucher.note ?? "",
      },
    ])
  } finally {
    await db.$disconnect()
  }
}

main().catch((err) => {
  console.error("✗", err.message ?? err)
  process.exit(1)
})
