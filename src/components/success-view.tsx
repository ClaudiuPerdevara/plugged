"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Check, KeyRound, Loader2, ShoppingBag, Sparkles, X } from "lucide-react"
import { useCart } from "./cart-provider"
import { useCheckout } from "@/lib/use-checkout"

// ─── Upsell pack definitions ──────────────────────────────────────────────────
// If the user just bought any bundle in `triggerIds`, show the upsell offer.
// `upgradeIds` = the MISSING bundles they'd get (we'll filter already-owned at render).
// `fullPrice` = sum of individual prices; `offerPrice` = discounted bundle deal.
interface UpsellPack {
  id: string
  headline: string
  subline: string
  /** Bundle IDs that trigger this offer (any match = show it) */
  triggerIds: string[]
  /** All bundle IDs in the upgrade pack (including what they already own) */
  allIds: string[]
  fullPrice: number
  offerPrice: number
  /** Readable names for the included bundles */
  labels: string[]
  accentColor?: string
}

const UPSELL_PACKS: UpsellPack[] = [
  {
    id: "racing-upgrade",
    headline: "Upgrade to the Full Plug",
    subline: "You just unlocked Racing. Add Sportswear + Y2K and get three bundles for the price of two.",
    triggerIds: ["racing"],
    allIds: ["racing", "sportswear", "y2k"],
    fullPrice: 34, // €7 + €15 + €12
    offerPrice: 25,
    labels: ["Racing Jackets", "Vintage Sportswear", "Y2K Bundle"],
  },
  {
    id: "y2k-upgrade",
    headline: "Complete Your Wardrobe Drop",
    subline: "Y2K is in. Add Old Money + Sportswear — three distinct aesthetics, one plug.",
    triggerIds: ["y2k"],
    allIds: ["y2k", "old-money", "sportswear"],
    fullPrice: 42, // €12 + €15 + €15
    offerPrice: 29,
    labels: ["Y2K Bundle", "Old Money", "Vintage Sportswear"],
  },
  {
    id: "opium-upgrade",
    headline: "Go Deeper Into Dark Aesthetic",
    subline: "Opium unlocked. Add Y2K + Vintage Windbreakers — the dark-core supplier stack.",
    triggerIds: ["opium"],
    allIds: ["opium", "y2k", "vintage-windbreakers"],
    fullPrice: 36, // €10 + €12 + €12 + but opium already owned
    offerPrice: 20,
    labels: ["Opium (owned)", "Y2K Bundle", "Vintage Windbreakers"],
  },
]

function getUpsellPack(purchasedIds: string[]): UpsellPack | null {
  for (const pack of UPSELL_PACKS) {
    const triggered = pack.triggerIds.some((id) => purchasedIds.includes(id))
    if (triggered) return pack
  }
  return null
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SuccessView({
  bundleIds,
  bundleNames,
}: {
  bundleIds: string[]
  bundleNames: string[]
}) {
  const { clear } = useCart()
  const { checkout, pending } = useCheckout()
  const [dismissed, setDismissed] = useState(false)
  const [upgradeSuccess, setUpgradeSuccess] = useState(false)

  // Payment succeeded — empty the basket once.
  useEffect(() => {
    clear()
  }, [clear])

  const upsellPack = getUpsellPack(bundleIds)
  // Only offer bundles the user doesn't already own
  const upgradeIds = upsellPack
    ? upsellPack.allIds.filter((id) => !bundleIds.includes(id))
    : []
  const showUpsell = !!upsellPack && upgradeIds.length > 0 && !dismissed && !upgradeSuccess

  async function handleUpgrade() {
    if (!upsellPack || upgradeIds.length === 0) return
    await checkout(upgradeIds.map((id) => ({ id })))
    // checkout() redirects to Stripe — if it somehow returns, mark success
    setUpgradeSuccess(true)
  }

  const savingsAmount = upsellPack ? upsellPack.fullPrice - upsellPack.offerPrice : 0

  return (
    <section className="mx-auto w-full max-w-2xl px-5 py-28 md:px-8">
      {/* ── Confirmation ── */}
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid size-20 place-items-center rounded-full border border-accent/40 bg-accent/15 text-accent"
        >
          <Check className="size-9" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="w-full"
        >
          <span className="mt-8 block font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Payment confirmed
          </span>
          <h1 className="mt-4 text-balance font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-5xl">
            You&apos;re plugged in.
          </h1>
          <p className="mx-auto mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground">
            Your supplier bundles are unlocked and waiting in your vault. Access
            is lifetime — your plugs stay yours.
          </p>

          {bundleNames.length > 0 && (
            <ul className="mx-auto mt-8 flex max-w-sm flex-col gap-2">
              {bundleNames.map((name) => (
                <li
                  key={name}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-3 text-left text-sm font-medium text-foreground backdrop-blur-sm"
                >
                  <Check className="size-4 shrink-0 text-accent" />
                  {name}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/dashboard/?r=1"
              className="flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <KeyRound className="size-4" />
              Open Your Vault
            </Link>
            <Link
              href="/drops"
              className="flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Keep Browsing
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── Upsell Section ── */}
      <AnimatePresence>
        {showUpsell && upsellPack && (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.55, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-16 overflow-hidden rounded-3xl border border-accent/30 bg-card/60 p-6 backdrop-blur-sm md:p-8"
          >
            {/* Dismiss button */}
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss offer"
              className="absolute right-4 top-4 grid size-7 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent/60 hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>

            {/* Accent glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-accent/5 blur-3xl" />

            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5">
              <Sparkles className="size-3.5 text-accent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                One-time offer
              </span>
            </div>

            <h2 className="text-balance font-heading text-2xl font-bold leading-[1.1] tracking-tight text-foreground md:text-3xl">
              {upsellPack.headline}
            </h2>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
              {upsellPack.subline}
            </p>

            {/* Bundle pills */}
            <div className="mt-5 flex flex-wrap gap-2">
              {upsellPack.allIds.map((id) => {
                const isOwned = bundleIds.includes(id)
                const label = upsellPack.labels[upsellPack.allIds.indexOf(id)] ?? id
                return (
                  <span
                    key={id}
                    className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                      isOwned
                        ? "border-accent/40 bg-accent/10 text-accent"
                        : "border-border bg-background/60 text-foreground"
                    }`}
                  >
                    {isOwned && <Check className="size-3" />}
                    {label}
                    {isOwned && <span className="text-[10px] text-accent/70">owned</span>}
                  </span>
                )
              })}
            </div>

            {/* Price + CTA */}
            <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-4xl font-bold text-foreground">
                    €{upsellPack.offerPrice}
                  </span>
                  <span className="text-lg font-medium text-muted-foreground line-through">
                    €{upsellPack.fullPrice}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  You save{" "}
                  <span className="font-semibold text-accent">€{savingsAmount}</span>
                  {" "}— only available right now
                </p>
              </div>

              <button
                type="button"
                onClick={handleUpgrade}
                disabled={pending}
                className="flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-all duration-300 hover:scale-[1.02] hover:bg-accent hover:text-accent-foreground hover:shadow-xl hover:shadow-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-70 disabled:hover:scale-100"
              >
                {pending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Processing…
                  </>
                ) : (
                  <>
                    <ShoppingBag className="size-4" />
                    Upgrade Now — €{upsellPack.offerPrice}
                  </>
                )}
              </button>
            </div>

            {/* Fine print */}
            <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
              Lifetime access. Instant unlock. This offer disappears when you leave the page.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
