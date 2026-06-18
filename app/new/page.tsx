import { AlertCircle, Sparkles } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { PageTransition } from "@/components/page-transition"
import { ToolCard } from "@/app/categories/[slug]/tool-card"
import { getRecentOffers } from "@/data/offers"

export default async function NewPage() {
  const recent = await getRecentOffers(12)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <PageTransition>
        <main className="flex-1 pt-24">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <Breadcrumbs items={[
              { label: "Offers", href: "/tools" },
              { label: "Recently Added" },
            ]} />

            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Recently Added</h1>
                <p className="mt-1 text-muted-foreground">
                  The latest verified discounts and free tools, freshly added to our directory.
                </p>
              </div>
            </div>

            {recent.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <AlertCircle className="mb-3 h-8 w-8 text-muted-foreground/50" />
                <p className="text-lg font-medium">No recently added offers</p>
                <p className="mt-1 text-sm text-muted-foreground">New offers appear here as they are added.</p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link href="/tools">Browse all offers</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {recent.map((offer) => (
                  <ToolCard key={offer.id} offer={offer} />
                ))}
              </div>
            )}

            <div className="mt-8 text-center">
              <Link
                href="/tools"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                Browse all offers &rarr;
              </Link>
            </div>
          </div>
        </main>
      </PageTransition>
      <Footer />
    </div>
  )
}
