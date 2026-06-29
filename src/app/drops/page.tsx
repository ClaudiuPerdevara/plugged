import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DropsCatalog } from "@/components/drops-catalog"

export const metadata = {
  title: "All Drops — PLUGGED",
  description:
    "Browse 14 vetted supplier bundles — Opium, Y2K, UK drip, Carhartt workwear, sneakers, vintage sportswear and more.",
}

export default function DropsPage() {
  return (
    <main className="relative flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <DropsCatalog />
      <SiteFooter />
    </main>
  )
}
