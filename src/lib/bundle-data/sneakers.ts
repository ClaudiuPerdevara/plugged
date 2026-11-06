import type { Supplier } from "@/lib/products"

/**
 * Sneakers & Footwear Bundle.
 * Data collected Nov 2026 — verified live links only.
 *
 * TWO SUPPLIER MODELS:
 * 1. Fleek (IDs 1–8): vintage/used lots from Pakistan vendors. Grade A/B.
 *    ~€21–€32/pc. Buyer protection via Fleek platform.
 *    ⚠️ Ships from PK → Romania: EU customs apply (~12% duty + 19% VAT on declared value).
 *
 * 2. Golden Sneakers + Oversoles (IDs 9–13): NEW/authentic, EU warehouses.
 *    Golden Sneakers = Poland; Oversoles = Romania (same country, no customs, 72h dispatch).
 *    Requires B2B account registration with EU VAT number.
 */

export type SneakersPackage = {
  id: number
  name: string
  supplier: string
  sellType: string
  grade: string
  shipping: string
  link: string
  pricePerPc?: string
  brands?: string
  phone?: string
  whatsapp?: string
  email?: string
  notes?: string
}

export const SNEAKERS_PACKAGES: SneakersPackage[] = [
  // ── FLEEK — vintage/used lots ─────────────────────────────────────────────
  {
    id: 1,
    name: "Nike Air Max Sneakers",
    supplier: "Fleek (vendor: Vintage Cherish)",
    sellType: "Package (10 pcs)",
    grade: "Grade A/B",
    shipping: "Ships from PK · EU customs apply · 20–27 working days",
    link: "https://www.joinfleek.com/products/9553611981038",
    pricePerPc: "~€32/pc · lot total ~€323",
    brands: "Nike Air Max",
    notes: "Sizes 4–14 unisex; Grade AB = 70% A + 30% B; seller rating 3.6/5",
  },
  {
    id: 2,
    name: "Original Nike & Adidas Shoes — 100% Authentic Premium Collection",
    supplier: "Fleek (vendor: MS Vintage Seller)",
    sellType: "Package (20 pcs)",
    grade: "Grade A/B",
    shipping: "Ships from PK · EU customs apply · 20–27 working days",
    link: "https://www.joinfleek.com/products/9613412860142",
    pricePerPc: "~€22/pc · lot total ~€449",
    brands: "Nike, Adidas",
    notes: "Sizes 6–11 unisex; new seller",
  },
  {
    id: 3,
    name: "New Balance Adidas Athletic Sneakers",
    supplier: "Fleek (vendor: TheVaultedFits)",
    sellType: "Package (15 pcs)",
    grade: "Grade A/B",
    shipping: "Ships from PK · EU customs apply · 20–27 working days",
    link: "https://www.joinfleek.com/products/9611200725230",
    pricePerPc: "~€29/pc · lot total ~€434",
    brands: "New Balance, Reebok, Hoka",
    notes: "Sizes 5–12; seller rating 4.2/5",
  },
  {
    id: 4,
    name: "Salomon Sneakers",
    supplier: "Fleek (vendor: Vintage Cherish)",
    sellType: "Package (10 pcs)",
    grade: "Grade A/B",
    shipping: "Ships from PK · EU customs apply · 20–27 working days",
    link: "https://www.joinfleek.com/products/9560731943150",
    pricePerPc: "~€29/pc · lot total ~€293 (12% discount)",
    brands: "Salomon",
    notes: "Sizes 4–14; representative images",
  },
  {
    id: 5,
    name: "ASICS Athletic Sneakers Lot",
    supplier: "Fleek (vendor: SECOND OF ALL)",
    sellType: "Package (5 pcs)",
    grade: "Grade A/B",
    shipping: "Ships from PK · EU customs apply · 4-day dispatch · 20–27 working days",
    link: "https://www.joinfleek.com/products/9587065880814",
    pricePerPc: "~€32/pc · lot total ~€161",
    brands: "ASICS Gel",
    notes: "Sizes 7–12; seller rating 5.0/5; various Gel colorways",
  },
  {
    id: 6,
    name: "New Balance Reebok Sneakers Lot",
    supplier: "Fleek (vendor: SECOND OF ALL)",
    sellType: "Package (10 pcs)",
    grade: "Grade A/B",
    shipping: "Ships from PK · EU customs apply · 4-day dispatch · 20–27 working days",
    link: "https://www.joinfleek.com/products/9587062931694",
    pricePerPc: "~€30/pc · lot total ~€301",
    brands: "New Balance, Reebok",
    notes: "Sizes 7–12; seller rating 5.0/5; also includes Columbia pairs",
  },
  {
    id: 7,
    name: "ASICS Hoka Vans Mixed Sneakers Lot",
    supplier: "Fleek (vendor: Tripple999store)",
    sellType: "Package (16 pcs)",
    grade: "Grade A/B",
    shipping: "Ships from PK · EU customs apply · 20–27 working days",
    link: "https://www.joinfleek.com/products/9611237196014",
    pricePerPc: "~€26/pc · lot total ~€419 (9% discount)",
    brands: "ASICS, Hoka, Vans",
    notes: "Sizes 6–12; seller rating 3.8/5",
  },
  {
    id: 8,
    name: "Adidas Nike Puma Sneakers & Runners — Mixed Lot",
    supplier: "Fleek (vendor: Meer Classic Wear)",
    sellType: "Package (10 pcs)",
    grade: "Grade A/B/C",
    shipping: "Ships from PK · EU customs apply · 20–27 working days",
    link: "https://www.joinfleek.com/products/9609202794734",
    pricePerPc: "~€21/pc · lot total ~€210 (cheapest lot)",
    brands: "Adidas, New Balance, Skechers",
    notes: "Sizes 4–14; Grade ABC: 30% A, 40% B, 30% C; representative images",
  },
  // ── GOLDEN SNEAKERS — new/authentic, EU warehouse (Poland) ───────────────
  {
    id: 9,
    name: "Nike Air Force 1 — B2B Wholesale",
    supplier: "Golden Sneakers",
    sellType: "Per pair · free shipping 10+ pairs · B2B account required",
    grade: "New/Authentic",
    shipping: "Ships from Poland (EU) · no customs for Romania · DHL/UPS 2–4 business days",
    link: "https://www.goldensneakers.net/warehouse/product-catalog-a/",
    pricePerPc: "From €60/pc",
    brands: "Nike Air Force 1",
    phone: "+48 737 341 272",
    whatsapp: "+48737341272",
    email: "sales@goldensneakers.net",
    notes: "B2B account registration required; VAT 0% for non-PL EU companies; 5000+ new pairs/month",
  },
  {
    id: 10,
    name: "Nike Dunk Low / Air Jordan 1 & Jordan 4 — B2B Wholesale",
    supplier: "Golden Sneakers",
    sellType: "Per pair · free shipping 10+ pairs · B2B account required",
    grade: "New/Authentic",
    shipping: "Ships from Poland (EU) · no customs for Romania · DHL/UPS 2–4 business days",
    link: "https://www.goldensneakers.net/warehouse/product-catalog-a/",
    pricePerPc: "Dunk from €45/pc · Jordan 1 from €60/pc · Jordan 4 from €99.50/pc",
    brands: "Nike Dunk, Air Jordan 1, Air Jordan 4",
    phone: "+48 737 341 272",
    whatsapp: "+48737341272",
    email: "sales@goldensneakers.net",
    notes: "WhatsApp group for special offers available on request",
  },
  {
    id: 11,
    name: "Adidas Samba OG / Campus 00s — B2B Wholesale",
    supplier: "Golden Sneakers",
    sellType: "Per pair · free shipping 10+ pairs · B2B account required",
    grade: "New/Authentic",
    shipping: "Ships from Poland (EU) · no customs for Romania · DHL/UPS 2–4 business days",
    link: "https://www.goldensneakers.net/warehouse/product-catalog-a/",
    pricePerPc: "Samba from €60/pc · Campus 00s from €45/pc",
    brands: "Adidas Samba, Adidas Campus",
    phone: "+48 737 341 272",
    whatsapp: "+48737341272",
    email: "sales@goldensneakers.net",
  },
  // ── OVERSOLES — new/authentic, Romania warehouse ──────────────────────────
  {
    id: 12,
    name: "New Balance 9060 — per colorway/SKU",
    supplier: "Oversoles",
    sellType: "Per pair · MOQ 6 pcs (first order) · 10 pcs (subsequent) · dropshipping available",
    grade: "New/Authentic",
    shipping: "Ships from Romania · no customs · free shipping EU · 72h dispatch · 2–7 days delivery",
    link: "https://oversoles.com/collections/new-balance",
    pricePerPc: "€67.98–€96.45/pc (colorway-dependent)",
    brands: "New Balance 9060",
    email: "contact@oversoles.com",
    notes: "Romania warehouse — ideal for Romanian resellers. EU VAT number required. Bank transfer. Full Excel catalog: b2b.oversoles.com/stock",
  },
  {
    id: 13,
    name: "Nike / Air Jordan / Adidas / Puma — Full EU B2B Catalog",
    supplier: "Oversoles",
    sellType: "Per pair · MOQ 6 pcs (first order) · 10 pcs (subsequent) · dropshipping available",
    grade: "New/Authentic",
    shipping: "Ships from Romania · no customs · free shipping EU · 72h dispatch · 2–7 days delivery",
    link: "https://oversoles.com/collections/all",
    pricePerPc: "Nike ~€62–€130/pc · Jordan ~€82–€186/pc · Adidas ~€47–€92/pc",
    brands: "Nike, Air Jordan, Adidas, Puma, New Balance, ASICS",
    email: "contact@oversoles.com",
    notes: "912 SKUs total. Full Excel catalog at b2b.oversoles.com/stock",
  },
]

export const SNEAKERS_TIPS: string[] = [
  "⚠️ Fleek customs: Fleek sellers ship from Pakistan — importing into Romania means ~12% duty + 19% VAT on declared value. Factor this into your margin before ordering. Example: a $35/pc lot becomes ~€46 landed cost.",
  "Oversoles (Romania warehouse) is the cleanest option for Romanian resellers — no customs, free EU shipping, 72h dispatch. Requires EU VAT number and business registration to open an account.",
  "Golden Sneakers (Poland) has the best price on new Nike Dunks (from €45/pc) and Adidas Samba (from €60/pc). WhatsApp them directly at +48737341272 to get access to their special offers group.",
  "ASICS, Salomon, Hoka and On Running resell best right now — these trail/running brands command €40–€80 on Vinted for worn pairs. Prioritize these over plain Nike/Adidas when you see them in Fleek multi-brand lots.",
  "Photograph sneakers on a plain background with the size tag visible in one shot. Buyers need the size immediately — a listing without it is ignored.",
]

export type SneakersContact = {
  supplier: string
  platform: string
  contact: string
  phone?: string
  whatsapp?: string
  email?: string
}

export const SNEAKERS_CONTACTS: SneakersContact[] = [
  {
    supplier: "Fleek (JoinFleek)",
    platform: "EU marketplace (vendors from PK)",
    contact: "Direct purchase at joinfleek.com — buyer protection included",
    email: "support@joinfleek.com",
  },
  {
    supplier: "Golden Sneakers",
    platform: "B2B wholesale (Poland, EU)",
    contact: "goldensneakers.net — register for B2B account",
    phone: "+48 737 341 272",
    whatsapp: "+48737341272",
    email: "sales@goldensneakers.net",
  },
  {
    supplier: "Oversoles",
    platform: "B2B wholesale (Romania)",
    contact: "oversoles.com — register with EU VAT number",
    email: "contact@oversoles.com",
  },
]

export const SNEAKERS_SUPPLIERS: Supplier[] = SNEAKERS_PACKAGES.map((pkg) => ({
  name: pkg.supplier,
  category: pkg.name,
  link: pkg.link,
  moq: pkg.sellType,
  quality: /New\/Authentic/.test(pkg.grade) ? 5 : /Grade A\/B[^C]/.test(pkg.grade) ? 4 : 3,
  platform: pkg.supplier.includes("Fleek") ? "Fleek" : "Direct",
  searchKeyword: pkg.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  route: "vintage" as const,
}))
