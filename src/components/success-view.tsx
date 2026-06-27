"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Check, KeyRound } from "lucide-react"
import { useCart } from "./cart-provider"

export function SuccessView({ bundleNames }: { bundleNames: string[] }) {
  const { clear } = useCart()

  // Payment succeeded — empty the basket once.
  useEffect(() => {
    clear()
  }, [clear])

  return (
    <section className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center px-5 py-28 text-center md:px-8">
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
    </section>
  )
}
