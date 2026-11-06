import type { Supplier } from "@/lib/products"

/**
 * Designer Accessories Bundle — Bags, Belts & Hats.
 * Vintage original branded accessories wholesale — Coach, Levi's, Timberland,
 * Carhartt upcycled bags, Y2K belts. 100% authentic, no replicas.
 * Resell on Vinted/Depop for €15–€80 per piece.
 * Data collected Nov 2026.
 */

export type DesignerPackage = {
  id: number
  name: string
  supplier: string
  sellType: string
  grade: string
  shipping: string
  link: string
  pricePerPc?: string
  category: "bags" | "belts" | "hats" | "accessories"
}

export const DESIGNER_PACKAGES: DesignerPackage[] = [
  // ── BAGS ──────────────────────────────────────────────────────────────────
  {
    id: 1,
    name: "Coach Card Holders — Branded",
    supplier: "Fleek",
    sellType: "Package (~20 pcs)",
    grade: "Grade A",
    shipping: "Included in price · 20–27 days",
    link: "https://www.joinfleek.com/products/9593560858862",
    pricePerPc: "$12.89/pc",
    category: "bags",
  },
  {
    id: 2,
    name: "Coach Branded Bags",
    supplier: "Fleek",
    sellType: "Package (~10 pcs)",
    grade: "Grade A",
    shipping: "Included in price · 20–27 days",
    link: "https://www.joinfleek.com/products/9551081636078",
    pricePerPc: "$49.19/pc",
    category: "bags",
  },
  {
    id: 3,
    name: "Upcycled Y2K Jeans Tote Bags",
    supplier: "Fleek",
    sellType: "Package (~10 pcs)",
    grade: "Rework / Upcycled",
    shipping: "Included in price · 20–27 days",
    link: "https://www.joinfleek.com/products/8743785758958",
    pricePerPc: "$14.06/pc",
    category: "bags",
  },
  {
    id: 4,
    name: "Upcycled Carhartt Corduroy Bags — 15 Pcs",
    supplier: "Fleek",
    sellType: "Package (15 pcs)",
    grade: "Rework / Upcycled",
    shipping: "Included in price · 20–27 days",
    link: "https://www.joinfleek.com/products/8692679442670",
    pricePerPc: "$12.67/pc",
    category: "bags",
  },
  // ── BELTS ─────────────────────────────────────────────────────────────────
  {
    id: 5,
    name: "Levi's Studded & Cutout Leather Belts",
    supplier: "Fleek",
    sellType: "Package (~8 pcs)",
    grade: "Grade A/B",
    shipping: "Included in price · 20–27 days",
    link: "https://www.joinfleek.com/products/9604286644462",
    pricePerPc: "$16.71/pc",
    category: "belts",
  },
  {
    id: 6,
    name: "Timberland Leather & Western Belts",
    supplier: "Fleek",
    sellType: "Package (~10 pcs)",
    grade: "Grade A/B",
    shipping: "Included in price · 20–27 days",
    link: "https://www.joinfleek.com/products/9601121321198",
    pricePerPc: "$14.97/pc",
    category: "belts",
  },
  {
    id: 7,
    name: "Y2K Aesthetic Belts",
    supplier: "Fleek",
    sellType: "Package (~20 pcs)",
    grade: "Grade A/B",
    shipping: "Included in price · 20–27 days",
    link: "https://www.joinfleek.com/products/9613359349998",
    pricePerPc: "$11.68/pc",
    category: "belts",
  },
  {
    id: 8,
    name: "Western & Studded Leather Belts",
    supplier: "Fleek",
    sellType: "Package (~14 pcs)",
    grade: "Mix Vintage",
    shipping: "Included in price · 20–27 days",
    link: "https://www.joinfleek.com/products/9621408186606",
    pricePerPc: "$5.07/pc",
    category: "belts",
  },
  {
    id: 9,
    name: "Assorted Leather Straps & Belts",
    supplier: "Fleek",
    sellType: "Package (~5 pcs)",
    grade: "Grade A",
    shipping: "Included in price · 20–27 days",
    link: "https://www.joinfleek.com/products/9625256526062",
    pricePerPc: "$29.73/pc",
    category: "belts",
  },
  // ── HATS / CAPS ───────────────────────────────────────────────────────────
  {
    id: 10,
    name: "Vintage Hats & Caps Mix",
    supplier: "Fleek",
    sellType: "Bale / Package",
    grade: "Mix A/B",
    shipping: "Included in price · 20–27 days",
    link: "https://www.joinfleek.com/collections/hats",
    category: "hats",
  },
  {
    id: 11,
    name: "Vintage Accessories Mix (Belts, Scarves, Jewelry)",
    supplier: "Best Vintage Wholesale",
    sellType: "Package (10–50 pcs)",
    grade: "Grade A/B",
    shipping: "Ships from NL · no EU customs",
    link: "https://bestvintagewholesale.com/collections/accessories",
    category: "accessories",
  },
  {
    id: 12,
    name: "Designer Bags & Accessories Wholesale",
    supplier: "Thrift Vintage Fashion",
    sellType: "Bale / Package",
    grade: "Mix Vintage",
    shipping: "Ships from USA · free over $200 (EU customs apply)",
    link: "https://thriftvintagefashion.com/collections/accessories",
    category: "accessories",
  },
]

export const DESIGNER_TIPS: string[] = [
  "Coach card holders ($12.89/pc on Fleek) are the highest-ROI accessory on Vinted right now — they flip for €25–50 each. Buy in bulk, photograph on a marble surface.",
  "Y2K belts sell best when styled: post a flat lay with a pair of low-rise jeans. The chunky chain/studded styles hit €20–35 on Depop and barely need any copy.",
  "Upcycled Carhartt bags are a conversation starter — the reworked workwear aesthetic is booming. The $12.67/pc cost on Fleek vs €35–60 resale makes this one of the most profitable SKUs in the bundle.",
  "Best Vintage Wholesale (NL) ships within 24hrs with zero EU customs friction — perfect for Romanian resellers who want fast inventory top-ups.",
]

export type SupplierContact = {
  supplier: string
  platform: string
  contact: string
}

export const DESIGNER_CONTACTS: SupplierContact[] = [
  { supplier: "JoinFleek (Fleek)", platform: "International marketplace", contact: "Direct chat with sellers via the Fleek messaging system" },
  { supplier: "Best Vintage Wholesale", platform: "Own website (Netherlands)", contact: "bestvintagewholesale.com/pages/contact" },
  { supplier: "Thrift Vintage Fashion", platform: "Own website (USA)", contact: "thriftvintagefashion.com/pages/contact-us" },
]

export const DESIGNER_SUPPLIERS: Supplier[] = DESIGNER_PACKAGES.map((pkg) => ({
  name: pkg.supplier,
  category: pkg.name,
  link: pkg.link,
  moq: pkg.sellType,
  quality: /Grade A[^/]|Rework/.test(pkg.grade) ? 5 : 4,
  platform: pkg.supplier.includes("Fleek") ? "Fleek" : "Direct",
  searchKeyword: pkg.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  route: "vintage" as const,
}))
