import type { Supplier } from "@/lib/products"

/**
 * Ralph Lauren Mini Bundle.
 * Data collected Nov 2026.
 * Exclusively Polo Ralph Lauren (classic line) — cable-knit jumpers, polos, shirts.
 * Best-sellers on Vinted: cable-knit jumpers (€30–€80 resale), polo shirts (€20–€45).
 * Fleek, Best Vintage, SP Vintage, Thrift Vintage — verified EU-compatible sources.
 */

export type RalphLaurenPackage = {
  id: number
  name: string
  supplier: string
  sellType: string
  grade: string
  shipping: string
  link: string
  category: "Knitwear" | "Polo Shirts" | "Shirts" | "Mixed" | "Outerwear"
  priceApprox?: string
}

export const RALPH_LAUREN_PACKAGES: RalphLaurenPackage[] = [
  {
    id: 1,
    name: "Ralph Lauren Cable-Knit & Knitwear Lot",
    supplier: "Fleek",
    sellType: "Package",
    grade: "Grade A/B",
    shipping: "Included · 20–27 days (EU customs may apply)",
    link: "https://www.joinfleek.com/collections/ralph-lauren",
    category: "Knitwear",
    priceApprox: "de verificat",
  },
  {
    id: 2,
    name: "Ralph Lauren Polo Shirts Mix",
    supplier: "Fleek",
    sellType: "Package",
    grade: "Grade A/B",
    shipping: "Included · 20–27 days (EU customs may apply)",
    link: "https://www.joinfleek.com/collections/ralph-lauren",
    category: "Polo Shirts",
    priceApprox: "de verificat",
  },
  {
    id: 3,
    name: "Ralph Lauren Mixed Lot — Polos, Knitwear & Shirts",
    supplier: "Best Vintage Wholesale",
    sellType: "Package",
    grade: "Grade A/B",
    shipping: "Ships from NL · no EU customs",
    link: "https://bestvintagewholesale.com/collections/ralph-lauren-tommy-hilfiger",
    category: "Mixed",
    priceApprox: "de verificat",
  },
  {
    id: 4,
    name: "Ralph Lauren Premium Mixed Package",
    supplier: "SP Vintage",
    sellType: "Package",
    grade: "Rework Premium / Mix",
    shipping: "Ships from ES · no EU customs",
    link: "https://spvintagewholesale.com/en/collections/ralph-lauren",
    category: "Mixed",
    priceApprox: "de verificat",
  },
  {
    id: 5,
    name: "Ralph Lauren Polo & Knitwear Bale",
    supplier: "Thrift Vintage Fashion",
    sellType: "Bale",
    grade: "Mix Vintage",
    shipping: "Ships from USA · EU customs apply",
    link: "https://thriftvintagewholesale.com/collections/ralph-lauren",
    category: "Mixed",
    priceApprox: "de verificat",
  },
  {
    id: 6,
    name: "Polo Ralph Lauren Knitwear Bale",
    supplier: "Syed Vintage",
    sellType: "Bale / Per piece",
    grade: "Mix Vintage",
    shipping: "Ships from UK · EU customs apply post-Brexit",
    link: "https://syedvintage.com/collections/ralph-lauren",
    category: "Knitwear",
    priceApprox: "de verificat",
  },
  {
    id: 7,
    name: "Ralph Lauren Oxford & Button-Down Shirts",
    supplier: "Fleek",
    sellType: "Package",
    grade: "Grade A/B",
    shipping: "Included · 20–27 days (EU customs may apply)",
    link: "https://www.joinfleek.com/collections/ralph-lauren",
    category: "Shirts",
    priceApprox: "de verificat",
  },
  {
    id: 8,
    name: "Ralph Lauren Fleece & Half-Zip Pullovers",
    supplier: "Best Vintage Wholesale",
    sellType: "Package",
    grade: "Grade A/B",
    shipping: "Ships from NL · no EU customs",
    link: "https://bestvintagewholesale.com/collections/ralph-lauren-tommy-hilfiger",
    category: "Outerwear",
    priceApprox: "de verificat",
  },
]

export const RALPH_LAUREN_TIPS: string[] = [
  "Cable-knit jumpers are the crown jewel of Ralph Lauren resale — a Grade A piece resells for €40–€80 on Vinted in under a week. Always pick these over polos when you have the choice.",
  "The 'Polo Ralph Lauren' label (small pony embroidery on chest) is what buyers want. 'Lauren by Ralph Lauren' and 'Ralph Lauren Sport' lines sell for 50% less — check the label before buying.",
  "Polo shirts: photograph flat-lay on a clean white surface, with the pony logo clearly visible. Title: 'Polo Ralph Lauren shirt vintage [colour] [size]'. These sell within 24h on Vinted.",
  "Size matters: S and M Ralph Lauren pieces sell fastest on Vinted EU. L and XL are slower — price them 20–30% lower. Avoid ordering large-size-heavy lots if you can.",
  "Thrift Vintage and Syed Vintage ship from USA/UK — expect 20–25% added customs cost when the parcel arrives in Romania. Factor this into your buying price. Fleek and Best Vintage are EU-based: no customs.",
]

export type RalphLaurenContact = {
  supplier: string
  platform: string
  contact: string
}

export const RALPH_LAUREN_CONTACTS: RalphLaurenContact[] = [
  {
    supplier: "Fleek (JoinFleek)",
    platform: "EU marketplace",
    contact: "Direct purchase at joinfleek.com/collections/ralph-lauren",
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

export const RALPH_LAUREN_SUPPLIERS: Supplier[] = RALPH_LAUREN_PACKAGES.map((pkg) => ({
  name: pkg.supplier,
  category: pkg.name,
  link: pkg.link,
  moq: pkg.sellType,
  quality: /Rework Premium|A\/B/.test(pkg.grade) ? 5 : 4,
  platform: pkg.supplier === "Fleek" ? "Fleek" : "Direct",
  searchKeyword: pkg.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  route: "vintage" as const,
}))
