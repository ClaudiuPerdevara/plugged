"use client"

import { ExternalLink, ImageIcon, Package, Phone } from "lucide-react"
import {
  VINTAGE_WINDBREAKERS_CONTACTS,
  VINTAGE_WINDBREAKERS_IMAGE_SEARCH,
  VINTAGE_WINDBREAKERS_PACKAGES,
} from "@/lib/bundle-data/vintage-windbreakers"

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
      <div className="border-b border-border px-4 py-4 md:px-5">
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
      <div className="p-4 md:p-5">{children}</div>
    </div>
  )
}

export function VintageWindbreakersVault() {
  return (
    <div className="flex flex-col gap-5">
      <Section
        icon={Package}
        title="Wholesale Packages"
        description="11 packages from 8 suppliers — direct product links, MOQs and grade breakdowns."
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-[0.15em] text-muted-foreground">
                <th className="px-3 py-3 font-medium md:px-4">#</th>
                <th className="px-3 py-3 font-medium md:px-4">Package</th>
                <th className="px-3 py-3 font-medium md:px-4">Supplier</th>
                <th className="px-3 py-3 font-medium md:px-4">MOQ</th>
                <th className="px-3 py-3 font-medium md:px-4">Grade</th>
                <th className="px-3 py-3 font-medium md:px-4">Brands</th>
                <th className="px-3 py-3 font-medium md:px-4">Sizes</th>
                <th className="px-3 py-3 font-medium md:px-4">Link</th>
              </tr>
            </thead>
            <tbody>
              {VINTAGE_WINDBREAKERS_PACKAGES.map((pkg) => (
                <tr
                  key={pkg.id}
                  className="border-b border-border/60 align-top transition-colors last:border-0 hover:bg-secondary/40"
                >
                  <td className="px-3 py-4 font-mono text-xs text-muted-foreground md:px-4">
                    {pkg.id}
                  </td>
                  <td className="px-3 py-4 font-medium text-foreground md:px-4">
                    {pkg.name}
                    {pkg.notes ? (
                      <span className="mt-1 block text-xs font-normal text-muted-foreground">
                        {pkg.notes}
                      </span>
                    ) : null}
                  </td>
                  <td className="px-3 py-4 text-muted-foreground md:px-4">
                    {pkg.supplier}
                  </td>
                  <td className="px-3 py-4 text-muted-foreground md:px-4">
                    {pkg.moq}
                  </td>
                  <td className="px-3 py-4 md:px-4">
                    <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wide text-accent">
                      {pkg.grade}
                    </span>
                  </td>
                  <td className="max-w-[180px] px-3 py-4 text-xs leading-relaxed text-muted-foreground md:px-4">
                    {pkg.brands}
                  </td>
                  <td className="px-3 py-4 text-xs text-muted-foreground md:px-4">
                    {pkg.sizes}
                  </td>
                  <td className="px-3 py-4 md:px-4">
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
        icon={ImageIcon}
        title="Alternative Platforms — Image Search"
        description="Upload a jacket photo to find visually similar products from Chinese suppliers via shopping agents."
      >
        <div className="grid gap-3 md:grid-cols-3">
          {VINTAGE_WINDBREAKERS_IMAGE_SEARCH.map((platform) => (
            <a
              key={platform.name}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-border bg-card/50 p-4 transition-colors hover:border-accent/40 hover:bg-accent/5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-heading text-sm font-bold text-foreground">
                  {platform.name}
                </span>
                <ExternalLink className="size-3.5 text-muted-foreground transition-colors group-hover:text-accent" />
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {platform.note}
              </p>
            </a>
          ))}
        </div>
        <p className="mt-4 rounded-lg border border-border/60 bg-secondary/30 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
          Upload a picture of the desired vintage jacket → the platform searches
          for visually similar products → you receive links from Chinese suppliers
          → order through the agent (KakoBuy / Joyagoo / Superbuy).
        </p>
      </Section>

      <Section
        icon={Phone}
        title="Supplier Contacts"
        description="Direct contact routes for each wholesale source in this bundle."
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-[0.15em] text-muted-foreground">
                <th className="px-3 py-3 font-medium md:px-4">Supplier</th>
                <th className="px-3 py-3 font-medium md:px-4">Platform</th>
                <th className="px-3 py-3 font-medium md:px-4">Contact</th>
              </tr>
            </thead>
            <tbody>
              {VINTAGE_WINDBREAKERS_CONTACTS.map((row) => (
                <tr
                  key={row.supplier}
                  className="border-b border-border/60 transition-colors last:border-0 hover:bg-secondary/40"
                >
                  <td className="px-3 py-4 font-medium text-foreground md:px-4">
                    {row.supplier}
                  </td>
                  <td className="px-3 py-4 text-muted-foreground md:px-4">
                    {row.platform}
                  </td>
                  <td className="px-3 py-4 md:px-4">
                    {row.contactLink ? (
                      <a
                        href={row.contactLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-accent transition-opacity hover:opacity-80"
                      >
                        {row.contact}
                        <ExternalLink className="size-3.5" />
                      </a>
                    ) : (
                      <span className="text-muted-foreground">{row.contact}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  )
}
