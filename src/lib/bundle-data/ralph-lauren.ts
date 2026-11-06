import type { Supplier } from "@/lib/products"

/**
 * Ralph Lauren Mini Bundle — exclusively Polo Ralph Lauren.
 * Cable-knit sweaters, polo shirts, oxford shirts, quarter-zip knitwear, chinos.
 * "Old money / quiet luxury" aesthetic — highest Vinted margins in knitwear.
 * Cable knits resell €40–€110 on Vinted/Depop. Data collected Nov 2026.
 *
 * SUPPLIERS:
 * — Fleek (US, ships worldwide): 12 exact lots available NOW. Import duty applies for Romania.
 * — SP Vintage Wholesale (Spain, EU): ZERO customs for Romania. Black Days promo 6–22 Nov 2026.
 * — Merkandi Romania seller: DOMESTIC delivery, zero customs, Grade A new shirts.
 * — Best Vintage Wholesale (UK): 24hr dispatch, potential customs post-Brexit.
 * — Vintage Wholesale Supply Ltd (UK): mostly sold out, monitor for restock.
 */

export type RalphLaurenPackage = {
  id: string
  name: string
  supplier: string
  supplierCountry: string
  euBased: boolean
  sellType: "exact" | "representative" | "by-weight" | "pre-order"
  grade: "A" | "A/B" | "B" | "new" | "mixed"
  moq: number
  moqUnit: "pcs" | "kg" | "lot"
  pricePerPc: number
  totalLotPrice?: number
  lotSize?: number
  category: "knitwear-cable" | "knitwear-quarter-zip" | "knitwear-round-neck" | "polo-shirts" | "shirts-oxford" | "fleece-zip" | "chino-trousers" | "mixed-lot" | "sweatshirts"
  inStock: boolean
  link: string
  phone?: string
  whatsapp?: string
  email?: string
  notes: string
  shipping: string
}

export const RALPH_LAUREN_PACKAGES: RalphLaurenPackage[] = [
  // ── FLEEK — exact lots, available NOW ────────────────────────────────────
  // Ships from US via Fleek platform. EU/Romanian buyers: ~12% import duty + 19% VAT may apply.
  {
    id: "fleek-cable-knit-01",
    name: "Polo Ralph Lauren Cable Knit Sweaters (10 pcs)",
    supplier: "Fleek",
    supplierCountry: "US",
    euBased: false,
    sellType: "exact",
    grade: "A/B",
    moq: 10,
    moqUnit: "pcs",
    pricePerPc: 32.50,
    totalLotPrice: 325,
    lotSize: 10,
    category: "knitwear-cable",
    inStock: true,
    link: "https://www.joinfleek.com/products/9624479858926",
    email: "support@joinfleek.com",
    notes: "Exact bundle with photos. HIGHEST PRIORITY — cable knits resell €40–€110 on Vinted.",
    shipping: "Shipping included in price. EU import duty ~12% + VAT may apply.",
  },
  {
    id: "fleek-cable-knit-02",
    name: "Polo Ralph Lauren Cable Knit Sweaters (10 pcs) — Lot 2",
    supplier: "Fleek",
    supplierCountry: "US",
    euBased: false,
    sellType: "exact",
    grade: "A/B",
    moq: 10,
    moqUnit: "pcs",
    pricePerPc: 32.50,
    totalLotPrice: 325,
    lotSize: 10,
    category: "knitwear-cable",
    inStock: true,
    link: "https://www.joinfleek.com/products/9624512135406",
    email: "support@joinfleek.com",
    notes: "Exact bundle — different lot. Check product photos for size/color breakdown.",
    shipping: "Shipping included in price. EU import duty ~12% + VAT may apply.",
  },
  {
    id: "fleek-cable-knit-03",
    name: "Polo Ralph Lauren Cable Knit Sweaters (10 pcs) — Lot 3",
    supplier: "Fleek",
    supplierCountry: "US",
    euBased: false,
    sellType: "exact",
    grade: "A/B",
    moq: 10,
    moqUnit: "pcs",
    pricePerPc: 31.50,
    totalLotPrice: 315,
    lotSize: 10,
    category: "knitwear-cable",
    inStock: true,
    link: "https://www.joinfleek.com/products/9624512626926",
    email: "support@joinfleek.com",
    notes: "Exact bundle. Slightly cheaper lot — verify photos for quality mix.",
    shipping: "Shipping included in price. EU import duty ~12% + VAT may apply.",
  },
  {
    id: "fleek-sweaters-01",
    name: "Polo Ralph Lauren Sweaters Mix (10 pcs)",
    supplier: "Fleek",
    supplierCountry: "US",
    euBased: false,
    sellType: "exact",
    grade: "A/B",
    moq: 10,
    moqUnit: "pcs",
    pricePerPc: 24.90,
    totalLotPrice: 249,
    lotSize: 10,
    category: "knitwear-round-neck",
    inStock: true,
    link: "https://www.joinfleek.com/products/9626024739054",
    email: "support@joinfleek.com",
    notes: "Round-neck styles — lower price, good entry for testing.",
    shipping: "Shipping included in price. EU import duty ~12% + VAT may apply.",
  },
  {
    id: "fleek-mixed-sweaters-discounted",
    name: "Ralph Lauren Mixed Sweaters (10 pcs) — 14% DISCOUNT",
    supplier: "Fleek",
    supplierCountry: "US",
    euBased: false,
    sellType: "exact",
    grade: "A/B",
    moq: 10,
    moqUnit: "pcs",
    pricePerPc: 23.10,
    totalLotPrice: 231,
    lotSize: 10,
    category: "knitwear-round-neck",
    inStock: true,
    link: "https://www.joinfleek.com/products/9536253427950",
    email: "support@joinfleek.com",
    notes: "14% discount applied — lowest price knitwear on Fleek. May include RL sub-lines (not just Polo RL).",
    shipping: "Shipping included in price. EU import duty ~12% + VAT may apply.",
  },
  {
    id: "fleek-quarter-zip-01",
    name: "Polo Ralph Lauren Quarter-Zip Knitwear (10 pcs)",
    supplier: "Fleek",
    supplierCountry: "US",
    euBased: false,
    sellType: "exact",
    grade: "A/B",
    moq: 10,
    moqUnit: "pcs",
    pricePerPc: 34.80,
    totalLotPrice: 348,
    lotSize: 10,
    category: "knitwear-quarter-zip",
    inStock: true,
    link: "https://www.joinfleek.com/products/9624487362798",
    email: "support@joinfleek.com",
    notes: "Quarter-zip — high resale value. Check photos for cable-knit vs jersey construction.",
    shipping: "Shipping included in price. EU import duty ~12% + VAT may apply.",
  },
  {
    id: "fleek-quarter-zip-02",
    name: "Polo Ralph Lauren Quarter-Zip Sweaters (10 pcs) — Lot 2",
    supplier: "Fleek",
    supplierCountry: "US",
    euBased: false,
    sellType: "exact",
    grade: "A/B",
    moq: 10,
    moqUnit: "pcs",
    pricePerPc: 34.95,
    totalLotPrice: 350,
    lotSize: 10,
    category: "knitwear-quarter-zip",
    inStock: true,
    link: "https://www.joinfleek.com/products/9624505942254",
    email: "support@joinfleek.com",
    notes: "Second quarter-zip lot. Check if fleece or knitwear construction from product photos.",
    shipping: "Shipping included in price. EU import duty ~12% + VAT may apply.",
  },
  {
    id: "fleek-round-neck-01",
    name: "Polo Ralph Lauren Round-Neck Sweaters (10 pcs)",
    supplier: "Fleek",
    supplierCountry: "US",
    euBased: false,
    sellType: "exact",
    grade: "A/B",
    moq: 10,
    moqUnit: "pcs",
    pricePerPc: 32.50,
    totalLotPrice: 325,
    lotSize: 10,
    category: "knitwear-round-neck",
    inStock: true,
    link: "https://www.joinfleek.com/products/9624483889390",
    email: "support@joinfleek.com",
    notes: "Exact bundle — crew-neck RL knits. Good variety for Vinted listings.",
    shipping: "Shipping included in price. EU import duty ~12% + VAT may apply.",
  },
  {
    id: "fleek-polo-shirts-01",
    name: "Polo Ralph Lauren Polo Shirts (10 pcs) — 4.4★",
    supplier: "Fleek",
    supplierCountry: "US",
    euBased: false,
    sellType: "exact",
    grade: "A",
    moq: 10,
    moqUnit: "pcs",
    pricePerPc: 14.90,
    totalLotPrice: 149,
    lotSize: 10,
    category: "polo-shirts",
    inStock: true,
    link: "https://www.joinfleek.com/products/9625841828078",
    email: "support@joinfleek.com",
    notes: "4.4-star buyer-verified lot. Grade A polo shirts. Resell €25–€40 on Vinted.",
    shipping: "Shipping included in price. EU import duty ~12% + VAT may apply.",
  },
  {
    id: "fleek-polo-shirts-02",
    name: "Polo Ralph Lauren Polo Shirts (10 pcs) — 4.2★",
    supplier: "Fleek",
    supplierCountry: "US",
    euBased: false,
    sellType: "exact",
    grade: "A/B",
    moq: 10,
    moqUnit: "pcs",
    pricePerPc: 13.70,
    totalLotPrice: 137,
    lotSize: 10,
    category: "polo-shirts",
    inStock: true,
    link: "https://www.joinfleek.com/products/9625743786222",
    email: "support@joinfleek.com",
    notes: "4.2-star rated lot. Verify POLO RL label (not Lauren sub-line) in photos.",
    shipping: "Shipping included in price. EU import duty ~12% + VAT may apply.",
  },
  {
    id: "fleek-polo-shirts-large",
    name: "Polo Ralph Lauren Men's T-Shirts & Polo Shirts (25 pcs)",
    supplier: "Fleek",
    supplierCountry: "US",
    euBased: false,
    sellType: "exact",
    grade: "A/B",
    moq: 25,
    moqUnit: "pcs",
    pricePerPc: 10.60,
    totalLotPrice: 265,
    lotSize: 25,
    category: "polo-shirts",
    inStock: true,
    link: "https://www.joinfleek.com/products/9625803030766",
    email: "support@joinfleek.com",
    notes: "Lowest per-piece cost — mixed T-shirts + polo shirts. Best for volume buyers.",
    shipping: "Shipping included in price. EU import duty ~12% + VAT may apply.",
  },
  // ── SP VINTAGE WHOLESALE (Spain, EU) — ZERO CUSTOMS FOR ROMANIA ──────────
  {
    id: "spvintage-rl-box-15kg",
    name: "Ralph Lauren Reseller Box 15kg + 20 Free Items",
    supplier: "SP Vintage Wholesale",
    supplierCountry: "ES",
    euBased: true,
    sellType: "by-weight",
    grade: "A",
    moq: 15,
    moqUnit: "kg",
    pricePerPc: 9.00,
    totalLotPrice: 472.45,
    lotSize: 50,
    category: "mixed-lot",
    inStock: true,
    link: "https://spvintagewholesale.com/en/products/ralph-lauren-reseller-box-15kg",
    notes: "EU → ZERO customs Romania. Black Days 6–22 Nov 2026: +20 items free. ~€6–7/pc effective after free items. Mixed RL: shirts, knitwear, polos, jackets.",
    shipping: "Ships from Spain (EU). Free shipping to EU above €1,200. 3–7 days within EU.",
  },
  {
    id: "spvintage-rl-box-7kg",
    name: "Ralph Lauren Vintage Starter Box 7kg + 10 Free Items",
    supplier: "SP Vintage Wholesale",
    supplierCountry: "ES",
    euBased: true,
    sellType: "by-weight",
    grade: "A",
    moq: 7,
    moqUnit: "kg",
    pricePerPc: 9.50,
    totalLotPrice: 176.35,
    lotSize: 24,
    category: "mixed-lot",
    inStock: true,
    link: "https://spvintagewholesale.com/en/products/ralph-lauren-reseller-box",
    notes: "EU → ZERO customs Romania. Perfect starter order. +10 free items (Black Days promo). ~20–30 pcs depending on item weight.",
    shipping: "Ships from Spain (EU). EU delivery 3–7 days.",
  },
  {
    id: "spvintage-rl-polo-shirts",
    name: "PRE-ORDER: 20x Polo Ralph Lauren Polo Shirts + 20 Free",
    supplier: "SP Vintage Wholesale",
    supplierCountry: "ES",
    euBased: true,
    sellType: "pre-order",
    grade: "A",
    moq: 20,
    moqUnit: "pcs",
    pricePerPc: 13.65,
    totalLotPrice: 272.93,
    lotSize: 20,
    category: "polo-shirts",
    inStock: true,
    link: "https://spvintagewholesale.com/en/products/mix-camisas-ralph-lauren",
    notes: "EU → ZERO customs Romania. PRE-ORDER. Black Days: buy 20, get 20 free. Exclusively Polo RL shirts. Scale: 100 pcs = €12.28/pc + free shipping.",
    shipping: "Ships from Spain (EU). Free shipping from €1,200. Pre-order: allow extra lead time.",
  },
  // ── MERKANDI — B2B Marketplace ────────────────────────────────────────────
  {
    id: "merkandi-rl-shirts-ro",
    name: "Polo Ralph Lauren Men's Shirts — Grade A New (Romania stock)",
    supplier: "Merkandi (seller: Romania)",
    supplierCountry: "RO",
    euBased: true,
    sellType: "representative",
    grade: "new",
    moq: 50,
    moqUnit: "pcs",
    pricePerPc: 19.00,
    totalLotPrice: 950,
    lotSize: 50,
    category: "shirts-oxford",
    inStock: true,
    link: "https://merkandi.com/products/polo-ralph-lauren-men-s-shirts-grade-a-wholesale-stock/1600033",
    notes: "ROMANIA SELLER → domestic shipping, zero customs. 1500 pcs in stock. Tiered pricing: €19/pc (50–500), €18/pc (501–1000), €17/pc (1001–1500). Grade A, New. HIGHEST PRIORITY EU LISTING.",
    shipping: "Romania → Romania: domestic. No customs. Very fast. Confirm cost via Merkandi platform.",
  },
  // ── BEST VINTAGE WHOLESALE (UK) ───────────────────────────────────────────
  {
    id: "bvw-cable-knit",
    name: "10x Ralph Lauren Cable Knitwear — 24HR DISPATCH",
    supplier: "Best Vintage Wholesale",
    supplierCountry: "GB",
    euBased: false,
    sellType: "representative",
    grade: "A/B",
    moq: 10,
    moqUnit: "pcs",
    pricePerPc: 25.10,
    totalLotPrice: 251,
    lotSize: 10,
    category: "knitwear-cable",
    inStock: false,
    link: "https://bestvintagewholesale.com/products/ralph-lauren-cable-knitwear",
    notes: "SOLD OUT — monitor for restock. 24hr dispatch, Grade A/B cable knit. Black Friday: free EU delivery 23 Nov–6 Dec, no minimum. UK post-Brexit = potential customs for EU/Romania.",
    shipping: "UK warehouse. Free EU delivery over £500. Potential UK→EU customs duty.",
  },
  {
    id: "bvw-branded-polos",
    name: "150x Branded Polo Shirts Mix — 40% OFF",
    supplier: "Best Vintage Wholesale",
    supplierCountry: "GB",
    euBased: false,
    sellType: "representative",
    grade: "A/B",
    moq: 150,
    moqUnit: "pcs",
    pricePerPc: 3.76,
    totalLotPrice: 564,
    lotSize: 150,
    category: "polo-shirts",
    inStock: true,
    link: "https://bestvintagewholesale.com/products/branded-poloshirts",
    notes: "⚠️ MIXED BRANDS — Fred Perry, Nike, Tommy Hilfiger, Nautica, RL mixed. NOT Ralph Lauren exclusive. Only 1 lot remaining. Good for volume buyers selling multiple brands.",
    shipping: "UK warehouse. Free EU delivery over £500. Potential UK→EU customs duty.",
  },
  {
    id: "bvw-chinos",
    name: "Branded Chino / Golf Trousers Mix (incl. Ralph Lauren)",
    supplier: "Best Vintage Wholesale",
    supplierCountry: "GB",
    euBased: false,
    sellType: "representative",
    grade: "A/B",
    moq: 20,
    moqUnit: "pcs",
    pricePerPc: 15.00,
    totalLotPrice: 300,
    lotSize: 20,
    category: "chino-trousers",
    inStock: true,
    link: "https://bestvintagewholesale.com/search?q=ralph+lauren+chino",
    notes: "URL original nu mai funcționează — caută pe search page BVW. Mixed branded chinos including Ralph Lauren. Good autumn/spring item.",
    shipping: "UK warehouse. Free EU delivery over £500. Potential UK→EU customs duty.",
  },
  // ── THRIFT VINTAGE (USA) ──────────────────────────────────────────────────
  {
    id: "thrift-vintage-rl",
    name: "Ralph Lauren Polo Shirts Wholesale Bale",
    supplier: "Thrift Vintage Fashion",
    supplierCountry: "US",
    euBased: false,
    sellType: "representative",
    grade: "mixed",
    moq: 1,
    moqUnit: "lot",
    pricePerPc: 8.00,
    category: "polo-shirts",
    inStock: true,
    link: "https://thriftvintagefashion.com/collections/all?q=ralph+lauren",
    notes: "US-based. Free shipping over $200 but EU customs apply. Good for mixed vintage lots.",
    shipping: "Ships from USA. Free over $200 but EU/Romania customs apply. Factor in duty costs.",
  },
]

export const RALPH_LAUREN_TIPS: string[] = [
  "🏆 Cable knits are the crown jewel: buy at €23–€35/pc, resell €40–€110 on Vinted. That's 2–4× before shipping. Fleek has 3 exact cable-knit lots available RIGHT NOW — order before they sell.",
  "✅ ZERO customs picks for Romania: (1) Merkandi Romanian seller — domestic shipping, Grade A New shirts, 1500 pcs stock. (2) SP Vintage Spain — €176 starter box, +10 free items (Black Days promo until 22 Nov). (3) Best Vintage Wholesale — cable knit sold out but monitor.",
  "⚠️ Fleek & Thrift Vintage ship from US/Pakistan → Romania: factor ~12% import duty + 19% VAT on declared value. A €32/pc Fleek lot becomes ~€42 landed cost. Still good margin on knitwear — not on shirts.",
  "📸 Photograph knitwear folded on linen or on a wooden hanger. Use keywords 'old money', 'preppy', 'quiet luxury', 'cable knit vintage' in Vinted titles. These words 3× click-through on Vinted.",
  "📞 SP Vintage contact: spvintagewholesale.com/en/pages/contact · Best Vintage Wholesale: bestvintagewholesale.com/pages/contact · Merkandi: message seller directly on platform · Fleek: support@joinfleek.com",
  "🎯 Recommended first order: (1) Merkandi RO seller — 50x RL shirts €950, Grade A New, domestic. (2) Fleek cable-knit-01 — 10x €325, exact bundle photos. (3) SP Vintage 7kg starter box — €176, test quality.",
]

export type SupplierContact = {
  supplier: string
  platform: string
  country: string
  euBased: boolean
  contact: string
  phone?: string
  whatsapp?: string
  email?: string
}

export const RALPH_LAUREN_CONTACTS: SupplierContact[] = [
  {
    supplier: "Fleek (JoinFleek)",
    platform: "International marketplace",
    country: "US",
    euBased: false,
    contact: "Direct purchase at joinfleek.com — buyer protection included",
    email: "support@joinfleek.com",
  },
  {
    supplier: "SP Vintage Wholesale",
    platform: "Own website (Spain, EU)",
    country: "ES",
    euBased: true,
    contact: "spvintagewholesale.com/en/pages/contact — Black Days promo until 22 Nov 2026",
  },
  {
    supplier: "Merkandi (Romania seller)",
    platform: "B2B marketplace",
    country: "RO",
    euBased: true,
    contact: "Message seller directly on merkandi.com — 1500 pcs in stock",
  },
  {
    supplier: "Best Vintage Wholesale",
    platform: "Own website (UK)",
    country: "GB",
    euBased: false,
    contact: "bestvintagewholesale.com/pages/contact — cable knit sold out, monitor restock",
  },
  {
    supplier: "Thrift Vintage Fashion",
    platform: "Own website (USA)",
    country: "US",
    euBased: false,
    contact: "thriftvintagefashion.com/pages/contact-us",
  },
]

// Legacy type alias for backward compatibility
export type RalphLaurenPackageLegacy = {
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

export const RALPH_LAUREN_SUPPLIERS: Supplier[] = RALPH_LAUREN_PACKAGES.map((pkg) => ({
  name: pkg.supplier,
  category: pkg.name,
  link: pkg.link,
  moq: `${pkg.moq} ${pkg.moqUnit}`,
  quality: pkg.grade === "new" ? 5 : pkg.grade === "A" ? 5 : pkg.grade === "A/B" ? 4 : 3,
  platform: pkg.supplier.includes("Fleek") ? "Fleek" : "Direct",
  searchKeyword: pkg.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  route: "vintage" as const,
}))
