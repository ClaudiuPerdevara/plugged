import { SiteHeader } from "@/components/site-header"
import { HeroSlider } from "@/components/hero-slider"
import { ProductsSection } from "@/components/products-section"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"
import { FaqPreview } from "@/components/faq-preview"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="relative flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <HeroSlider />
      <HowItWorks />
      <ProductsSection />
      <Testimonials />
      <FaqPreview />
      <SiteFooter />
    </main>
  )
}
