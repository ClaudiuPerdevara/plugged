import type { Supplier } from "@/lib/products"

/**
 * Vintage Nike & Adidas Sportswear — Trackpants, Sweaters & T-Shirts.
 * Data collected & updated 29 Jun 2026 (from date_produse_sportswear.md).
 */

export type SportswearPackage = {
  id: number
  name: string
  supplier: string
  sellType: string
  grade: string
  shipping: string
  link: string
}

export type SportswearCategory = {
  title: string
  description: string
  packages: SportswearPackage[]
}

export const SPORTSWEAR_CATEGORIES: SportswearCategory[] = [
  {
    title: "Trackpants & Joggers",
    description:
      "Baggy retro Nike & Adidas track pants — the Y2K / streetwear staple that moves fast on Vinted & Depop.",
    packages: [
      { id: 1, name: "Authentic Nike Baggy Track Pants", supplier: "Fleek", sellType: "Package", grade: "Grade A/B", shipping: "Included in price · 20–27 days", link: "https://www.joinfleek.com/products/authentic-nike-baggy-track-pants-2" },
      { id: 2, name: "Nike Jogging Bottoms / Trackpants", supplier: "Vintage Wholesale Supply", sellType: "Package", grade: "Grade A/B", shipping: "Ships from UK · watch customs/VAT", link: "https://vintagewholesalesupplyltd.com/products/nikejoggingbottomstrackpantsa" },
      { id: 3, name: "Nike Trackpants", supplier: "Vintage Supply EU", sellType: "Package", grade: "Mix", shipping: "Ships from NL · no EU customs", link: "https://vintagesupplyeurope.com/en/products/nike-trackpants" },
      { id: 4, name: "Nike Joggers and Trackpants", supplier: "Fleek", sellType: "Package", grade: "Mix", shipping: "Included in price · 20–27 days", link: "https://www.joinfleek.com/products/nike-joggers-and-trackpants" },
      { id: 5, name: "Adidas Trackpants", supplier: "SP Vintage", sellType: "Package", grade: "Mix Premium", shipping: "Ships from ES · no EU customs", link: "https://spvintagewholesale.com/en/products/adidas-trackpants" },
    ],
  },
  {
    title: "Sport T-Shirts",
    description:
      "Vintage Nike & Adidas tees — center-swoosh logos and classic sport graphics that sell rapidly in summer.",
    packages: [
      { id: 6, name: "Nike T-Shirts", supplier: "Vintage Wholesale Supply", sellType: "Package", grade: "Grade A/B", shipping: "Ships from UK · watch customs/VAT", link: "https://vintagewholesalesupplyltd.com/en-us/products/niketshirt" },
      { id: 7, name: "Nike Sport T-Shirts", supplier: "Vintage Wholesale Supply", sellType: "Package", grade: "Grade A/B", shipping: "Ships from UK · watch customs/VAT", link: "https://vintagewholesalesupplyltd.com/products/nikesporttshirts" },
      { id: 8, name: "Adidas Sport T-Shirts", supplier: "Vintage Wholesale Supply", sellType: "Package", grade: "Grade A/B", shipping: "Ships from UK · watch customs/VAT", link: "https://vintagewholesalesupplyltd.com/products/adidassporttshirts" },
      { id: 9, name: "Nike T-Shirts & Shirts", supplier: "Vintage Supply EU", sellType: "Package", grade: "Mix", shipping: "Ships from NL · no EU customs", link: "https://vintagesupplyeurope.com/en/products/nike-t-shirts-shirts" },
      { id: 10, name: "Nike T-Shirts", supplier: "Best Vintage Wholesale", sellType: "Package", grade: "Mix Premium", shipping: "Ships within EU", link: "https://bestvintagewholesale.com/en-eu/products/niketshirts" },
      { id: 11, name: "Nike & Adidas Sports T-Shirts", supplier: "Fleek", sellType: "Package", grade: "Grade A/B", shipping: "Included in price · 20–27 days", link: "https://www.joinfleek.com/products/a-y308-nike-and-adidas-sports-t-shirts" },
    ],
  },
  {
    title: "Sweaters & Hoodies",
    description:
      "Heavy-weight pieces — vintage Nike hoodies, Adidas sweaters and rework crewnecks (made from recycled materials).",
    packages: [
      { id: 12, name: "Sudaderas Nike Vintage", supplier: "SP Vintage", sellType: "Package", grade: "Mix Premium", shipping: "Ships from ES · no EU customs", link: "https://spvintagewholesale.com/en/products/sudaderas-nike-vintage" },
      { id: 13, name: "Sudaderas Adidas Vintage", supplier: "SP Vintage", sellType: "Package", grade: "Mix Premium", shipping: "Ships from ES · no EU customs", link: "https://spvintagewholesale.com/en/products/sudaderas-adidas-vintage" },
      { id: 14, name: "Sudaderas Vintage Premium (Branded)", supplier: "SP Vintage", sellType: "Package", grade: "Mix Premium", shipping: "Ships from ES · no EU customs", link: "https://spvintagewholesale.com/en/products/sudaderas-vintage-premium-de-marca" },
      { id: 15, name: "Sudaderas Nike REWORK", supplier: "SP Vintage", sellType: "Package", grade: "Reworked", shipping: "Ships from ES · no EU customs", link: "https://spvintagewholesale.com/en/products/sudaderas-nike-rework" },
      { id: 16, name: "Nike Sweatshirts & Hoodies", supplier: "Vintage Wholesale Supply", sellType: "Package", grade: "Grade A/B", shipping: "Ships from UK · watch customs/VAT", link: "https://vintagewholesalesupplyltd.com/en-eu/products/nikesweatshirtshoodiesa" },
      { id: 17, name: "Nike Hoodies", supplier: "Not Another Wholesale", sellType: "Package", grade: "Grade A/B", shipping: "Ships from UK · watch customs/VAT", link: "https://notanotherwholesale.com/products/nike-hoodies-1" },
      { id: 18, name: "Branded Sweatshirts", supplier: "Thrift Vintage Fashion", sellType: "Bale / Package", grade: "Mix", shipping: "Ships from USA · free over $200", link: "https://thriftvintagefashion.com/products/w1-branded-sweatshirts" },
    ],
  },
]

export type ImageSearchPlatform = {
  name: string
  link: string
  note: string
}

/** Sourcing direct from China by uploading a product photo. */
export const SPORTSWEAR_IMAGE_SEARCH: ImageSearchPlatform[] = [
  {
    name: "Joyagoo",
    link: "https://joyagoo.com/search?searchType=imageSearch",
    note: "Popular import agent. Upload a photo of the Nike hoodie and it scans Taobao/Weidian for matching sellers.",
  },
  {
    name: "KakoBuy",
    link: "https://www.kakobuy.com/search",
    note: "Heavily used for 1:1 and unbranded pieces. Photo search finds any pair of trackpants from Chinese factories.",
  },
  {
    name: "Superbuy",
    link: "https://www.superbuy.com/en/page/search/",
    note: "One of the oldest, most trusted China agents. Its image search instantly finds products across Asian platforms.",
  },
]

export type SupplierContact = {
  supplier: string
  platform: string
  contact: string
}

export const SPORTSWEAR_CONTACTS: SupplierContact[] = [
  { supplier: "SP Vintage Wholesale", platform: "Own website", contact: "spvintagewholesale.com/en/pages/contact" },
  { supplier: "Vintage Wholesale Supply Ltd", platform: "Own website", contact: "IG @vwswholesale · TikTok @vintagewholesalesupply" },
  { supplier: "Vintage Supply EU", platform: "Own website", contact: "vintagesupplyeurope.com/pages/contact" },
  { supplier: "Best Vintage Wholesale", platform: "Own website", contact: "bestvintagewholesale.com/pages/contact" },
  { supplier: "Thrift Vintage Fashion", platform: "Own website", contact: "thriftvintagefashion.com/pages/contact-us" },
  { supplier: "Not Another Wholesale", platform: "Own website", contact: "notanotherwholesale.com/pages/contact" },
  { supplier: "Fleek sellers", platform: "Marketplace", contact: "Direct chat via the JoinFleek platform" },
]

/** Maps every package onto the generic Supplier shape for catalog use. */
export const SPORTSWEAR_SUPPLIERS: Supplier[] = SPORTSWEAR_CATEGORIES.flatMap(
  (cat) =>
    cat.packages.map((pkg) => ({
      name: pkg.supplier,
      category: pkg.name,
      link: pkg.link,
      moq: pkg.sellType,
      quality: /A|Premium/.test(pkg.grade) ? 5 : 4,
      platform: pkg.supplier.includes("Fleek") ? "Fleek" : "Direct",
      searchKeyword: pkg.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      route: "vintage" as const,
    })),
)
