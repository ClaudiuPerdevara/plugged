export type SiteNavLink = {
  label: string
  href: string
  /** Emphasized in header/footer primary nav */
  primary?: boolean
  /** Accent pill styling — used for Sourcing Guide */
  highlight?: boolean
}

export const PRIMARY_NAV: SiteNavLink[] = [
  { label: "Drops", href: "/drops", primary: true },
  { label: "How It Works", href: "/#how", primary: true },
  { label: "Sourcing Guide", href: "/sourcing-guide", primary: true },
  { label: "FAQ", href: "/faq", primary: true },
]

export const FOOTER_SECONDARY: SiteNavLink[] = [
  { label: "Support", href: "/support" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
]

export const FOOTER_NAV: SiteNavLink[] = [...PRIMARY_NAV, ...FOOTER_SECONDARY]
