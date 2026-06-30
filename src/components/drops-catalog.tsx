"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { ProductCard } from "./product-card"
import { PRODUCTS, CATEGORIES, type Category } from "@/lib/products"

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

export function DropsCatalog() {
  const [query, setQuery] = useState("")
  const [active, setActive] = useState<Category>("All")

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PRODUCTS.filter((p) => {
      const matchesCategory = active === "All" || p.tag === active
      const matchesQuery =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    }).sort((a, b) => {
      // Coming-soon bundles always sink to the bottom; everything else keeps
      // its catalog order.
      const aSoon = a.comingSoon ? 1 : 0
      const bSoon = b.comingSoon ? 1 : 0
      return aSoon - bSoon
    })
  }, [query, active])

  return (
    <section className="mx-auto w-full min-w-0 max-w-7xl px-5 pb-28 pt-32 md:px-8 md:pt-40">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl"
      >
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Style Vault
        </span>
        <h1 className="mt-4 text-balance font-heading text-5xl font-bold leading-[1] tracking-tight text-foreground md:text-6xl">
          Every aesthetic. One plug.
        </h1>
        <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          {PRODUCTS.length} vetted supplier bundles for young resellers — Opium,
          Y2K, racing, vintage sportswear and more. Pick your scene, unlock the
          links.
        </p>
      </motion.div>

      {/* Search + pill filters */}
      <div className="mt-14 flex flex-col gap-5 border-t border-border pt-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-heading text-2xl font-bold text-foreground" data-testid="drops-heading">
            {active === "All" ? "All bundles" : active}
            <span className="ml-2 font-mono text-sm font-normal text-muted-foreground">
              ({results.length})
            </span>
          </h2>
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search styles..."
              className="w-full rounded-full border border-border bg-card/60 py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground backdrop-blur-sm outline-none transition-colors focus:border-accent/60"
            />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CATEGORIES.map((cat) => {
            const isActive = active === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-card/40 text-muted-foreground hover:border-accent/50 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {results.length > 0 ? (
        <motion.div
          key={`${active}-${query}`}
          variants={container}
          initial="hidden"
          animate="visible"
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      ) : (
        <div className="mt-20 flex flex-col items-center gap-2 text-center">
          <p className="font-heading text-xl font-bold text-foreground">
            No drops found
          </p>
          <p className="text-sm text-muted-foreground">
            Try a different search or tap a style above.
          </p>
        </div>
      )}
    </section>
  )
}
