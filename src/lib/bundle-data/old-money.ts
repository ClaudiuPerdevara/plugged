import type { Supplier } from "@/lib/products"

export type OldMoneyPackage = {
  id: number
  name: string
  supplier: string
  sellType: string
  grade: string
  shipping: string
  link: string
}

export type OldMoneyCategory = {
  title: string
  description: string
  packages: OldMoneyPackage[]
}

/** Hand-picked premium-brand packages (Ralph Lauren, Lacoste, Tommy, Burberry), grouped by category. Updated 29 Jun 2026. */
export const OLD_MONEY_CATEGORIES: OldMoneyCategory[] = [
  {
    title: "Reseller Boxes",
    description:
      "Pre-mixed 15kg premium boxes — the best value/quality ratio, ready to flip straight out of the box.",
    packages: [
      { id: 1, name: "Ralph Lauren & Lacoste Reseller Box", supplier: "SP Vintage", sellType: "15 KG", grade: "Mix Premium", shipping: "Ships from Spain · no EU customs", link: "https://spvintagewholesale.com/en/products/ralph-lauren-lacoste-reseller-box-15kg" },
      { id: 2, name: "Burberry Vintage Reseller Box", supplier: "SP Vintage", sellType: "15 KG", grade: "Mix Premium", shipping: "Ships from Spain · no EU customs", link: "https://spvintagewholesale.com/en/products/burberry-vintage-reseller-box-15kg" },
      { id: 3, name: "Ralph Lauren Reseller Box", supplier: "SP Vintage", sellType: "15 KG", grade: "Mix Premium", shipping: "Ships from Spain · no EU customs", link: "https://spvintagewholesale.com/en/products/ralph-lauren-reseller-box-15kg" },
      { id: 4, name: "Burberry & Lacoste Reseller Box", supplier: "SP Vintage", sellType: "15 KG", grade: "Mix Premium", shipping: "Ships from Spain · no EU customs", link: "https://spvintagewholesale.com/en/products/burberry-lacoste-reseller-box-15kg" },
    ],
  },
  {
    title: "Polos, T-Shirts & Knitwear",
    description:
      "Polo shirts and quarter-zips — the backbone of the Old Money look.",
    packages: [
      { id: 5, name: "Ralph Lauren Collection (Mix)", supplier: "Fleek", sellType: "Bale / pack", grade: "Mix", shipping: "Shipping included! · 20–27 days", link: "https://www.joinfleek.com/collections/ralph-lauren" },
      { id: 6, name: "Ralph Lauren Polo Shirts", supplier: "Thrift Vintage", sellType: "Bale / pack", grade: "Mix Vintage", shipping: "Ships from USA · high EU customs", link: "https://thriftvintagefashion.com/products/w1-ralph-lauren-polo-shirts" },
      { id: 7, name: "Ralph Lauren Polo Shirts", supplier: "Vintage Supply EU", sellType: "Pack", grade: "A / B", shipping: "Ships from Netherlands (EU) · no RO customs", link: "https://vintagesupplyeurope.com/en/products/ralph-lauren-polo-shirts?variant=50773987557642" },
      { id: 8, name: "Top Brands Mix Polos (RL, Lacoste, Tommy)", supplier: "Fleek", sellType: "Pack", grade: "Mix", shipping: "Shipping included! · 20–27 days", link: "https://www.joinfleek.com/products/top-brands-mix-polos-ralph-lauren-fred-perry-fila-lacoste-tommy" },
      { id: 9, name: "Polo T-Shirts (RL, Lacoste, Fred Perry)", supplier: "Fleek", sellType: "Pack", grade: "Mix", shipping: "Shipping included! · 20–27 days", link: "https://www.joinfleek.com/products/ralph-lauren-lacoste-fred-perry-t-shirts-polo-1" },
      { id: 10, name: "Polos Ralph Lauren (Mix)", supplier: "SP Vintage", sellType: "20+ pcs", grade: "Mix Premium", shipping: "Ships from Spain · no EU customs", link: "https://spvintagewholesale.com/en/products/polos-ralph-lauren" },
      { id: 11, name: "Polos Lacoste (Mix)", supplier: "SP Vintage", sellType: "20+ pcs", grade: "Mix Premium", shipping: "Ships from Spain · no EU customs", link: "https://spvintagewholesale.com/en/products/polos-lacoste" },
      { id: 12, name: "Polos Tommy Hilfiger (Mix)", supplier: "SP Vintage", sellType: "20+ pcs", grade: "Mix Premium", shipping: "Ships from Spain · no EU customs", link: "https://spvintagewholesale.com/en/products/polos-tommy-hilfiger" },
      { id: 13, name: "Ralph Lauren Polos", supplier: "Vintagism", sellType: "Per Kg", grade: "Mix", shipping: "EU · shipping calculated after order", link: "https://vintagism.eu/product/ralph-lauren-polos/" },
      { id: 14, name: "Branded Polos Mix", supplier: "Vintagism", sellType: "Per Kg", grade: "Mix", shipping: "EU · shipping calculated after order", link: "https://vintagism.eu/product/branded-polos/" },
      { id: 15, name: "Ralph Lauren Polo Shirts (Grade A)", supplier: "Vintage Wh. Supply", sellType: "50x pack", grade: "Grade A", shipping: "Ships from UK · watch EU customs", link: "https://vintagewholesalesupplyltd.com/en-eu/products/ralphlaurenpoloshirtsa" },
      { id: 16, name: "Ralph Lauren Quarter Zips", supplier: "Vintage Wh. Supply", sellType: "Pack", grade: "Grade A/B", shipping: "Ships from UK · watch EU customs", link: "https://vintagewholesalesupplyltd.com/en-eu/products/ralphlaurenquarterzipa" },
      { id: 17, name: "Ralph Lauren Women's Knitwear", supplier: "Vintage Wh. Supply", sellType: "Pack", grade: "Mix", shipping: "Ships from UK · watch EU customs", link: "https://vintagewholesalesupplyltd.com/en-eu/products/ralphlaurenwomensknitwear" },
    ],
  },
  {
    title: "Shirts",
    description:
      "Small-logo Oxford shirts — fast sellers on Vinted, Depop and Grailed.",
    packages: [
      { id: 18, name: "Premium Branded Shirts Mix", supplier: "SP Vintage", sellType: "Pack", grade: "Mix Premium", shipping: "Ships from Spain · no EU customs", link: "https://spvintagewholesale.com/en/products/mix-camisas-de-marca-premium" },
      { id: 19, name: "Pre-Order Tommy Hilfiger Shirts Mix", supplier: "SP Vintage", sellType: "Pack", grade: "Mix Premium", shipping: "Ships from Spain · no EU customs", link: "https://spvintagewholesale.com/en/products/pre-order-mix-camisas-tommy-hilfiger" },
      { id: 20, name: "Ralph Lauren Shirts Mix", supplier: "SP Vintage", sellType: "Pack", grade: "Mix Premium", shipping: "Ships from Spain · no EU customs", link: "https://spvintagewholesale.com/en/products/mix-camisas-ralph-lauren" },
      { id: 21, name: "Tommy Hilfiger Men's Shirts", supplier: "Fleek", sellType: "Pack", grade: "Grade A/B", shipping: "Shipping included! · 20–27 days", link: "https://www.joinfleek.com/products/zv1617-tommy-hilfiger-men-s-shirt-1" },
    ],
  },
  {
    title: "Trousers & Chinos",
    description:
      "Chinos and tailored trousers to complete the Old Money fit.",
    packages: [
      { id: 22, name: "Lauren Ralph Lauren Men's Trousers", supplier: "Vintage Wh. Supply", sellType: "Pack", grade: "Mix Vintage", shipping: "Ships from UK · watch EU customs", link: "https://vintagewholesalesupplyltd.com/en-eu/products/laurenralphlaurenmenstrousers" },
    ],
  },
]

export const OLD_MONEY_TIPS: string[] = [
  "Presentation matters: iron every piece and shoot in bright (ideally styled / on-model) light to sell Ralph Lauren or Burberry at a high margin.",
  "Never machine-wash knitwear hot — RL wool/cashmere sweaters shrink. Always hand-wash or use a wool cycle.",
  "Authenticity: SP Vintage and the UK platforms vet their stock well — buying Old Money directly from them keeps you clear of the many 2000s fake Polo Ralph Lauren pieces.",
]

const ALL_PACKAGES = OLD_MONEY_CATEGORIES.flatMap((c) => c.packages)

/** Maps every package onto the generic Supplier shape for catalog use. */
export const OLD_MONEY_SUPPLIERS: Supplier[] = ALL_PACKAGES.map((pkg) => ({
  name: pkg.supplier,
  category: pkg.name,
  link: pkg.link,
  moq: pkg.sellType,
  quality: pkg.grade.includes("A") ? 5 : 4,
  platform: pkg.supplier.includes("Fleek") ? "Fleek" : "Direct",
  searchKeyword: pkg.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  route: "vintage",
}))
