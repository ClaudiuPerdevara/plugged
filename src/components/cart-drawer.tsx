"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { Loader2, Lock, ShoppingBag, Trash2, X } from "lucide-react"
import { useCart } from "./cart-provider"
import { useCheckout } from "@/lib/use-checkout"

export function CartDrawer() {
  const { items, total, count, isOpen, closeCart, removeItem } = useCart()
  const { checkout, pending } = useCheckout()

  // Lock body scroll + close on Escape while open.
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart()
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [isOpen, closeCart])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60]"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close cart"
            onClick={closeCart}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.aside
            role="dialog"
            aria-label="Shopping cart"
            aria-modal="true"
            variants={{
              hidden: { x: "100%" },
              visible: { x: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-border bg-card/95 shadow-2xl shadow-black/60 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-5 md:px-6">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="size-5 text-accent" />
                <h2 className="font-heading text-lg font-bold tracking-tight text-foreground">
                  Your Basket
                </h2>
                <span className="rounded-full bg-secondary px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                  {count}
                </span>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="grid size-9 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Body */}
            {items.length === 0 ? (
              <EmptyCart onBrowse={closeCart} />
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-5 md:px-6">
                  <ul className="flex flex-col gap-4">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center gap-4 rounded-2xl border border-border bg-background/40 p-3"
                      >
                        <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                            {item.tag}
                          </span>
                          <p className="truncate font-medium text-foreground">
                            {item.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ${item.price} / lifetime
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="grid size-9 shrink-0 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer */}
                <div className="border-t border-border px-5 py-5 md:px-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Total
                    </span>
                    <span className="font-heading text-2xl font-bold text-foreground">
                      ${total}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={checkout}
                    disabled={pending}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-4 text-base font-semibold text-accent-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-70 disabled:hover:scale-100"
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
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="mt-3 block text-center text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    View full cart
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function EmptyCart({ onBrowse }: { onBrowse: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
      <div className="grid size-20 place-items-center rounded-3xl border border-border bg-background/40">
        <ShoppingBag className="size-8 text-muted-foreground" />
      </div>
      <div>
        <p className="font-heading text-xl font-bold text-foreground">
          Your basket is empty
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          No plugs yet. Browse the vault and stack your first bundle.
        </p>
      </div>
      <Link
        href="/drops"
        onClick={onBrowse}
        className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all duration-300 hover:scale-[1.03] hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Browse All Drops
      </Link>
    </div>
  )
}
