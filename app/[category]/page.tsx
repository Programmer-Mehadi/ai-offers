import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { categories, categoryLookup, getOffersByCategory } from "@/data/offers"
import { ToolCard } from "./tool-card"

export async function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.id }))
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category: slug } = await params
  const categoryName = categoryLookup[slug]

  if (!categoryName) {
    notFound()
  }

  const categoryOffers = getOffersByCategory(categoryName)
  const cat = categories.find((c) => c.id === slug)
  const otherCategories = categories.filter((c) => c.id !== slug)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="mb-2 flex items-center gap-3">
              {cat && (
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} text-white shadow-sm`}>
                  <span className="text-sm font-bold">{categoryName.charAt(0)}</span>
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{categoryName}</h1>
                <p className="mt-1 text-muted-foreground">
                  {categoryOffers.length} verified student offers
                </p>
              </div>
            </div>
          </div>

          {categoryOffers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-lg font-medium">No offers found in this category</p>
              <p className="mt-1 text-sm text-muted-foreground">Check back soon for new offers</p>
              <Button variant="outline" className="mt-4" asChild>
                <Link href="/tools">Browse all offers</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categoryOffers.map((offer) => (
                <ToolCard key={offer.id} offer={offer} />
              ))}
            </div>
          )}

          <div className="mt-12">
            <h2 className="mb-6 text-xl font-bold tracking-tight">Other categories</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {otherCategories.map((c) => (
                <Link
                  key={c.id}
                  href={`/${c.id}`}
                  className="group flex items-center gap-3 rounded-xl border border-border/50 p-4 transition-all hover:border-transparent hover:shadow-md"
                >
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${c.color} text-xs font-bold text-white`}>
                    {c.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-tight">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.count} offers</p>
                  </div>
                  <ArrowUpRight className="ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
