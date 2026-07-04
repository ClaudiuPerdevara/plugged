"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Check, Plus } from "lucide-react"
import Link from "next/link"
import type { Product } from "@/lib/products"
import { useCart } from "./cart-provider"

export type { Product }

export function ProductCard({
  product,
  ctaLabel = "View Bundle",
  animated = true,
  variant = "default",
  compact = false,
}: {
  product: Product
  ctaLabel?: string
  animated?: boolean
  /** Compact tile for category picker on /drops */
  variant?: "default" | "tile"
  /** Smaller title + shorter copy for the homepage carousel */
  compact?: boolean
}) {
  const href = `/bundle/${product.id}`
  const { addItem, has } = useCart()
  const inCart = has(product.id)

  // Direct entrance animation (not variant-inheritance) so cards reliably
  // become visible on mount across SSR/hydration, without depending on a
  // parent container's variant propagation.
  const motionProps = animated
    ? {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
      }
    : {}

  if (variant === "tile") {
    return (
      <motion.article
        {...motionProps}
        data-testid={`product-card-${product.id}`}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -4 }}
        className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-border bg-card shadow-none transition-all duration-300 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10"
      >
        <Link
          href={href}
          className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
          aria-label={`Browse ${product.tag} bundle`}
        />
        <img
          src={product.image}
          alt={product.tag}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        {product.comingSoon ? (
          <span className="absolute right-3 top-3 z-[1] rounded-full border border-amber-400/30 bg-amber-400/15 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-amber-300 backdrop-blur-md">
            Soon
          </span>
        ) : product.limited || product.miniBundle ? (
          <span className="absolute right-3 top-3 z-[1] rounded-full border border-red-500/50 bg-red-500/20 px-2.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-red-400 backdrop-blur-md">
            Mini
          </span>
        ) : null}
        <div className="absolute inset-x-0 bottom-0 z-[1] p-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
            €{product.price} · lifetime
          </span>
          <h3 className="mt-1 font-heading text-lg font-bold leading-tight tracking-tight text-foreground">
            {product.tag}
          </h3>
        </div>
      </motion.article>
    )
  }

  return (
    <motion.article
      {...motionProps}
      data-testid={`product-card-${product.id}`}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/40 shadow-none backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/15"
    >
      <Link
        href={href}
        className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        aria-label={`View ${product.name}`}
      />

      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-background/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground backdrop-blur-md">
          {product.tag}
        </span>
        {product.comingSoon ? (
          <span className="absolute right-4 top-4 rounded-full border border-amber-400/30 bg-amber-400/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300 backdrop-blur-md">
            Coming Soon
          </span>
        ) : product.limited || product.miniBundle ? (
          <span className="absolute right-4 top-4 rounded-full border border-red-500/50 bg-red-500/20 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-red-400 backdrop-blur-md">
            Mini
          </span>
        ) : null}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3
            className={`font-heading font-bold tracking-tight text-foreground ${
              compact ? "text-lg" : "text-xl md:text-2xl"
            }`}
          >
            {product.name}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 pt-4">
        <p
          className={`leading-relaxed text-muted-foreground ${
            compact ? "text-xs line-clamp-1" : "text-sm line-clamp-2"
          }`}
        >
          {product.description}
        </p>

        {compact ? null : (
          <ul className="flex flex-col gap-1.5">
            {product.perks.slice(0, 2).map((perk) => (
              <li
                key={perk}
                className="flex items-center gap-2 text-xs text-foreground/80"
              >
                <Check className="size-3.5 shrink-0 text-accent" />
                {perk}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
          {product.comingSoon ? (
            <>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Dropping soon
              </span>
              <span className="relative z-20 flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-4 py-2.5 text-sm font-semibold text-muted-foreground">
                Coming Soon
              </span>
            </>
          ) : (
            <>
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-2xl font-bold text-foreground">
                  €{product.price}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  / lifetime
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => addItem(product)}
                  aria-label={
                    inCart
                      ? `${product.name} in cart`
                      : `Add ${product.name} to cart`
                  }
                  className={`relative z-20 grid size-10 place-items-center rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    inCart
                      ? "border-accent/60 bg-accent/15 text-accent"
                      : "border-border bg-background/60 text-foreground hover:border-accent/60 hover:text-accent"
                  }`}
                >
                  {inCart ? (
                    <Check className="size-4" />
                  ) : (
                    <Plus className="size-4" />
                  )}
                </button>
                <Link
                  href={href}
                  className="relative z-20 flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
                >
                  {ctaLabel}
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.article>
  )
}
