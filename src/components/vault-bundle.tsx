"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ExternalLink, KeyRound, LifeBuoy, Star } from "lucide-react"
import type { Product, Supplier, SourcingRoute } from "@/lib/products"
import { VintageWindbreakersVault } from "./vintage-windbreakers-vault"
import { FootballTshirtsVault } from "./football-tshirts-vault"
import { Y2kVault } from "./y2k-vault"
import { OpiumVault } from "./opium-vault"
import { JeansVault } from "./jeans-vault"
import { OldMoneyVault } from "./old-money-vault"
import { CarharttVault } from "./carhartt-vault"
import { SportswearVault } from "./sportswear-vault"
import { RacingVault } from "./racing-vault"

function QualityStars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-3.5 ${
            i < rating
              ? "fill-accent text-accent"
              : "fill-transparent text-muted-foreground/40"
          }`}
        />
      ))}
    </span>
  )
}

const ROUTE_META: Record<
  SourcingRoute,
  { title: string; description: string }
> = {
  agent: {
    title: "1:1 Direct Agents & Sourcing",
    description:
      "Weidian / Taobao links via shipping agents — QC in warehouse, pay intl shipping by weight.",
  },
  vintage: {
    title: "Vintage Wholesale & Bulk Bales",
    description:
      "Authentic second-hand bulk — graded bales, by-weight lots, zero replica risk on Vinted.",
  },
}

function SupplierTable({
  title,
  description,
  rows,
}: {
  title: string
  description: string
  rows: Supplier[]
}) {
  if (rows.length === 0) return null

  return (
    <div className="rounded-xl border border-border bg-background/40">
      <div className="border-b border-border px-5 py-5">
        <h4 className="font-heading text-sm font-bold tracking-tight text-foreground">
          {title}
        </h4>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      {/* Mobile: stacked cards — no horizontal scrolling */}
      <ul className="divide-y divide-border/60 md:hidden">
        {rows.map((s) => (
          <li key={s.name} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span className="block truncate font-medium text-foreground">
                  {s.name}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {s.category} · MOQ {s.moq}
                </span>
              </div>
              <QualityStars rating={s.quality} />
            </div>
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-xs text-muted-foreground">
                {s.platform}
              </span>
              <a
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-accent transition-colors hover:border-accent"
              >
                Open
                <ExternalLink className="size-3.5" />
              </a>
            </div>
            <p className="mt-2.5 truncate font-mono text-[11px] text-muted-foreground">
              🔍 {s.searchKeyword}
            </p>
          </li>
        ))}
      </ul>

      {/* Desktop: full table (fits at md+; keyword column hidden below lg) */}
      <div className="hidden md:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-[0.15em] text-muted-foreground">
              <th className="px-5 py-4 font-medium">Supplier</th>
              <th className="px-5 py-4 font-medium">Platform</th>
              <th className="px-5 py-4 font-medium">Quality</th>
              <th className="hidden px-5 py-4 font-medium lg:table-cell">
                Search keyword
              </th>
              <th className="px-5 py-4 text-right font-medium">Link</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr
                key={s.name}
                className="border-b border-border/60 transition-colors last:border-0 hover:bg-secondary/40"
              >
                <td className="px-5 py-5 align-top font-medium text-foreground">
                  {s.name}
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {s.category} · MOQ {s.moq}
                  </span>
                </td>
                <td className="px-5 py-5 align-top text-muted-foreground">
                  {s.platform}
                </td>
                <td className="px-5 py-5 align-top">
                  <QualityStars rating={s.quality} />
                </td>
                <td className="hidden px-5 py-5 align-top font-mono text-xs text-muted-foreground lg:table-cell">
                  {s.searchKeyword}
                </td>
                <td className="px-5 py-5 text-right align-top">
                  <a
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-accent transition-opacity hover:opacity-80"
                  >
                    Open
                    <ExternalLink className="size-3.5" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function VaultBundle({ product }: { product: Product }) {
  const [open, setOpen] = useState(false)
  const agentSuppliers = product.suppliers.filter((s) => s.route === "agent")
  const vintageSuppliers = product.suppliers.filter((s) => s.route === "vintage")

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-sm">
      <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center md:p-7">
        <div className="relative size-20 shrink-0 overflow-hidden rounded-xl">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex-1">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            {product.tag}
          </span>
          <h3 className="mt-1 font-heading text-lg font-bold tracking-tight text-foreground">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {product.id === "vintage-windbreakers"
              ? "11 wholesale packages · 8 suppliers · image search tools"
              : product.id === "opium"
                ? "2,400+ sources archive · 15 rep links · image search"
                : product.id === "y2k"
                  ? "12 wholesale packages · 7 suppliers · image search tools"
                  : product.id === "football-tshirts"
                    ? "10 wholesale packages · 7 suppliers · per-piece pricing"
                    : product.id === "jeans"
                      ? "12 wholesale packages · 10 suppliers · per-piece pricing"
                      : product.id === "old-money"
                        ? "22 plugs · 4 categories · premium brands"
                        : product.id === "carhartt"
                          ? "14 wholesale packages · 6 suppliers · Carhartt & Dickies"
                          : product.id === "sportswear"
                            ? "18 wholesale packages · 3 categories · Nike & Adidas"
                            : product.id === "racing"
                              ? "8 premium packages · NASCAR · Ferrari · F1"
                              : `${product.suppliers.length} suppliers · ${agentSuppliers.length} agent · ${vintageSuppliers.length} vintage`}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-transform duration-300 hover:scale-[1.03]"
        >
          <KeyRound className="size-4" />
          {open ? "Hide Plugs" : "Access Plugs"}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="border-t border-border"
          >
            <div className="flex flex-col gap-5 p-6 md:p-7">
              <div
                className="flex items-start gap-3 rounded-xl border border-border bg-background/40 px-4 py-3.5"
                data-testid="broken-link-help"
              >
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                  <LifeBuoy className="size-4" />
                </span>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    Link not working?
                  </span>{" "}
                  Every plug opens in a new tab — if it doesn&apos;t load, refresh
                  and retry it once. Still down? Use the image-search keyword to
                  find a live equivalent, or{" "}
                  <Link
                    href="/support"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-accent underline-offset-2 hover:underline"
                  >
                    message Support
                  </Link>{" "}
                  and we&apos;ll send a working replacement within 24h.
                </p>
              </div>
              {product.id === "vintage-windbreakers" ? (
                <VintageWindbreakersVault />
              ) : product.id === "opium" ? (
                <OpiumVault />
              ) : product.id === "y2k" ? (
                <Y2kVault />
              ) : product.id === "football-tshirts" ? (
                <FootballTshirtsVault />
              ) : product.id === "jeans" ? (
                <JeansVault />
              ) : product.id === "old-money" ? (
                <OldMoneyVault />
              ) : product.id === "carhartt" ? (
                <CarharttVault />
              ) : product.id === "sportswear" ? (
                <SportswearVault />
              ) : product.id === "racing" ? (
                <RacingVault />
              ) : (
                <>
                  <SupplierTable
                    title={ROUTE_META.agent.title}
                    description={ROUTE_META.agent.description}
                    rows={agentSuppliers}
                  />
                  <SupplierTable
                    title={ROUTE_META.vintage.title}
                    description={ROUTE_META.vintage.description}
                    rows={vintageSuppliers}
                  />
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}
