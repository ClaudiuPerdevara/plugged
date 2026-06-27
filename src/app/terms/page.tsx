import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata = {
  title: "Terms & Conditions — PLUGGED",
  description: "The terms and conditions for using PLUGGED supplier bundles.",
}

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using PLUGGED, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you may not use the platform or purchase any bundle.",
  },
  {
    title: "2. What You're Buying",
    body: "Each bundle grants a single user lifetime access to a curated list of vetted third-party suppliers, including links, minimum order quantities, pricing references and quality ratings. PLUGGED is an information and curation service — we are not a manufacturer, supplier or reseller of any physical goods.",
  },
  {
    title: "3. Account & Access",
    body: "You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Bundle access is licensed to you personally and may not be shared, resold, redistributed or published in whole or in part.",
  },
  {
    title: "4. Payments & Refunds",
    body: "All bundles are one-time purchases. Because bundles are digital and grant immediate access to private supplier data, all sales are final and non-refundable. If you experience an issue with your access, contact Support and we will work to resolve it.",
  },
  {
    title: "5. Third-Party Suppliers",
    body: "PLUGGED vets suppliers for stock, communication and product quality at the time of listing, but we do not control third parties. We are not liable for the actions, pricing, shipping, product quality or availability of any supplier. Any transaction you make with a supplier is solely between you and that supplier.",
  },
  {
    title: "6. Acceptable Use",
    body: "You agree not to use the platform for any unlawful purpose, to scrape or duplicate our supplier data, or to misrepresent your affiliation with PLUGGED. We reserve the right to suspend or terminate accounts that violate these terms.",
  },
  {
    title: "7. Changes to These Terms",
    body: "We may update these Terms & Conditions from time to time. Continued use of the platform after changes are posted constitutes acceptance of the revised terms.",
  },
  {
    title: "8. Contact",
    body: "Questions about these terms? Reach us any time at plugged.support@gmail.com.",
  },
]

export default function TermsPage() {
  return (
    <main className="relative flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <section className="mx-auto max-w-3xl px-5 pb-28 pt-28 md:px-8 md:pt-36">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Legal
          </span>
          <h1 className="mt-4 text-balance font-heading text-4xl font-bold leading-[1] tracking-tight text-foreground md:text-5xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
            Last updated{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            . Please read these terms carefully before using PLUGGED.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-10">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="font-heading text-lg font-bold tracking-tight text-foreground">
                {s.title}
              </h2>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
