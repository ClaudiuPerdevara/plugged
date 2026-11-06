import type { Supplier } from "@/lib/products"

/**
 * Designer Accessories Bundle — Bags, Wallets & Hats.
 * Data collected Nov 2026 — verified live Fleek product IDs + EU B2B supplier.
 *
 * ⚠️ Fleek customs note: Fleek vendors ship from Pakistan (non-EU).
 * Romanian customs duty may apply on arrival: ~12% import duty + 19% VAT on declared value.
 * Factor ~20–25% extra cost on top of Fleek purchase price.
 *
 * TicDistribution (ID 9): EU-registered → NO customs for Romania. MOQ €400.
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
  category: "Bags" | "Belts" | "Hats & Caps" | "Sunglasses" | "Wallets" | "Mixed Accessories"
  brands?: string
  phone?: string
  whatsapp?: string
  email?: string
  notes?: string
}

export const DESIGNER_PACKAGES: DesignerPackage[] = [
  // ── BAGS — Coach ──────────────────────────────────────────────────────────
  {
    id: 1,
    name: "Coach Branded Bags",
    supplier: "Fleek (vendor: vintage bags vault)",
    sellType: "Package (10 pcs)",
    grade: "Grade ABC",
    shipping: "Ships from PK via Fleek · EU customs may apply · 20–27 working days",
    link: "https://www.joinfleek.com/products/9551081636078",
    pricePerPc: "~€45/pc · lot total ~€452",
    category: "Bags",
    brands: "Coach",
    email: "support@joinfleek.com",
    notes: "Vendor: vintage bags vault — 4.5/5 stars, 20 verified reviews, 10 repeat buyers",
  },
  {
    id: 2,
    name: "Coach Women Handbags and Tote Bags",
    supplier: "Fleek (vendor: vintage bags vault)",
    sellType: "Package (12 pcs)",
    grade: "Grade ABC",
    shipping: "Ships from PK via Fleek · EU customs may apply · 20–27 working days",
    link: "https://www.joinfleek.com/products/9618896519406",
    pricePerPc: "~€36/pc · lot total ~€430",
    category: "Bags",
    brands: "Coach",
    email: "support@joinfleek.com",
  },
  {
    id: 3,
    name: "Coach Small Handbags and Tote Handbags",
    supplier: "Fleek (vendor: vintage bags vault)",
    sellType: "Package (12 pcs)",
    grade: "Grade ABC",
    shipping: "Ships from PK via Fleek · EU customs may apply · 20–27 working days",
    link: "https://www.joinfleek.com/products/9612183568622",
    pricePerPc: "~€61/pc · lot total ~€736",
    category: "Bags",
    brands: "Coach",
    email: "support@joinfleek.com",
    notes: "Higher-end lot — small structured bags & totes",
  },
  {
    id: 4,
    name: "Coach Handbags",
    supplier: "Fleek (vendor: vintage bags vault)",
    sellType: "Package (11 pcs)",
    grade: "Grade ABC",
    shipping: "Ships from PK via Fleek · EU customs may apply · 20–27 working days",
    link: "https://www.joinfleek.com/products/9618911690990",
    pricePerPc: "~€42/pc · lot total ~€459",
    category: "Bags",
    brands: "Coach",
    email: "support@joinfleek.com",
  },
  // ── BAGS — GUESS ──────────────────────────────────────────────────────────
  {
    id: 5,
    name: "GUESS Small Handbags",
    supplier: "Fleek (vendor: vintage bags vault)",
    sellType: "Package (11 pcs)",
    grade: "Grade ABC",
    shipping: "Ships from PK via Fleek · EU customs may apply · 20–27 working days",
    link: "https://www.joinfleek.com/products/9612028707054",
    pricePerPc: "~€57/pc · lot total ~€624 (13% discount)",
    category: "Bags",
    brands: "Guess",
    email: "support@joinfleek.com",
  },
  // ── BAGS — Longchamp ──────────────────────────────────────────────────────
  {
    id: 6,
    name: "Longchamp Branded Bags",
    supplier: "Fleek (vendor: vintage bags vault)",
    sellType: "Package (16 pcs)",
    grade: "Grade ABC",
    shipping: "Ships from PK via Fleek · EU customs may apply · 20–27 working days",
    link: "https://www.joinfleek.com/products/9612349636846",
    pricePerPc: "~€30/pc · lot total ~€473 (12% discount)",
    category: "Bags",
    brands: "Longchamp",
    email: "support@joinfleek.com",
  },
  // ── BAGS — Dooney & Bourke ────────────────────────────────────────────────
  {
    id: 7,
    name: "Dooney & Bourke Handbags and Totes",
    supplier: "Fleek (vendor: vintage bags vault)",
    sellType: "Package (13 pcs)",
    grade: "Grade A/B",
    shipping: "Ships from PK via Fleek · EU customs may apply · 20–27 working days",
    link: "https://www.joinfleek.com/products/9608781168878",
    pricePerPc: "~€41/pc · lot total ~€530 (12% discount)",
    category: "Bags",
    brands: "Dooney & Bourke",
    email: "support@joinfleek.com",
    notes: "Grade AB — better quality than other lots",
  },
  {
    id: 8,
    name: "Dooney & Bourke Leather Small Handbags",
    supplier: "Fleek (vendor: vintage bags vault)",
    sellType: "Package (12 pcs)",
    grade: "Grade ABC",
    shipping: "Ships from PK via Fleek · EU customs may apply · 20–27 working days",
    link: "https://www.joinfleek.com/products/9608782676206",
    pricePerPc: "~€41/pc · lot total ~€490 (12% discount)",
    category: "Bags",
    brands: "Dooney & Bourke",
    email: "support@joinfleek.com",
  },
  // ── BAGS — EU B2B, Michael Kors ───────────────────────────────────────────
  {
    id: 9,
    name: "Michael Kors Handbags Wholesale (EU B2B)",
    supplier: "TicDistribution",
    sellType: "MOQ €400 · B2B account required",
    grade: "New with original packaging, tags & warranty booklets",
    shipping: "Ships from EU · NO customs for Romania · EU freight forwarding available",
    link: "https://www.ticdistribution.com/michael-kors-handbags-wholesale/",
    pricePerPc: "Login required — 10% off from €500 · 20% off from €1,000 · 25% off from €3,700",
    category: "Bags",
    brands: "Michael Kors",
    email: "ticdistribution.com/contact/",
    notes: "EU-registered = zero customs for Romania. New with original packaging. Only EU B2B source found for MK.",
  },
  // ── WALLETS ───────────────────────────────────────────────────────────────
  {
    id: 10,
    name: "Coach Card Holder",
    supplier: "Fleek (vendor: Liquid)",
    sellType: "Package (20 pcs)",
    grade: "Grade NWOT (Never Worn Original Tags)",
    shipping: "Ships from PK via Fleek · EU customs may apply · 20–27 working days",
    link: "https://www.joinfleek.com/products/9593560858862",
    pricePerPc: "~€12/pc · lot total ~€237",
    category: "Wallets",
    brands: "Coach",
    email: "support@joinfleek.com",
    notes: "Best margin per piece — small, light, easy to ship on Vinted",
  },
  {
    id: 11,
    name: "Coach Tabby Wallet",
    supplier: "Fleek (vendor: vintage bags vault)",
    sellType: "Package (10 pcs)",
    grade: "Grade NWT (New With Tags)",
    shipping: "Ships from PK via Fleek · EU customs may apply · 20–27 working days",
    link: "https://www.joinfleek.com/products/9593741607150",
    pricePerPc: "~€47/pc · lot total ~€465",
    category: "Wallets",
    brands: "Coach",
    email: "support@joinfleek.com",
  },
  {
    id: 12,
    name: "Coach Mila Wallet",
    supplier: "Fleek (vendor: vintage bags vault)",
    sellType: "Package (10 pcs)",
    grade: "Grade NWT (New With Tags)",
    shipping: "Ships from PK via Fleek · EU customs may apply · 20–27 working days",
    link: "https://www.joinfleek.com/products/9593737543918",
    pricePerPc: "~€44/pc · lot total ~€440",
    category: "Wallets",
    brands: "Coach",
    email: "support@joinfleek.com",
  },
  // ── HATS & CAPS ───────────────────────────────────────────────────────────
  {
    id: 13,
    name: "Nike Polo Ralph Lauren Branded Hats Mix",
    supplier: "Fleek (vendor: SK FABRICS)",
    sellType: "Package (16 pcs)",
    grade: "Grade ABC",
    shipping: "Ships from PK via Fleek · EU customs may apply · 20–27 working days",
    link: "https://www.joinfleek.com/products/9604648337646",
    pricePerPc: "~€9/pc · lot total ~€146",
    category: "Hats & Caps",
    brands: "Nike, Polo Ralph Lauren, Burberry, Barbour, Adidas, Champion",
    email: "support@joinfleek.com",
    notes: "Best entry-level lot — good brand variety for testing the market",
  },
  {
    id: 14,
    name: "Adidas Knit Beanie Hats",
    supplier: "Fleek",
    sellType: "Package (17 pcs)",
    grade: "Grade ABC",
    shipping: "Ships from PK via Fleek · EU customs may apply · 20–27 working days",
    link: "https://www.joinfleek.com/products/9610758619374",
    pricePerPc: "~€9/pc · lot total ~€148",
    category: "Hats & Caps",
    brands: "Adidas",
    email: "support@joinfleek.com",
  },
  {
    id: 15,
    name: "Mixed Branded Beanies & Hats",
    supplier: "Fleek",
    sellType: "Package (20 pcs)",
    grade: "Grade ABC",
    shipping: "Ships from PK via Fleek · EU customs may apply · 20–27 working days",
    link: "https://www.joinfleek.com/products/9603766681838",
    pricePerPc: "~€6/pc · lot total ~€125 (33% discount)",
    category: "Mixed Accessories",
    brands: "Nike, Adidas, Ralph Lauren, Tommy Hilfiger, Champion",
    email: "support@joinfleek.com",
    notes: "Best value mixed hat lot — cheapest way to test multiple brands at once",
  },
  {
    id: 16,
    name: "Upcycled Ralph Lauren Hats",
    supplier: "Fleek",
    sellType: "Package (10 pcs)",
    grade: "Grade ABC",
    shipping: "Ships from PK via Fleek · EU customs may apply · 20–27 working days",
    link: "https://www.joinfleek.com/products/9615323660526",
    pricePerPc: "~€8/pc · lot total ~€79 (8% discount)",
    category: "Hats & Caps",
    brands: "Ralph Lauren",
    email: "support@joinfleek.com",
  },
]

export const DESIGNER_TIPS: string[] = [
  "⚠️ Fleek customs: vendors ship from Pakistan. For Romania: ~12% import duty + 19% VAT on declared value. Factor ~20–25% on top of purchase price. TicDistribution (EU) has zero customs — best for Michael Kors bags.",
  "Coach wallets NWT/NWOT lots are the best margin in this bundle — buy at €12–€47/pc, resell €30–€80 on Vinted. Small, light, cheap to ship, easy to photograph.",
  "Bags: vendor 'vintage bags vault' on Fleek has 4.5/5 stars with 20 verified reviews and 10 repeat buyers — the most reliable seller in this category.",
  "Avoid listing any bag as 'designer' or 'luxury' on Vinted unless you can confirm authenticity. Use 'vintage Coach bag' — Vinted's trust team flags suspicious listings.",
  "Hats resell best in autumn/winter. Nike & Adidas caps: €10–€20 on Vinted. Ralph Lauren caps: €20–€35. Buy at €6–€9/pc from Fleek lots — fastest flip in the accessories category.",
]

export type DesignerContact = {
  supplier: string
  platform: string
  contact: string
  email?: string
}

export const DESIGNER_CONTACTS: DesignerContact[] = [
  {
    supplier: "Fleek (JoinFleek)",
    platform: "EU marketplace (vendors from PK)",
    contact: "Direct purchase at joinfleek.com — buyer protection included",
    email: "support@joinfleek.com",
  },
  {
    supplier: "TicDistribution",
    platform: "EU B2B wholesale (Michael Kors)",
    contact: "ticdistribution.com — register for B2B account",
    email: "Via contact form: ticdistribution.com/contact/",
  },
]

export const DESIGNER_SUPPLIERS: Supplier[] = DESIGNER_PACKAGES.map((pkg) => ({
  name: pkg.supplier,
  category: pkg.name,
  link: pkg.link,
  moq: pkg.sellType,
  quality: /NWT|NWOT|New with/.test(pkg.grade) ? 5 : /Grade A\/B/.test(pkg.grade) ? 4 : 3,
  platform: pkg.supplier.includes("Fleek") ? "Fleek" : "Direct",
  searchKeyword: pkg.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  route: "vintage" as const,
}))
