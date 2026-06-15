import { Navbar } from "@/components/sections/navbar"
import { Hero } from "@/components/sections/hero"
import { CategoryGrid } from "@/components/sections/category-grid"
import { OffersSection } from "@/components/sections/offers-section"
import { Footer } from "@/components/sections/footer"
import { offers } from "@/data/offers"

export default function HomePage() {
  const featuredOffers = offers.filter((o) => o.featured)
  const hiddenGems = offers.filter((o) => o.hidden_gem)
  const underratedPerks = offers.filter((o) => o.underrated)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CategoryGrid />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <hr className="border-border/40" />
        </div>
        <OffersSection
          title="Featured offers"
          description="Curated picks that students love — verified and ready to claim."
          offers={featuredOffers}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <hr className="border-border/40" />
        </div>
        <OffersSection
          title="Hidden gems"
          description="Surprisingly valuable perks most students miss — grab them while they last."
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
