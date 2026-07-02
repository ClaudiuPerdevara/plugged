"use client"

import { Lock, Star, ExternalLink, Check } from "lucide-react"
import type { Product, Supplier } from "@/lib/products"

function QualityStars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, j) => (
        <Star
          key={j}
          className={`size-3 ${
            j < Math.round(rating) ? "fill-accent text-accent" : "text-border"
          }`}
        />
      ))}
    </span>
  )
}

/**
 * Locked teaser of the supplier vault, shown to buyers who DON'T own the bundle.
 * Responsive: stacked cards on mobile (no horizontal scrolling) and a full table
 * on md+. Sensitive fields are blurred behind a lock + CTA.
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
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
            {[
              "Direct seller links & contact",
              "Platform (Weidian / Taobao…)",
              "MOQ per supplier",
              "Quality rating",
              "Category breakdown",
              "Image-search keyword",
            ].map((f) => (
              <span key={f} className="inline-flex items-center gap-1.5">
                <Check className="size-3.5 text-accent" />
                {f}
              </span>
            ))}
          </div>
        </div>
        <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-foreground">
          <Star className="size-3.5 fill-accent text-accent" />
          {count} vetted suppliers · lifetime
        </span>
      </div>

      <div className="relative mt-6 overflow-hidden rounded-3xl border border-border bg-card/40">
        {/* Mobile: stacked cards (no horizontal scroll) */}
        <ul className="md:hidden">
          {rows.map((s, i) => (
            <li
              key={i}
              className={`border-b border-border/60 p-5 last:border-b-0 ${
                i >= 2 ? "opacity-40 blur-[3px]" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="min-w-0 flex-1 truncate font-heading text-sm font-bold text-foreground select-none blur-[5px]">
                  {s.name}
                </span>
                <QualityStars rating={s.quality} />
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    Category
                  </dt>
                  <dd className="mt-0.5 truncate text-foreground/90 select-none blur-[4px]">
                    {s.category}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    Platform
                  </dt>
                  <dd className="mt-0.5 truncate font-medium text-foreground/90">
                    {s.platform}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    MOQ
                  </dt>
                  <dd className="mt-0.5 text-foreground/90">{s.moq}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    Search keyword
                  </dt>
                  <dd className="mt-0.5 truncate font-mono text-foreground/90 select-none blur-[4px]">
                    {s.searchKeyword}
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>

        {/* Desktop: full table (fits without horizontal scroll at md+) */}
        <table className="hidden w-full border-collapse text-left md:table">
          <thead>
            <tr className="border-b border-border font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <th className="px-5 py-3.5 font-normal lg:px-7">Supplier</th>
              <th className="hidden px-3 py-3.5 font-normal lg:table-cell">
                Category
              </th>
              <th className="px-3 py-3.5 font-normal">Platform</th>
              <th className="px-3 py-3.5 font-normal">MOQ</th>
              <th className="px-3 py-3.5 font-normal">Quality</th>
              <th className="hidden px-3 py-3.5 font-normal xl:table-cell">
                Search keyword
              </th>
              <th className="px-5 py-3.5 text-right font-normal lg:px-7">Link</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s, i) => {
              const hiddenRow = i >= 2
              return (
                <tr
                  key={i}
                  className={`border-b border-border/60 last:border-b-0 ${
                    hiddenRow ? "opacity-40 blur-[3px]" : ""
                  }`}
                >
                  <td className="px-5 py-4 align-top lg:px-7">
                    <span className="block max-w-[220px] truncate font-heading text-sm font-bold text-foreground select-none blur-[5px]">
                      {s.name}
                    </span>
                  </td>
                  <td className="hidden px-3 py-4 align-top text-xs text-foreground/80 lg:table-cell">
                    <span className="select-none blur-[4px]">{s.category}</span>
                  </td>
                  <td className="px-3 py-4 align-top text-xs font-medium text-foreground/80">
                    {s.platform}
                  </td>
                  <td className="px-3 py-4 align-top text-xs text-foreground/80">
                    {s.moq}
                  </td>
                  <td className="px-3 py-4 align-top">
                    <QualityStars rating={s.quality} />
                  </td>
                  <td className="hidden px-3 py-4 align-top font-mono text-xs text-muted-foreground xl:table-cell">
                    <span className="select-none blur-[4px]">
                      {s.searchKeyword}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right align-top text-muted-foreground lg:px-7">
                    <span className="inline-flex">
                      <ExternalLink className="size-4" />
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center justify-end gap-4 bg-gradient-to-t from-background via-background/90 to-transparent pb-7 pt-24">
          <div className="pointer-events-auto flex flex-col items-center gap-4 px-5 text-center">
            <span className="grid size-12 place-items-center rounded-2xl border border-accent/40 bg-accent/10 text-accent">
              <Lock className="size-5" />
            </span>
            <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">
                {count} direct supplier links
              </span>{" "}
              — with contact, platform, MOQ, quality, category &amp; image-search
              keyword. Unlocks instantly after checkout.
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

export type { Supplier }
