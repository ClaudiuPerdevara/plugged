"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { LayoutDashboard, LogIn, LogOut, Menu, ShoppingBag, User, X } from "lucide-react"
import { useCart } from "./cart-provider"
import { useAuth } from "@/lib/use-auth"
import { PRIMARY_NAV } from "@/lib/site-nav"

function navLinkClass(highlight?: boolean, mobile = false) {
  if (highlight) {
    return mobile
      ? "inline-flex w-fit items-center rounded-full border border-accent/50 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent"
      : "inline-flex items-center rounded-full border border-accent/50 bg-accent/10 px-3 py-1 text-sm font-semibold text-accent transition-colors hover:border-accent hover:bg-accent/15"
  }
  return mobile
    ? "text-base font-semibold text-foreground"
    : "text-sm font-semibold text-foreground/90 transition-colors hover:text-accent"
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { count, openCart } = useCart()
  const { isAuthenticated, signOut } = useAuth()
  const pathname = usePathname()

  // On the home page the logo scrolls smoothly to the top instead of doing a
  // no-op navigation; elsewhere it links home as usual.
  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault()
      setMobileNavOpen(false)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  // Close both menus whenever the route changes — fixes the mobile menu
  // staying open (and overlapping) after tapping a link/profile item.
  useEffect(() => {
    setMenuOpen(false)
    setMobileNavOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileNavOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link
          href="/"
          onClick={handleLogoClick}
          data-testid="site-logo"
          className="font-heading text-lg font-bold tracking-tight text-foreground"
        >
          PLUGGED<span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={navLinkClass(item.highlight)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/drops"
            className="hidden rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background transition-all duration-300 hover:scale-[1.03] hover:bg-accent hover:text-accent-foreground sm:inline-flex"
          >
            Get Access
          </Link>

          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
            className="relative flex size-10 items-center justify-center rounded-full border border-border bg-card/60 text-foreground backdrop-blur-sm transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ShoppingBag className="size-[18px]" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
                {count}
              </span>
            )}
          </button>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => {
                setMenuOpen((v) => !v)
                setMobileNavOpen(false)
              }}
              aria-label="Account menu"
              aria-expanded={menuOpen}
              className="flex size-10 items-center justify-center rounded-full border border-border bg-card/60 text-foreground backdrop-blur-sm transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <User className="size-[18px]" />
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-0 mt-3 w-60 overflow-hidden rounded-2xl border border-border bg-card/90 p-2 shadow-2xl shadow-black/40 backdrop-blur-2xl"
                >
                  <Link
                    href="/dashboard/"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    <LayoutDashboard className="size-4 text-accent" />
                    Your Vault
                  </Link>
                  {isAuthenticated ? (
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false)
                        void signOut()
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                    >
                      <LogOut className="size-4 text-accent" />
                      Sign Out
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                    >
                      <LogIn className="size-4 text-accent" />
                      Sign In
                    </Link>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => {
              setMobileNavOpen((v) => !v)
              setMenuOpen(false)
            }}
            aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileNavOpen}
            className="flex size-10 items-center justify-center rounded-full border border-border bg-card/60 text-foreground backdrop-blur-sm transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
          >
            {mobileNavOpen ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 md:px-8">
              {PRIMARY_NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={navLinkClass(item.highlight, true)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/drops"
                onClick={() => setMobileNavOpen(false)}
                className="mt-2 inline-flex w-fit rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background"
              >
                Get Access
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
