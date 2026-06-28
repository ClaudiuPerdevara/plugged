/**
 * Demo checkout grants bundles instantly (no Stripe).
 * Active when STRIPE_SECRET_KEY is unset, or when DEMO_CHECKOUT=true.
 */
export function isDemoCheckout(): boolean {
  if (process.env.DEMO_CHECKOUT === "true") return true
  return !process.env.STRIPE_SECRET_KEY
}
