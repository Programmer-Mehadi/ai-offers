import { ArrowUpRight, Award, Gem, Sparkles } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { OfferLogoImage } from "@/components/offer-logo-image"
import { cn } from "@/lib/utils"
import type { Offer } from "@/data/offers"

interface OfferCardProps {
  offer: Offer
  variant?: "default" | "compact"
  show?: "all" | "featured" | "hidden_gems" | "underrated"
}

export function OfferCard({
  offer,
  variant = "default",
  show,
}: OfferCardProps) {
  const isCompact = variant === "compact"

  return (
    <Card className="group relative">
      <div className="flex flex-wrap gap-2 p-4 py-0">
        {offer.featured && show !== "hidden_gems" && show !== "underrated" && (
          <Badge
            variant="secondary"
            className="gap-1 bg-amber-50 text-amber-700"
          >
            <Sparkles className="h-3 w-3" />
            Featured
          </Badge>
        )}
        {offer.hidden_gem && show !== "featured" && show !== "underrated" && (
          <Badge
            variant="secondary"
            className="gap-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
          >
            <Gem className="h-3 w-3" />
            Hidden Gem
          </Badge>
        )}
        {offer.underrated && show !== "hidden_gems" && show !== "featured" && (
          <Badge
            variant="secondary"
            className="gap-1 bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400"
          >
            <Award className="h-3 w-3" />
            Underrated
          </Badge>
        )}
      </div>

      <CardContent className={"p-4 py-0"}>
        <div className="mb-3 flex items-center gap-3">
          <OfferLogoImage
            src={offer.logo}
            name={offer.name}
            size="md"
            color="bg-primary"
          />
          <div className="min-w-0">
            <h3
              className={cn(
                "leading-tight font-semibold",
                isCompact ? "text-sm" : "text-base"
              )}
            >
              {offer.name}
            </h3>
            <p className="text-xs text-muted-foreground">{offer.category}</p>
          </div>
        </div>

        <p
          className={cn(
            "text-muted-foreground",
            isCompact ? "text-xs" : "text-sm"
          )}
        >
          {offer.description}
        </p>

        <div className="mt-3 inline-block rounded-lg bg-primary px-3 py-1.5 text-sm font-bold text-primary-foreground shadow-sm">
          {offer.discount}
        </div>
      </CardContent>

      <CardFooter
        className={cn(
          "mt-auto flex items-center justify-between border-t border-border/50 pt-3",
          isCompact ? "px-4 pb-3" : "px-5 pb-4 sm:px-6 sm:pb-5"
        )}
      >
        {offer.audience === "everyone" ? (
          <Badge
            variant="secondary"
            className="bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-400"
          >
            Everyone
          </Badge>
        ) : (
          <Badge
            variant="secondary"
            className="dark:bg-brand-950/50 bg-brand-50 text-brand-700 dark:text-brand-400"
          >
            Students
          </Badge>
        )}
        <Link
          href={`/offer/${offer.slug}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          View Deal
          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </CardFooter>
    </Card>
  )
}
