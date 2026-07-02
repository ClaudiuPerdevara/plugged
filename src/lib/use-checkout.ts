"use client"

import { useState } from "react"
import { toast } from "sonner"
import { useCart } from "@/components/cart-provider"

/**
 * Client hook that hands the basket (and optional voucher / guest email) to the
 * Stripe checkout API route. On success the backend returns a hosted checkout
 * URL — or, for a 100%-off voucher, a direct redirect to /success after the
 * bundles were granted server-side.
 *
 * Guest checkout: pass `opts.email` when the buyer isn't signed in. The backend
 * finds-or-creates their account and attaches the purchase to it.
 */
export function useCheckout() {
  const { items } = useCart()
  const [pending, setPending] = useState(false)

  async function checkout(
    override?: { id: string }[],
    opts?: { voucherCode?: string | null; email?: string | null },
  ) {
    // Guard: only honour `override` when it's a real array of items. This
    // prevents a crash if a click handler accidentally passes the DOM event
    // (e.g. onClick={checkout}) instead of calling checkout() with no args.
    const source = Array.isArray(override) ? override : items
    const ids = source.map((i) => i.id)
    if (ids.length === 0) {
      toast.error("Your cart is empty")
      return
    }
    setPending(true)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          items: ids,
          ...(opts?.voucherCode ? { voucherCode: opts.voucherCode } : {}),
          ...(opts?.email ? { email: opts.email } : {}),
        }),
      })
      const data = (await res.json()) as {
        url?: string
        error?: string
        mode?: string
      }
      // Only bounce to /login if we had no guest email to fall back on.
      if (res.status === 401 && !opts?.email) {
        window.location.href = `/login?next=${encodeURIComponent("/cart")}`
        return
      }
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Checkout failed")
      }
      toast.success(
        data.mode === "voucher"
          ? "Voucher applied — unlocking your bundles…"
          : "Redirecting to secure checkout…",
      )
      window.location.href = data.url
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Checkout failed")
      setPending(false)
    }
  }

  return { checkout, pending }
}
