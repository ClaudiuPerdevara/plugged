import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SourcingGuide } from "@/components/sourcing-guide"

export const metadata = {
  title: "Sourcing Guide — PLUGGED",
  description:
    "Learn Route A (China agents & 1:1 sourcing) vs Route B (vintage wholesale bales) for fashion reselling.",
}

export default function SourcingGuidePage() {
  return (
    <main className="relative flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <SourcingGuide />
      <SiteFooter />
    </main>
  )
}
