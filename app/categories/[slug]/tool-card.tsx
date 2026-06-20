"use client"

import { ArrowUpRight, Heart } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useAuth } from "@/components/auth-provider"
import { cn } from "@/lib/utils"
import type { Offer } from "@/data/offers"
import { Button } from "@/components/ui/button"

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
    <Card className="group relative overflow-hidden border-border/50 transition-all duration-300 hover:border-transparent hover:shadow-lg hover:shadow-brand-500/10">
      <div className="absolute inset-x-0 top-0 h-1 bg-primary" />

      <div className="absolute top-2 right-2 z-20">
        <button
          onClick={handleWishlistToggle}
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-md border transition-colors",
            inWishlist
              ? "border-brand-500 bg-brand-500 text-white"
              : "border-border bg-background text-muted-foreground hover:border-brand-500/50 hover:text-brand-500"
          )}
        >
          <Heart
            className={cn("h-3 w-3", inWishlist && "fill-current")}
          />
          <span className="sr-only">
            {inWishlist ? "Remove from" : "Add to"} wishlist
          </span>
        </button>
      </div>

      <CardContent className="p-5">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm">
            {offer.name.slice(0, 2).toUpperCase()}
          </div>
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
        <div className="flex flex-wrap gap-1">
          {offer.featured && (
            <Badge
              variant="secondary"
              className="bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
            >
              Featured
            </Badge>
          )}
          {offer.hidden_gem && (
            <Badge
              variant="secondary"
              className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
            >
              Hidden
            </Badge>
          )}
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
        <Link href={`/offer/${offer.id}`} onClick={(e) => e.stopPropagation()}>
          <Button size="sm" className="h-7">
            View
            <ArrowUpRight className="h-3 w-3" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
