import Link from "next/link"
import { Mail, Shield } from "lucide-react"
import { FOOTER_SECONDARY, PRIMARY_NAV } from "@/lib/site-nav"

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  )
}

function navLinkClass(highlight?: boolean) {
  if (highlight) {
    return "inline-flex items-center rounded-full border border-accent/50 bg-accent/10 px-3 py-1 text-sm font-semibold text-accent transition-colors hover:border-accent hover:bg-accent/15 hover:text-accent"
  }
  return "text-sm font-semibold text-foreground transition-colors hover:text-accent"
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
          <div className="max-w-md">
            <span className="font-heading text-2xl font-bold tracking-tight text-foreground">
              PLUGGED<span className="text-accent">.</span>
            </span>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Curated supplier links for the underground. Skip the search — get
              the plug and start reselling today.
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="size-4 shrink-0 text-accent" />
                <span>Dead link? Free replacement within 24h — guaranteed.</span>
              </div>
              <a
                href="mailto:plugged.support@gmail.com"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="size-4 shrink-0 text-accent" />
                plugged.support@gmail.com
              </a>
              <div className="mt-1 flex items-center gap-3">
                <a
                  href="https://www.tiktok.com/@getplugged.store"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <TikTokIcon />
                  @getplugged.store
                </a>
              </div>
            </div>
          </div>

          <nav className="flex flex-col gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Navigate
            </span>
            <div className="flex flex-col gap-3">
              {PRIMARY_NAV.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className={navLinkClass(l.highlight)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-4">
              {FOOTER_SECONDARY.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} PLUGGED. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.2em]">
            Built for resellers
          </p>
        </div>
      </div>
    </footer>
  )
}
