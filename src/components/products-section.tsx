"use client"

import { useRef } from "react"
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
      className="relative flex w-[168px] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-dashed border-accent/40 bg-card/30 sm:w-[220px]"
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
  if (products.length === 0 && !extra) return null

  const scroll = (dir: number) => {
    const el = ref.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" })
  }

  return (
    <div data-testid={`bundle-row-${label.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="mb-3 flex items-center justify-between gap-4">
        <h3 className="font-heading text-lg font-bold tracking-tight text-foreground md:text-xl">
          {label}
        </h3>
        <div className="hidden gap-2 md:flex">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label={`Scroll ${label} left`}
            className="grid size-8 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label={`Scroll ${label} right`}
            className="grid size-8 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
      <div
        ref={ref}
        className="flex snap-x gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p) => (
          <CompactCard key={p.id} product={p} />
        ))}
        {extra}
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
