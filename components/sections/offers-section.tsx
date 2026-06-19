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
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-8 sm:mb-10 max-w-2xl">
          <h2 className="font-bold text-2xl sm:text-3xl tracking-tight">
            {title}
          </h2>
          <p className="mt-2 text-muted-foreground text-sm sm:text-base">
            {description}
          </p>
        </div>

        <div className="gap-4 sm:gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-stagger">
          {offers.slice(0, 8).map((offer) => (
            <OfferCard key={offer.id} offer={offer} variant={variant} />
          ))}
        </div>
      </div>
    </section>
  )
}
