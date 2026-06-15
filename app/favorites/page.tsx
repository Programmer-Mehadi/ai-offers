"use client"

import { Heart, Search, Trash2 } from "lucide-react"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { type Offer, offers } from "@/data/offers"

function getFavorites(): string[] {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem("favorites") || "[]")
  } catch {
    return []
  }
}

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => getFavorites())
  const [search, setSearch] = useState("")

  useEffect(() => {
    const handler = () => setFavoriteIds(getFavorites())
    window.addEventListener("storage", handler)
    window.addEventListener("favorites-updated", handler)
    return () => {
      window.removeEventListener("storage", handler)
      window.removeEventListener("favorites-updated", handler)
    }
  }, [])

  const removeFavorite = useCallback((id: string) => {
    const updated = getFavorites().filter((fid) => fid !== id)
    localStorage.setItem("favorites", JSON.stringify(updated))
    setFavoriteIds(updated)
    window.dispatchEvent(new Event("favorites-updated"))
  }, [])

  const favoriteOffers = offers.filter((o) => favoriteIds.includes(o.id))
  const filtered = favoriteOffers.filter((o) =>
    o.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {favoriteIds.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                <Heart className="h-7 w-7 text-muted-foreground" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">Your Favorites</h1>
              <p className="mt-2 max-w-sm text-muted-foreground">
                See a deal you love? Tap the bookmark icon to save it here and
                come back anytime.
              </p>
              <Button className="mt-6" asChild>
                <Link href="/tools">Browse Offers</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Your Favorites
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {favoriteIds.length} saved offer{favoriteIds.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="relative max-w-xs">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search favorites..."
                    className="pl-9"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <p className="text-lg font-medium">No matching offers</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try a different search term
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filtered.map((offer) => (
                    <FavoriteCard
                      key={offer.id}
                      offer={offer}
                      onRemove={removeFavorite}
                    />
                  ))}
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

function FavoriteCard({
  offer,
  onRemove,
}: {
  offer: Offer
  onRemove: (id: string) => void
}) {
  return (
    <Card className="group relative overflow-hidden border-border/50 transition-all duration-300 hover:border-transparent hover:shadow-lg hover:shadow-brand-500/10">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${offer.color}`} />
      <CardContent className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${offer.color} text-sm font-bold text-white shadow-sm`}
            >
              {offer.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <Link href={`/offer/${offer.id}`} className="font-semibold leading-tight hover:underline">
                {offer.name}
              </Link>
              <p className="text-xs text-muted-foreground">{offer.category}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
            onClick={() => onRemove(offer.id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove from favorites</span>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{offer.description}</p>
        <div
          className={`mt-3 inline-block rounded-md bg-gradient-to-r ${offer.color} px-2.5 py-1 text-xs font-semibold text-white`}
        >
          {offer.discount}
        </div>
      </CardContent>
    </Card>
  )
}
