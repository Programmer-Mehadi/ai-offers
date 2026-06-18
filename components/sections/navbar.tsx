"use client"

import Link from "next/link"
import { Bookmark, Menu, Moon, Search, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

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

function getFavoritesCount(): number {
  if (typeof window === "undefined") return 0
  try {
    return JSON.parse(localStorage.getItem("favorites") || "[]").length
  } catch {
    return 0
  }
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [favCount, setFavCount] = useState(0)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    setFavCount(getFavoritesCount())
    const handler = () => setFavCount(getFavoritesCount())
    window.addEventListener("storage", handler)
    window.addEventListener("favorites-updated", handler)
    return () => {
      window.removeEventListener("storage", handler)
      window.removeEventListener("favorites-updated", handler)
    }
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 text-xs font-bold text-white">
            OP
          </div>
          <span className="text-lg font-bold tracking-tight">OfferPerks</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {link.label}
            </Link>
          ))}
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
                className="hidden items-center gap-2 rounded-lg border border-border/60 bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted md:inline-flex"
              >
                <Search className="h-3.5 w-3.5" />
                <span>Search...</span>
                <kbd className="rounded border border-border bg-background px-1 py-0.5 text-[10px] font-medium text-muted-foreground/70">
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
                  <Bookmark className="h-4 w-4" />
                  {favCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[14px] items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-white">
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
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                disabled={!mounted}
                suppressHydrationWarning
              >
                {mounted && theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Toggle {theme === "dark" ? "light" : "dark"} mode
            </TooltipContent>
          </Tooltip>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-6">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 text-[10px] font-bold text-white">
                    OP
                  </div>
                  <span className="text-sm font-bold">OfferPerks</span>
                </Link>
              </div>

              <nav className="mt-8 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-6 flex flex-col gap-1 border-t border-border pt-6">
                <Link
                  href="/favorites"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Bookmark className="h-4 w-4" />
                  Favorites
                  {favCount > 0 && (
                    <span className="flex h-5 min-w-[18px] items-center justify-center rounded-full bg-brand-500 px-1.5 text-[10px] font-bold text-white">
                      {favCount}
                    </span>
                  )}
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
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent"
                >
                  <Search className="h-4 w-4" />
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
