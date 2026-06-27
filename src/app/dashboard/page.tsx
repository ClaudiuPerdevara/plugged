import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Dashboard } from "@/components/dashboard"
import { fetchUserBundles, fetchAccountInfo } from "@/lib/data"
import { redirect } from "next/navigation"

export const metadata = {
  title: "The Vault — PLUGGED",
  description: "Your dashboard: purchased bundles, supplier plugs and account security.",
}

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const [owned, account] = await Promise.all([
    fetchUserBundles(),
    fetchAccountInfo(),
  ])

  if (!account) redirect("/login?next=/dashboard/")

  return (
    <main className="relative flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <Dashboard owned={owned} account={account} />
      <SiteFooter />
    </main>
  )
}
