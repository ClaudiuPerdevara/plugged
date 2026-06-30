"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  AlertTriangle,
  Check,
  Loader2,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Star,
} from "lucide-react"
import type { Product } from "@/lib/products"
import { useCart } from "./cart-provider"
import { useCheckout } from "@/lib/use-checkout"

export function BundleDetails({
  product,
  owned = false,
}: {
  product: Product
  owned?: boolean
}) {
  const [active, setActive] = useState(0)
  const { addItem, has } = useCart()
  const { checkout, pending } = useCheckout()
  const inCart = has(product.id)
  const gallery =
    product.gallery.length > 0 ? product.gallery : [product.image]

  function handleBuyNow() {
    void checkout([{ id: product.id }])
  }

  return (
    <section className="mx-auto max-w-7xl px-5 pb-28 pt-28 md:px-8 md:pt-36">
      {/* Breadcrumb / back */}
      <Link
        href="/drops"
        className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
        All Drops
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        {/* Left — visuals */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Main image */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-card/60">
            <img
              src={gallery[active] || "/placeholder.svg"}
              alt={`${product.name} showcase`}
              className="h-full w-full object-cover"
            />
            <span className="absolute left-4 top-4 rounded-full border border-border bg-background/70 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground backdrop-blur-md">
              {product.tag}
            </span>
          </div>

          {/* Thumbnail strip */}
          <div className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-3">
            {gallery.map((src, i) => (
              <button
                key={src + i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                aria-current={i === active}
                className={`relative aspect-square overflow-hidden rounded-2xl border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  i === active
                    ? "border-accent"
                    : "border-border hover:border-accent/50"
                }`}
              >
                <img
                  src={src || "/placeholder.svg"}
                  alt={`${product.name} thumbnail ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Right — details */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            {product.miniBundle ? "Limited Mini Bundle" : "Supplier Bundle"}
          </span>
          {product.limited ? (
            <span
              className="ml-3 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 align-middle font-mono text-[10px] uppercase tracking-[0.2em] text-accent"
              data-testid="bundle-limited-tag"
            >
              ⏳ Limited time
            </span>
          ) : null}
          <h1 className="mt-3 text-balance font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-5xl">
            {product.name}
          </h1>

          <div className="mt-5 flex items-center gap-4">
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-3xl font-bold text-foreground">
                €{product.price}
              </span>
              <span className="text-sm text-muted-foreground">/ lifetime</span>
            </div>
            <span className="flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-foreground">
              <Star className="size-3.5 fill-accent text-accent" />
              {product.suppliers.length} vetted plugs
            </span>
          </div>

          <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
            {product.aesthetic}
          </p>

          {product.id === "opium" ? (
            <div
              className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/5 px-4 py-3.5"
              data-testid="opium-reps-warning"
            >
              <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-400" />
              <p className="text-xs leading-relaxed text-amber-100/90">
                <span className="font-bold text-amber-300">
                  Heads up: these are Chinese REPS (replicas), not authentic
                  originals.
                </span>{" "}
                Every source is an individual Chinese seller/factory on Taobao,
                Weidian or 1688, ordered through a shopping agent. You get a
                2,400+ source archive — if a link is dead, image-search the
                model photo to find a live equivalent. No brand is affiliated.
              </p>
            </div>
          ) : null}

          {/* What's included */}
          <div className="mt-8">
            <h2 className="font-heading text-sm font-bold uppercase tracking-[0.15em] text-foreground">
              What&apos;s Included
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {product.included.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85"
                >
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                    <Check className="size-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CTAs — coming soon → no purchase; owned → vault link; else buy */}
          {product.comingSoon ? (
            <div
              className="mt-9 flex items-center gap-3 rounded-2xl border border-amber-400/40 bg-amber-400/10 p-5"
              data-testid="bundle-coming-soon-panel"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-amber-400/20 text-amber-300">
                <Loader2 className="size-5" />
              </span>
              <div>
                <p className="font-heading text-sm font-bold text-foreground">
                  Coming Soon
                </p>
                <p className="text-xs text-muted-foreground">
                  This bundle is still being curated — check back shortly.
                </p>
              </div>
            </div>
          ) : owned ? (
            <div
              className="mt-9 flex flex-col gap-3 rounded-2xl border border-accent/40 bg-accent/10 p-5 sm:flex-row sm:items-center sm:justify-between"
              data-testid="bundle-owned-panel"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent/20 text-accent">
                  <Check className="size-5" />
                </span>
                <div>
                  <p className="font-heading text-sm font-bold text-foreground">
                    You own this bundle
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Lifetime access — open it in your vault.
                  </p>
                </div>
              </div>
              <Link
                href="/dashboard"
                data-testid="bundle-view-vault"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all duration-300 hover:scale-[1.02] hover:bg-accent hover:text-accent-foreground"
              >
                View in Vault
                <ShieldCheck className="size-4" />
              </Link>
            </div>
          ) : (
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => addItem(product)}
                data-testid="bundle-add-to-cart"
                className="group flex flex-1 items-center justify-center gap-2.5 rounded-2xl border border-border bg-background/60 px-6 py-4 text-base font-semibold text-foreground transition-all duration-300 hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {inCart ? (
                  <>
                    <Check className="size-5 text-accent" />
                    In Basket
                  </>
                ) : (
                  <>
                    <Plus className="size-5" />
                    Add to Cart
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={pending}
                data-testid="bundle-buy-now"
                className="group flex flex-1 items-center justify-center gap-2.5 rounded-2xl bg-accent px-6 py-4 text-base font-semibold text-accent-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-70 disabled:hover:scale-100"
              >
                {pending ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Processing…
                  </>
                ) : (
                  <>
                    <ShoppingBag className="size-5" />
                    Buy Now — €{product.price}
                  </>
                )}
              </button>
            </div>
          )}

          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="size-4 text-accent" />
            One-time payment · Instant access · Lifetime updates
          </p>
        </motion.div>
      </div>
    </section>
  )
}
