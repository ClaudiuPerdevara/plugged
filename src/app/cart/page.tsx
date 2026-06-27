import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CartView } from "@/components/cart-view"

export const metadata = {
  title: "Your Basket",
  description: "Review your supplier bundles and check out securely.",
}

export default function CartPage() {
  return (
    <main className="relative flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <CartView />
      <SiteFooter />
    </main>
  )
}
