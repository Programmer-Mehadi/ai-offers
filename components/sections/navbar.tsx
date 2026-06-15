"use client"

import Link from "next/link"
import { Menu, Moon, Search, Sun, X } from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "All Offers" },
  { href: "#categories", label: "Categories" },
  { href: "#", label: "Blog" },
  { href: "#", label: "How We Verify" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const isClient = typeof theme !== "undefined"

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 text-xs font-bold text-white">
            SP
          </div>
          <span className="text-lg font-bold tracking-tight">StudentPerks</span>
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

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:inline-flex" asChild>
            <Link href="/tools">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search offers</span>
            </Link>
          </Button>

          {isClient && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border/40 transition-all duration-300 md:hidden",
          mobileOpen ? "max-h-80" : "max-h-0",
        )}
      >
        <nav className="flex flex-col gap-1 p-4">
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
          <Link
            href="/tools"
            onClick={() => setMobileOpen(false)}
            className="mt-2 flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-2.5 text-sm text-muted-foreground"
          >
            <Search className="h-4 w-4" />
            Search offers...
          </Link>
        </nav>
      </div>
    </header>
  )
}
