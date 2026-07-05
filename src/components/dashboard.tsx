"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Package, Settings } from "lucide-react"
import Link from "next/link"
import type { Product } from "@/lib/products"
import type { AccountInfo } from "@/lib/data"
import { VaultBundle } from "./vault-bundle"
import { AccountSettings } from "./account-settings"

const TABS = [
  { id: "bundles", label: "Purchased Bundles", icon: Package },
  { id: "account", label: "Account & Security", icon: Settings },
] as const

type TabId = (typeof TABS)[number]["id"]

export function Dashboard({
  owned,
  account,
}: {
  owned: Product[]
  account: AccountInfo
}) {
  const [tab, setTab] = useState<TabId>("bundles")

  return (
    <section className="mx-auto w-full min-w-0 max-w-[1600px] px-5 pb-28 pt-32 md:px-10 md:pt-40">
      {/* Header */}
      <div className="max-w-2xl">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          The Vault
        </span>
        <h1 className="mt-4 text-balance font-heading text-5xl font-bold leading-[1] tracking-tight text-foreground md:text-6xl">
          Your Dashboard
        </h1>
        <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          Manage your bundles, access your plugs and lock down your account.
          Suppliers are split by{" "}
          <Link
            href="/sourcing-guide"
            className="text-foreground underline decoration-accent/60 underline-offset-4 transition-colors hover:text-accent"
          >
            sourcing route
          </Link>
          .
        </p>
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
