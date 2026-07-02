"use client"

import { motion } from "framer-motion"
import { Lock, Star, ExternalLink } from "lucide-react"
import type { Product } from "@/lib/products"

/**
 * A tasteful "what's inside the vault" teaser for the bundle page. Shows the
 * real supplier count, platforms and quality ratings, but blurs the actual
 * supplier names/links — so buyers can see they're getting real, structured
 * data without the sources being handed out for free.
 */
export function VaultPreview({
  product,
  onUnlock,
}: {
  product: Product
  onUnlock: () => void
}) {
  const suppliers = product.suppliers ?? []
  if (suppliers.length === 0) return null
  const rows = suppliers.slice(0, 6)
  const count = suppliers.length

  return (
    <section className="mt-16 md:mt-24" data-testid="vault-preview">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Inside The Vault
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Exactly what you unlock.
          </h2>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-foreground">
          <Star className="size-3.5 fill-accent text-accent" />
          {count} vetted suppliers · lifetime
        </span>
      </div>

      <div className="relative mt-6 overflow-hidden rounded-3xl border border-border bg-card/40">
        {/* Column header */}
        <div className="grid grid-cols-[1.6fr_0.8fr_0.9fr_auto] items-center gap-3 border-b border-border px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:px-7">
          <span>Supplier</span>
          <span className="hidden sm:block">Platform</span>
          <span>Quality</span>
          <span className="justify-self-end">Link</span>
        </div>

        {/* Rows — names blurred; rows past the second are fully obscured */}
        <ul>
          {rows.map((s, i) => (
            <li
              key={i}
              className={`grid grid-cols-[1.6fr_0.8fr_0.9fr_auto] items-center gap-3 border-b border-border/60 px-5 py-4 last:border-b-0 md:px-7 ${
                i >= 2 ? "opacity-40 blur-[3px]" : ""
              }`}
            >
              <div className="min-w-0">
                <span className="block truncate font-heading text-sm font-bold text-foreground blur-[5px] select-none">
                  {s.name}
                </span>
                <span className="mt-0.5 block truncate text-xs text-muted-foreground blur-[3px] select-none">
                  {s.category} · MOQ {s.moq}
                </span>
              </div>
              <span className="hidden truncate text-xs font-medium text-foreground/80 sm:block">
                {s.platform}
              </span>
              <span className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`size-3 ${
                      j < Math.round(s.quality)
                        ? "fill-accent text-accent"
                        : "text-border"
                    }`}
                  />
                ))}
              </span>
              <span className="justify-self-end text-muted-foreground">
                <ExternalLink className="size-4" />
              </span>
            </li>
          ))}
        </ul>

        {/* Lock overlay + CTA */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center justify-end gap-4 bg-gradient-to-t from-background via-background/90 to-transparent pb-7 pt-24">
          <div className="pointer-events-auto flex flex-col items-center gap-4 text-center">
            <span className="grid size-12 place-items-center rounded-2xl border border-accent/40 bg-accent/10 text-accent">
              <Lock className="size-5" />
            </span>
            <p className="max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">
                {count} direct supplier links
              </span>{" "}
              — platforms, MOQs & quality ratings unlock instantly after
              checkout.
            </p>
            <button
              type="button"
              onClick={onUnlock}
              data-testid="vault-unlock-cta"
              className="flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-accent/30"
            >
              <Lock className="size-4" />
              Unlock the full list — €{product.price}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
