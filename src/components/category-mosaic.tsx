"use client"

import Link from "next/link"
import { Sparkles } from "lucide-react"
import { PRODUCTS, type Category } from "@/lib/products"

type FilterProps = {
  mode: "filter"
  active: Category
  onSelect: (tag: Category) => void
}

type LinkProps = {
  mode: "link"
}

export function CategoryMosaic(props: FilterProps | LinkProps) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-2">
        <Sparkles className="size-4 text-accent" />
        <h2 className="font-heading text-lg font-bold text-foreground">
          Browse by style
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-4">
        {PRODUCTS.map((product) => {
          if (props.mode === "link") {
            return (
              <Link
                key={product.id}
                href={`/bundle/${product.id}`}
                className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-border text-left transition-all duration-300 hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <img
                  src={product.image}
                  alt={product.tag}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-3 font-heading text-sm font-bold leading-tight text-foreground md:text-base">
                  {product.tag}
                </span>
              </Link>
            )
          }

          const isActive = props.active === product.tag
          return (
            <button
              key={product.id}
              type="button"
              onClick={() =>
                props.onSelect(isActive ? "All" : (product.tag as Category))
              }
              className={`group relative aspect-[3/4] overflow-hidden rounded-xl border text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                isActive
                  ? "border-accent ring-2 ring-accent/30"
                  : "border-border hover:border-accent/40"
              }`}
            >
              <img
                src={product.image}
                alt={product.tag}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-3 font-heading text-sm font-bold leading-tight text-foreground md:text-base">
                {product.tag}
              </span>
              {isActive && (
                <span className="absolute right-2 top-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
                  Active
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
