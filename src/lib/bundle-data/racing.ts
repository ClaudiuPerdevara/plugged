import type { Supplier } from "@/lib/products"

/**
 * Racing & Motorsports (NASCAR, Ferrari, F1) — Mini Bundle.
 * A small, high-hype, limited-time drop. Data collected 30 Jun 2026
 * (from date_produse_racing.md). Single jackets resell €100–€300 on Depop/Vinted.
 */

export type RacingPackage = {
  id: number
  name: string
  supplier: string
  sellType: string
  grade: string
  shipping: string
  link: string
}

export const RACING_PACKAGES: RacingPackage[] = [
  { id: 1, name: "Complete Racing Jackets Collection", supplier: "Fleek", sellType: "Bale / Package", grade: "Mix", shipping: "Included in price · 20–27 days", link: "https://www.joinfleek.com/collections/racing-jackets" },
  { id: 2, name: "NASCAR Racing Jackets", supplier: "Fleek", sellType: "Package", grade: "Grade A/B", shipping: "Included in price · 20–27 days", link: "https://www.joinfleek.com/products/nascar-racing-jackets" },
  { id: 3, name: "NASCAR Racing Rework Vintage", supplier: "SP Vintage", sellType: "Package", grade: "Rework Premium", shipping: "Ships from ES · no EU customs", link: "https://spvintagewholesale.com/en/products/products-nascar-racing-rework-vintage" },
  { id: 4, name: "5x Ferrari NASCAR Rework Jackets", supplier: "SP Vintage", sellType: "Package (5 pcs)", grade: "Rework Premium", shipping: "Ships from ES · no EU customs", link: "https://spvintagewholesale.com/en/products/5x-ferrari-nascar-racing-rework-jackets" },
  { id: 5, name: "5x Marlboro NASCAR Jackets", supplier: "SP Vintage", sellType: "Package (5 pcs)", grade: "Rework Premium", shipping: "Ships from ES · no EU customs", link: "https://spvintagewholesale.com/en/products/5x-marlboro-nascar-racing-jackets" },
  { id: 6, name: "NASCAR Jackets", supplier: "Best Vintage", sellType: "Package", grade: "Grade A/B", shipping: "Ships from NL · no EU customs", link: "https://bestvintagewholesale.com/products/nascarjackets" },
  { id: 7, name: "Racing T-Shirts", supplier: "Best Vintage", sellType: "Package", grade: "Mix Vintage", shipping: "Ships from NL · no EU customs", link: "https://bestvintagewholesale.com/products/racingtshirts" },
  { id: 8, name: "NASCAR, Racing & Harley Sweats", supplier: "Thrift Vintage", sellType: "Bale / Package", grade: "Mix Vintage", shipping: "Ships from USA · free over $200 (EU customs apply)", link: "https://thriftvintagefashion.com/products/w1-nascar-racing-harley-sweatshirts" },
]

export const RACING_TIPS: string[] = [
  "“Rework” jackets (SP Vintage): the Ferrari & Marlboro lots are reworked — vintage jackets with huge embroidered patches added front & back. The most visually striking pieces and they blow up on TikTok.",
  "Value perception: NASCAR / racing jackets grab attention instantly. Shoot your Vinted/Depop photos on a model, in an urban setting — buyers pay double when the jacket looks cool worn.",
  "US shipping (Thrift Vintage): great for sweats & hoodies, but remember to factor the heavy EU customs duties when the parcel lands in Europe.",
]

export type SupplierContact = {
  supplier: string
  platform: string
  contact: string
}

export const RACING_CONTACTS: SupplierContact[] = [
  { supplier: "JoinFleek (Fleek)", platform: "International marketplace", contact: "Direct chat with sellers via the Fleek messaging system" },
  { supplier: "SP Vintage Wholesale", platform: "Own website (Spain)", contact: "spvintagewholesale.com/en/pages/contact" },
  { supplier: "Best Vintage Wholesale", platform: "Own website (Netherlands)", contact: "bestvintagewholesale.com/pages/contact" },
  { supplier: "Thrift Vintage Fashion", platform: "Own website (USA)", contact: "thriftvintagefashion.com/pages/contact-us" },
]

export const RACING_SUPPLIERS: Supplier[] = RACING_PACKAGES.map((pkg) => ({
  name: pkg.supplier,
  category: pkg.name,
  link: pkg.link,
  moq: pkg.sellType,
  quality: /Premium|A/.test(pkg.grade) ? 5 : 4,
  platform: pkg.supplier.includes("Fleek") ? "Fleek" : "Direct",
  searchKeyword: pkg.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  route: "vintage" as const,
}))
