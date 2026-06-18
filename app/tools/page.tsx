"use client"

import { Suspense, useMemo, useState, useEffect } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
} from "lucide-react"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { ToolCard } from "@/app/[category]/tool-card"
import { QuickView } from "@/components/quick-view"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { getCategories, getOffers, type Offer } from "@/data/offers"
import { cn } from "@/lib/utils"

const PER_PAGE = 12
type SortKey = "name" | "category" | "popularity"

function ToolsContent() {
  const searchParams = useSearchParams()
  const regionParam = searchParams.get("region")
  const typeParam = searchParams.get("type")

  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(
    regionParam
  )
  const [selectedType, setSelectedType] = useState<string | null>(typeParam)
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<SortKey>("name")
  const [audience, setAudience] = useState<"all" | "students" | "everyone">(
    "all"
  )
  const [quickView, setQuickView] = useState<Offer | null>(null)
  const [offers, setOffers] = useState<Offer[]>([])
  const [categories, setCategories] = useState<
    Awaited<ReturnType<typeof getCategories>>
  >([])

  useEffect(() => {
    setSelectedRegion(regionParam)
    setSelectedType(typeParam)
  }, [regionParam, typeParam])

  useEffect(() => {
    Promise.all([getOffers(), getCategories()]).then(([o, c]) => {
      setOffers(o)
      setCategories(c)
    })
  }, [])

  const filtered = useMemo(() => {
    const result = offers.filter((offer) => {
      const matchesSearch =
        offer.name.toLowerCase().includes(search.toLowerCase()) ||
        offer.description.toLowerCase().includes(search.toLowerCase()) ||
        offer.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      const matchesCategory = selectedCategory
        ? offer.category === selectedCategory
        : true
      const matchesRegion = selectedRegion
        ? (offer.regions?.includes(selectedRegion) ?? true)
        : true
      const matchesType = selectedType
        ? (offer.studentTypes?.includes(selectedType) ?? true)
        : true
      const matchesAudience =
        audience === "all" ? true : (offer.audience ?? "students") === audience
      return (
        matchesSearch &&
        matchesCategory &&
        matchesRegion &&
        matchesType &&
        matchesAudience
      )
    })

    result.sort((a, b) => {
      switch (sort) {
        case "name":
          return a.name.localeCompare(b.name)
        case "category":
          return a.category.localeCompare(b.category)
        case "popularity":
          return (b.popularity || 0) - (a.popularity || 0)
        default:
          return 0
      }
    })

    return result
  }, [search, selectedCategory, selectedRegion, selectedType, sort, audience])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const paginated = filtered.slice(
    (safePage - 1) * PER_PAGE,
    safePage * PER_PAGE
  )

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
          <Breadcrumbs items={[{ label: "All Offers" }]} />

          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              All offers
            </h1>
            <p className="mt-2 text-muted-foreground">
              Browse {offers.length} verified discounts and free tools.
            </p>
          </div>

          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search offers, tags, or keywords..."
                className="pl-9"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <SlidersHorizontal className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value as SortKey)
                    setPage(1)
                  }}
                  className="h-10 appearance-none rounded-lg border border-input bg-transparent pr-8 pl-9 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
                >
                  <option value="name">Sort: A-Z</option>
                  <option value="category">Sort: Category</option>
                  <option value="popularity">Sort: Popular</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-border/50 bg-muted/30 p-0.5">
              <button
                onClick={() => {
                  setAudience("all")
                  setPage(1)
                }}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${audience === "all" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                All
              </button>
              <button
                onClick={() => {
                  setAudience("students")
                  setPage(1)
                }}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${audience === "students" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                Students
              </button>
              <button
                onClick={() => {
                  setAudience("everyone")
                  setPage(1)
                }}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${audience === "everyone" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                Everyone
              </button>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
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
                  handleCategory(
                    selectedCategory === cat.name ? null : cat.name
                  )
                }
              >
                {cat.name}
              </Button>
            ))}
          </div>

          <div className="mb-4 text-xs text-muted-foreground">
            Showing {paginated.length} of {filtered.length} results
            {search && <span> for &quot;{search}&quot;</span>}
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
                  <div
                    key={offer.id}
                    onClick={() => setQuickView(offer)}
                    className="cursor-pointer"
                  >
                    <ToolCard offer={offer} />
                  </div>
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
                          p === safePage && "pointer-events-none"
                        )}
                        onClick={() => setPage(p)}
                      >
                        {p}
                      </Button>
                    )
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={safePage >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
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
      <QuickView offer={quickView} onClose={() => setQuickView(null)} />
    </div>
  )
}

export default function ToolsPage() {
  return (
    <Suspense>
      <ToolsContent />
    </Suspense>
  )
}
