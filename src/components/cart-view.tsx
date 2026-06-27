"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Loader2,
  Lock,
  ShieldCheck,
  ShoppingBag,
  Trash2,
} from "lucide-react"
import { useCart } from "./cart-provider"
import { useCheckout } from "@/lib/use-checkout"

export function CartView() {
  const { items, total, count, removeItem, clear } = useCart()
  const { checkout, pending } = useCheckout()

  return (
    <section className="mx-auto max-w-5xl px-5 pb-28 pt-28 md:px-8 md:pt-36">
      <Link
        href="/drops"
        className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
        All Drops
      </Link>

      <div className="mt-8 max-w-2xl">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Checkout
        </span>
        <h1 className="mt-3 text-balance font-heading text-4xl font-bold leading-[1] tracking-tight text-foreground md:text-5xl">
          Your Basket
        </h1>
      </div>

      {count === 0 ? (
        <EmptyCart />
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Line items */}
          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            {items.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-sm sm:flex-row sm:items-center"
              >
                <Link
                  href={`/bundle/${item.id}`}
                  className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl sm:size-24"
                >
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                    {item.tag}
                  </span>
                  <Link
                    href={`/bundle/${item.id}`}
                    className="block font-heading text-lg font-bold tracking-tight text-foreground transition-colors hover:text-accent"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    Lifetime access · instant delivery
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <span className="font-heading text-xl font-bold text-foreground">
                    ${item.price}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Trash2 className="size-3.5" />
                    Remove
                  </button>
                </div>
              </li>
            ))}

            <button
              type="button"
              onClick={clear}
              className="self-start text-xs font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Clear basket
            </button>
          </motion.ul>

          {/* Summary */}
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm">
              <h2 className="font-heading text-lg font-bold tracking-tight text-foreground">
                Order Summary
              </h2>
              <dl className="mt-5 flex flex-col gap-3 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">
                    Bundles ({count})
                  </dt>
                  <dd className="text-foreground">${total}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Processing</dt>
                  <dd className="text-accent">Free</dd>
                </div>
                <div className="my-2 h-px bg-border" />
                <div className="flex items-center justify-between">
                  <dt className="font-heading text-base font-bold text-foreground">
                    Total
                  </dt>
                  <dd className="font-heading text-2xl font-bold text-foreground">
                    ${total}
                  </dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={checkout}
                disabled={pending}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-4 text-base font-semibold text-accent-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-70 disabled:hover:scale-100"
              >
                {pending ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Processing…
                  </>
                ) : (
                  <>
                    <Lock className="size-4" />
                    Secure Checkout
                  </>
                )}
              </button>

              <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="size-4 text-accent" />
                One-time payment · Instant access
              </p>
            </div>
          </motion.aside>
        </div>
      )}
    </section>
  )
}

function EmptyCart() {
  return (
    <div className="mt-12 flex flex-col items-center gap-5 rounded-3xl border border-border bg-card/60 p-12 text-center backdrop-blur-sm md:p-20">
      <div className="grid size-20 place-items-center rounded-3xl border border-border bg-background/40">
        <ShoppingBag className="size-8 text-muted-foreground" />
      </div>
      <div>
        <p className="font-heading text-2xl font-bold text-foreground">
          Your basket is empty
        </p>
        <p className="mt-2 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
          You haven&apos;t added any plugs yet. Head back to the vault and stack
          your first supplier bundle.
        </p>
      </div>
      <Link
        href="/drops"
        className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all duration-300 hover:scale-[1.03] hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Browse All Drops
      </Link>
    </div>
  )
}
