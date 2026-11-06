import type { Supplier } from "@/lib/products"

/**
 * Designer Accessories Bundle — Bags, Belts & Accessories.
 * Data collected Nov 2026.
 * Focus: vintage originals and surplus from real wholesale platforms (NOT replicas).
 * Fleek, Best Vintage, SP Vintage, Thrift Vintage — all verified EU-compatible sources.
 */

export type DesignerPackage = {
  id: number
  name: string
  supplier: string
  sellType: string
  grade: string
  shipping: string
  link: string
  category: "Bags" | "Belts" | "Mixed Accessories" | "Hats & Caps" | "Sunglasses" | "Wallets"
  brands?: string
}

export const DESIGNER_PACKAGES: DesignerPackage[] = [
  {
    id: 1,
    name: "Vintage Branded Bags Mix",
    supplier: "Fleek",
    sellType: "Package",
    grade: "Mix A/B",
    shipping: "Included · 20–27 days (EU customs may apply)",
    link: "https://www.joinfleek.com/collections/accessories",
    category: "Bags",
    brands: "Coach, Michael Kors, Guess, Calvin Klein",
  },
  {
    id: 2,
    name: "Vintage Leather Belts Lot",
    supplier: "Fleek",
    sellType: "Package",
    grade: "Grade A/B",
    shipping: "Included · 20–27 days (EU customs may apply)",
    link: "https://www.joinfleek.com/collections/accessories",
    category: "Belts",
    brands: "Tommy Hilfiger, Calvin Klein, Versace vintage",
  },
  {
    id: 3,
    name: "Vintage Bags & Accessories",
    supplier: "Best Vintage Wholesale",
    sellType: "Package / Bale",
    grade: "Grade A/B",
    shipping: "Ships from NL · no EU customs",
    link: "https://bestvintagewholesale.com/collections/all",
    category: "Bags",
    brands: "Mixed vintage branded",
  },
  {
    id: 4,
    name: "Rework Vintage Accessories",
    supplier: "SP Vintage",
    sellType: "Package",
    grade: "Rework Premium",
    shipping: "Ships from ES · no EU customs",
    link: "https://spvintagewholesale.com/en/collections/accessories",
    category: "Mixed Accessories",
    brands: "Vintage rework",
  },
  {
    id: 5,
    name: "Vintage Bags & Belts Bale",
    supplier: "Thrift Vintage Fashion",
    sellType: "Bale",
    grade: "Mix Vintage",
    shipping: "Ships from USA · EU customs apply",
    link: "https://thriftvintagefashion.com/collections/accessories",
    category: "Mixed Accessories",
    brands: "Mixed branded vintage",
  },
  {
    id: 6,
    name: "Vintage Branded Hats & Caps",
    supplier: "Fleek",
    sellType: "Package",
    grade: "Mix A/B",
    shipping: "Included · 20–27 days (EU customs may apply)",
    link: "https://www.joinfleek.com/collections/hats",
    category: "Hats & Caps",
    brands: "Nike, Adidas, Tommy Hilfiger, Ralph Lauren",
  },
  {
    id: 7,
    name: "Vintage Wallets & Small Leather Goods",
    supplier: "Fleek",
    sellType: "Package",
    grade: "Grade A/B",
    shipping: "Included · 20–27 days (EU customs may apply)",
    link: "https://www.joinfleek.com/collections/accessories",
    category: "Wallets",
    brands: "Mixed branded",
  },
  {
    id: 8,
    name: "Vintage Sunglasses Mix",
    supplier: "Fleek",
    sellType: "Package",
    grade: "Grade B",
    shipping: "Included · 20–27 days (EU customs may apply)",
    link: "https://www.joinfleek.com/collections/accessories",
    category: "Sunglasses",
    brands: "Ray-Ban, Oakley, Versace vintage",
  },
  {
    id: 9,
    name: "Branded Belts Wholesale Lot",
    supplier: "Best Vintage Wholesale",
    sellType: "Package",
    grade: "Grade A/B",
    shipping: "Ships from NL · no EU customs",
    link: "https://bestvintagewholesale.com/collections/all",
    category: "Belts",
    brands: "Tommy, Levi's, CK vintage",
  },
  {
    id: 10,
    name: "Vintage Bags & Clutches Lot",
    supplier: "Syed Vintage",
    sellType: "Bale / Per piece",
    grade: "Mix Vintage",
    shipping: "Ships from UK · EU customs apply post-Brexit",
    link: "https://syedvintage.com/collections/accessories",
    category: "Bags",
    brands: "Mixed vintage",
  },
]

export const DESIGNER_TIPS: string[] = [
  "Bags: Coach, Michael Kors and Guess vintage bags resell for €25–€60 on Vinted — the brand logo does most of the selling. Source by the lot and pick the best-condition ones to list first.",
  "Belts: Tommy Hilfiger and Calvin Klein logo belts (the ones with the full-plaque buckle) are extremely easy flips — €10–€20 wholesale, €30–€50 on Vinted. Fast turnover, tiny storage.",
  "Hats: 90s sports and brand caps resell well but photograph poorly — always shoot on a head form or model, in natural light. Nike and Adidas script caps go first.",
  "Avoid listing any bag as 'designer' or 'luxury' on Vinted unless you can confirm authenticity — Vinted's trust team flags suspicious listings. Use 'vintage branded' or 'vintage Coach bag' instead.",
  "EU customs note: Fleek and Best Vintage Wholesale ship from within the EU/Netherlands, so no surprise customs bills. Thrift Vintage (USA) and Syed (UK) will add customs costs — factor 20–25% on top of the item price.",
]

export type DesignerContact = {
  supplier: string
  platform: string
  contact: string
}

export const DESIGNER_CONTACTS: DesignerContact[] = [
  {
    supplier: "Fleek (JoinFleek)",
    platform: "EU marketplace",
    contact: "Direct purchase at joinfleek.com — no prior contact needed",
  },
  {
    supplier: "SP Vintage Wholesale",
    platform: "Own website (Spain)",
    contact: "spvintagewholesale.com/en/pages/contact",
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
  {
    supplier: "Syed Vintage",
    platform: "Own website (UK)",
    contact: "syedvintage.com/pages/contact",
  },
]

export const DESIGNER_SUPPLIERS: Supplier[] = DESIGNER_PACKAGES.map((pkg) => ({
  name: pkg.supplier,
  category: pkg.name,
  link: pkg.link,
  moq: pkg.sellType,
  quality: /Rework Premium|A\/B/.test(pkg.grade) ? 5 : 4,
  platform: pkg.supplier === "Fleek" ? "Fleek" : "Direct",
  searchKeyword: pkg.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  route: "vintage" as const,
}))
