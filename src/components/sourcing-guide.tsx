"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  AlertTriangle,
  ArrowRight,
  Box,
  Camera,
  CheckCircle2,
  Globe,
  Package,
  Scale,
  ShieldCheck,
  Truck,
} from "lucide-react"

const AGENT_STEPS = [
  {
    icon: Globe,
    title: "Find the link",
    body: "Browse Weidian or Taobao for unbranded or 1:1 items. Copy the product URL — that's your sourcing link.",
  },
  {
    icon: Package,
    title: "Paste into your agent",
    body: "Open Sugargoo, Joyabuy, or similar. Paste the link. The agent buys on your behalf and holds stock in their China warehouse.",
  },
  {
    icon: Camera,
    title: "QC in the warehouse",
    body: "Request QC photos before international shipping. Check stitching, logos, materials and reject bad batches while it's still cheap.",
  },
  {
    icon: Truck,
    title: "Pay shipping by weight",
    body: "Approve the parcel. International freight is calculated on actual weight and volume — consolidate multiple items to save.",
  },
]

const VINTAGE_STEPS = [
  {
    icon: Box,
    title: "Pick a wholesale partner",
    body: "Platforms like Fleek or direct B2B dealers (e.g. Syed Vintage) sell authentic second-hand in bulk — by bale or by kilo.",
  },
  {
    icon: Scale,
    title: "Understand grading",
    body: "Stock is graded A / B / C for condition. You won't pick exact graphics — you buy volume and curate what sells.",
  },
  {
    icon: Package,
    title: "Receive & sort",
    body: "Bales arrive mixed. Sort, photograph, price and list. Margins come from volume and your eye, not from 1:1 sourcing.",
  },
  {
    icon: ShieldCheck,
    title: "List with confidence",
    body: "Authentic vintage is legal, Vinted-friendly and promoted. No stealth tactics, no customs seizure anxiety.",
  },
]

const STEALTH_TIPS = [
  "Shoot casual photos — hanger, bed, mirror selfie. Never studio lighting or stock-style flat lays.",
  "Hide or crop QR codes, batch tags and factory labels before listing.",
  "Avoid obvious trigger words in your titles — describe fit, colour and condition only, never the brand-copy angle.",
  "Don't reuse the same supplier photos across accounts — Vinted flags duplicate image hashes.",
  "Keep descriptions human. Short, casual, no copy-paste blocks from agent listings.",
]

const VINTAGE_PERKS = [
  "100% legal authentic goods — no IP or customs issues.",
  "Vinted actively promotes vintage; higher trust and fewer bans.",
  "Build a real brand around curation, not stealth.",
  "Volume pricing — flip margins on quantity, not hype alone.",
]

export function SourcingGuide() {
  return (
    <div className="mx-auto max-w-5xl px-5 pb-28 pt-28 md:px-8 md:pt-36">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl"
      >
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Education
        </span>
        <h1 className="mt-4 text-balance font-heading text-4xl font-bold leading-[1] tracking-tight text-foreground md:text-6xl">
          Two ways to source. Pick your lane.
        </h1>
        <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          Beginners often mix these up. Route A is China agents and 1:1
          sourcing. Route B is vintage wholesale — completely different risk,
          process and platform strategy. Know both before you spend.
        </p>
      </motion.div>

      {/* Route cards overview */}
      <div className="mt-14 grid gap-5 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Route A
          </span>
          <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">
            Direct China / 1:1 Agents
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Weidian, Taobao via Sugargoo or Joyabuy. High margin potential,
            higher platform risk on Vinted. Requires stealth discipline.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="rounded-2xl border border-accent/30 bg-accent/5 p-6 backdrop-blur-sm"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Route B
          </span>
          <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">
            Vintage Wholesale B2B
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Fleek, Syed Vintage, bale dealers. Authentic second-hand in bulk.
            Legal, Vinted-native, zero ban anxiety.
          </p>
        </motion.div>
      </div>

      {/* Route A deep dive */}
      <section className="mt-20">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl border border-border bg-secondary text-accent">
            <Globe className="size-5" />
          </span>
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
              Route A — Direct China &amp; 1:1 Agents
            </h2>
            <p className="text-sm text-muted-foreground">
              Concept: purchasing through middlemen who buy from Chinese
              marketplaces.
            </p>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
          You&apos;re not buying from Nike — you&apos;re buying from factories
          or sellers on Weidian/Taobao that produce unbranded or 1:1-tier
          goods. An agent (Sugargoo, Joyabuy, CNFans, etc.) acts as your
          buyer and warehouse in China. You pay product cost + domestic China
          shipping to agent + international shipping to your door.
        </p>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2">
          {AGENT_STEPS.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex gap-4 rounded-2xl border border-border bg-card/40 p-5"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-background text-accent">
                <step.icon className="size-5" />
              </span>
              <div>
                <span className="font-mono text-xs text-muted-foreground">
                  Step {i + 1}
                </span>
                <h3 className="mt-1 font-heading text-base font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>

        {/* Stealth guide */}
        <div className="mt-10 rounded-2xl border border-destructive/30 bg-destructive/5 p-6 md:p-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-destructive" />
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground">
                Vinted Stealth / Survival Guide
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Selling agent-sourced items on Vinted carries ban risk. Platforms
                scan photos, keywords and listing patterns. If you go this route,
                treat stealth as part of the job — not an afterthought.
              </p>
            </div>
          </div>
          <ul className="mt-6 flex flex-col gap-3">
            {STEALTH_TIPS.map((tip) => (
              <li
                key={tip}
                className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
              >
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-destructive" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Route B deep dive */}
      <section className="mt-20">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl border border-accent/40 bg-accent/10 text-accent">
            <Box className="size-5" />
          </span>
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
              Route B — Vintage Wholesale B2B
            </h2>
            <p className="text-sm text-muted-foreground">
              Concept: authentic second-hand clothing in bulk — not 1:1 sourcing.
            </p>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
          This is legitimate vintage sourcing. You buy bales or kilo lots from
          wholesalers like Fleek or independent dealers (Syed Vintage and
          similar). Quality varies by grade — you get volume, not a curated
          single SKU. Your edge is sorting, styling and listing — not factory
          links.
        </p>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2">
          {VINTAGE_STEPS.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex gap-4 rounded-2xl border border-border bg-card/40 p-5"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-background text-accent">
                <step.icon className="size-5" />
              </span>
              <div>
                <span className="font-mono text-xs text-muted-foreground">
                  Step {i + 1}
                </span>
                <h3 className="mt-1 font-heading text-base font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>

        <div className="mt-10 rounded-2xl border border-accent/30 bg-accent/5 p-6 md:p-8">
          <h3 className="font-heading text-lg font-bold text-foreground">
            Why Route B wins on Vinted
          </h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {VINTAGE_PERKS.map((perk) => (
              <li
                key={perk}
                className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                {perk}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <div className="mt-20 rounded-2xl border border-border bg-card/60 p-8 text-center backdrop-blur-sm md:p-10">
        <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
          Ready to unlock your plugs?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Every PLUGGED bundle tags suppliers by route — agents and vintage
          wholesale — so you know exactly what you&apos;re opening in your vault.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/drops"
            className="flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-accent/30"
          >
            Browse Bundles
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/60 hover:text-accent"
          >
            Open Your Vault
          </Link>
        </div>
      </div>
    </div>
  )
}
