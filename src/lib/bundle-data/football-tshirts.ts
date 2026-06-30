import type { Supplier } from "@/lib/products"

export type FootballTshirtPackage = {
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

/** 10 wholesale packages from 7 suppliers — collected 28 June 2026. */
export const FOOTBALL_TSHIRTS_PACKAGES: FootballTshirtPackage[] = [
  {
    id: 1,
    name: "10x Football Jerseys",
    supplier: "Vintage Suppliers 1989",
    packagePrice: "€93.28",
    perPiece: "€9.33 / pc",
    grade: "A / B / C",
    shipping: "Free over €500 in EU · fast dispatch",
    link: "https://vintagesuppliers1989.com/products/30x-football-jerseys",
  },
  {
    id: 2,
    name: "Football Shirts (per Kilogram)",
    supplier: "Vintagism",
    packagePrice: "€10.00 / KG",
    perPiece: "~€2–2.5 / pc",
    grade: "Mix Vintage",
    shipping: "Calculated after order (separate invoice)",
    link: "https://vintagism.eu/product/football-shirts/",
  },
  {
    id: 3,
    name: "35x Nike Sports Jerseys",
    supplier: "RAZIQ VINTAGE (Fleek)",
    packagePrice: "€192.70",
    perPiece: "€5.51 / pc",
    grade: "A / B",
    shipping: "Shipping included! · 20–27 days",
    link: "https://www.joinfleek.com/products/%F0%9F%92%A5-rv3483-nike-sports-jerseys",
  },
  {
    id: 4,
    name: "29x Adidas Jersey T-Shirts",
    supplier: "RAZIQ VINTAGE (Fleek)",
    packagePrice: "€143.92",
    perPiece: "€4.96 / pc",
    grade: "A / B",
    shipping: "Shipping included! · 20–27 days",
    link: "https://www.joinfleek.com/products/rv3306-adidas-trikots-tshirts",
  },
  {
    id: 5,
    name: "20x Premium Branded T-Shirts",
    supplier: "SP Vintage Wholesale",
    packagePrice: "€119.50",
    perPiece: "€5.97 / pc",
    grade: "Mix Premium",
    shipping: "Calculated at checkout (ships from Spain/EU)",
    link: "https://spvintagewholesale.com/en/products/pre-order-mix-camisetas-de-marca-premium",
  },
  {
    id: 6,
    name: "20x Branded Polos Mix",
    supplier: "SP Vintage Wholesale",
    packagePrice: "€159.50",
    perPiece: "€7.97 / pc",
    grade: "Mix Premium",
    shipping: "Calculated at checkout (ships from Spain/EU)",
    link: "https://spvintagewholesale.com/en/products/mix-polos-de-marca",
  },
  {
    id: 7,
    name: "30x Branded Sport T-Shirts",
    supplier: "Vintage Suppliers 1989",
    packagePrice: "€65.00",
    perPiece: "€2.17 / pc",
    grade: "Grade B",
    shipping: "Free over €500 in EU · fast dispatch",
    link: "https://vintagesuppliers1989.com/products/30x-branded-sport-t-shirts-grade-b",
  },
  {
    id: 8,
    name: "50x Nike Sport T-Shirts",
    supplier: "Vintage Wholesale Supply",
    packagePrice: "€127.95",
    perPiece: "€2.55 / pc",
    grade: "Mix",
    shipping: "Ships from UK (watch EU customs!)",
    link: "https://vintagewholesalesupplyltd.com/en-eu/products/nikesporttshirts",
  },
  {
    id: 9,
    name: "Vintage Football Shirts Mix",
    supplier: "The Vintage Wholesale Co.",
    packagePrice: "N/A",
    perPiece: "£12.00 / pc",
    grade: "Pick / Mix",
    shipping: "Calculated at checkout (min. 10 pcs)",
    link: "https://thevintagewholesalecompany.com/products/vintage-football-shirts-mix-per-peice",
  },
  {
    id: 10,
    name: "10x Football Training Shirts",
    supplier: "That Vintage Football Shirt",
    packagePrice: "£179.99",
    perPiece: "£18.00 / pc",
    grade: "Mix (Nike, Puma)",
    shipping: "Free over a set amount · ships from UK",
    link: "https://thatvintagefootballshirt.com/collections/football-shirt-bulk-bundles/products/football-training-shirt-bundle-x10",
  },
]

/** Supplier-level shipping & sourcing tips pulled from the supplier brief. */
export const FOOTBALL_TSHIRTS_NOTES: SupplierNote[] = [
  {
    supplier: "Vintage Suppliers 1989",
    region: "EU",
    bestFor: "High volume & low per-piece prices",
    note: "Based in the EU (no hidden customs for RO/EU). Free shipping over €500. The €2.17/pc sport tee pack is Grade B — expect minor stains/defects that need a wash or small repair.",
    contact: "Contact form · vintagesuppliers1989.com",
  },
  {
    supplier: "SP Vintage Wholesale",
    region: "Spain",
    bestFor: "Premium quality (Adidas, Nike, Ralph Lauren)",
    note: "Fast EU delivery, no customs hassle (based in Spain). Shipping is calculated at the end based on parcel weight.",
    contact: "spvintagewholesale.com/en/pages/contact",
  },
  {
    supplier: "Fleek (RAZIQ VINTAGE)",
    region: "Intl.",
    bestFor: "Best prices — shipping included",
    note: "Pack prices already include international shipping, but parcels ship from outside Europe (Pakistan, Dubai, etc.), so delivery takes 20–27 days and customs may apply on arrival. Fleek offers Buyer Protection (refund if goods are bad).",
    contact: "Via Fleek platform chat",
  },
  {
    supplier: "UK Suppliers (Vintage Wholesale Supply, The Vintage Wholesale Co., That Vintage Football Shirt)",
    region: "UK",
    bestFor: "Rare, 100% original football shirts",
    note: "Since Brexit, any UK→EU order (incl. Romania) is subject to customs + VAT. On arrival the courier (DHL, DPD) will ask for ~19% VAT + duties. Always budget this extra cost.",
    contact: "IG @vwswholesale · thatfootballshirt@outlook.com · 01482 765 437",
  },
  {
    supplier: "Vintagism",
    region: "EU",
    bestFor: "Buying by the kilo",
    note: "Sells by weight (€10/KG of football shirts). A shirt is ~200–250g, so roughly 4–5 shirts per kilo (≈€2–2.5/pc). Shipping is calculated only after you place the order, once they weigh the box.",
    contact: "vintagism.eu/contact",
  },
]

/** Maps the wholesale packages onto the generic Supplier shape for catalog use. */
export const FOOTBALL_TSHIRTS_SUPPLIERS: Supplier[] =
  FOOTBALL_TSHIRTS_PACKAGES.map((pkg) => ({
    name: pkg.supplier,
    category: pkg.name,
    link: pkg.link,
    moq: pkg.perPiece,
    quality: pkg.grade.includes("A") ? 5 : 4,
    platform:
      pkg.supplier.includes("Fleek") || pkg.supplier.includes("RAZIQ")
        ? "Fleek"
        : "Direct",
    searchKeyword: pkg.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    route: "vintage",
  }))
