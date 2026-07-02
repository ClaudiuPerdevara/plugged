"use client"

import { ExternalLink, Package, Truck } from "lucide-react"
import { JEANS_NOTES, JEANS_PACKAGES } from "@/lib/bundle-data/jeans"

function Section({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-border bg-background/40">
      <div className="border-b border-border px-5 py-5">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
            <Icon className="size-4 text-accent" />
          </div>
          <div>
            <h4 className="font-heading text-sm font-bold tracking-tight text-foreground">
              {title}
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

export function JeansVault() {
  return (
    <div className="flex flex-col gap-5">
      <Section
        icon={Package}
        title="Wholesale Packages"
        description="12 packages from 10 suppliers — vintage Levi's/Lee/Wrangler & Y2K hip-hop baggy denim with direct links, per-piece pricing and grades. Updated 29 Jun 2026."
      >
        <div className="overflow-x-auto">
          <table className="vault-table w-full min-w-[980px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-[0.15em] text-muted-foreground">
                <th className="px-5 py-4 font-medium">#</th>
                <th className="px-5 py-4 font-medium">Package</th>
                <th className="px-5 py-4 font-medium">Supplier</th>
                <th className="px-5 py-4 font-medium">Price</th>
                <th className="px-5 py-4 font-medium">Per Piece</th>
                <th className="px-5 py-4 font-medium">Grade</th>
                <th className="px-5 py-4 font-medium">Shipping</th>
                <th className="px-5 py-4 font-medium">Link</th>
              </tr>
            </thead>
            <tbody>
              {JEANS_PACKAGES.map((pkg) => (
                <tr
                  key={pkg.id}
                  className="border-b border-border/60 align-top transition-colors last:border-0 hover:bg-secondary/40"
                >
                  <td className="px-5 py-5 font-mono text-xs text-muted-foreground">
                    {pkg.id}
                  </td>
                  <td className="whitespace-nowrap px-5 py-5 font-medium text-foreground">
                    {pkg.name}
                  </td>
                  <td className="px-5 py-5 text-muted-foreground">
                    {pkg.supplier}
                  </td>
                  <td className="whitespace-nowrap px-5 py-5 font-medium text-foreground">
                    {pkg.packagePrice}
                  </td>
                  <td className="whitespace-nowrap px-5 py-5 text-muted-foreground">
                    {pkg.perPiece}
                  </td>
                  <td className="px-5 py-5">
                    <span className="inline-flex whitespace-nowrap rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wide text-accent">
                      {pkg.grade}
                    </span>
                  </td>
                  <td className="min-w-[200px] max-w-[260px] px-5 py-5 text-xs leading-relaxed text-muted-foreground">
                    {pkg.shipping}
                  </td>
                  <td className="px-5 py-5">
                    <a
                      href={pkg.link}
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
      </Section>

      <Section
        icon={Truck}
        title="Supplier & Shipping Notes"
        description="Region, customs and quality tips for each source before you order."
      >
        <div className="grid gap-3 md:grid-cols-2">
          {JEANS_NOTES.map((row) => (
            <div
              key={row.supplier}
              className="rounded-xl border border-border bg-card/50 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-heading text-sm font-bold text-foreground">
                  {row.supplier}
                </span>
                <span className="shrink-0 rounded-full border border-border bg-background/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                  {row.region}
                </span>
              </div>
              <p className="mt-1 text-xs font-medium text-accent">
                Best for: {row.bestFor}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {row.note}
              </p>
              {row.contact ? (
                <p className="mt-2 text-[11px] text-foreground/70">
                  <span className="text-muted-foreground">Contact: </span>
                  {row.contact}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
