"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Package, Settings, ShoppingBag, Zap } from "lucide-react"
import Link from "next/link"
import type { Product } from "@/lib/products"
import { PRODUCTS } from "@/lib/products"
import type { AccountInfo } from "@/lib/data"
import { VaultBundle } from "./vault-bundle"
import { AccountSettings } from "./account-settings"

const TABS = [
  { id: "bundles", label: "Purchased Bundles", icon: Package },
  { id: "account", label: "Account & Security", icon: Settings },
] as const

type TabId = (typeof TABS)[number]["id"]

const TOTAL_ACTIVE = PRODUCTS.filter((p) => !p.comingSoon).length

function firstName(name: string) {
  return name.split(" ")[0] ?? name
}

export function Dashboard({
  owned,
  account,
}: {
  owned: Product[]
  account: AccountInfo
}) {
  const [tab, setTab] = useState<TabId>("bundles")
  const remaining = TOTAL_ACTIVE - owned.length

  return (
    <section className="mx-auto w-full min-w-0 max-w-[1600px] px-5 pb-28 pt-32 md:px-10 md:pt-40">
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            The Vault
          </span>
          <h1 className="mt-4 text-balance font-heading text-5xl font-bold leading-[1] tracking-tight text-foreground md:text-6xl">
            Welcome back,{" "}
            <span className="text-accent">{firstName(account.name)}</span>.
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {owned.length === 0
              ? "Your vault is empty — grab a bundle to unlock your first set of plugs."
              : owned.length === TOTAL_ACTIVE
              ? "You own every active bundle. Full plug access."
              : `You have ${owned.length} of ${TOTAL_ACTIVE} bundles. ${remaining} more plug set${remaining > 1 ? "s" : ""} available.`}
          </p>
        </div>

        {/* Bundle progress pill */}
        {owned.length > 0 && owned.length < TOTAL_ACTIVE && (
          <Link
            href="/drops"
            className="group flex shrink-0 items-center gap-3 rounded-2xl border border-border bg-card/60 px-5 py-3.5 transition-all duration-300 hover:border-accent/50 hover:bg-card"
          >
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Bundle coverage
              </span>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-28 overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-accent transition-all duration-700"
                    style={{ width: `${(owned.length / TOTAL_ACTIVE) * 100}%` }}
                  />
                </div>
                <span className="font-mono text-xs font-medium text-foreground">
                  {owned.length}/{TOTAL_ACTIVE}
                </span>
              </div>
            </div>
            <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
              <ShoppingBag className="size-4" />
            </div>
          </Link>
        )}

        {/* Full access badge */}
        {owned.length === TOTAL_ACTIVE && (
          <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-accent/40 bg-accent/10 px-5 py-3.5">
            <Zap className="size-4 text-accent" />
            <span className="text-sm font-semibold text-accent">Full plug access</span>
          </div>
        )}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr] lg:gap-10 xl:gap-14">
        {/* Sidebar nav */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <nav className="flex gap-2 lg:flex-col">
            {TABS.map(({ id, label, icon: Icon }) => {
              const isActive = tab === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTab(id)}
                  className={`flex flex-1 items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-300 lg:flex-none ${
                    isActive
                      ? "border-accent/60 bg-accent/10 text-foreground"
                      : "border-border bg-card/40 text-muted-foreground hover:border-accent/40 hover:text-foreground"
                  }`}
                >
                  <Icon
                    className={`size-[18px] shrink-0 ${isActive ? "text-accent" : ""}`}
                  />
                  <span>{label}</span>
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Content */}
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {tab === "bundles" ? (
                owned.length > 0 ? (
                  <div className="flex flex-col gap-5">
                    {owned.map((product) => (
                      <VaultBundle key={product.id} product={product} />
                    ))}

                    {/* Upsell teaser if bundles remain */}
                    {remaining > 0 && (
                      <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border/70 bg-card/30 px-6 py-8 text-center">
                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          {remaining} bundle{remaining > 1 ? "s" : ""} not yet unlocked
                        </span>
                        <p className="text-sm text-muted-foreground">
                          Expand your plug network — each bundle adds a new sourcing channel.
                        </p>
                        <Link
                          href="/drops"
                          className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-5 py-2.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-accent/60 hover:text-accent"
                        >
                          <ShoppingBag className="size-4" />
                          Browse {remaining} more drop{remaining > 1 ? "s" : ""}
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card/60 p-12 text-center backdrop-blur-sm">
                    <p className="font-heading text-xl font-bold text-foreground">
                      Your vault is empty
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Grab a bundle to unlock your first set of plugs.
                    </p>
                    <Link
                      href="/drops"
                      className="mt-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-transform duration-300 hover:scale-[1.03]"
                    >
                      Browse Drops
                    </Link>
                  </div>
                )
              ) : (
                <AccountSettings account={account} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
