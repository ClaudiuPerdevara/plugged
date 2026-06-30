import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BundleDetails } from "@/components/bundle-details"
import { PRODUCTS, getProduct } from "@/lib/products"
import { getSession } from "@/lib/session"
import { getOwnedBundleIds } from "@/lib/purchases"

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = getProduct(id)
  if (!product) return { title: "Bundle Not Found — PLUGGED" }
  return {
    title: `${product.name} — PLUGGED`,
    description: product.description,
  }
}

export default async function BundlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = getProduct(id)
  if (!product) notFound()

  const session = await getSession()
  const owned = session
    ? (await getOwnedBundleIds(session.user.id)).includes(product.id)
    : false

  return (
    <main className="relative flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <BundleDetails product={product} owned={owned} />
      <SiteFooter />
    </main>
  )
}
