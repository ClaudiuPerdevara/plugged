"use client"

import { ExternalLink, Lightbulb, Package, Truck } from "lucide-react"
import {
  CARHARTT_CATEGORIES,
  CARHARTT_NOTES,
  CARHARTT_TIPS,
} from "@/lib/bundle-data/carhartt"

export function CarharttVault() {
  return (
    <div className="flex flex-col gap-5" data-testid="carhartt-vault">
      {CARHARTT_CATEGORIES.map((cat, idx) => (
        <div
          key={cat.title}
          className="rounded-xl border border-border bg-background/40"
        >
          <div className="flex items-start gap-3 border-b border-border px-5 py-5">
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
              <Package className="size-4 text-accent" />
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold tracking-tight text-foreground">
                <span className="mr-1.5 font-mono text-accent">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                {cat.title}
                <span className="ml-2 font-mono text-[11px] font-normal text-muted-foreground">
                  {cat.packages.length} plugs
                </span>
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {cat.description}
              </p>
            </div>
          </div>
          <div className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    <th className="px-5 py-4 font-medium">#</th>
                    <th className="px-5 py-4 font-medium">Package</th>
                    <th className="px-5 py-4 font-medium">Supplier</th>
                    <th className="px-5 py-4 font-medium">Type</th>
                    <th className="px-5 py-4 font-medium">Grade</th>
                    <th className="px-5 py-4 font-medium">Shipping</th>
                    <th className="px-5 py-4 font-medium">Link</th>
                  </tr>
                </thead>
                <tbody>
                  {cat.packages.map((pkg) => (
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
                      <td className="whitespace-nowrap px-5 py-5 text-muted-foreground">
                        {pkg.sellType}
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
                          data-testid={`carhartt-plug-link-${pkg.id}`}
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
        </div>
      ))}

      <div className="rounded-xl border border-border bg-background/40">
        <div className="flex items-start gap-3 border-b border-border px-5 py-5">
          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
            <Truck className="size-4 text-accent" />
          </div>
          <div>
            <h4 className="font-heading text-sm font-bold tracking-tight text-foreground">
              Supplier & Shipping Notes
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Where each Carhartt / Dickies source ships from, what it&apos;s
              best for and how to reach them.
            </p>
          </div>
        </div>
        <div className="grid gap-3 p-5 md:grid-cols-2">
          {CARHARTT_NOTES.map((row) => (
            <div
              key={row.supplier}
              className="rounded-xl border border-border bg-card/50 p-4"
            >
              <div className="flex items-center justify-between gap-3">
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
                {row.shipping}
              </p>
              <p className="mt-2 text-[11px] text-foreground/70">
                <span className="text-muted-foreground">Contact: </span>
                {row.contact}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-background/40">
        <div className="flex items-start gap-3 border-b border-border px-5 py-5">
          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
            <Lightbulb className="size-4 text-accent" />
          </div>
          <h4 className="font-heading text-sm font-bold tracking-tight text-foreground">
            Selling Tips for the Carhartt / Workwear Niche
          </h4>
        </div>
        <ul className="flex flex-col gap-3 p-5">
          {CARHARTT_TIPS.map((tip) => (
            <li
              key={tip}
              className="flex gap-3 text-xs leading-relaxed text-muted-foreground"
            >
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
