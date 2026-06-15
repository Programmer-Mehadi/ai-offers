"use client"

import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { ToolCard } from "@/app/[category]/tool-card"
import { categories, offers } from "@/data/offers"
import { cn } from "@/lib/utils"

const PER_PAGE = 12

export default function ToolsPage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return offers.filter((offer) => {
      const matchesSearch =
        offer.name.toLowerCase().includes(search.toLowerCase()) ||
        offer.description.toLowerCase().includes(search.toLowerCase()) ||
        offer.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      const matchesCategory = selectedCategory
        ? offer.category === selectedCategory
        : true
      return matchesSearch && matchesCategory
    })
  }, [search, selectedCategory])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE)

  const handleSearch = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const handleCategory = (cat: string | null) => {
    setSelectedCategory(cat)
    setPage(1)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">All offers</h1>
            <p className="mt-2 text-muted-foreground">
              Browse {offers.length} verified student discounts and free tools.
            </p>
          </div>

          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search offers, tags, or keywords..."
                className="pl-9"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategory(null)}
              >
                All
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.name ? "default" : "outline"}
                  size="sm"
                  onClick={() =>
                    handleCategory(selectedCategory === cat.name ? null : cat.name)
                  }
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="mb-4 text-xs text-muted-foreground">
            Showing {paginated.length} of {filtered.length} results
            {search && (
              <span>
                {" "}
                for &quot;{search}&quot;
              </span>
            )}
          </div>

          {paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-lg font-medium">No offers found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a different search or category
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearch("")
                  setSelectedCategory(null)
                  setPage(1)
                }}
              >
                Reset filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {paginated.map((offer) => (
                  <ToolCard key={offer.id} offer={offer} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={safePage <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <Button
                        key={p}
                        variant={p === safePage ? "default" : "outline"}
                        size="sm"
                        className={cn(
                          "min-w-9",
                          p === safePage && "pointer-events-none",
                        )}
                        onClick={() => setPage(p)}
                      >
                        {p}
                      </Button>
                    ),
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={safePage >= totalPages}
                    onClick={() =>
                      setPage((p) => Math.min(totalPages, p + 1))
                    }
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
