import type { Offer } from "@/data/offers"
import { OfferCard } from "./offer-card"

interface OffersSectionProps {
  title: string
  description: string
  offers: Offer[]
  variant?: "default" | "compact"
}

export function OffersSection({
  title,
  description,
  offers,
  variant = "default",
}: OffersSectionProps) {
  if (offers.length === 0) return null

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl sm:mb-10">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">{description}</p>
        </div>

        <div className="animate-stagger grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {offers.slice(0, 8).map((offer) => (
            <OfferCard key={offer.id} offer={offer} variant={variant} />
          ))}
        </div>
      </div>
    </section>
  )
}
