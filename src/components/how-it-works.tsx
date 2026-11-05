"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, CreditCard, Search, Zap } from "lucide-react"

const STEPS = [
  {
    icon: Search,
    title: "Pick your bundle",
    body: "Choose the aesthetic your audience actually buys — Opium, Y2K, racing, sneakers, UK drip and more.",
  },
  {
    icon: CreditCard,
    title: "Secure checkout",
    body: "One-time payment through Stripe. No subscriptions, no hidden fees, no waiting on Telegram DMs.",
  },
  {
    icon: Zap,
    title: "Instant vault access",
    body: "Your full vetted supplier list unlocks the second payment clears — with lifetime updates included.",
  },
]

const item = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

export function HowItWorks() {
  return (
    <section
      id="how"
      className="relative border-y border-border bg-background py-14 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            How It Works
          </span>
          <h2 className="mt-3 text-balance font-heading text-3xl font-bold leading-[1] tracking-tight text-foreground md:mt-4 md:text-5xl">
            Plugged in three steps.
          </h2>
          <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground md:mt-5 md:text-base">
            We did the digging so you don&apos;t have to. No dead links, no scam
            suppliers — just clean, working plugs, instantly.
          </p>
        </motion.div>

        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ staggerChildren: 0.16 }}
          className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-6"
        >
          {STEPS.map((step, i) => (
            <motion.li
              key={step.title}
              variants={item}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              data-testid={`how-step-${i + 1}`}
              className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-border bg-card/50 p-7 transition-colors duration-300 hover:border-accent/50"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-3 -top-4 select-none font-heading text-[5.5rem] font-bold leading-none text-foreground/[0.04] transition-colors duration-300 group-hover:text-accent/10"
              >
                0{i + 1}
              </span>
              <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-border bg-secondary text-accent transition-transform duration-300 group-hover:scale-105">
                <step.icon className="size-5" />
              </span>
              <div className="relative">
                <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>

        <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            <span>New to reselling?</span>
            <Link
              href="/sourcing-guide"
              data-testid="how-sourcing-link"
              className="inline-flex items-center gap-1.5 font-semibold text-accent transition-colors hover:text-foreground"
            >
              Read the free Sourcing Guide
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-accent" />
              <span><strong className="text-foreground">60+</strong> vetted suppliers</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-accent" />
              <span><strong className="text-foreground">9</strong> bundles</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-accent" />
              <span><strong className="text-foreground">400+</strong> resellers</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
