"use client"

import { useCallback, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { ProductCard } from "./product-card"
import { FEATURED_PRODUCTS } from "@/lib/products"

const AUTOPLAY_MS = 5000

export function ProductsSection() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const pausedRef = useRef(false)
  const scrollEndRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const advance = useCallback((dir: "left" | "right" = "right") => {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>("[data-card]")
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8
    const atStart = el.scrollLeft <= 8
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8
    // Arrows / autoplay always work and cycle: past the end loops back to the
    // start and before the start loops to the end.
    if (dir === "right") {
      if (atEnd) el.scrollTo({ left: 0, behavior: "smooth" })
      else el.scrollBy({ left: amount, behavior: "smooth" })
    } else {
      if (atStart) el.scrollTo({ left: el.scrollWidth, behavior: "smooth" })
      else el.scrollBy({ left: -amount, behavior: "smooth" })
    }
  }, [])

  // (Re)start the 5s autoplay countdown from zero. Called on mount and after
  // any manual interaction (arrow click, swipe, scroll) so the timer resets.
  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) advance("right")
    }, AUTOPLAY_MS)
  }, [advance])

  useEffect(() => {
    startAutoplay()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (scrollEndRef.current) clearTimeout(scrollEndRef.current)
    }
  }, [startAutoplay])

  // Manual arrow: move + reset the countdown to zero.
  const handleArrow = (dir: "left" | "right") => {
    advance(dir)
    startAutoplay()
  }

  // While the user is actively scrolling/swiping, pause autoplay. Once they
  // stop, reset the countdown to zero and resume.
  const handleScroll = () => {
    pausedRef.current = true
    if (scrollEndRef.current) clearTimeout(scrollEndRef.current)
    scrollEndRef.current = setTimeout(() => {
      pausedRef.current = false
      startAutoplay()
    }, 200)
  }

  return (
    <section id="products" className="relative bg-background py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Trending Styles
          </span>
          <h2 className="mt-4 text-balance font-heading text-4xl font-bold leading-[1] tracking-tight text-foreground md:text-5xl">
            The scenes everyone&apos;s flipping.
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Opium, Y2K, racing, vintage sportswear and more — vetted supplier
            links, instant vault access, lifetime updates.
          </p>
        </motion.div>

        {/* Auto-advancing horizontal carousel. Cards are sized so the next one
            always peeks in on mobile — it never feels like a single bundle
            floating in empty space. */}
        <div
          className="relative mt-10 md:mt-14"
          onMouseEnter={() => {
            pausedRef.current = true
          }}
          onMouseLeave={() => {
            pausedRef.current = false
            startAutoplay()
          }}
        >
          {/* Left arrow */}
          <button
            type="button"
            onClick={() => handleArrow("left")}
            aria-label="Previous bundles"
            data-testid="carousel-prev"
            className="absolute left-0 top-1/2 z-20 hidden size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/70 text-foreground shadow-xl shadow-black/30 backdrop-blur-md transition-all duration-300 hover:border-accent/60 hover:bg-background/90 hover:text-accent md:flex"
          >
            <ArrowLeft className="size-5" />
          </button>
          {/* Right arrow */}
          <button
            type="button"
            onClick={() => handleArrow("right")}
            aria-label="Next bundles"
            data-testid="carousel-next"
            className="absolute right-0 top-1/2 z-20 hidden size-12 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-border bg-background/70 text-foreground shadow-xl shadow-black/30 backdrop-blur-md transition-all duration-300 hover:border-accent/60 hover:bg-background/90 hover:text-accent md:flex"
          >
            <ArrowRight className="size-5" />
          </button>

          <div
            ref={scrollerRef}
            onScroll={handleScroll}
            onPointerDown={() => {
              pausedRef.current = true
            }}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {FEATURED_PRODUCTS.map((product) => (
              <div
                key={product.id}
                data-card
                className="w-[76vw] max-w-[320px] shrink-0 snap-start sm:w-[340px] sm:max-w-none"
              >
                <ProductCard product={product} animated={false} compact />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/drops"
            className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:text-accent"
          >
            View All Drops
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
