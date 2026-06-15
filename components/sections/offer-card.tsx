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
    <Card className="group relative overflow-hidden border-border/50 transition-all duration-300 hover:border-transparent hover:shadow-lg hover:shadow-brand-500/10">
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${offer.color}`}
      />

      {offer.featured && (
        <div className="absolute right-2 top-2">
          <Badge variant="secondary" className="gap-1 bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
            <Sparkles className="h-3 w-3" />
            Featured
          </Badge>
        </div>
      )}
      {offer.hidden_gem && (
        <div className="absolute right-2 top-2">
          <Badge variant="secondary" className="gap-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
            <Gem className="h-3 w-3" />
            Hidden Gem
          </Badge>
        </div>
      )}
      {offer.underrated && (
        <div className="absolute right-2 top-2">
          <Badge variant="secondary" className="gap-1 bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400">
            <Award className="h-3 w-3" />
            Underrated
          </Badge>
        </div>
      )}


      <CardContent className={cn(isCompact ? "p-4" : "p-5 sm:p-6")}>
        <div className="mb-3 flex items-center gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${offer.color} text-xs font-bold text-white shadow-sm`}
          >
            {offer.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <h3 className={cn("font-semibold leading-tight", isCompact ? "text-sm" : "text-base")}>
              {offer.name}
            </h3>
            <p className="text-xs text-muted-foreground">{offer.category}</p>
          </div>
        </div>

        <p className={cn("text-muted-foreground", isCompact ? "text-xs" : "text-sm")}>
          {offer.description}
        </p>

        <div
          className={`mt-3 inline-block rounded-md bg-gradient-to-r ${offer.color} px-2.5 py-1 text-xs font-semibold text-white`}
        >
          {offer.discount}
        </div>
      </CardContent>

      <CardFooter className={cn("flex items-center justify-between border-t border-border/50 pt-3", isCompact ? "px-4 pb-3" : "px-5 pb-4 sm:px-6 sm:pb-5")}>
        {offer.audience === "everyone" ? (
          <Badge variant="secondary" className="bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-400">Everyone</Badge>
        ) : (
          <Badge variant="secondary" className="bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-400">Students</Badge>
        )}
        <Link
          href={offer.url}
          className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          View Deal
          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </CardFooter>
    </Card>
  )
}

