"use client"

import { ArrowUpRight, Award, Gem, Heart, Sparkles } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { OfferLogoImage } from "@/components/offer-logo-image"
import { useAuth } from "@/components/auth-provider"
import { cn } from "@/lib/utils"
import type { Offer } from "@/data/offers"

export function ToolCard({ offer }: { offer: Offer }) {
  const { wishlistIds, toggleWishlist, isAuthenticated } = useAuth()
  const inWishlist = wishlistIds.includes(offer.id)

  async function handleWishlistToggle(e: React.MouseEvent) {
    e.stopPropagation()
    try {
      const result = await toggleWishlist(offer.id)
      toast.success(
        result.saved ? "Saved to wishlist" : "Removed from wishlist"
      )
    } catch (error) {
      if (!isAuthenticated) {
        toast.error("Sign in to save offers to your wishlist")
      } else {
        toast.error(
          error instanceof Error ? error.message : "Unable to update wishlist"
        )
      }
    }
  }

  return (
    <Card className="group relative border-border/50 transition-all duration-300 hover:border-transparent hover:shadow-lg hover:shadow-brand-500/10">
      {/* Wishlist button */}

      <div className="items-between grid grid-cols-[1fr_auto] justify-between gap-4 px-4 py-0 pb-0">
        {/* Badges at top like OfferCard */}
        <div className="flex flex-wrap gap-2">
          {offer.featured && (
            <Badge
              variant="secondary"
              className="gap-1 bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
            >
              <Sparkles className="h-3 w-3" />
              Featured
            </Badge>
          )}
          {offer.hidden_gem && (
            <Badge
              variant="secondary"
              className="gap-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
            >
              <Gem className="h-3 w-3" />
              Hidden Gem
            </Badge>
          )}
          {offer.underrated && (
            <Badge
              variant="secondary"
              className="gap-1 bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400"
            >
              <Award className="h-3 w-3" />
              Underrated
            </Badge>
          )}
        </div>
        <div className="">
          <button
            onClick={handleWishlistToggle}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-md border transition-colors",
              inWishlist
                ? "border-brand-500 bg-brand-500 text-white"
                : "border-border bg-background text-muted-foreground hover:border-brand-500/50 hover:text-brand-500"
            )}
          >
            <Heart
              className={cn("h-3.5 w-3.5", inWishlist && "fill-current")}
            />
            <span className="sr-only">
              {inWishlist ? "Remove from" : "Add to"} wishlist
            </span>
          </button>
        </div>
      </div>

      <CardContent className="p-4 pt-0">
        <div className="mb-3 flex items-center gap-3">
          <OfferLogoImage
            src={offer.logo}
            name={offer.name}
            size="md"
            color="bg-primary"
          />
          <div className="min-w-0">
            <h3 className="leading-tight font-semibold">{offer.name}</h3>
            <p className="text-xs text-muted-foreground">{offer.category}</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">{offer.description}</p>

        <div className="mt-3 inline-block rounded-lg bg-primary px-3 py-1.5 text-sm font-bold text-primary-foreground shadow-sm">
          {offer.discount}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-border/50 px-5 py-3">
        <div>
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
        </div>
        <Link
          href={`/offer/${offer.slug}`}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          View Deal
          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </CardFooter>
    </Card>
  )
}
