import { TrendingUp } from "lucide-react"
import Link from "next/link"

import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ToolCard } from "@/app/[category]/tool-card"
import { getPopularOffers } from "@/data/offers"

export default function PopularPage() {
  const popular = getPopularOffers(12)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumbs items={[
            { label: "Offers", href: "/tools" },
            { label: "Most Popular" },
          ]} />

          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-sm">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Most Popular</h1>
              <p className="mt-1 text-muted-foreground">
                The most favorited and claimed offers by the student community.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {popular.map((offer, i) => (
              <div key={offer.id} className="relative">
                {i < 3 && (
                  <div className="absolute -right-2 -top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white shadow-sm">
                    #{i + 1}
                  </div>
                )}
                <ToolCard offer={offer} />
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/tools"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              Browse all offers â†’
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

