import type { MetadataRoute } from "next"
import { PRODUCTS } from "@/lib/products"

const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://getplugged.store"
).replace(/\/$/, "")

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes = [
    "",
    "/drops",
    "/faq",
    "/terms",
    "/privacy",
    "/support",
    "/login",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }))

  // Only index live (non coming-soon) bundle pages.
  const bundleRoutes = PRODUCTS.filter((p) => !p.comingSoon).map((p) => ({
    url: `${BASE_URL}/bundle/${p.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...bundleRoutes]
}
