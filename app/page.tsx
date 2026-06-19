import Link from "next/link"
import {
  ArrowRight,
  GraduationCap,
  Globe,
  School,
  TrendingUp,
  BookOpen,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/sections/navbar"
import { Hero } from "@/components/sections/hero"
import { CategoryGrid } from "@/components/sections/category-grid"
import { OffersSection } from "@/components/sections/offers-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { StatsCounter } from "@/components/stats-counter"
import { Footer } from "@/components/sections/footer"
import {
  getOffers,
  getStudentTypes,
  getRegions,
  getTrendingOffers,
  getStats,
} from "@/data/offers"

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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />

        <StatsCounter
          stats={[
            {
              icon: "Gift",
              value: stats.totalOffers,
              label: "Active Offers",
              suffix: "+",
            },
            {
              icon: "School",
              value: stats.categories,
              label: "Categories",
              suffix: "",
            },
            {
              icon: "Globe",
              value: regions.length,
              label: "Countries",
              suffix: "+",
            },
            {
              icon: "TrendingUp",
              value: 6,
              label: "Savings Average",
              suffix: "0%",
            },
          ]}
        />

        {/* By Student Type */}
        <section className="bg-muted/30 py-12 border-border/40 border-y">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2 className="mb-6 font-bold text-xl sm:text-2xl">
              Shop by Student Type
            </h2>
            <div className="gap-3 grid grid-cols-2 sm:grid-cols-4">
              {studentTypes.map((type) => {
                const Icon =
                  type.id === "high-school"
                    ? School
                    : type.id === "undergrad"
                      ? GraduationCap
                      : type.id === "international"
                        ? Globe
                        : BookOpen
                return (
                  <Link key={type.id} href={`/tools?type=${type.id}`}>
                    <Card className="group hover:shadow-md border-border/50 hover:border-transparent transition-all duration-300 cursor-pointer">
                      <CardContent className="flex flex-col items-center gap-2 p-4 sm:p-6 text-center">
                        <div className="flex justify-center items-center bg-brand-500/10 rounded-xl w-10 h-10 text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-semibold text-sm">
                          {type.label}
                        </span>
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
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="flex justify-center items-center bg-gradient-to-br from-rose-500 to-pink-600 shadow-sm rounded-lg w-9 h-9 text-white">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-bold text-xl sm:text-2xl">
                    Trending Now
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Most popular picks this week
                  </p>
                </div>
              </div>
              <Link
                href="/popular"
                className="hidden sm:flex items-center gap-1 font-medium text-muted-foreground hover:text-foreground text-sm"
              >
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {trending.map((offer, i) => (
                <Link key={offer.id} href={`/offer/${offer.id}`}>
                  <Card className="group hover:shadow-lg border-border/50 hover:border-transparent transition-all duration-300 cursor-pointer">
                    <CardContent className="flex items-start gap-4 p-4">
                      <div className="flex justify-center items-center bg-gradient-to-br from-brand-500/10 to-violet-500/10 rounded-xl w-10 h-10 font-bold text-brand-600 dark:text-brand-400 text-sm shrink-0">
                        #{i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold dark:group-hover:text-brand-400 group-hover:text-brand-600 leading-tight">
                          {offer.name}
                        </h3>
                        <p className="mt-0.5 text-muted-foreground text-xs">
                          {offer.description}
                        </p>
                      </div>
                      <div
                        className={`shrink-0 rounded-md bg-brand-600 px-2 py-1 text-[10px] font-semibold text-white`}
                      >
                        {offer.discount}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <Link
              href="/popular"
              className="sm:hidden flex justify-center items-center gap-1 mt-4 font-medium text-muted-foreground hover:text-foreground text-sm"
            >
              View all trending <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Regional Offers */}
        <section className="bg-muted/30 py-12 border-border/40 border-y">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2 className="mb-6 font-bold text-xl sm:text-2xl">
              Offers by Region
            </h2>
            <div className="flex flex-wrap gap-3">
              {regions.map((region) => (
                <Link
                  key={region.id}
                  href={`/tools?region=${region.id}`}
                  className="inline-flex items-center gap-2 hover:shadow-md px-4 py-2 border border-border/50 hover:border-transparent rounded-full font-medium text-sm transition-all"
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

        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <hr className="border-border/40" />
        </div>

        <OffersSection
          title="Hidden gems"
          description="Surprisingly valuable perks most students miss â€” grab them while they last."
          offers={hiddenGems}
          variant="compact"
        />

        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
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
