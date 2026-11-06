import type { Supplier } from "@/lib/products"

/**
 * Ralph Lauren Mini Bundle — exclusively Polo Ralph Lauren.
 * Cable-knit sweaters, polo shirts, oxford shirts, fleece & chino pants.
 * "Old money / quiet luxury" aesthetic — highest Vinted margins in knitwear.
 * Cable knits resell €40–€110 on Vinted/Depop. Data collected Nov 2026.
 */

export type RalphLaurenPackage = {
  id: number
  name: string
  supplier: string
  sellType: string
  grade: string
  shipping: string
  link: string
  pricePerPc?: string
  category: "knitwear" | "polo-shirts" | "oxford-shirts" | "fleece" | "chinos" | "mixed"
}

export const RALPH_LAUREN_PACKAGES: RalphLaurenPackage[] = [
  // ── KNITWEAR — highest margin, most requested ─────────────────────────────
  {
    id: 1,
    name: "10x Ralph Lauren Cable Knit Sweaters",
    supplier: "Best Vintage Wholesale",
    sellType: "Package (10 pcs)",
    grade: "Grade A/B",
    shipping: "Ships from NL · no EU customs · 24hr dispatch",
    link: "https://bestvintagewholesale.com/products/ralph-lauren-cable-knitwear",
    pricePerPc: "$27.40/pc",
    category: "knitwear",
  },
  {
    id: 2,
    name: "Polo Ralph Lauren Knitwear Mix",
    supplier: "Fleek",
    sellType: "Package (10–20 pcs)",
    grade: "Grade A/B",
    shipping: "Included in price · 20–27 days",
    link: "https://www.joinfleek.com/collections/knitwear?brand=Polo+Ralph+Lauren",
    category: "knitwear",
  },
  // ── POLO SHIRTS ───────────────────────────────────────────────────────────
  {
    id: 3,
    name: "Three Button Ralph Lauren Polo Shirts",
    supplier: "Fleek",
    sellType: "Package (~50 pcs)",
    grade: "Grade A",
    shipping: "Included in price · 20–27 days",
    link: "https://www.joinfleek.com/products/9617671454958",
    pricePerPc: "$11.66/pc",
    category: "polo-shirts",
  },
  {
    id: 4,
    name: "Premium Polo Ralph Lauren Round & V-Neck T-Shirts",
    supplier: "Fleek",
    sellType: "Package (~5 pcs)",
    grade: "Grade A",
    shipping: "Included in price · 20–27 days",
    link: "https://www.joinfleek.com/products/9501160046830",
    pricePerPc: "$18.40/pc",
    category: "polo-shirts",
  },
  {
    id: 5,
    name: "150x Branded Polo Shirts — Ralph Lauren & Others",
    supplier: "Best Vintage Wholesale",
    sellType: "Bale (150 pcs)",
    grade: "Grade A/B",
    shipping: "Ships from NL · no EU customs · 24hr dispatch",
    link: "https://bestvintagewholesale.com/products/branded-poloshirts",
    pricePerPc: "$4.10/pc",
    category: "polo-shirts",
  },
  // ── RALPH LAUREN SHIRTS & TOPS ────────────────────────────────────────────
  {
    id: 6,
    name: "Polo Ralph Lauren Oxford / Button-Down Shirts",
    supplier: "Fleek",
    sellType: "Package (varies)",
    grade: "Grade A/B",
    shipping: "Included in price · 20–27 days",
    link: "https://www.joinfleek.com/collections/shirts?brand=Polo+Ralph+Lauren",
    category: "oxford-shirts",
  },
  {
    id: 7,
    name: "Polo Ralph Lauren Mixed Wholesale Lot",
    supplier: "SP Vintage Wholesale",
    sellType: "Package (10 pcs)",
    grade: "Grade A",
    shipping: "Ships from ES · no EU customs",
    link: "https://spvintagewholesale.com/en/collections/ralph-lauren",
    category: "mixed",
  },
  // ── CHINOS ────────────────────────────────────────────────────────────────
  {
    id: 8,
    name: "Branded Chino / Golf Trousers Mix (incl. Ralph Lauren)",
    supplier: "Best Vintage Wholesale",
    sellType: "Package (20 pcs)",
    grade: "Grade A/B",
    shipping: "Ships from NL · no EU customs · 24hr dispatch",
    link: "https://bestvintagewholesale.com/products/branded-chino-trousers",
    pricePerPc: "$16.40/pc",
    category: "chinos",
  },
  // ── THRIFT VINTAGE ────────────────────────────────────────────────────────
  {
    id: 9,
    name: "Ralph Lauren Polo Shirts Wholesale Bale",
    supplier: "Thrift Vintage Fashion",
    sellType: "Bale / Package",
    grade: "Mix Vintage",
    shipping: "Ships from USA · free over $200 (EU customs apply)",
    link: "https://thriftvintagefashion.com/collections/ralph-lauren",
    category: "polo-shirts",
  },
]

export const RALPH_LAUREN_TIPS: string[] = [
  "Cable knits are the crown jewel: a Best Vintage Wholesale lot of 10 at $274 (≈€27/pc) can yield €80–€110 each on Vinted — that's a 3–4× return before shipping costs.",
  "Fleek polo shirts at $11.66/pc are ideal for volume flipping — list 10 at a time, price at €25–35 each, move them in 2–4 weeks.",
  "Photograph knitwear on a wooden hanger against a neutral wall or folded on linen. 'Old money' aesthetics SELL — add keywords like 'preppy', 'old money', 'classic', 'quiet luxury' in your listing titles.",
  "Best Vintage Wholesale (NL) is the strongest source here: 24hr dispatch, no EU customs, and they carry both cable knits AND polo shirts in sorted lots.",
  "SP Vintage (ES) is a secondary source for Ralph Lauren — worth checking for small batches when Best Vintage Wholesale is sold out.",
]

export type SupplierContact = {
  supplier: string
  platform: string
  contact: string
}

export const RALPH_LAUREN_CONTACTS: SupplierContact[] = [
  { supplier: "JoinFleek (Fleek)", platform: "International marketplace", contact: "Direct chat with sellers via the Fleek messaging system" },
  { supplier: "Best Vintage Wholesale", platform: "Own website (Netherlands)", contact: "bestvintagewholesale.com/pages/contact" },
  { supplier: "SP Vintage Wholesale", platform: "Own website (Spain)", contact: "spvintagewholesale.com/en/pages/contact" },
  { supplier: "Thrift Vintage Fashion", platform: "Own website (USA)", contact: "thriftvintagefashion.com/pages/contact-us" },
]

export const RALPH_LAUREN_SUPPLIERS: Supplier[] = RALPH_LAUREN_PACKAGES.map((pkg) => ({
  name: pkg.supplier,
  category: pkg.name,
  link: pkg.link,
  moq: pkg.sellType,
  quality: /Grade A[^/]/.test(pkg.grade) ? 5 : 4,
  platform: pkg.supplier.includes("Fleek") ? "Fleek" : "Direct",
  searchKeyword: pkg.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  route: "vintage" as const,
}))
