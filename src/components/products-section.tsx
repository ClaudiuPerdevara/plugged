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
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Trending Styles
            </span>
            <h2 className="mt-4 text-balance font-heading text-4xl font-bold leading-[1] tracking-tight text-foreground md:text-5xl">
              The scenes everyone&apos;s flipping.
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Opium, Y2K, UK drip, sneakers and more — vetted supplier links,
              instant vault access, $20 lifetime.
            </p>
          </div>

          {/* Carousel arrows */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollBy("left")}
              disabled={!canLeft}
              aria-label="Previous bundles"
              className="flex size-12 items-center justify-center rounded-full border border-border bg-card/60 text-foreground backdrop-blur-sm transition-all duration-300 hover:border-accent/60 hover:text-accent disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy("right")}
              disabled={!canRight}
              aria-label="Next bundles"
              className="flex size-12 items-center justify-center rounded-full border border-border bg-card/60 text-foreground backdrop-blur-sm transition-all duration-300 hover:border-accent/60 hover:text-accent disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </motion.div>

        {/* Horizontal carousel */}
        <div className="relative mt-14">
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
          {/* edge fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent" />
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
