"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

import { Newsletter } from "@/components/newsletter"
import { getCategories, getCategorySlug } from "@/data/offers"
import type { Category } from "@/data/offers"

const footerLinks = [
  {
    title: "Offers",
    links: [
      { href: "/tools", label: "All Offers" },
      { href: "/new", label: "Recently Added" },
      { href: "/popular", label: "Most Popular" },
      { href: "/expiring-soon", label: "Expiring Soon" },
      { href: "/compare", label: "Compare Offers" },
      { href: "/categories", label: "Categories" },
      { href: "/how-we-verify", label: "How We Verify" },
      { href: "/submit-offer", label: "Submit an Offer" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/guides", label: "Guides" },
      { href: "/savings-calculator", label: "Savings Calculator" },
      { href: "/faq", label: "FAQ" },
      { href: "/suggest", label: "Suggest an Offer" },
      { href: "/changelog", label: "Changelog" },
      { href: "/press", label: "Press Kit" },
      { href: "/discover", label: "Discover" },
      { href: "/search", label: "Search" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/blog", label: "Blog" },
      { href: "/resources", label: "Resources" },
      { href: "/contact", label: "Contact" },
      { href: "/sitemap", label: "Sitemap" },
      { href: "/privacy-cookies-terms", label: "Privacy & Terms" },
    ],
  },
]

export function Footer() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    getCategories().then(setCategories)
  }, [])

  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Newsletter />

        {/* Top categories */}
        <div className="mb-10">
          <h4 className="mb-3 text-sm font-semibold">Top Categories</h4>
          <div className="flex flex-wrap gap-2">
            {categories.slice(0, 6).map((cat) => (
              <Link
                key={cat.id || cat.name}
                href={`/categories/${getCategorySlug(cat.name)}`}
                className="inline-flex items-center gap-1 rounded-full border border-border/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-transparent hover:bg-muted hover:text-foreground"
              >
                {cat.name}
                <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
            <Link
              href="/categories"
              className="inline-flex items-center gap-1 rounded-full border border-border/50 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            >
              All categories
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-brand-500 to-violet-600 text-[10px] font-bold text-white">
                OP
              </div>
              <span className="text-base font-bold">OfferPerks</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Helping you save money with verified discounts and exclusive
              offers.
            </p>
            <div className="mt-4 flex gap-3">
              <Link
                href="/new"
                className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
              >
                New
              </Link>
              <Link
                href="/popular"
                className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
              >
                Popular
              </Link>
              <Link
                href="/discover"
                className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
              >
                Discover
              </Link>
              <Link
                href="/compare"
                className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
              >
                Compare
              </Link>
            </div>
            <div className="mt-6">
              <h4 className="mb-3 text-sm font-semibold">Follow Us</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Twitter / X
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Discord
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="mb-3 text-sm font-semibold">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border/40 pt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} OfferPerks. Not affiliated with any
          listed brands. Many offers require student verification. All
          trademarks belong to their respective owners.
        </div>
      </div>
    </footer>
  )
}
