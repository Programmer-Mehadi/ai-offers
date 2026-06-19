"use client"

import { Heart, Search, Trash2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { type Offer, getOffers } from "@/data/offers"

export default function FavoritesPage() {
  const { favoriteIds, removeFavorite, isAuthenticated } = useAuth()
  const [search, setSearch] = useState("")
  const [offers, setOffers] = useState<Awaited<ReturnType<typeof getOffers>>>(
    []
  )

  useEffect(() => {
    getOffers().then(setOffers)
  }, [])

  const favoriteOffers = offers.filter((o) => favoriteIds.includes(o.id))
  const filtered = favoriteOffers.filter((o) =>
    o.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
          {favoriteIds.length === 0 ? (
            <div className="flex flex-col justify-center items-center py-24 text-center">
              <div className="flex justify-center items-center bg-gradient-to-br from-brand-100 dark:from-brand-950/30 to-violet-100 dark:to-violet-950/30 mb-6 rounded-full w-20 h-20">
                <Heart className="w-8 h-8 text-brand-400 dark:text-brand-500" />
              </div>
              <h1 className="font-bold text-2xl tracking-tight">
                Your Favorites
              </h1>
              <p className="mt-2 max-w-sm text-muted-foreground">
                Nothing saved yet. When you find a deal you love, tap the
                bookmark icon to keep track of it here.
              </p>
              <p className="mt-1 max-w-sm text-muted-foreground text-sm">
                {isAuthenticated
                  ? "Signed-in bookmarks sync through the backend."
                  : "Sign in if you want those bookmarks synced to your account."}
              </p>
              <Button className="gap-1.5 mt-6" asChild>
                <Link href="/tools">
                  <Heart className="w-4 h-4" />
                  Find deals to save
                </Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 mb-8">
                <div>
                  <h1 className="font-bold text-2xl sm:text-3xl tracking-tight">
                    Your Favorites
                  </h1>
                  <p className="mt-1 text-muted-foreground text-sm">
                    {favoriteIds.length} saved offer
                    {favoriteIds.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="relative max-w-xs">
                  <Search className="top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2" />
                  <Input
                    placeholder="Search favorites..."
                    className="pl-9"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="flex flex-col justify-center items-center py-20 text-center">
                  <p className="font-medium text-lg">No matching offers</p>
                  <p className="mt-1 text-muted-foreground text-sm">
                    Try a different search term
                  </p>
                </div>
              ) : (
                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filtered.map((offer) => (
                    <FavoriteCard
                      key={offer.id}
                      offer={offer}
                      onRemove={(id) => {
                        void removeFavorite(id)
                      }}
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
    <Card className="group relative hover:shadow-brand-500/10 hover:shadow-lg border-border/50 hover:border-transparent overflow-hidden transition-all duration-300">
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${offer.color}`}
      />
      <CardContent className="p-5">
        <div className="flex justify-between items-start gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${offer.color} text-sm font-bold text-white shadow-sm`}
            >
              {offer.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <Link
                href={`/offer/${offer.id}`}
                className="font-semibold hover:underline leading-tight"
              >
                {offer.name}
              </Link>
              <p className="text-muted-foreground text-xs">{offer.category}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-muted-foreground hover:text-destructive shrink-0"
            onClick={() => onRemove(offer.id)}
          >
            <Trash2 className="w-4 h-4" />
            <span className="sr-only">Remove from favorites</span>
          </Button>
        </div>
        <p className="text-muted-foreground text-sm">{offer.description}</p>
        <div
          className={`mt-3 inline-block rounded-md bg-gradient-to-r ${offer.color} px-2.5 py-1 text-xs font-semibold text-white`}
        >
          {offer.discount}
        </div>
      </CardContent>
    </Card>
  )
}
