"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { ProductCard } from "./product-card"
import { FEATURED_PRODUCTS } from "@/lib/products"

export function ProductsSection() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 8)
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
  }, [])

  useEffect(() => {
    updateArrows()
    const el = scrollerRef.current
    if (!el) return
    el.addEventListener("scroll", updateArrows, { passive: true })
    window.addEventListener("resize", updateArrows)
    return () => {
      el.removeEventListener("scroll", updateArrows)
      window.removeEventListener("resize", updateArrows)
    }
  }, [updateArrows])

  const scrollBy = (dir: "left" | "right") => {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>("[data-card]")
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" })
  }

  return (
    <section id="products" className="relative bg-background py-24 md:py-32">
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

        {/* Horizontal carousel with side arrows overlaying the cards */}
        <div className="relative mt-14">
          {/* Left arrow */}
          <button
            type="button"
            onClick={() => scrollBy("left")}
            disabled={!canLeft}
            aria-label="Previous bundles"
            data-testid="carousel-prev"
            className={`absolute left-0 top-1/2 z-20 hidden size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/70 text-foreground shadow-xl shadow-black/30 backdrop-blur-md transition-all duration-300 hover:border-accent/60 hover:bg-background/90 hover:text-accent md:flex ${
              canLeft ? "opacity-100" : "pointer-events-none scale-90 opacity-0"
            }`}
          >
            <ArrowLeft className="size-5" />
          </button>
          {/* Right arrow */}
          <button
            type="button"
            onClick={() => scrollBy("right")}
            disabled={!canRight}
            aria-label="Next bundles"
            data-testid="carousel-next"
            className={`absolute right-0 top-1/2 z-20 hidden size-12 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-border bg-background/70 text-foreground shadow-xl shadow-black/30 backdrop-blur-md transition-all duration-300 hover:border-accent/60 hover:bg-background/90 hover:text-accent md:flex ${
              canRight ? "opacity-100" : "pointer-events-none scale-90 opacity-0"
            }`}
          >
            <ArrowRight className="size-5" />
          </button>

          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {FEATURED_PRODUCTS.map((product) => (
              <div
                key={product.id}
                data-card
                className="w-[300px] shrink-0 snap-start sm:w-[340px]"
              >
                <ProductCard product={product} animated={false} />
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
