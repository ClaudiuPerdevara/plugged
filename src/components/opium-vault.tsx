"use client"

import {
  Download,
  ExternalLink,
  ImageIcon,
  Package,
  Store,
  Truck,
} from "lucide-react"
import {
  OPIUM_ARCHIVE,
  OPIUM_IMAGE_SEARCH,
  OPIUM_NOTES,
  OPIUM_PRODUCTS,
  OPIUM_SHOPS,
} from "@/lib/bundle-data/opium"

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

export function OpiumVault() {
  return (
    <div className="flex flex-col gap-5">
      {/* Archive download */}
      <Section
        icon={Download}
        title="The 2,400+ Sources Archive"
        description="The complete vendor archive — a downloadable spreadsheet packed with links to thousands of Opium-style products and sellers."
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">
              {OPIUM_ARCHIVE.sources} sources & products in one file
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Because the archive is huge, some links may be dead or sold out.
              When that happens, screenshot the model/product photo and run it
              through the image-search platforms below to find a live equivalent.
            </p>
          </div>
          <a
            href={OPIUM_ARCHIVE.file}
            download
            data-testid="opium-archive-download"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            <Download className="size-4" />
            Download archive (.xlsx)
          </a>
        </div>
      </Section>

      {/* Curated products */}
      <Section
        icon={Package}
        title="Curated Product Links"
        description="15 hand-picked rep links via Joyagoo — Rick Owens, Balenciaga, Chrome Hearts, Vetements & co."
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-[0.15em] text-muted-foreground">
                <th className="px-5 py-4 font-medium">#</th>
                <th className="px-5 py-4 font-medium">Item</th>
                <th className="px-5 py-4 font-medium">Platform</th>
                <th className="px-5 py-4 font-medium">Link</th>
              </tr>
            </thead>
            <tbody>
              {OPIUM_PRODUCTS.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-border/60 transition-colors last:border-0 hover:bg-secondary/40"
                >
                  <td className="px-5 py-5 font-mono text-xs text-muted-foreground">
                    {p.id}
                  </td>
                  <td className="px-5 py-5 font-medium text-foreground">
                    {p.name}
                  </td>
                  <td className="px-5 py-5">
                    <span className="inline-flex whitespace-nowrap rounded-full border border-border bg-secondary/40 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                      {p.platform}
                    </span>
                  </td>
                  <td className="px-5 py-5">
                    <a
                      href={p.link}
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

      {/* Specific shops */}
      <Section
        icon={Store}
        title="Specialist Sellers"
        description="Whole-store links worth browsing for deeper catalogs."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {OPIUM_SHOPS.map((shop) => (
            <a
              key={shop.name}
              href={shop.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card/50 p-4 transition-colors hover:border-accent/40 hover:bg-accent/5"
            >
              <div>
                <span className="block font-heading text-sm font-bold text-foreground">
                  {shop.name}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                  {shop.platform}
                </span>
              </div>
              <ExternalLink className="size-3.5 text-muted-foreground transition-colors group-hover:text-accent" />
            </a>
          ))}
        </div>
      </Section>

      {/* Image search */}
      <Section
        icon={ImageIcon}
        title="Image Search — Find Dead Links Again"
        description="The primary sourcing method: upload the model/product photo to find visually similar reps from Chinese sellers."
      >
        <div className="grid gap-3 md:grid-cols-3">
          {OPIUM_IMAGE_SEARCH.map((platform) => (
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
          Upload a picture of the Opium item (Rick Owens, Balenciaga, etc.) → the
          platform finds visually similar reps → you receive seller links → order
          through the agent.
        </p>
      </Section>

      {/* Shipping notes */}
      <Section
        icon={Truck}
        title="Agent, QC & Shipping Notes"
        description="How buying through a Chinese shopping agent actually works."
      >
        <div className="grid gap-3 md:grid-cols-2">
          {OPIUM_NOTES.map((note) => (
            <div
              key={note.title}
              className="rounded-xl border border-border bg-card/50 p-4"
            >
              <span className="font-heading text-sm font-bold text-foreground">
                {note.title}
              </span>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {note.body}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
