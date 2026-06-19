import { Timer } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ToolCard } from "@/app/categories/[slug]/tool-card"
import { getExpiringOffers } from "@/data/offers"

export default async function ExpiringSoonPage() {
  const expiring = await getExpiringOffers(12)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumbs items={[
            { label: "Offers", href: "/tools" },
            { label: "Expiring Soon" },
          ]} />

          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-sm">
              <Timer className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Expiring Soon</h1>
              <p className="mt-1 text-muted-foreground">
                Don&apos;t miss out — these offers won&apos;t last forever.
              </p>
            </div>
          </div>

          {expiring.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-lg font-medium">No expiring offers right now</p>
              <p className="mt-1 text-sm text-muted-foreground">
                All current offers are still active. Check back soon.
              </p>
              <Button variant="outline" className="mt-4" asChild>
                <Link href="/tools">Browse all offers</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {expiring.map((offer) => (
                <div key={offer.id} className="relative">
                  <div className="absolute -right-2 -top-2 z-10">
                    <Badge className="bg-amber-500 text-white hover:bg-amber-600">Expiring</Badge>
                  </div>
                  <ToolCard offer={offer} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

