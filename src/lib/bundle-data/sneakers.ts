import type { Supplier } from "@/lib/products"

/**
 * Sneakers & Footwear Bundle.
 * Data collected Nov 2026 from Fleek (joinfleek.com) and supplementary wholesale sources.
 * Per-piece prices converted from USD at ~€0.92/$.
 */

export type SneakersPackage = {
  id: number
  name: string
  supplier: string
  sellType: string
  grade: string
  shipping: string
  link: string
  pricePerPiece?: string
  brands?: string
}

export const SNEAKERS_PACKAGES: SneakersPackage[] = [
  {
    id: 1,
    name: "Nike Sneakers Mix",
    supplier: "Fleek",
    sellType: "Package (5 pcs)",
    grade: "Mix ABC",
    shipping: "Included · 20–27 days (EU customs may apply)",
    link: "https://www.joinfleek.com/products/9577806921966",
    pricePerPiece: "~€28/pc",
    brands: "Nike",
  },
  {
    id: 2,
    name: "Nike Original Shoes — Grade A/B",
    supplier: "Fleek",
    sellType: "Package (10 pcs)",
    grade: "Grade A/B",
    shipping: "Included · 20–27 days (EU customs may apply)",
    link: "https://www.joinfleek.com/products/9577503949038",
    pricePerPiece: "~€23/pc",
    brands: "Nike",
  },
  {
    id: 3,
    name: "Nike Air Max Sneakers — Grade A/B",
    supplier: "Fleek",
    sellType: "Package (10 pcs)",
    grade: "Grade A/B",
    shipping: "Included · 20–27 days (EU customs may apply)",
    link: "https://www.joinfleek.com/products/9553611981038",
    pricePerPiece: "~€32/pc",
    brands: "Nike Air Max",
  },
  {
    id: 4,
    name: "Nike Trainers Mix",
    supplier: "Fleek",
    sellType: "Package (5 pcs)",
    grade: "Mix A/B",
    shipping: "Included · 20–27 days (EU customs may apply)",
    link: "https://www.joinfleek.com/products/9577814163694",
    pricePerPiece: "~€25/pc",
    brands: "Nike",
  },
  {
    id: 5,
    name: "Old School Adidas Shoes Collection",
    supplier: "Fleek",
    sellType: "Package (6 pcs)",
    grade: "Grade BC",
    shipping: "Included · 20–27 days (EU customs may apply)",
    link: "https://www.joinfleek.com/products/9555697205486",
    pricePerPiece: "~€37/pc",
    brands: "Adidas",
  },
  {
    id: 6,
    name: "Nike + Adidas + Puma + Reebok Multi-Brand",
    supplier: "Fleek",
    sellType: "Package (12 pcs)",
    grade: "Grade A/B",
    shipping: "Included · 20–27 days (EU customs may apply)",
    link: "https://www.joinfleek.com/products/9565497229550",
    pricePerPiece: "~€29/pc",
    brands: "Nike, Adidas, Puma, Reebok, Under Armour, HOKA, ASICS",
  },
  {
    id: 7,
    name: "Premium Branded Sneakers — Nike / Puma / Lacoste",
    supplier: "Fleek",
    sellType: "Package (9 pcs)",
    grade: "Grade BC",
    shipping: "Included · 20–27 days (EU customs may apply)",
    link: "https://www.joinfleek.com/products/9544656290030",
    pricePerPiece: "~€25/pc",
    brands: "Nike, Puma, Lacoste",
  },
  {
    id: 8,
    name: "Nike New Balance ASICS Mixed Lot",
    supplier: "Fleek",
    sellType: "Package",
    grade: "Grade A/B",
    shipping: "Included · 20–27 days (EU customs may apply)",
    link: "https://www.joinfleek.com/products/9565444276462",
    pricePerPiece: "~€32/pc",
    brands: "Nike, New Balance, ASICS",
  },
  {
    id: 9,
    name: "ASICS Gel & Onitsukas Bundle (5 pcs)",
    supplier: "Fleek",
    sellType: "Package (5 pcs)",
    grade: "Grade A/B",
    shipping: "Included · 20–27 days (EU customs may apply)",
    link: "https://www.joinfleek.com/products/9551558050030",
    pricePerPiece: "~€32/pc",
    brands: "ASICS, Onitsuka Tiger",
  },
  {
    id: 10,
    name: "Salomon Sneakers",
    supplier: "Fleek",
    sellType: "Package",
    grade: "Mix A/B",
    shipping: "Included · 20–27 days (EU customs may apply)",
    link: "https://www.joinfleek.com/products/9560731943150",
    pricePerPiece: "~€28/pc",
    brands: "Salomon",
  },
  {
    id: 11,
    name: "Sneaker Bales — Mixed Branded",
    supplier: "Best Vintage Wholesale",
    sellType: "Bale / Package",
    grade: "Grade A/B",
    shipping: "Ships from NL · no EU customs",
    link: "https://bestvintagewholesale.com/collections/all",
    brands: "Mixed branded (Nike, Adidas, Puma etc.)",
  },
  {
    id: 12,
    name: "Mixed Vintage Sneakers Bale",
    supplier: "Thrift Vintage Fashion",
    sellType: "Bale",
    grade: "Mix Vintage",
    shipping: "Ships from USA · EU customs apply",
    link: "https://thriftvintagefashion.com/collections/shoes",
    brands: "Mixed branded vintage",
  },
]

export const SNEAKERS_TIPS: string[] = [
  "Best Vinted categories for sneakers: 'Chaussures de sport' (men) and 'Baskets' (women). Titles like 'Nike Air Max vintage' or 'Adidas Samba 90s' outperform generic terms — buyers search models, not 'sneakers'.",
  "Fleek Grade ABC lots: expect ~30% Grade A (nearly new), 40% Grade B (light wear) and 30% Grade C (visible wear). Price Grade C pairs as 'project' or 'display-only' — still sells on Vinted.",
  "ASICS, Salomon, Hoka and On Running resell exceptionally well right now — these trail/running brands command €40–€80 on Vinted for worn pairs. Prioritize these over plain Nike/Adidas when you see them in multi-brand lots.",
  "Shipping from Fleek includes customs for EU buyers at checkout — you are NOT hit with extra duties when the parcel arrives. This is a key advantage over US-based suppliers like Thrift Vintage.",
  "Photograph sneakers on a plain background (white or black) with a size tag visible in one shot. Buyers need the size immediately — a listing without it is ignored.",
]

export type SneakersContact = {
  supplier: string
  platform: string
  contact: string
}

export const SNEAKERS_CONTACTS: SneakersContact[] = [
  {
    supplier: "Fleek (JoinFleek)",
    platform: "EU marketplace",
    contact: "Direct purchase at joinfleek.com/collections/sneakers — no prior contact needed",
  },
  {
    supplier: "Best Vintage Wholesale",
    platform: "Own website (Netherlands)",
    contact: "bestvintagewholesale.com/pages/contact",
  },
  {
    supplier: "Thrift Vintage Fashion",
    platform: "Own website (USA)",
    contact: "thriftvintagefashion.com/pages/contact-us",
  },
]

export const SNEAKERS_SUPPLIERS: Supplier[] = SNEAKERS_PACKAGES.map((pkg) => ({
  name: pkg.supplier,
  category: pkg.name,
  link: pkg.link,
  moq: pkg.sellType,
  quality: /Grade A\/B|A\/B/.test(pkg.grade) ? 5 : /Grade BC|ABC/.test(pkg.grade) ? 3 : 4,
  platform: pkg.supplier === "Fleek" ? "Fleek" : "Direct",
  searchKeyword: pkg.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  route: "vintage" as const,
}))
