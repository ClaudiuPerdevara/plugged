"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
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

export function BundleDetails({ product }: { product: Product }) {
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
            Supplier Bundle
          </span>
          <h1 className="mt-3 text-balance font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-5xl">
            {product.name}
          </h1>

          <div className="mt-5 flex items-center gap-4">
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-3xl font-bold text-foreground">
                ${product.price}
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

          {/* CTAs — Add to Cart + Buy Now */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => addItem(product)}
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
                  Buy Now — ${product.price}
                </>
              )}
            </button>
          </div>

          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="size-4 text-accent" />
            One-time payment · Instant access · Lifetime updates
          </p>
        </motion.div>
      </div>
    </section>
  )
}
