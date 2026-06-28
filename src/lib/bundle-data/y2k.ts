import type { Supplier } from "@/lib/products"

export type Y2kPackage = {
  id: number
  name: string
  supplier: string
  moq: string
  link: string
  grade: string
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
}

/** 12 Y2K wholesale packages from 7 suppliers — collected 28 Jun 2026. */
export const Y2K_PACKAGES: Y2kPackage[] = [
  {
    id: 1,
    name: "10x Harley Davidson T-Shirts",
    supplier: "Vintage Suppliers 1989",
    moq: "10 pcs",
    link: "https://vintagesuppliers1989.com/products/30x-harley-davidson-t-shirts-copy",
    grade: "Grade B",
    sizes: "S — XL",
    notes: "Women's Harley Davidson tees, mixed colors/styles · Duty-free EU/UK, zero customs",
  },
  {
    id: 2,
    name: "30x Y2K Jeans / Pants",
    supplier: "Vintage Suppliers 1989",
    moq: "30 pcs",
    link: "https://vintagesuppliers1989.com/products/30x-y2k-jeans-pants",
    grade: "Grade A",
    sizes: "28 — 36",
    notes: "Authentic Y2K baggy, flared & capri · Duty-free EU/UK, zero customs",
  },
  {
    id: 3,
    name: "30x Printed T-Shirts",
    supplier: "Vintage Suppliers 1989",
    moq: "30 pcs",
    link: "https://vintagesuppliers1989.com/products/30x-printed-t-shirts-grade-b",
    grade: "Grade B",
    sizes: "Mixed",
    notes: "Cartoons, US graphics, rock bands, music icons · Duty-free EU/UK",
  },
  {
    id: 4,
    name: "10kg Y2K Mix Box",
    supplier: "Vintage Suppliers 1989",
    moq: "10 kg",
    link: "https://vintagesuppliers1989.com/products/y2k-mix",
    grade: "Grade A",
    sizes: "S — XL",
    notes: "Baggy jeans, crop tops, tees, low-rise, rhinestones · Duty-free EU/UK",
  },
  {
    id: 5,
    name: "25x Miss Me / Rock Revival Jeans",
    supplier: "Vintage Wholesale Supply Ltd",
    moq: "25 pcs",
    link: "https://vintagewholesalesupplyltd.com/en-eu/products/womensmissmejeans",
    grade: "Grade A",
    sizes: "Mixed",
    notes: "2000s Miss Me & Rock Revival · Worldwide shipping, ready to ship",
  },
  {
    id: 6,
    name: "20x Mix Ropa Y2K Vintage",
    supplier: "SP Vintage Wholesale",
    moq: "20 pcs",
    link: "https://spvintagewholesale.com/en/products/20-mix-ropa-y2k-vintage",
    grade: "Verified Mix",
    sizes: "Mixed",
    notes: "Tight tops, cropped shirts, mini skirts, low-rise, satin · Zero EU customs",
  },
  {
    id: 7,
    name: "Y2K Branded Starter Box (7kg)",
    supplier: "SP Vintage Wholesale",
    moq: "7 kg",
    link: "https://spvintagewholesale.com/en/products/branded-y2k-reseller-box",
    grade: "Branded",
    sizes: "Mixed",
    notes: "Authentic branded pieces · Ships from EU, 2–12 wks · 50–150% margin",
  },
  {
    id: 8,
    name: "20x Y2K Sweaters",
    supplier: "SP Vintage Wholesale",
    moq: "20 pcs",
    link: "https://spvintagewholesale.com/en/products/10x-jerseis-y2k-vintage",
    grade: "Vintage",
    sizes: "Mixed",
    notes: "Authentic second-hand Y2K sweaters · Ships from EU, 2–12 wks",
  },
  {
    id: 9,
    name: "Box Y2K Mix",
    supplier: "Vintagism",
    moq: "Box",
    link: "https://vintagism.eu/product/box-y2k-mix/",
    grade: "Mix",
    sizes: "Mixed",
    notes: "Curated mixed Y2K box",
  },
  {
    id: 10,
    name: "Music Print T-Shirts",
    supplier: "ZAHA VINTAGE (Fleek)",
    moq: "20 pcs",
    link: "https://www.joinfleek.com/products/zv2133-music-print-t-shirts",
    grade: "A / B / C",
    sizes: "XS — XXL",
    notes: "Band & artist graphics, cotton blend · Shipping included, 14–21 days",
  },
  {
    id: 11,
    name: "Y2K Baby Tees",
    supplier: "Creed Women (Fleek)",
    moq: "15 pcs",
    link: "https://www.joinfleek.com/products/iq0491-y2k-baby-shirts",
    grade: "A / B / C",
    sizes: "XS — XL",
    notes: "Early 2000s cropped fits, bold graphics · Shipping included via Fleek",
  },
  {
    id: 12,
    name: "Y2K Supply — General Store",
    supplier: "Y2K Supply",
    moq: "Varies",
    link: "https://www.y2k-supply.com",
    grade: "Mix",
    sizes: "Mixed",
    notes: "Full Y2K supply website — browse the general catalog",
  },
]

export const Y2K_IMAGE_SEARCH: ImageSearchPlatform[] = [
  {
    name: "KakoBuy",
    link: "https://www.kakobuy.com/search",
    note: "Chinese shopping agent with image search — finds similar items on Taobao / 1688 / Weidian.",
  },
  {
    name: "Joyagoo",
    link: "https://joyagoo.com/search?searchType=imageSearch",
    note: "Direct image search — drop in a photo of the piece and get visually similar results.",
  },
  {
    name: "Superbuy",
    link: "https://www.superbuy.com/en/page/search/",
    note: "Popular Chinese agent that also offers image-search sourcing.",
  },
]

export const Y2K_CONTACTS: SupplierContact[] = [
  {
    supplier: "Vintage Suppliers 1989",
    platform: "Own site (Shopify)",
    contact: "Wholesale contact form on site",
  },
  {
    supplier: "Vintage Wholesale Supply Ltd",
    platform: "Own site (Shopify)",
    contact: "Live chat (Gorgias) widget on site",
  },
  {
    supplier: "SP Vintage Wholesale",
    platform: "Own site (Shopify)",
    contact: "spvintagewholesale@gmail.com · 24/7 support",
  },
  {
    supplier: "Vintagism",
    platform: "Own site",
    contact: "Via website",
  },
  {
    supplier: "ZAHA VINTAGE",
    platform: "Fleek Marketplace",
    contact: "Via Fleek platform messaging",
  },
  {
    supplier: "Creed Women",
    platform: "Fleek Marketplace",
    contact: "Via Fleek platform messaging",
  },
]

/** Maps the Y2K packages onto the generic Supplier shape for catalog use. */
export const Y2K_SUPPLIERS: Supplier[] = Y2K_PACKAGES.map((pkg) => ({
  name: pkg.supplier,
  category: pkg.name,
  link: pkg.link,
  moq: pkg.moq,
  quality: pkg.grade.includes("A") ? 5 : 4,
  platform: pkg.supplier.includes("Fleek") ? "Fleek" : "Direct",
  searchKeyword: pkg.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  route: "vintage",
}))
