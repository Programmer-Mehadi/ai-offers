"use client"

import { RefreshCw, Shuffle } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { OfferLogoImage } from "@/components/offer-logo-image"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { PageTransition } from "@/components/page-transition"
import { getOffers } from "@/data/offers"

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

function pickOffers(allOffers: Awaited<ReturnType<typeof getOffers>>, seed: number, count: number) {
  const order = allOffers.map((_, i) => i)
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed * (i + 1)) * (i + 1));
    [order[i], order[j]] = [order[j], order[i]]
  }
  return order.slice(0, count).map((i) => allOffers[i])
}

export default function DiscoverPage() {
  const [offers, setOffers] = useState<Awaited<ReturnType<typeof getOffers>>>([])
  const [seed, setSeed] = useState(() => Date.now())

  useEffect(() => { getOffers().then(setOffers) }, [])

  const randomOffers = useMemo(() => pickOffers(offers, seed, 4), [offers, seed])

  function reshuffle() {
    setSeed(Date.now())
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <PageTransition>
        <main className="flex-1 pt-24">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: "Discover" }]} />

            <div className="mb-10 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-violet-600 shadow-md">
                <Shuffle className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Discover</h1>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                Not sure where to start? Here are four random offers to explore.
              </p>
              <Button variant="outline" className="mt-4 gap-1.5" onClick={reshuffle}>
                <RefreshCw className="h-4 w-4" /> Shuffle
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {randomOffers.map((offer) => (
                <Card key={offer.id} className="group overflow-hidden border-border/50 transition-all duration-300 hover:border-transparent hover:shadow-lg">
                  <div className={`h-1.5 bg-gradient-to-r ${offer.color}`} />
                  <CardContent className="p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <OfferLogoImage
                        src={offer.logo}
                        name={offer.name}
                        size="lg"
                        color={`bg-gradient-to-br ${offer.color}`}
                        rounded="xl"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold leading-tight">{offer.name}</h3>
                        <p className="text-xs text-muted-foreground">{offer.category}</p>
                      </div>
                    </div>
                    <p className="line-clamp-2 text-sm text-muted-foreground">{offer.description}</p>
                    <div className={`mt-3 inline-block rounded-lg bg-gradient-to-r ${offer.color} px-3 py-1.5 text-sm font-bold text-white shadow-sm`}>
                      {offer.discount}
                    </div>
                    <div className="mt-4">
                      <Button size="sm" className="w-full gap-1" asChild>
                        <Link href={`/offer/${offer.id}`}>
                          View offer
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button asChild>
                <Link href="/tools">Browse all {offers.length} offers</Link>
              </Button>
            </div>
          </div>
        </main>
      </PageTransition>
      <Footer />
    </div>
  )
}
