import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata = {
  title: "Privacy Policy",
  description: "How PLUGGED collects, uses and protects your data.",
}

const SECTIONS = [
  {
    title: "1. Overview",
    body: "This Privacy Policy explains what information PLUGGED collects, how we use it, and the choices you have. By using the platform you consent to the practices described here.",
  },
  {
    title: "2. Information We Collect",
    body: "We collect the email and account details you provide at sign-up, purchase records for the bundles you buy, and basic technical data (such as device and usage analytics) needed to operate and secure the platform.",
  },
  {
    title: "3. How We Use Your Data",
    body: "We use your data to deliver bundle access, process payments, provide support, send important account and update notifications, and improve the platform. We do not sell your personal information.",
  },
  {
    title: "4. Payments",
    body: "Payments are processed by our payment provider (Stripe). We never store your full card details on our servers — card data is handled directly by the payment processor under their own security standards.",
  },
  {
    title: "5. Third-Party Sign-In",
    body: "If you sign in with Google, we receive basic profile information from Google to create and manage your account. We do not post to your social accounts or access data beyond what is needed for authentication.",
  },
  {
    title: "6. Data Security",
    body: "Your account data and supplier vault are encrypted in transit and at rest. We apply industry-standard safeguards, but no method of transmission or storage is ever completely secure.",
  },
  {
    title: "7. Your Rights",
    body: "You may request access to, correction of, or deletion of your personal data at any time by contacting us. We will respond in line with applicable data-protection laws.",
  },
  {
    title: "8. Contact",
    body: "Questions about this policy or your data? Reach us any time at plugged.support@gmail.com.",
  },
]

export default function PrivacyPage() {
  return (
    <main className="relative flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <section className="mx-auto max-w-3xl px-5 pb-28 pt-28 md:px-8 md:pt-36">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Legal
          </span>
          <h1 className="mt-4 text-balance font-heading text-4xl font-bold leading-[1] tracking-tight text-foreground md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
            Last updated{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            . Your plugs stay yours — here&apos;s how we handle your data.
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
