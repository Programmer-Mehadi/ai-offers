import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { categories } from "@/data/offers"

const groups = [
  {
    title: "Browse Offers",
    links: [
      { href: "/tools", label: "All Offers" },
      { href: "/new", label: "Recently Added" },
      { href: "/popular", label: "Most Popular" },
      { href: "/expiring-soon", label: "Expiring Soon" },
      { href: "/compare", label: "Compare Offers" },
      { href: "/favorites", label: "Your Favorites" },
    ],
  },
  {
    title: "Categories",
    links: categories.map((c) => ({ href: `/${c.id}`, label: c.name })),
  },
  {
    title: "Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/resources", label: "Student Resources" },
      { href: "/how-we-verify", label: "How We Verify" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/submit-offer", label: "Submit an Offer" },
      { href: "/privacy-cookies-terms", label: "Privacy & Terms" },
    ],
  },
]

export default function SitemapPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Sitemap" }]} />

          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Sitemap</h1>
            <p className="mt-2 text-muted-foreground">
              All pages on StudentPerks, organized by section.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {groups.map((group) => (
              <div key={group.title}>
                <h2 className="mb-3 text-lg font-bold">{group.title}</h2>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
