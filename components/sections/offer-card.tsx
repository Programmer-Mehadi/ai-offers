import { ArrowUpRight, Award, Gem, Sparkles } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Offer } from "@/data/offers"

interface OfferCardProps {
  offer: Offer
  variant?: "default" | "compact"
}

export function OfferCard({ offer, variant = "default" }: OfferCardProps) {
  const isCompact = variant === "compact"

  return (
    <Card className="group relative hover:shadow-brand-500/10 hover:shadow-lg border-border/50 hover:border-transparent overflow-hidden transition-all duration-300">
      <div className="top-0 absolute inset-x-0 bg-primary h-1" />

      {offer.featured && (
        <div className="top-2 right-2 absolute">
          <Badge
            variant="secondary"
            className="gap-1 bg-amber-50 text-amber-700"
          >
            <Sparkles className="w-3 h-3" />
            Featured
          </Badge>
        </div>
      )}
      {offer.hidden_gem && (
        <div className="top-2 right-2 absolute">
          <Badge
            variant="secondary"
            className="gap-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400"
          >
            <Gem className="w-3 h-3" />
            Hidden Gem
          </Badge>
        </div>
      )}
      {offer.underrated && (
        <div className="top-2 right-2 absolute">
          <Badge
            variant="secondary"
            className="gap-1 bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-400"
          >
            <Award className="w-3 h-3" />
            Underrated
          </Badge>
        </div>
      )}

      <CardContent className={cn(isCompact ? "p-4" : "p-5 sm:p-6")}>
        <div className="flex items-center gap-3 mb-3">
          <div className="flex justify-center items-center bg-primary shadow-sm rounded-lg w-9 h-9 font-bold text-primary-foreground text-xs shrink-0">
            {offer.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <h3
              className={cn(
                "font-semibold leading-tight",
                isCompact ? "text-sm" : "text-base"
              )}
            >
              {offer.name}
            </h3>
            <p className="text-muted-foreground text-xs">{offer.category}</p>
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

        <div className="inline-block bg-primary shadow-sm mt-3 px-3 py-1.5 rounded-lg font-bold text-primary-foreground text-sm">
          {offer.discount}
        </div>
      </CardContent>

      <CardFooter
        className={cn(
          "flex justify-between items-center pt-3 border-border/50 border-t",
          isCompact ? "px-4 pb-3" : "px-5 pb-4 sm:px-6 sm:pb-5"
        )}
      >
        {offer.audience === "everyone" ? (
          <Badge
            variant="secondary"
            className="bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-400"
          >
            Everyone
          </Badge>
        ) : (
          <Badge
            variant="secondary"
            className="bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-400"
          >
            Students
          </Badge>
        )}
        <Link
          href={`/offer/${offer.slug}`}
          className="inline-flex items-center gap-1 font-medium text-muted-foreground hover:text-foreground text-xs transition-colors"
        >
          View Deal
          <ArrowUpRight className="w-3 h-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </CardFooter>
    </Card>
  )
}
