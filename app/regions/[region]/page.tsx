import { notFound } from "next/navigation"
import Link from "next/link"

import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card, CardContent } from "@/components/ui/card"
import { offers, regions } from "@/data/offers"

export function generateStaticParams() {
  return regions.map((r) => ({ region: r.id }))
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ region: string }>
}) {
  const { region } = await params
  const regionObj = regions.find((r) => r.id === region)
  if (!regionObj) notFound()

  const filtered = offers.filter((o) => o.regions?.includes(region) ?? true).slice(0, 12)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Regions", href: "/" }, { label: regionObj.label }]} />

          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-violet-600 shadow-md">
              <span className="text-xl">{regionObj.flag}</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Offers in {regionObj.label}</h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Student discounts and free tools available in {regionObj.label}.
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-xl border border-border/50 bg-muted/30 p-8 text-center">
              <p className="text-muted-foreground">No offers currently tagged for this region.</p>
              <Link href="/tools" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400">
                Browse all offers &rarr;
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((offer) => (
                <Link key={offer.id} href={`/offer/${offer.id}`}>
                  <Card className="group cursor-pointer border-border/50 transition-all duration-300 hover:border-transparent hover:shadow-lg">
                    <CardContent className="p-5">
                      <div className="mb-3 flex items-center gap-3">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${offer.color} text-sm font-bold text-white`}>
                          {offer.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold leading-tight group-hover:text-brand-600 dark:group-hover:text-brand-400">{offer.name}</h3>
                          <p className="text-xs text-muted-foreground">{offer.category}</p>
                        </div>
                      </div>
                      <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{offer.description}</p>
                      <div className={`mt-3 inline-block rounded-md bg-gradient-to-r ${offer.color} px-2 py-1 text-[10px] font-semibold text-white`}>
                        {offer.discount}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
