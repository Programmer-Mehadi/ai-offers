"use client"

import { Search as SearchIcon, X } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { PageTransition } from "@/components/page-transition"
import { ToolCard } from "@/app/[category]/tool-card"
import { getOffers } from "@/data/offers"

function SearchContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const q = searchParams.get("q") || ""
  const [input, setInput] = useState(q)
  const [offers, setOffers] = useState<Awaited<ReturnType<typeof getOffers>>>([])

  useEffect(() => { getOffers().then(setOffers) }, [])

  const results = useMemo(() => {
    if (!q) return offers
    const query = q.toLowerCase()
    return offers.filter(
      (o) =>
        o.name.toLowerCase().includes(query) ||
        o.description.toLowerCase().includes(query) ||
        o.category.toLowerCase().includes(query) ||
        o.tags?.some((t) => t.toLowerCase().includes(query)),
    )
  }, [q])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = input.trim()
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`)
    }
  }

  function clearSearch() {
    setInput("")
    router.push("/search")
  }

  return (
    <PageTransition>
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Search offers</h1>
            <p className="mt-2 text-muted-foreground">
              Find discounts, free tools, and offers across all categories.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="relative mx-auto mb-8 max-w-xl">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tools, categories, or keywords..."
              className="pl-9 pr-16"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
            />
            <div className="absolute right-1.5 top-1/2 flex -translate-y-1/2 gap-1">
              {input && (
                <button type="button" onClick={clearSearch} className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
              <Button type="submit" size="sm" className="h-7">Search</Button>
            </div>
          </form>

          {q && (
            <p className="mb-6 text-sm text-muted-foreground">
              {results.length} result{results.length !== 1 && "s"} for &quot;{q}&quot;
            </p>
          )}

          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <SearchIcon className="mb-3 h-8 w-8 text-muted-foreground/50" />
              <p className="text-lg font-medium">No offers found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {q ? `No results for "${q}". Try a different search term.` : "Start typing to find offers."}
              </p>
              <Button variant="outline" className="mt-4" asChild>
                <Link href="/tools">Browse all offers</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((offer) => (
                <ToolCard key={offer.id} offer={offer} />
              ))}
            </div>
          )}
        </div>
      </main>
    </PageTransition>
  )
}

export default function SearchPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Suspense>
        <SearchContent />
      </Suspense>
      <Footer />
    </div>
  )
}
