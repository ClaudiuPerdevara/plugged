import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FaqAccordion } from "@/components/faq-accordion"

export const metadata = {
  title: "FAQ — PLUGGED",
  description:
    "Answers about supplier bundles, access, reselling and refunds at PLUGGED.",
}

export default function FaqPage() {
  return (
    <main className="relative flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <FaqAccordion />
      <SiteFooter />
    </main>
  )
}
