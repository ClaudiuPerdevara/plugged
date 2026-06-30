import type { Supplier } from "@/lib/products"

export type OpiumProduct = {
  id: number
  name: string
  platform: string
  link: string
}

export type OpiumShop = {
  name: string
  platform: string
  link: string
}

export type ImageSearchPlatform = {
  name: string
  link: string
  note: string
}

/** Full downloadable archive served as a static asset. */
export const OPIUM_ARCHIVE = {
  file: "/api/vault/opium-archive",
  label: "Opium_Vendor_List.xlsx",
  sources: "2,400+",
}

/** Curated direct product links (via Joyagoo agent) — collected 28 Jun 2026. */
export const OPIUM_PRODUCTS: OpiumProduct[] = [
  { id: 1, name: "Rick Owens Shoes", platform: "Weidian", link: "https://joyagoo.com/product/?id=7387780735&shop_type=weidian&ref=300000173" },
  { id: 2, name: "All Kinds of Slippers (Good Quality)", platform: "Weidian", link: "https://joyagoo.com/shop?id=1810573965&platform=WEIDIAN&ref=300000173" },
  { id: 3, name: "Lanvin Curbs", platform: "Weidian", link: "https://joyagoo.com/product/?id=7389156624&shop_type=weidian&ref=300000173" },
  { id: 4, name: "No/Faith Studios Jeans", platform: "Taobao", link: "https://joyagoo.com/product?platform=TAOBAO&id=776842151892&ref=300000173" },
  { id: 5, name: "Vetements Jeans", platform: "Taobao", link: "https://joyagoo.com/product?platform=TAOBAO&id=807496934379&ref=300000173" },
  { id: 6, name: "Evisu Jeans", platform: "Weidian", link: "https://joyagoo.com/product?id=7609914593&platform=WEIDIAN&ref=300000173" },
  { id: 7, name: "Balenciaga SS25 Flares", platform: "Taobao", link: "https://joyagoo.com/product?platform=TAOBAO&id=904140060240&ref=300000173" },
  { id: 8, name: "Rick Owens Spiral Denim", platform: "Weidian", link: "https://joyagoo.com/product?platform=WEIDIAN&id=7704825883&ref=300000173" },
  { id: 9, name: "Rick Owens Patchwork Denim", platform: "Weidian", link: "https://joyagoo.com/product?id=7704817875&platform=WEIDIAN&ref=300000173" },
  { id: 10, name: "Balenciaga x Adidas", platform: "Weidian", link: "https://joyagoo.com/product/?shop_type=weidian&id=7706841058&ref=300000171" },
  { id: 11, name: "Rick Owens Destroyed Tyron Cut Denim", platform: "Weidian", link: "https://joyagoo.com/product?platform=WEIDIAN&id=7770883843&ref=300000173" },
  { id: 12, name: "Chrome Hearts Pants", platform: "Weidian", link: "https://joyagoo.com/product?platform=WEIDIAN&id=7773754514&ref=300000173" },
  { id: 13, name: "Balenciaga Low Rise Denims", platform: "Taobao", link: "https://joyagoo.com/product?platform=TAOBAO&id=954519339300&ref=300000173" },
  { id: 14, name: "Rick Owens Cargo Pants", platform: "Weidian", link: "https://joyagoo.com/product/?platform=weidian&id=7703819483&ref=300000173" },
  { id: 15, name: "Chrome Hearts Hoodie", platform: "Weidian", link: "https://joyagoo.com/product?id=7609854907&platform=WEIDIAN&ref=300000173" },
]

export const OPIUM_SHOPS: OpiumShop[] = [
  { name: "Rick Owens Footwear Seller", platform: "Taobao", link: "https://joyagoo.com/shop?spm=fxg_1325870.all_page.0.0.56b44e69VMN3fJ&id=109947050&platform=TAOBAO" },
  { name: "Number Nine Seller", platform: "Taobao", link: "https://joyagoo.com/shop?spm=fxg_1325870.all_page.0.0.20d54e69QwHQLS&id=109469774&platform=TAOBAO" },
  { name: "No/Faith Studios Seller", platform: "Taobao", link: "https://joyagoo.com/shop?spm=fxg_1325870.all_page.0.0.4cbb3032twED83&id=587409115&platform=TAOBAO" },
  { name: "Acne Studios Seller", platform: "Weidian", link: "https://joyagoo.com/shop?spm=fxg_1325870.all_page.0.0.7dff3032WFyHpX&id=1815652213&platform=WEIDIAN" },
  { name: "General Opium Fashion Seller", platform: "Weidian", link: "https://joyagoo.com/shop?spm=fxg_1325870.all_page.0.0.4a2030324KiZgX&id=1747322365&platform=WEIDIAN" },
]

export const OPIUM_IMAGE_SEARCH: ImageSearchPlatform[] = [
  { name: "KakoBuy", link: "https://www.kakobuy.com/search", note: "Chinese shopping agent with image search — finds similar items on Taobao / 1688 / Weidian." },
  { name: "Joyagoo", link: "https://joyagoo.com/search?searchType=imageSearch", note: "Direct image search (the agent used for all links here) — drop in a photo and get similar results." },
  { name: "Superbuy", link: "https://www.superbuy.com/en/page/search/", note: "Popular Chinese agent that also offers image-search sourcing." },
]

/** Shipping & agent guidance from the source brief. */
export const OPIUM_NOTES: { title: string; body: string }[] = [
  { title: "Agent role", body: "You buy from domestic Chinese sellers. The agent (Joyagoo) is your proxy: they purchase the item, receive it in their Chinese warehouse, take QC photos, then ship internationally." },
  { title: "QC photos", body: "Always review the Quality Control pictures the agent provides before shipping internationally, to confirm quality and accuracy." },
  { title: "Shipping costs", body: "International shipping is paid separately, based on the weight and volume of your accumulated haul." },
  { title: "Customs & taxes", body: "Shipping to the EU/UK — declare a correct value and pick a tax-free / tariffless line (often offered by the agent) to avoid customs issues and extra VAT." },
]

/** Maps the curated product links onto the generic Supplier shape for catalog use. */
export const OPIUM_SUPPLIERS: Supplier[] = OPIUM_PRODUCTS.map((p) => ({
  name: p.name,
  category: "Rep",
  link: p.link,
  moq: "1 unit",
  quality: 4,
  platform: p.platform,
  searchKeyword: p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  route: "agent",
}))
