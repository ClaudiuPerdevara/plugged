"use client"

import { useCallback, useEffect, useState } from "react"
import {
  AnimatePresence,
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

// Short, mobile-first hero copy — one punchy line per slide instead of the
// long product description, so it never overflows on a phone.
const HERO_TAGLINES: Record<string, string> = {
  racing: "Rare racing jackets — €100–€300 flips.",
  opium: "Rick Owens & Chrome Hearts 1:1 pieces + 2,400 sources.",
  y2k: "Low-rise denim, baby tees & Harley graphics.",
  "vintage-windbreakers": "90s color-block & branded track jackets.",
  jeans: "Vintage Levi's & baggy Y2K denim.",
  sportswear: "Retro Nike & Adidas — easy Vinted flips.",
}

// Short, clean hero titles (override the long product names on the slider).
const HERO_TITLES: Record<string, string> = {
  racing: "Racing Jackets",
  sportswear: "Vintage Sportswear",
}

const SLIDES = HERO_BUNDLE_IDS.map((id) => {
  const p = PRODUCTS.find((prod) => prod.id === id)!
  return {
    id: p.id,
    tag: p.tag,
    title: HERO_TITLES[p.id] ?? p.name.replace(" Bundle", "").replace(" & ", " · "),
    subtitle: HERO_TAGLINES[p.id] ?? p.description,
    image: CATALOG_IMAGES[p.id as keyof typeof CATALOG_IMAGES]?.hero ?? p.image,
    href: `/bundle/${p.id}`,
    limited: Boolean(p.limited || p.miniBundle),
  }
})

const SWIPE_THRESHOLD = 70
const AUTOPLAY_MS = 5000

const slideVariants = {
  enter: (dir: number) => ({ x: dir >= 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? "-100%" : "100%", opacity: 0 }),
}

export function HeroSlider() {
  const [[index, direction], setState] = useState<[number, number]>([0, 0])
  const [paused, setPaused] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const reduceMotion = useReducedMotion()

  const paginate = useCallback((dir: number) => {
    setState(([prev]) => [(prev + dir + SLIDES.length) % SLIDES.length, dir])
  }, [])

  const goTo = useCallback((next: number) => {
    setState(([prev]) => [next, next > prev ? 1 : -1])
  }, [])

  // Auto-advance every 5s. Depending on `index` means the timer is fully reset
  // to 0 whenever the slide changes — including manual swipes / arrows / dots.
  useEffect(() => {
    if (paused || reduceMotion) return
    const timer = setTimeout(() => paginate(1), AUTOPLAY_MS)
    return () => clearTimeout(timer)
  }, [index, paginate, paused, reduceMotion])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    setShowHint(false)
    if (info.offset.x < -SWIPE_THRESHOLD) paginate(1)
    else if (info.offset.x > SWIPE_THRESHOLD) paginate(-1)
  }

  // One-time "swipe" hint on mobile so users know the hero is draggable.
  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      if (localStorage.getItem("plugged-swipe-hint")) return
    } catch {}
    if (!window.matchMedia("(max-width: 767px)").matches) return
    setShowHint(true)
    try {
      localStorage.setItem("plugged-swipe-hint", "1")
    } catch {}
    const t = setTimeout(() => setShowHint(false), 4200)
    return () => clearTimeout(t)
  }, [])

  // Preload neighbouring slides so a swipe-in is never blank. Images are tiny
  // WebP now, so this is effectively free.
  useEffect(() => {
    const next = (index + 1) % SLIDES.length
    const prev = (index - 1 + SLIDES.length) % SLIDES.length
    ;[next, prev].forEach((i) => {
      const img = new window.Image()
      img.src = SLIDES[i].image
    })
  }, [index])

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
      {/* Preload the first hero image (LCP) as early as possible. */}
      <link rel="preload" as="image" href={SLIDES[0].image} fetchPriority="high" />

      {/* Slim promise bar — pinned near the top, doesn't dominate the slide. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[64px] z-10 mx-auto max-w-7xl px-5 md:top-24 md:px-8"
        data-testid="hero-main-headline"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-background/50 px-3.5 py-1.5 backdrop-blur-md">
          <span className="size-1.5 shrink-0 rounded-full bg-accent" />
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-foreground md:text-xs">
            Start Your Resell Business Today
          </span>
        </div>
      </div>


      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={slide.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 260, damping: 32, mass: 0.9 },
            opacity: { duration: 0.35 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.16}
          onDragEnd={onDragEnd}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          <img
            src={slide.image}
            alt={`${slide.title} — ${slide.tag}`}
            draggable={false}
            fetchPriority={index === 0 ? "high" : "auto"}
            decoding="async"
            className="pointer-events-none h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/80 via-background/20 to-transparent" />

          <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-end px-5 pb-16 md:px-8 md:pb-28">
            <div className="max-w-2xl">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent md:text-xs">
                {slide.tag}
              </span>
              <h1 className="mt-2 text-balance font-heading text-[1.75rem] font-bold leading-[1.05] tracking-tight text-foreground text-glow sm:text-4xl md:mt-4 md:text-7xl md:leading-[0.95]">
                {slide.title}
              </h1>
              <p className="mt-2 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground md:mt-4 md:text-lg">
                {slide.subtitle}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3 md:mt-7 md:gap-4">
                <Link
                  href="/drops"
                  data-testid="hero-browse-bundles"
                  className="rounded-full bg-foreground px-5 py-2.5 text-xs font-semibold text-background transition-transform duration-300 hover:scale-[1.03] sm:px-7 sm:py-3 sm:text-sm"
                >
                  Browse All Reseller Bundles
                </Link>
                <Link
                  href={slide.href}
                  className="rounded-full border border-border px-5 py-2.5 text-xs font-semibold text-foreground transition-colors hover:border-accent/60 hover:text-accent sm:px-7 sm:py-3 sm:text-sm"
                >
                  View This Bundle
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Edge arrows — always visible (mobile + desktop), pinned to the
          left/right edges, and cycle infinitely through the slides. */}
      <button
        type="button"
        onClick={() => paginate(-1)}
        aria-label="Previous slide"
        data-testid="hero-prev"
        className="absolute left-3 top-1/2 z-20 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/40 text-foreground backdrop-blur-md transition-colors hover:border-accent hover:text-accent md:left-5 md:grid"
      >
        <ArrowLeft className="size-4" />
      </button>
      <button
        type="button"
        onClick={() => paginate(1)}
        aria-label="Next slide"
        data-testid="hero-next"
        className="absolute right-3 top-1/2 z-20 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/40 text-foreground backdrop-blur-md transition-colors hover:border-accent hover:text-accent md:right-5 md:grid"
      >
        <ArrowRight className="size-4" />
      </button>

      <div className="absolute bottom-9 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        <button
          type="button"
          onClick={() => paginate(-1)}
          aria-label="Previous slide"
          data-testid="hero-prev-mobile"
          className="grid size-8 place-items-center rounded-full border border-border bg-background/40 text-foreground backdrop-blur-md transition-colors active:border-accent active:text-accent md:hidden"
        >
          <ArrowLeft className="size-4" />
        </button>
        <div className="flex items-center gap-2.5">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to ${s.tag}`}
              aria-current={i === index}
              data-testid={`hero-dot-${i}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index
                  ? "w-8 bg-accent"
                  : "w-2.5 bg-foreground/30 hover:bg-foreground/60"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => paginate(1)}
          aria-label="Next slide"
          data-testid="hero-next-mobile"
          className="grid size-8 place-items-center rounded-full border border-border bg-background/40 text-foreground backdrop-blur-md transition-colors active:border-accent active:text-accent md:hidden"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>

      {/* Mobile-only one-time swipe hint */}
      <AnimatePresence>
        {showHint && !reduceMotion && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.4 }}
            data-testid="hero-swipe-hint"
            className="pointer-events-none absolute left-1/2 top-[38%] z-30 -translate-x-1/2 md:hidden"
          >
            <div className="flex items-center gap-2 rounded-full border border-accent/40 bg-background/60 px-4 py-2.5 backdrop-blur-md">
              <ArrowLeft className="size-3.5 text-accent" />
              <motion.span
                animate={{ x: [-7, 7, -7] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="grid size-6 place-items-center rounded-full bg-accent/20"
              >
                <span className="size-2 rounded-full bg-accent" />
              </motion.span>
              <ArrowRight className="size-3.5 text-accent" />
              <span className="ml-1 text-xs font-medium uppercase tracking-[0.15em] text-foreground">
                Swipe
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href="#products"
        className="absolute bottom-7 right-5 z-20 hidden items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground md:flex md:right-20"
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
