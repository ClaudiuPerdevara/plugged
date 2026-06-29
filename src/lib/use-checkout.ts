"use client"

import { useState } from "react"
import { toast } from "sonner"
import { useCart } from "@/components/cart-provider"

/**
 * Client hook that hands the basket (and optional voucher) to the Stripe
 * checkout API route. On success the backend returns a hosted checkout URL
 * — or, for a 100%-off voucher, a direct redirect to /success after the
 * bundles were granted server-side.
 */
export function useCheckout() {
  const { items } = useCart()
  const [pending, setPending] = useState(false)

  async function checkout(
    override?: { id: string }[],
    opts?: { voucherCode?: string | null },
  ) {
    const ids = (override ?? items).map((i) => i.id)
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
        }),
      })
      const data = (await res.json()) as {
        url?: string
        error?: string
        mode?: string
      }
      if (res.status === 401) {
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
