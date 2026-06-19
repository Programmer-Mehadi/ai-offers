"use client"

import { ArrowUpRight, Plus } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useCompare } from "@/lib/use-compare"
import { cn } from "@/lib/utils"
import type { Offer } from "@/data/offers"

export function ToolCard({ offer }: { offer: Offer }) {
  const { compareIds, toggleCompare } = useCompare()
  const inCompare = compareIds.includes(offer.id)

  return (
    <Card className="group relative hover:shadow-brand-500/10 hover:shadow-lg border-border/50 hover:border-transparent overflow-hidden transition-all duration-300">
      <div className="top-0 absolute inset-x-0 bg-primary h-1" />

      <button
        onClick={(e) => {
          e.stopPropagation()
          toggleCompare(offer.id)
        }}
        className={cn(
          "top-2 right-2 z-20 absolute flex justify-center items-center border rounded-md w-6 h-6 text-muted-foreground transition-colors",
          inCompare
            ? "border-brand-500 bg-brand-500 text-white"
            : "border-border bg-background hover:border-brand-500/50 hover:text-brand-500"
        )}
      >
        <Plus className={cn("w-3 h-3", inCompare && "rotate-45")} />
        <span className="sr-only">
          {inCompare ? "Remove from" : "Add to"} compare
        </span>
      </button>

      <CardContent className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex justify-center items-center bg-primary shadow-sm rounded-xl w-10 h-10 font-bold text-primary-foreground text-sm shrink-0">
            {offer.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold leading-tight">{offer.name}</h3>
            <p className="text-muted-foreground text-xs">{offer.category}</p>
          </div>
        </div>
        <p className="text-muted-foreground text-sm">{offer.description}</p>
        <div className="inline-block bg-primary shadow-sm mt-3 px-3 py-1.5 rounded-lg font-bold text-primary-foreground text-sm">
          {offer.discount}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center px-5 py-3 border-border/50 border-t">
        <div className="flex gap-1">
          {offer.featured && (
            <Badge
              variant="secondary"
              className="bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400"
            >
              Featured
            </Badge>
          )}
          {offer.hidden_gem && (
            <Badge
              variant="secondary"
              className="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400"
            >
              Hidden
            </Badge>
          )}
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
        </div>
        <Link
          href={`/offer/${offer.id}`}
          className="inline-flex items-center gap-1 font-medium text-muted-foreground hover:text-foreground text-xs transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          View
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </CardFooter>
    </Card>
  )
}
