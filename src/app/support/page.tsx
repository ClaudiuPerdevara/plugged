import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SupportForm } from "@/components/support-form"
import { getSession } from "@/lib/session"

export const metadata = {
  title: "Support — PLUGGED",
  description:
    "Contact the PLUGGED team for help with bundles, access or your account.",
}

export const dynamic = "force-dynamic"

export default async function SupportPage() {
  const session = await getSession()

  return (
    <main className="relative flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <SupportForm
        defaultName={session?.user.name ?? ""}
        defaultEmail={session?.user.email ?? ""}
      />
      <SiteFooter />
    </main>
  )
}
