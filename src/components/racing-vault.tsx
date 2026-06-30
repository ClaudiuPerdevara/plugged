"use client"

import { ExternalLink, Flag, Lightbulb, Phone } from "lucide-react"
import {
  RACING_CONTACTS,
  RACING_PACKAGES,
  RACING_TIPS,
} from "@/lib/bundle-data/racing"

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

export function RacingVault() {
  return (
    <div className="flex flex-col gap-5">
      <Section
        icon={Flag}
        title={`Racing Jackets, Tees & Sweats (${RACING_PACKAGES.length} premium packages)`}
        description="NASCAR, Ferrari & F1 racing jackets, graphic auto/moto tees and racing sweats — one of the most hype vintage niches. Single jackets resell for €100–€300."
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-[0.15em] text-muted-foreground">
                <th className="px-3 py-3 font-medium">Package</th>
                <th className="px-3 py-3 font-medium">Supplier</th>
                <th className="px-3 py-3 font-medium">Type</th>
                <th className="px-3 py-3 font-medium">Grade</th>
                <th className="px-3 py-3 font-medium">Shipping</th>
                <th className="px-3 py-3 font-medium">Link</th>
              </tr>
            </thead>
            <tbody>
              {RACING_PACKAGES.map((pkg) => (
                <tr
                  key={pkg.id}
                  className="border-b border-border/60 align-top transition-colors last:border-0 hover:bg-secondary/40"
                >
                  <td className="px-3 py-3.5 font-medium text-foreground">
                    {pkg.name}
                  </td>
                  <td className="px-3 py-3.5 text-muted-foreground">
                    {pkg.supplier}
                  </td>
                  <td className="px-3 py-3.5 text-muted-foreground">
                    {pkg.sellType}
                  </td>
                  <td className="px-3 py-3.5">
                    <span className="inline-flex whitespace-nowrap rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wide text-accent">
                      {pkg.grade}
                    </span>
                  </td>
                  <td className="max-w-[200px] px-3 py-3.5 text-xs leading-relaxed text-muted-foreground">
                    {pkg.shipping}
                  </td>
                  <td className="px-3 py-3.5">
                    <a
                      href={pkg.link}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
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
        icon={Lightbulb}
        title="Selling Tips — Racing Core"
        description="How to turn these jackets into €100–€300 flips."
      >
        <ul className="flex flex-col gap-3">
          {RACING_TIPS.map((tip, i) => (
            <li
              key={i}
              className="flex gap-3 rounded-lg border border-border/60 bg-secondary/30 px-4 py-3 text-xs leading-relaxed text-muted-foreground"
            >
              <span className="font-mono font-bold text-accent">{i + 1}.</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        icon={Phone}
        title="Supplier Contacts"
        description="Direct contact routes for each wholesale source in this bundle."
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-[0.15em] text-muted-foreground">
                <th className="px-3 py-3 font-medium">Supplier</th>
                <th className="px-3 py-3 font-medium">Platform</th>
                <th className="px-3 py-3 font-medium">Contact</th>
              </tr>
            </thead>
            <tbody>
              {RACING_CONTACTS.map((row) => (
                <tr
                  key={row.supplier}
                  className="border-b border-border/60 transition-colors last:border-0 hover:bg-secondary/40"
                >
                  <td className="px-3 py-3.5 font-medium text-foreground">
                    {row.supplier}
                  </td>
                  <td className="px-3 py-3.5 text-muted-foreground">
                    {row.platform}
                  </td>
                  <td className="px-3 py-3.5 text-muted-foreground">
                    {row.contact}
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
