"use client"

import { motion, type Variants } from "framer-motion"
import { Star, Quote } from "lucide-react"

const TESTIMONIALS = [
  {
    id: 1,
    name: "Mihai R.",
    handle: "@mihai.vinted",
    rating: 5,
    text: "Am luat Racing Bundle, în 10 minute aveam 3 linkuri live. Am vândut prima jachetă pe Vinted în 48h. Nu mai caut eu pe Taobao niciodată.",
    bundle: "Racing Bundle",
    result: "Sold first item in 48h",
  },
  {
    id: 2,
    name: "Andrei K.",
    handle: "@andreeei_",
    rating: 5,
    text: "Opium Bundle e altă lume. 2400 surse, găsești orice piesă. Aveam deja un agent chinezesc dar linkurile astea m-au salvat de 100x scrolling.",
    bundle: "Opium Bundle",
    result: "Saved hours of research",
  },
  {
    id: 3,
    name: "Diana M.",
    handle: "@di.vintage",
    rating: 5,
    text: "Y2K Bundle — exact ce căutam. Furnizori wholesale cu MOQ mic, perfect pentru Vinted. Linkurile chiar merg, am verificat pe toate.",
    bundle: "Y2K Bundle",
    result: "All links verified & live",
  },
  {
    id: 4,
    name: "Radu T.",
    handle: "@radu.resells",
    rating: 5,
    text: "Jeans Bundle — Levi's vintage wholesale direct, fără intermediari. Prima comandă a ajuns în 5 zile. Marja e la 3x față de ce găseam eu pe Fleek.",
    bundle: "Jeans Bundle",
    result: "3x margin vs before",
  },
  {
    id: 5,
    name: "Alex P.",
    handle: "@alex.drip.ro",
    rating: 5,
    text: "Windbreakers Bundle a meritat de 10 ori prețul. Loturile grade A/B direct din EU, nu mai plătesc shipping intercontinental. Recomand 100%.",
    bundle: "Windbreakers Bundle",
    result: "No intercontinental shipping",
  },
  {
    id: 6,
    name: "Vlad N.",
    handle: "@vntge.vlad",
    rating: 5,
    text: "Sportswear Bundle — Nike și Adidas retro în loturi mici. Cel mai ușor flip pe Vinted pe care l-am găsit. Cumpăr la 4€ vând la 15€.",
    bundle: "Sportswear Bundle",
    result: "€4 buy → €15 sell",
  },
]

function Stars({ n }: { n: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="size-3.5 fill-accent text-accent" />
      ))}
    </span>
  )
}

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export function Testimonials() {
  return (
    <section
      id="reviews"
      className="mx-auto w-full max-w-7xl px-5 py-24 md:px-8 md:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl"
      >
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Real buyers · Real results
        </span>
        <h2 className="mt-4 text-balance font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-5xl">
          Resellers who got plugged.
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Over 400 active resellers use Plugged to source. Here's what they say.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {TESTIMONIALS.map((t) => (
          <motion.div
            key={t.id}
            variants={item}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.handle}</p>
              </div>
              <Stars n={t.rating} />
            </div>

            <div className="relative">
              <Quote className="absolute -left-1 -top-1 size-5 text-accent/20" />
              <p className="pl-4 text-sm leading-relaxed text-foreground/80">
                {t.text}
              </p>
            </div>

            <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/60 pt-3.5">
              <span className="rounded-full border border-border/80 bg-background/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                {t.bundle}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-accent">
                <span className="size-1.5 rounded-full bg-accent" />
                {t.result}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Aggregate trust signal */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-border/60 bg-card/30 px-8 py-5"
      >
        <div className="flex items-center gap-2">
          <span className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-accent text-accent" />
            ))}
          </span>
          <span className="font-heading text-lg font-bold text-foreground">4.9</span>
          <span className="text-sm text-muted-foreground">average rating</span>
        </div>
        <div className="h-4 w-px bg-border" />
        <span className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">400+</span> active resellers
        </span>
        <div className="h-4 w-px bg-border" />
        <span className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">9</span> bundles · 60+ suppliers
        </span>
        <div className="h-4 w-px bg-border" />
        <span className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">€2 off</span> for every review left
        </span>
      </motion.div>
    </section>
  )
}
