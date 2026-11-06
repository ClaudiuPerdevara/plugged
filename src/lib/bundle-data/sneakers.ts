import type { Supplier } from "@/lib/products"

/**
 * Sneakers & Footwear Bundle.
 * Vintage + retro athletic sneakers wholesale — Nike, Adidas, New Balance,
 * Reebok, Asics, Salomon. Resell on Vinted/Depop for €30–€120 per pair.
 * Data collected Nov 2026.
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
}

export const SNEAKERS_PACKAGES: SneakersPackage[] = [
  {
    id: 1,
    name: "Nike Air Max Sneakers",
    supplier: "Fleek",
    sellType: "Package (~10 pcs)",
    grade: "Grade A/B",
    shipping: "Included in price · 20–27 days",
    link: "https://www.joinfleek.com/products/9553611981038",
    pricePerPc: "$35.16/pc",
  },
  {
    id: 2,
    name: "Adidas Nike Sneakers Mix",
    supplier: "Fleek",
    sellType: "Package (~5 pcs)",
    grade: "Grade A/B",
    shipping: "Included in price · 20–27 days",
    link: "https://www.joinfleek.com/products/9624551031022",
    pricePerPc: "$35.12/pc",
  },
  {
    id: 3,
    name: "New Balance Adidas Athletic Sneakers",
    supplier: "Fleek",
    sellType: "Package (~15 pcs)",
    grade: "Grade A/B",
    shipping: "Included in price · 20–27 days",
    link: "https://www.joinfleek.com/products/9611200725230",
    pricePerPc: "$31.56/pc",
  },
  {
    id: 4,
    name: "Original Nike & Adidas Shoes — 100% Authentic",
    supplier: "Fleek",
    sellType: "Package (~20 pcs)",
    grade: "Grade A",
    shipping: "Included in price · 20–27 days",
    link: "https://www.joinfleek.com/products/9613412860142",
    pricePerPc: "$24.49/pc",
  },
  {
    id: 5,
    name: "Asics Athletic Sneakers Lot",
    supplier: "Fleek",
    sellType: "Package (~5 pcs)",
    grade: "Grade A/B",
    shipping: "Included in price · 20–27 days",
    link: "https://www.joinfleek.com/products/9587065880814",
    pricePerPc: "$35.17/pc",
  },
  {
    id: 6,
    name: "Adidas Saucony Athletic Sneakers",
    supplier: "Fleek",
    sellType: "Package (~16 pcs)",
    grade: "Grade A/B",
    shipping: "Included in price · 20–27 days",
    link: "https://www.joinfleek.com/products/9611237196014",
    pricePerPc: "$28.59/pc",
  },
  {
    id: 7,
    name: "Nike New Balance Athletic Sneakers",
    supplier: "Fleek",
    sellType: "Package (~12 pcs)",
    grade: "Grade A/B",
    shipping: "Included in price · 20–27 days",
    link: "https://www.joinfleek.com/products/9606954549486",
    pricePerPc: "$30.14/pc",
  },
  {
    id: 8,
    name: "Salomon Trail Sneakers",
    supplier: "Fleek",
    sellType: "Package (~10 pcs)",
    grade: "Grade A/B",
    shipping: "Included in price · 20–27 days",
    link: "https://www.joinfleek.com/products/9560731943150",
    pricePerPc: "$31.93/pc",
  },
  {
    id: 9,
    name: "Vintage Sneakers Mix (Nike, Adidas, Puma)",
    supplier: "Best Vintage Wholesale",
    sellType: "Package (10–25 pcs)",
    grade: "Grade A/B",
    shipping: "Ships from NL · no EU customs",
    link: "https://bestvintagewholesale.com/collections/shoes",
    pricePerPc: "~$27–35/pc",
  },
  {
    id: 10,
    name: "Vintage Trainers & Sneakers Wholesale",
    supplier: "Thrift Vintage Fashion",
    sellType: "Bale / Package",
    grade: "Mix Vintage",
    shipping: "Ships from USA · free over $200 (EU customs apply)",
    link: "https://thriftvintagefashion.com/collections/shoes",
    pricePerPc: "~$15–25/pc",
  },
]

export const SNEAKERS_TIPS: string[] = [
  "Best ROI: Nike Air Max 90, 95, 97 and Adidas Samba/Gazelle consistently flip for €60–€120 on Vinted — look for these specifically when sorting packages on Fleek.",
  "Grade A matters for footwear: scratched midsoles and worn-down soles are very visible in listing photos. Grade A sneakers are worth the premium since they photograph better and get higher bids.",
  "US shipping (Thrift Vintage): a bale of sneakers attracts heavy EU customs (footwear is ~12% duty + VAT). Budget ~25% extra on top of the invoice price for Romanian/EU buyers.",
  "Best Vintage Wholesale (NL) is the cleanest EU sneaker source — ships within 24hrs, no customs friction for Romanian buyers.",
]

export type SupplierContact = {
  supplier: string
  platform: string
  contact: string
}

export const SNEAKERS_CONTACTS: SupplierContact[] = [
  { supplier: "JoinFleek (Fleek)", platform: "International marketplace", contact: "Direct chat with sellers via the Fleek messaging system" },
  { supplier: "Best Vintage Wholesale", platform: "Own website (Netherlands)", contact: "bestvintagewholesale.com/pages/contact" },
  { supplier: "Thrift Vintage Fashion", platform: "Own website (USA)", contact: "thriftvintagefashion.com/pages/contact-us" },
]

export const SNEAKERS_SUPPLIERS: Supplier[] = SNEAKERS_PACKAGES.map((pkg) => ({
  name: pkg.supplier,
  category: pkg.name,
  link: pkg.link,
  moq: pkg.sellType,
  quality: /Grade A[^/]/.test(pkg.grade) ? 5 : 4,
  platform: pkg.supplier.includes("Fleek") ? "Fleek" : "Direct",
  searchKeyword: pkg.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  route: "vintage" as const,
}))
