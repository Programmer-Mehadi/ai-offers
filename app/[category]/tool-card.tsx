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
    <Card className="group relative overflow-hidden border-border/50 transition-all duration-300 hover:border-transparent hover:shadow-lg hover:shadow-brand-500/10">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${offer.color}`} />

      <button
        onClick={(e) => { e.stopPropagation(); toggleCompare(offer.id) }}
        className={cn(
          "absolute right-2 top-2 z-20 flex h-6 w-6 items-center justify-center rounded-md border text-muted-foreground transition-colors",
          inCompare
            ? "border-brand-500 bg-brand-500 text-white"
            : "border-border bg-background hover:border-brand-500/50 hover:text-brand-500",
        )}
      >
        <Plus className={cn("h-3 w-3", inCompare && "rotate-45")} />
        <span className="sr-only">{inCompare ? "Remove from" : "Add to"} compare</span>
      </button>

      <CardContent className="p-5">
        <div className="mb-3 flex items-center gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${offer.color} text-sm font-bold text-white shadow-sm`}>
            {offer.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold leading-tight">{offer.name}</h3>
            <p className="text-xs text-muted-foreground">{offer.category}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{offer.description}</p>
        <div className={cn("mt-3 inline-block rounded-md bg-gradient-to-r px-2.5 py-1 text-xs font-semibold text-white", offer.color)}>
          {offer.discount}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-border/50 px-5 py-3">
        <div className="flex gap-1">
          {offer.featured && <Badge variant="secondary" className="bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">Featured</Badge>}
          {offer.hidden_gem && <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">Hidden</Badge>}
          {offer.audience === "everyone" ? (
            <Badge variant="secondary" className="bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-400">Everyone</Badge>
          ) : (
            <Badge variant="secondary" className="bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-400">Students</Badge>
          )}
        </div>
        <Link href={`/offer/${offer.id}`} className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground" onClick={(e) => e.stopPropagation()}>
          View
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </CardFooter>
    </Card>
  )
}
