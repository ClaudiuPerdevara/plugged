"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Check, Plus } from "lucide-react"
import Link from "next/link"
import { PRODUCTS, getProduct, type Product } from "@/lib/products"
import { useCart } from "./cart-provider"

// The owner-curated "Most Popular" order.
const POPULAR_IDS = [
  "jeans",
  "vintage-windbreakers",
  "old-money",
  "carhartt",
  "y2k",
  "sportswear",
  "opium",
  "football-tshirts",
]

function CompactCard({ product }: { product: Product }) {
  const { addItem, has } = useCart()
  const inCart = has(product.id)
  const href = `/bundle/${product.id}`

  return (
    <article
      data-card
      data-testid={`bundle-card-${product.id}`}
      className="group relative w-[168px] shrink-0 snap-start overflow-hidden rounded-xl border border-border bg-card/40 transition-colors duration-300 hover:border-accent/50 sm:w-[220px]"
    >
      <Link href={href} className="absolute inset-0 z-10" aria-label={`View ${product.name}`} />
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
        <span className="absolute left-2.5 top-2.5 rounded-full border border-white/10 bg-background/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-foreground backdrop-blur-md">
          {product.tag}
        </span>
        {product.comingSoon ? (
          <span className="absolute right-2.5 top-2.5 rounded-full border border-amber-400/30 bg-amber-400/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-amber-300 backdrop-blur-md">
            Soon
          </span>
        ) : product.limited || product.miniBundle ? (
          <span className="absolute right-2.5 top-2.5 rounded-full border border-red-500/50 bg-red-500/20 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-red-400 backdrop-blur-md">
            Mini
          </span>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5 p-3">
        <h3 className="line-clamp-1 font-heading text-sm font-bold leading-tight tracking-tight text-foreground">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        <div className="mt-1 flex items-center justify-between gap-2">
          {product.comingSoon ? (
            <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
              Dropping soon
            </span>
          ) : (
            <>
              <span className="font-heading text-base font-bold text-foreground">
                €{product.price}
              </span>
              <button
                type="button"
                onClick={() => addItem(product)}
                aria-label={inCart ? `${product.name} in cart` : `Add ${product.name} to cart`}
                className={`relative z-20 grid size-8 place-items-center rounded-full border transition-colors duration-300 ${
                  inCart
                    ? "border-accent/60 bg-accent/15 text-accent"
                    : "border-border bg-background/60 text-foreground hover:border-accent/60 hover:text-accent"
                }`}
              >
                {inCart ? <Check className="size-3.5" /> : <Plus className="size-3.5" />}
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  )
}

function GuideTeaserCard() {
  return (
    <article
      data-testid="bundle-card-guide-teaser"
      className="relative flex w-[168px] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-border bg-card/40 sm:w-[220px]"
    >
      <div className="relative grid aspect-[4/3] place-items-center bg-secondary/30">
        <BookOpen className="size-8 text-accent/70" />
        <span className="absolute right-2.5 top-2.5 rounded-full border border-amber-400/30 bg-amber-400/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-amber-300">
          Soon
        </span>
      </div>
      <div className="flex flex-col gap-1.5 p-3">
        <h3 className="line-clamp-1 font-heading text-sm font-bold leading-tight tracking-tight text-foreground">
          Complete Resell Guide
        </h3>
        <p className="line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
          How Vinted works + a step-by-step reselling playbook. Dropping soon.
        </p>
        <span className="mt-1 font-heading text-base font-bold text-foreground">€5</span>
      </div>
    </article>
  )
}

function Row({
  label,
  products,
  extra,
}: {
  label: string
  products: Product[]
  extra?: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false })
  const wrapTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Only loop/duplicate when the row actually overflows (so short rows don't
  // show a duplicate copy on wide screens).
  const [looped, setLooped] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const check = () => {
      const single = looped ? el.scrollWidth / 2 : el.scrollWidth
      setLooped(single > el.clientWidth + 8)
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [looped])

  if (products.length === 0 && !extra) return null

  // Render the set twice (only when it overflows) so it loops seamlessly.
  const items: { key: string; node: React.ReactNode }[] = [
    ...products.map((p) => ({ key: p.id, node: <CompactCard product={p} /> })),
    ...(extra ? [{ key: "__extra", node: extra }] : []),
  ]
  const loopItems = looped ? [...items, ...items] : items

  const step = () => {
    const el = ref.current
    const first = el?.firstElementChild as HTMLElement | null
    return first ? first.offsetWidth + 12 : 200
  }
  const scroll = (dir: number) => {
    const el = ref.current
    if (!el) return
    const cw = el.scrollWidth / 2
    // pre-wrap so the left edge can loop too
    if (dir < 0 && cw > 0 && el.scrollLeft <= 0) el.scrollLeft += cw
    el.scrollBy({ left: dir * step(), behavior: "smooth" })
  }
  // Seamless loop, debounced so it never interrupts a smooth/momentum scroll.
  const onScroll = () => {
    if (!looped) return
    if (wrapTimer.current) clearTimeout(wrapTimer.current)
    wrapTimer.current = setTimeout(() => {
      const el = ref.current
      if (!el) return
      const cw = el.scrollWidth / 2
      if (cw <= 0) return
      if (el.scrollLeft >= cw) el.scrollLeft -= cw
      else if (el.scrollLeft <= 0) el.scrollLeft += cw
    }, 120)
  }

  const onDown = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    drag.current = {
      down: true,
      startX: e.pageX,
      startScroll: el.scrollLeft,
      moved: false,
    }
  }
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el || !drag.current.down) return
    const dx = e.pageX - drag.current.startX
    if (Math.abs(dx) > 4) drag.current.moved = true
    el.scrollLeft = drag.current.startScroll - dx
  }
  const endDrag = () => {
    drag.current.down = false
  }
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  const arrowBase =
    "absolute top-1/2 z-20 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/85 text-foreground shadow-lg backdrop-blur transition-colors hover:border-accent hover:text-accent md:size-9"

  return (
    <div data-testid={`bundle-row-${label.toLowerCase().replace(/\s+/g, "-")}`}>
      <h3 className="mb-3 font-heading text-lg font-bold tracking-tight text-foreground md:text-xl">
        {label}
      </h3>
      <div className="relative">
        {looped ? (
          <>
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label={`Scroll ${label} left`}
              className={`${arrowBase} left-1`}
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label={`Scroll ${label} right`}
              className={`${arrowBase} right-1`}
            >
              <ArrowRight className="size-4" />
            </button>
          </>
        ) : null}
        <div
          ref={ref}
          onScroll={onScroll}
          onMouseDown={onDown}
          onMouseMove={onMove}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onClickCapture={onClickCapture}
          className="flex snap-x select-none gap-3 overflow-x-auto px-1 pb-2 md:cursor-grab md:active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {loopItems.map((it, idx) => (
            <div key={`${idx < items.length ? "a" : "b"}-${it.key}`} className="shrink-0">
              {it.node}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProductsSection() {
  const popular = POPULAR_IDS.map((id) => getProduct(id)).filter(
    (p): p is Product => Boolean(p),
  )
  const comingSoon = PRODUCTS.filter((p) => p.comingSoon)
  const mini = PRODUCTS.filter((p) => p.miniBundle)

  return (
    <section id="products" className="relative bg-background py-14 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            The Vault
          </span>
          <h2 className="mt-3 text-balance font-heading text-3xl font-bold leading-[1] tracking-tight text-foreground md:mt-4 md:text-5xl">
            Browse every reseller bundle.
          </h2>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground md:mt-5 md:text-lg">
            Vetted supplier links, instant vault access and lifetime updates —
            one low price per bundle.
          </p>
        </motion.div>

        <div className="mt-10 flex flex-col gap-10 md:mt-12 md:gap-12">
          <Row label="Most Popular" products={popular} />
          <Row label="Coming Soon" products={comingSoon} />
          <Row label="Mini Bundles" products={mini} extra={<GuideTeaserCard />} />
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
