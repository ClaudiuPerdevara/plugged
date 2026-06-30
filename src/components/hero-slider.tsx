"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  motion,
  type PanInfo,
  useReducedMotion,
} from "framer-motion"
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PRODUCTS, CATALOG_IMAGES } from "@/lib/products"

const HERO_BUNDLE_IDS = [
  "racing",
  "opium",
  "y2k",
  "vintage-windbreakers",
  "jeans",
  "sportswear",
] as const

const SLIDES = HERO_BUNDLE_IDS.map((id, i) => {
  const p = PRODUCTS.find((prod) => prod.id === id)!
  return {
    id: p.id,
    tag: `${String(i + 1).padStart(2, "0")} — ${p.tag}`,
    title: p.name.replace(" Bundle", "").replace(" & ", " · "),
    subtitle: p.description,
    image: CATALOG_IMAGES[p.id as keyof typeof CATALOG_IMAGES]?.hero ?? p.image,
    href: `/bundle/${p.id}`,
    limited: Boolean(p.limited || p.miniBundle),
  }
})

const SWIPE_THRESHOLD = 70

export function HeroSlider() {
  const [[index, direction], setState] = useState<[number, number]>([0, 0])
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()

  const paginate = useCallback((dir: number) => {
    setState(([prev]) => [
      (prev + dir + SLIDES.length) % SLIDES.length,
      dir,
    ])
  }, [])

  const goTo = useCallback((next: number) => {
    setState(([prev]) => [next, next > prev ? 1 : -1])
  }, [])

  useEffect(() => {
    if (paused || reduceMotion) return
    const timer = setInterval(() => paginate(1), 6000)
    return () => clearInterval(timer)
  }, [paginate, paused, reduceMotion])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) paginate(1)
    else if (info.offset.x > SWIPE_THRESHOLD) paginate(-1)
  }

  const slide = SLIDES[index]

  return (
    <section
      id="top"
      className="relative h-[100svh] w-full overflow-hidden bg-background"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured fashion styles"
    >
      {/* Crossfade image stack — every slide stays mounted so there's never a
          black "still loading" flash, and the visible layer always matches the
          active index. */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={s.image}
            alt={`${s.title} — ${s.tag}`}
            draggable={false}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
            className="pointer-events-none h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/80 via-background/20 to-transparent" />
        </div>
      ))}

      {/* Transparent swipe/drag layer (below text & controls). */}
      <motion.div
        className="absolute inset-0 z-[5] cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.16}
        onDragEnd={onDragEnd}
      />

      <div className="pointer-events-none absolute inset-0 z-10 mx-auto flex max-w-7xl flex-col justify-end px-5 pb-24 md:px-8 md:pb-28">
        {/* Keyed on the active id → React remounts on every change, so the
            title/subtitle can never get stuck on a previous slide. */}
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              {slide.tag}
            </span>
            {slide.limited ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/50 bg-accent/15 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-accent shadow-lg shadow-accent/20">
                ⏳ Limited Mini Bundle
              </span>
            ) : null}
          </div>
          <h1 className="mt-4 text-balance font-heading text-5xl font-bold leading-[0.95] tracking-tight text-foreground text-glow md:text-7xl">
            {slide.title}
          </h1>
          <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {slide.subtitle}
          </p>
          <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/drops"
              className="rounded-full bg-foreground px-7 py-3 text-sm font-semibold text-background transition-transform duration-300 hover:scale-[1.03]"
            >
              Browse All Styles
            </Link>
            <Link
              href={slide.href}
              className="rounded-full border border-border px-7 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/60 hover:text-accent"
            >
              View This Bundle
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 md:flex md:right-8">
        <button
          type="button"
          onClick={() => paginate(-1)}
          aria-label="Previous slide"
          className="grid size-11 place-items-center rounded-full border border-border bg-background/40 text-foreground backdrop-blur-md transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => paginate(1)}
          aria-label="Next slide"
          className="grid size-11 place-items-center rounded-full border border-border bg-background/40 text-foreground backdrop-blur-md transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>

      <div className="absolute bottom-9 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to ${s.tag}`}
            aria-current={i === index}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === index
                ? "w-8 bg-accent"
                : "w-2.5 bg-foreground/30 hover:bg-foreground/60"
            }`}
          />
        ))}
      </div>

      <a
        href="#products"
        className="absolute bottom-7 right-5 z-20 hidden items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground md:flex md:right-8"
      >
        Scroll
        <motion.span
          animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="grid size-7 place-items-center rounded-full border border-border"
        >
          <ArrowDown className="size-3.5" />
        </motion.span>
      </a>
    </section>
  )
}
