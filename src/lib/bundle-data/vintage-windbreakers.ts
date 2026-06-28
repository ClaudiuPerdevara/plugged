import type { Supplier } from "@/lib/products"

export type WindbreakerPackage = {
  id: number
  name: string
  supplier: string
  moq: string
  link: string
  grade: string
  brands: string
  sizes: string
  notes?: string
}

export type ImageSearchPlatform = {
  name: string
  link: string
  note: string
}

export type SupplierContact = {
  supplier: string
  platform: string
  contact: string
  contactLink?: string
}

export const VINTAGE_WINDBREAKERS_PACKAGES: WindbreakerPackage[] = [
  {
    id: 1,
    name: "10x Vintage Nike Jackets",
    supplier: "SP Vintage Wholesale",
    moq: "10 pcs",
    link: "https://spvintagewholesale.com/en/products/10x-chaquetas-nike",
    grade: "90% Grade A",
    brands: "Vintage & modern Nike jackets",
    sizes: "XS — XXL",
  },
  {
    id: 2,
    name: "50x Branded Track Jackets",
    supplier: "Vintage Wholesale Supply Ltd",
    moq: "50 pcs (bale)",
    link: "https://vintagewholesalesupplyltd.com/en-eu/products/brandedtrackjackets",
    grade: "Grade A",
    brands: "Nike, Adidas, Tommy Hilfiger, Fila, Reebok, ASICS, Ellesse",
    sizes: "Mixed",
    notes: "Vintage 80s, 90s, 2000s · Ships from United Kingdom",
  },
  {
    id: 3,
    name: "15x Premium Vintage Fleeces",
    supplier: "SP Vintage Wholesale",
    moq: "15 pcs",
    link: "https://spvintagewholesale.com/en/products/polares-vintage-premium",
    grade: "100% original branded",
    brands: "The North Face, Columbia, Nike, Adidas, Reebok, Helly Hansen",
    sizes: "Mixed",
    notes: "Casual, sport, outdoor",
  },
  {
    id: 4,
    name: "10x Vintage Adidas Jackets",
    supplier: "SP Vintage Wholesale",
    moq: "10 pcs",
    link: "https://spvintagewholesale.com/en/products/10x-chaquetas-adidas",
    grade: "90% Grade A",
    brands: "Adidas tracktops, windbreakers, 3-stripe, retro 90s, quilted",
    sizes: "XS — XXL",
  },
  {
    id: 5,
    name: "10x Branded Track Jackets",
    supplier: "Vintage Suppliers 1989",
    moq: "10 pcs",
    link: "https://vintagesuppliers1989.com/products/branded-track-jackets",
    grade: "Grade A",
    brands:
      "Ralph Lauren, Champion, Patagonia, Nike, Adidas, Reebok, Starter, NFL, TNF, Dickies, Tommy Hilfiger, Nautica, LL Bean",
    sizes: "Mixed",
    notes: "Lightweight zip-up, various colors/prints/sizes",
  },
  {
    id: 6,
    name: "Vintage Windbreakers (15 pcs)",
    supplier: "J&W Vintage Wholesale",
    moq: "15 pcs",
    link: "https://www.joinfleek.com/products/windbreakers-29",
    grade: "Grade AB",
    brands: "Nike, Adidas, Reebok, Umbro",
    sizes: "S — XXL",
    notes: "Via Fleek · Rating 5.0 (9 reviews)",
  },
  {
    id: 7,
    name: "Vintage Windbreakers (30 pcs)",
    supplier: "Retro Fashion",
    moq: "30 pcs",
    link: "https://www.joinfleek.com/products/vintage-windbreakers-0130",
    grade: "Grade AB",
    brands: "Nike, Adidas, Reebok, Puma, Champion, FILA",
    sizes: "XS — XXL",
    notes: "Via Fleek · Rating 4.5 (51 reviews)",
  },
  {
    id: 8,
    name: "RV3948 Nike Zipper Jackets",
    supplier: "RAZIQ VINTAGE",
    moq: "20 pcs",
    link: "https://www.joinfleek.com/products/rv3948-nike-zipper-jackets",
    grade: "Grade C",
    brands: "Nike",
    sizes: "M — XXL",
    notes: "Via Fleek · Mostly without washing tags; some pieces without size/tags · Rating 4.9 (243 reviews)",
  },
  {
    id: 9,
    name: "RV3904 Adidas Track Jackets",
    supplier: "RAZIQ VINTAGE",
    moq: "22 pcs",
    link: "https://www.joinfleek.com/products/rv3904-adidas-track-jackets",
    grade: "Grade BC",
    brands: "Adidas",
    sizes: "S — XXL",
    notes: "Via Fleek · Mostly without washing tags; some pieces without size/tags",
  },
  {
    id: 10,
    name: "Nike Windbreakers (18 pcs)",
    supplier: "Koh-e-vintage",
    moq: "18 pcs",
    link: "https://www.joinfleek.com/products/nike-windbreakers-15",
    grade: "Grade AB",
    brands: "Nike",
    sizes: "S — XXL",
    notes: "Via Fleek · Menswear · Rating 4.5 (6 reviews)",
  },
  {
    id: 11,
    name: "Vintage Nike & Adidas Windbreakers (50 pcs)",
    supplier: "Vintager",
    moq: "50 pcs",
    link: "https://www.joinfleek.com/products/vintage-nike-adidas-windbreaker-jackets-1",
    grade: "Grade AB",
    brands: "Nike, Adidas",
    sizes: "S — XXL",
    notes: "Via Fleek · Rating 4.9 (27 reviews)",
  },
]

export const VINTAGE_WINDBREAKERS_IMAGE_SEARCH: ImageSearchPlatform[] = [
  {
    name: "KakoBuy",
    link: "https://www.kakobuy.com/search",
    note: "Shopping agent from China; supports image search on Taobao/1688/Weidian",
  },
  {
    name: "Joyagoo",
    link: "https://joyagoo.com/search?searchType=imageSearch",
    note: "Direct image search — upload a jacket photo for similar results",
  },
  {
    name: "Superbuy",
    link: "https://www.superbuy.com/en/page/search/",
    note: "Popular Chinese shopping agent with image search for sourcing",
  },
]

export const VINTAGE_WINDBREAKERS_CONTACTS: SupplierContact[] = [
  {
    supplier: "SP Vintage Wholesale",
    platform: "Own site (Shopify)",
    contact: "Contact page",
    contactLink: "https://spvintagewholesale.com/en/pages/contact",
  },
  {
    supplier: "Vintage Wholesale Supply Ltd",
    platform: "Own site (Shopify)",
    contact: "@vwswholesale · Warehouse visits available",
    contactLink: "https://www.facebook.com/vwswholesale",
  },
  {
    supplier: "Vintage Suppliers 1989",
    platform: "Own site (Shopify)",
    contact: "Via product pages on site",
    contactLink: "https://vintagesuppliers1989.com",
  },
  {
    supplier: "J&W Vintage Wholesale",
    platform: "Fleek Marketplace",
    contact: "Via Fleek platform",
    contactLink: "https://www.joinfleek.com",
  },
  {
    supplier: "Retro Fashion",
    platform: "Fleek Marketplace",
    contact: "Via Fleek · Rating 4.5 (51 reviews)",
    contactLink: "https://www.joinfleek.com",
  },
  {
    supplier: "RAZIQ VINTAGE",
    platform: "Fleek Marketplace",
    contact: "Via Fleek · Rating 4.9 (243 reviews)",
    contactLink: "https://www.joinfleek.com",
  },
  {
    supplier: "Koh-e-vintage",
    platform: "Fleek Marketplace",
    contact: "Via Fleek · Rating 4.5 (6 reviews)",
    contactLink: "https://www.joinfleek.com",
  },
  {
    supplier: "Vintager",
    platform: "Fleek Marketplace",
    contact: "Via Fleek · Rating 4.9 (27 reviews)",
    contactLink: "https://www.joinfleek.com",
  },
]

function gradeToQuality(grade: string): number {
  const g = grade.toLowerCase()
  if (g.includes("100%") || g === "grade a" || g.includes("90%")) return 5
  if (g.includes("ab")) return 4
  if (g.includes("bc")) return 3
  if (g.includes("grade c") || g === "c") return 2
  return 4
}

function platformForLink(link: string): string {
  if (link.includes("joinfleek.com")) return "Fleek"
  if (link.includes("shopify") || link.includes(".com")) return "Shopify"
  return "Direct"
}

export const VINTAGE_WINDBREAKERS_SUPPLIERS: Supplier[] =
  VINTAGE_WINDBREAKERS_PACKAGES.map((pkg) => ({
    name: pkg.supplier,
    category: pkg.name,
    link: pkg.link,
    moq: pkg.moq,
    quality: gradeToQuality(pkg.grade),
    platform: platformForLink(pkg.link),
    searchKeyword: `windbreakers-${pkg.id}`,
    route: "vintage" as const,
  }))
