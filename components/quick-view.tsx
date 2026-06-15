"use client"

import { ArrowUpRight, X } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { type Offer } from "@/data/offers"

interface QuickViewProps {
  offer: Offer | null
  onClose: () => void
}

export function QuickView({ offer, onClose }: QuickViewProps) {
  if (!offer) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-24">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 mx-4 w-full max-w-lg animate-scale-in rounded-xl border border-border bg-background p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-3">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${offer.color} text-base font-bold text-white shadow-sm`}>
            {offer.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold">{offer.name}</h3>
            <p className="text-sm text-muted-foreground">{offer.category}</p>
          </div>
          <div className="flex gap-1">
            {offer.featured && <Badge variant="secondary" className="bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">Featured</Badge>}
            {offer.hidden_gem && <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">Hidden</Badge>}
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">{offer.description}</p>

        <div className={`mt-3 inline-block rounded-md bg-gradient-to-r ${offer.color} px-2.5 py-1 text-xs font-semibold text-white`}>
          {offer.discount}
        </div>

        {offer.tags && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {offer.tags.map((t) => (
              <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>
            ))}
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <Button size="sm" className="gap-1" asChild>
            <a href={offer.claimUrl || "#"} target="_blank" rel="noopener noreferrer">
              Claim <ArrowUpRight className="h-3 w-3" />
            </a>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <Link href={`/offer/${offer.id}`}>View details</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
