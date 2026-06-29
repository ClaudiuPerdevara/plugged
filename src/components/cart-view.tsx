"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  BadgePercent,
  CheckCircle2,
  Loader2,
  Lock,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react"
import { useCart } from "./cart-provider"
import { useCheckout } from "@/lib/use-checkout"

type AppliedVoucher = {
  code: string
  discountPercent: number
}

export function CartView() {
  const { items, total, count, removeItem, clear } = useCart()
  const { checkout, pending } = useCheckout()

  const [voucherInput, setVoucherInput] = useState("")
  const [voucherPending, setVoucherPending] = useState(false)
  const [voucherError, setVoucherError] = useState<string | null>(null)
  const [applied, setApplied] = useState<AppliedVoucher | null>(null)

  const discountUsd = applied ? (total * applied.discountPercent) / 100 : 0
  const payableUsd = Math.max(0, total - discountUsd)
  const isFreeUnlock = applied?.discountPercent === 100

  async function applyVoucher() {
    const code = voucherInput.trim()
    if (!code) return
    setVoucherPending(true)
    setVoucherError(null)
    try {
      const res = await fetch(
        `/api/voucher/validate?code=${encodeURIComponent(code)}`,
      )
      const data = (await res.json()) as {
        ok: boolean
        message?: string
        voucher?: { code: string; discountPercent: number } | null
      }
      if (!res.ok || !data.ok || !data.voucher) {
        setVoucherError(data.message ?? "We don't recognise that code.")
        setApplied(null)
        return
      }
      setApplied(data.voucher)
      setVoucherInput("")
    } catch {
      setVoucherError("Could not check that code. Try again.")
    } finally {
      setVoucherPending(false)
    }
  }

  function clearVoucher() {
    setApplied(null)
    setVoucherError(null)
  }

  function handleCheckout() {
    void checkout(undefined, { voucherCode: applied?.code ?? null })
  }

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
                    data-testid={`cart-remove-${item.id}`}
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

                {applied && (
                  <div
                    className="flex items-center justify-between"
                    data-testid="cart-voucher-applied-row"
                  >
                    <dt className="flex items-center gap-1.5 text-accent">
                      <BadgePercent className="size-3.5" />
                      Voucher · {applied.code}
                    </dt>
                    <dd className="font-mono text-accent">
                      −${discountUsd.toFixed(discountUsd % 1 === 0 ? 0 : 2)}
                    </dd>
                  </div>
                )}

                <div className="my-2 h-px bg-border" />
                <div className="flex items-center justify-between">
                  <dt className="font-heading text-base font-bold text-foreground">
                    Total
                  </dt>
                  <dd className="font-heading text-2xl font-bold text-foreground">
                    ${payableUsd % 1 === 0
                      ? payableUsd
                      : payableUsd.toFixed(2)}
                  </dd>
                </div>
              </dl>

              {/* Voucher input */}
              <div className="mt-6 border-t border-border pt-5">
                {applied ? (
                  <div
                    className="flex items-start justify-between gap-3 rounded-xl border border-accent/30 bg-accent/10 px-3 py-2.5"
                    data-testid="cart-voucher-applied"
                  >
                    <div className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-accent" />
                      <div>
                        <p className="font-semibold text-foreground">
                          {applied.code} applied
                        </p>
                        <p className="mt-0.5 text-muted-foreground">
                          {isFreeUnlock
                            ? "100% off — no payment needed."
                            : `${applied.discountPercent}% off at checkout.`}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={clearVoucher}
                      aria-label="Remove voucher"
                      data-testid="cart-voucher-remove"
                      className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-background/50 hover:text-foreground"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <label
                      htmlFor="voucher-code"
                      className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground"
                    >
                      Voucher code
                    </label>
                    <div className="mt-2 flex gap-2">
                      <input
                        id="voucher-code"
                        name="voucherCode"
                        type="text"
                        value={voucherInput}
                        onChange={(e) =>
                          setVoucherInput(e.target.value.toUpperCase())
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            void applyVoucher()
                          }
                        }}
                        placeholder="WELCOME"
                        autoComplete="off"
                        spellCheck={false}
                        data-testid="cart-voucher-input"
                        className="w-full rounded-xl border border-border bg-background/60 px-3 py-2.5 font-mono text-sm uppercase tracking-wider text-foreground placeholder:font-sans placeholder:normal-case placeholder:tracking-normal placeholder:text-muted-foreground outline-none transition-colors duration-300 focus:border-accent/60 focus-visible:ring-2 focus-visible:ring-ring/40"
                      />
                      <button
                        type="button"
                        onClick={() => void applyVoucher()}
                        disabled={voucherPending || !voucherInput.trim()}
                        data-testid="cart-voucher-apply"
                        className="rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/60 hover:text-accent disabled:opacity-50"
                      >
                        {voucherPending ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          "Apply"
                        )}
                      </button>
                    </div>
                    {voucherError && (
                      <p
                        className="mt-2 text-xs text-destructive"
                        data-testid="cart-voucher-error"
                      >
                        {voucherError}
                      </p>
                    )}
                  </>
                )}
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                disabled={pending}
                data-testid="cart-checkout-button"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-4 text-base font-semibold text-accent-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-70 disabled:hover:scale-100"
              >
                {pending ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Processing…
                  </>
                ) : isFreeUnlock ? (
                  <>
                    <ShieldCheck className="size-4" />
                    Unlock for Free
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
