import type { Supplier } from "@/lib/products"

export type JeansPackage = {
  id: number
  name: string
  supplier: string
  packagePrice: string
  perPiece: string
  grade: string
  shipping: string
  link: string
}

export type SupplierNote = {
  supplier: string
  region: string
  bestFor: string
  note: string
  contact?: string
}

/** 12 vintage & hip-hop baggy denim packages — collected 29 Jun 2026. */
export const JEANS_PACKAGES: JeansPackage[] = [
  { id: 1, name: "Wholesale Vintage Denim", supplier: "LA Vintage", packagePrice: "Varies", perPiece: "By bale / pallet", grade: "Mix", shipping: "Ships from USA (LA) · high EU customs", link: "https://lavintage.com/collections/wholesale-vintage-denim" },
  { id: 2, name: "10kg Mix High-Waist Jeans", supplier: "Vintage Wholesale Spain", packagePrice: "~€150", perPiece: "~€15 / kg", grade: "Mix Vintage", shipping: "Calculated at checkout · ships from Spain (no EU customs)", link: "https://vintagewholesalespain.com/es-ro/products/mix-pantalones-vaqueros-de-tiro-alto" },
  { id: 3, name: "Levi's 501 & Assorted Styles", supplier: "Merkandi (B2B)", packagePrice: "Varies", perPiece: "Varies", grade: "Mix / Stock", shipping: "B2B platform · cost depends on chosen seller", link: "https://merkandi.us/wholesale/levis-jeans?page=2" },
  { id: 4, name: "Levi/Wrangler Mix 505/550/511", supplier: "Thrift Vintage Fashion", packagePrice: "Varies", perPiece: "Varies", grade: "Mix (Size 34+)", shipping: "Free over $200 · ships from USA", link: "https://thriftvintagefashion.com/products/w1-large-sized-levi-wrangler-jeans-34-and-up" },
  { id: 5, name: "Vintage Denim Collection", supplier: "The Vintage Wholesale Co.", packagePrice: "Varies", perPiece: "£2.20 (Grade C) – £7.00", grade: "Grade C – Mix", shipping: "Ships from UK (watch customs / VAT)", link: "https://thevintagewholesalecompany.com/collections/denim" },
  { id: 6, name: "20x Levi's 505/517/550/560", supplier: "Best Vintage Wholesale", packagePrice: "€189.95", perPiece: "€9.50 / pc", grade: "Mix Vintage", shipping: "Dispatched within 24h (EU)", link: "https://bestvintagewholesale.com/en-eu/collections/levis-lee-wrangler" },
  { id: 7, name: "50x Levi's / Lee / Wrangler", supplier: "Vintage Wholesale Supply", packagePrice: "$253.00", perPiece: "$5.06 / pc", grade: "A / B", shipping: "Ships from UK (watch customs / VAT)", link: "https://vintagewholesalesupplyltd.com/en-us/products/levisleewranglerjeansa" },
  { id: 8, name: "Hip-Hop Jeans Vintage", supplier: "Big Sky Vintage Wholesale", packagePrice: "Varies", perPiece: "Varies", grade: "Mix 90s / Y2K", shipping: "Calculated at checkout", link: "https://bigskyvintagewholesale.com/products/vintage-hip-hop-jeans" },
  { id: 9, name: "39x Hip-Hop Baggy Jeans", supplier: "Fleek", packagePrice: "€572.30", perPiece: "€14.67 / pc", grade: "B / C", shipping: "Shipping included! · 20–27 days", link: "https://www.joinfleek.com/products/hiphop-baggy-jeans-9" },
  { id: 10, name: "50x Hip-Hop Baggy Jeans", supplier: "Fleek", packagePrice: "€1335.25", perPiece: "€26.70 / pc", grade: "Grade A", shipping: "Shipping included! · 20–27 days", link: "https://www.joinfleek.com/products/hip-hop-baggy-jeans-1" },
  { id: 11, name: "30x Hip-Hop Jeans", supplier: "Fleek", packagePrice: "€719.17", perPiece: "€23.97 / pc", grade: "A / B / C", shipping: "Shipping included! · 20–27 days", link: "https://www.joinfleek.com/products/hip-hop-jeans-65" },
  { id: 12, name: "Hip-Hop Baggy Jeans (per pc)", supplier: "The Vintage Wholesale Co.", packagePrice: "N/A", perPiece: "£10.00 / pc", grade: "Mix (90s & Y2K)", shipping: "Ships from UK · min. 10 pcs", link: "https://thevintagewholesalecompany.com/products/vintage-hip-hop-baggy-jeans" },
  { id: 13, name: "Y2K Jeans Mix", supplier: "Thrift Vintage Fashion", packagePrice: "Varies", perPiece: "Varies", grade: "Y2K Mix", shipping: "Free over $200 · ships from USA", link: "https://thriftvintagefashion.com/products/w1-y2k-jeans" },
]

export const JEANS_NOTES: SupplierNote[] = [
  { supplier: "US Suppliers (LA Vintage, Thrift Vintage Fashion)", region: "USA", bestFor: "Raw bulk (large bales, tens/hundreds of kg)", note: "Shipping USA→EU is expensive and you'll pay significant customs + VAT on arrival. Only worth it at industrial volume (pallets), not small packs.", contact: "lavintage.com · thriftvintagefashion.com" },
  { supplier: "UK Suppliers (The Vintage Wholesale Co., Vintage Wholesale Supply)", region: "UK", bestFor: "Clear brands (Levi's 501, Wrangler) sorted by grade", note: "Even Grade C options at ~£2.20/pc (great for upcycling/repair). Post-Brexit, 19% VAT + customs apply — the courier (DHL/DPD) sends a payment link before delivery.", contact: "thevintagewholesalecompany.com · IG @vwswholesale" },
  { supplier: "EU Suppliers (Vintage Wholesale Spain, Best Vintage Wholesale)", region: "EU", bestFor: "Fast, no-surprise buys", note: "Ships from within the EU → straight to your door, no customs, no holds. Spain sells by the kilo, which can mean a very good per-pair price if styles aren't heavy.", contact: "vintagewholesalespain.com · bestvintagewholesale.com" },
  { supplier: "Fleek (Hip-Hop Baggy packs)", region: "Intl.", bestFor: "Sought-after Y2K/skate brands (Southpole, Rocawear, Ecko, Karl Kani)", note: "Higher per-pair prices (€14–€26) because baggy Y2K denim is rare & in demand. Shipping is included but takes 3–4 weeks; VAT may apply on arrival if shipped from Asia.", contact: "Via Fleek platform chat" },
  { supplier: "B2B Platforms (Merkandi)", region: "EU/Intl.", bestFor: "Liquidated / bankrupt stock of Levi's", note: "Not a shop but a wholesale marketplace where wholesalers post offers. You'll need an account (sometimes a subscription) to see seller contact details.", contact: "merkandi.us (account required)" },
]

/** Maps packages onto the generic Supplier shape for catalog use. */
export const JEANS_SUPPLIERS: Supplier[] = JEANS_PACKAGES.map((pkg) => ({
  name: pkg.supplier,
  category: pkg.name,
  link: pkg.link,
  moq: pkg.perPiece,
  quality: pkg.grade.includes("A") ? 5 : 4,
  platform: pkg.supplier.includes("Fleek") ? "Fleek" : "Direct",
  searchKeyword: pkg.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  route: "vintage",
}))
