"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bookmark, Menu, Moon, Search, Sun, UserRound } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "All Offers" },
  { href: "/categories", label: "Categories" },
  { href: "/blog", label: "Blog" },
  { href: "/guides", label: "Guides" },
  { href: "/how-we-verify", label: "How We Verify" },
  { href: "/faq", label: "FAQ" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const { favoriteIds, isAuthenticated, user } = useAuth()
  const isDark = mounted && resolvedTheme === "dark"

  useEffect(() => {
    setMounted(true)
  }, [])

  const favCount = favoriteIds.length
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className="top-0 z-50 fixed inset-x-0 bg-background/80 backdrop-blur-xl border-border/40 border-b">
      <div className="flex justify-between items-center mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex justify-center items-center bg-linear-to-br from-brand-500 to-violet-600 rounded-lg w-8 h-8 font-bold text-white text-xs">
            OP
          </div>
          <span className="font-bold text-lg tracking-tight">OfferPerks</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => {
                  const ev = new KeyboardEvent("keydown", {
                    metaKey: true,
                    key: "k",
                    bubbles: true,
                  })
                  window.dispatchEvent(ev)
                }}
                className="hidden md:inline-flex items-center gap-2 bg-muted/50 hover:bg-muted px-3 py-1.5 border border-border/60 rounded-lg text-muted-foreground text-xs transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search...</span>
                <kbd className="bg-background px-1 py-0.5 border border-border rounded font-medium text-[10px] text-muted-foreground/70">
                  ⌘K
                </kbd>
              </button>
            </TooltipTrigger>
            <TooltipContent>Search offers and categories</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link href="/favorites">
                  <Bookmark className="w-4 h-4" />
                  {favCount > 0 && (
                    <span className="-top-0.5 -right-0.5 absolute flex justify-center items-center bg-brand-500 px-1 rounded-full min-w-3.5 h-4 font-bold text-[10px] text-white">
                      {favCount}
                    </span>
                  )}
                  <span className="sr-only">Favorites</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Saved offers</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/account">
                  <UserRound className="w-4 h-4" />
                  <span className="sr-only">
                    {isAuthenticated ? "Account" : "Sign in"}
                  </span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isAuthenticated
                ? user?.name || user?.email || "Account"
                : "Sign in"}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                disabled={!mounted}
                suppressHydrationWarning
              >
                {isDark ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className={mounted ? "h-4 w-4" : "h-4 w-4 opacity-0"} />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Toggle {isDark ? "light" : "dark"} mode
            </TooltipContent>
          </Tooltip>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-4 h-4" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-6 w-72">
              <div className="flex justify-between items-center">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="flex justify-center items-center bg-linear-to-br from-brand-500 to-violet-600 rounded-lg w-7 h-7 font-bold text-[10px] text-white">
                    OP
                  </div>
                  <span className="font-bold text-sm">OfferPerks</span>
                </Link>
              </div>

              <nav className="flex flex-col gap-1 mt-8">
                {navLinks.map((link) => {
                  const active = isActive(link.href)
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                        active
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </nav>

              <div className="flex flex-col gap-1 mt-6 pt-6 border-border border-t">
                <Link
                  href="/favorites"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 hover:bg-accent px-3 py-2.5 rounded-lg font-medium text-muted-foreground text-sm transition-colors hover:text-accent-foreground"
                >
                  <Bookmark className="w-4 h-4" />
                  Favorites
                  {favCount > 0 && (
                    <span className="flex justify-center items-center bg-brand-500 px-1.5 rounded-full min-w-4.5 h-5 font-bold text-[10px] text-white">
                      {favCount}
                    </span>
                  )}
                </Link>
                <Link
                  href="/account"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 hover:bg-accent px-3 py-2.5 rounded-lg font-medium text-muted-foreground text-sm transition-colors hover:text-accent-foreground"
                >
                  <UserRound className="w-4 h-4" />
                  {isAuthenticated ? "Account" : "Sign in"}
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false)
                    const ev = new KeyboardEvent("keydown", {
                      metaKey: true,
                      key: "k",
                      bubbles: true,
                    })
                    window.dispatchEvent(ev)
                  }}
                  className="flex items-center gap-2 hover:bg-accent px-3 py-2.5 rounded-lg text-muted-foreground text-sm transition-colors"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
