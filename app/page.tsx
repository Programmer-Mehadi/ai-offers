import Link from "next/link"
import { ArrowRight, GraduationCap, Globe, School, TrendingUp, BookOpen } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/sections/navbar"
import { Hero } from "@/components/sections/hero"
import { CategoryGrid } from "@/components/sections/category-grid"
import { OffersSection } from "@/components/sections/offers-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { StatsCounter } from "@/components/stats-counter"
import { Footer } from "@/components/sections/footer"
import { getOffers, getStudentTypes, getRegions, getTrendingOffers, getStats } from "@/data/offers"

export default async function HomePage() {
  const [offers, studentTypes, regions, trending, stats] = await Promise.all([
    getOffers(),
    getStudentTypes(),
    getRegions(),
    getTrendingOffers(6),
    getStats(),
  ])
  const featuredOffers = offers.filter((o) => o.featured)
  const hiddenGems = offers.filter((o) => o.hidden_gem)
  const underratedPerks = offers.filter((o) => o.underrated)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />

        <StatsCounter
          stats={[
            { icon: "Gift", value: stats.totalOffers, label: "Active Offers", suffix: "+" },
            { icon: "School", value: stats.categories, label: "Categories", suffix: "" },
            { icon: "Globe", value: regions.length, label: "Countries", suffix: "+" },
            { icon: "TrendingUp", value: 6, label: "Savings Average", suffix: "0%" },
          ]}
        />

        {/* By Student Type */}
        <section className="border-y border-border/40 bg-muted/30 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-xl font-bold sm:text-2xl">Shop by Student Type</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {studentTypes.map((type) => {
                const Icon = type.id === "high-school" ? School : type.id === "undergrad" ? GraduationCap : type.id === "international" ? Globe : BookOpen
                return (
                  <Link key={type.id} href={`/tools?type=${type.id}`}>
                    <Card className="group cursor-pointer border-border/50 transition-all duration-300 hover:border-transparent hover:shadow-md">
                      <CardContent className="flex flex-col items-center gap-2 p-4 text-center sm:p-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 transition-transform group-hover:scale-110 dark:text-brand-400">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-semibold">{type.label}</span>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <CategoryGrid />

        {/* Trending Now */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-sm">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-xl font-bold sm:text-2xl">Trending Now</h2>
                  <p className="text-sm text-muted-foreground">Most popular picks this week</p>
                </div>
              </div>
              <Link href="/popular" className="hidden items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground sm:flex">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {trending.map((offer, i) => (
                <Link key={offer.id} href={`/offer/${offer.id}`}>
                  <Card className="group cursor-pointer border-border/50 transition-all duration-300 hover:border-transparent hover:shadow-lg">
                    <CardContent className="flex items-start gap-4 p-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/10 to-violet-500/10 text-sm font-bold text-brand-600 dark:text-brand-400">
                        #{i + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold leading-tight group-hover:text-brand-600 dark:group-hover:text-brand-400">{offer.name}</h3>
                        <p className="mt-0.5 text-xs text-muted-foreground">{offer.description}</p>
                      </div>
                      <div className={`shrink-0 rounded-md bg-gradient-to-r ${offer.color} px-2 py-1 text-[10px] font-semibold text-white`}>
                        {offer.discount}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <Link href="/popular" className="mt-4 flex items-center justify-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground sm:hidden">
              View all trending <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        {/* Regional Offers */}
        <section className="border-y border-border/40 bg-muted/30 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-xl font-bold sm:text-2xl">Offers by Region</h2>
            <div className="flex flex-wrap gap-3">
              {regions.map((region) => (
                <Link
                  key={region.id}
                  href={`/tools?region=${region.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border/50 px-4 py-2 text-sm font-medium transition-all hover:border-transparent hover:shadow-md"
                >
                  <span className="text-base">{region.flag}</span>
                  {region.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <TestimonialsSection />

        <OffersSection
          title="Featured offers"
          description="Curated picks that students love â€” verified and ready to claim."
          offers={featuredOffers}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <hr className="border-border/40" />
        </div>

        <OffersSection
          title="Hidden gems"
          description="Surprisingly valuable perks most students miss â€” grab them while they last."
          offers={hiddenGems}
          variant="compact"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <hr className="border-border/40" />
        </div>

        <OffersSection
          title="Underrated student perks"
          description="Well-known tools with incredible student deals that often go overlooked."
          offers={underratedPerks}
          variant="compact"
        />
      </main>
      <Footer />
    </div>
  )
}

