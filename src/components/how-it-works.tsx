"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Search, ShieldCheck, Zap } from "lucide-react"

const STEPS = [
  {
    icon: BookOpen,
    title: "Read the Sourcing Guide",
    body: "Start here — learn how agents, QC photos and shipping work before you buy a bundle. Five minutes now saves hours of mistakes later.",
    href: "/sourcing-guide",
  },
  {
    icon: Search,
    title: "Pick your lane",
    body: "Opium, Y2K, UK drip, vintage sportswear, sneakers — 14 style bundles. Pick the aesthetic your audience actually buys.",
  },
  {
    icon: Zap,
    title: "Get instant access",
    body: "Checkout once and unlock the full vetted supplier list. No subscriptions, no waiting.",
  },
  {
    icon: ShieldCheck,
    title: "Start reselling",
    body: "Order, list, profit. Every plug is tested for quality, pricing and ship reliability.",
  },
]

const item = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

export function HowItWorks() {
  return (
    <section id="how" className="relative border-y border-border bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              How It Works
            </span>
            <h2 className="mt-4 text-balance font-heading text-4xl font-bold leading-[1] tracking-tight text-foreground md:text-5xl">
              From scroll to sold in four moves.
            </h2>
            <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground">
              We did the digging so you don&apos;t have to. No more dead Telegram
              links or scam suppliers — just clean, working plugs.
            </p>
          </motion.div>

          <motion.ol
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.14 }}
            className="flex flex-col gap-4"
          >
            {STEPS.map((step, i) => (
              <motion.li
                key={step.title}
                variants={item}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-5 rounded-2xl border border-border bg-card/50 p-6 transition-colors hover:border-accent/50"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-border bg-secondary text-accent">
                  <step.icon className="size-5" />
                </span>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted-foreground">
                      0{i + 1}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                  {"href" in step && step.href ? (
                    <Link
                      href={step.href}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-foreground"
                    >
                      Open Sourcing Guide
                      <ArrowRight className="size-3.5" />
                    </Link>
                  ) : null}
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}
