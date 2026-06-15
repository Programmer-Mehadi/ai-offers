"use client"

import { notFound, useParams } from "next/navigation"
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Award, Bookmark, CheckCircle2, DollarSign, Flag, Gem, Globe, Link2,
  LucideIcon, Share2, Sparkles, Tag, Users,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { PageTransition } from "@/components/page-transition"
import { getOfferBySlug, getCategoryByName, getOffersByCategory, offers, getCategorySlug } from "@/data/offers"
import { cn } from "@/lib/utils"

const tagIcons: Record<string, LucideIcon> = {
  API: Globe, Free: Award, Credit: Users, Discount: Tag, Developer: Link2, AI: Sparkles,
}

function getFavorites(): string[] {
  try { return JSON.parse(localStorage.getItem("favorites") || "[]") } catch { return [] }
}

function toggleFavorite(id: string) {
  const favs = getFavorites()
  const idx = favs.indexOf(id)
  if (idx === -1) {
    favs.push(id)
    toast.success("Saved to favorites")
  } else {
    favs.splice(idx, 1)
    toast.success("Removed from favorites")
  }
  localStorage.setItem("favorites", JSON.stringify(favs))
  window.dispatchEvent(new Event("favorites-updated"))
}

function isFavorited(id: string): boolean {
  return getFavorites().includes(id)
}

function extractValue(discount: string): string {
  const match = discount.match(/\$?(\d+[\d,]*)/)
  if (!match) return ""
  const num = parseInt(match[1].replace(/,/g, ""))
  if (num >= 100) return `Up to $${num.toLocaleString()}/year value`
  return ""
}

export default function OfferPage() {
  const params = useParams()
  const slug = params.slug as string
  const offer = getOfferBySlug(slug)

  if (!offer) notFound()

  const saved = isFavorited(slug)
  const savingsValue = extractValue(offer.discount)

  function isClaimed(id: string): boolean {
    try { return JSON.parse(localStorage.getItem("claimed") || "[]").includes(id) } catch { return false }
  }
  function toggleClaimed(id: string) {
    const c = JSON.parse(localStorage.getItem("claimed") || "[]")
    const idx = c.indexOf(id)
    if (idx === -1) { c.push(id); toast.success("Marked as claimed!") } else { c.splice(idx, 1) }
    localStorage.setItem("claimed", JSON.stringify(c))
    window.dispatchEvent(new Event("claimed-updated"))
  }
  const claimed = isClaimed(slug)

  const currentIndex = offers.findIndex((o) => o.id === slug)
  const prevOffer = currentIndex > 0 ? offers[currentIndex - 1] : null
  const nextOffer = currentIndex < offers.length - 1 ? offers[currentIndex + 1] : null
  const relatedOffers = getOffersByCategory(offer.category).filter((o) => o.id !== slug).slice(0, 4)
  const catSlug = getCategorySlug(offer.category)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <PageTransition>
        <main className="flex-1 pt-24">
          <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            <Breadcrumbs items={[
              { label: "Offers", href: "/tools" },
              { label: offer.category, href: `/${catSlug}` },
              { label: offer.name },
            ]} />

            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                {/* Hero card */}
                <Card className="overflow-hidden border-border/50">
                  <div className={`h-2 bg-gradient-to-r ${offer.color}`} />
                  <CardContent className="p-6 sm:p-8">
                    <div className="mb-6 flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${offer.color} text-xl font-bold text-white shadow-md`}>
                          {offer.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h1 className="text-2xl font-bold sm:text-3xl">{offer.name}</h1>
                          <div className="mt-1 flex items-center gap-2">
                            <Link href={`/${catSlug}`} className="text-sm text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground">
                              {offer.category}
                            </Link>
                            {offer.audience === "everyone" ? (
                              <Badge variant="secondary" className="bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-400">Everyone</Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-400">Students</Badge>
                            )}
                            {offer.featured && (
                              <Badge variant="secondary" className="gap-1 bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                                <Sparkles className="h-3 w-3" /> Featured
                              </Badge>
                            )}
                            {offer.hidden_gem && (
                              <Badge variant="secondary" className="gap-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                                <Gem className="h-3 w-3" /> Hidden Gem
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1.5">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => toggleFavorite(slug)}>
                              <Bookmark className={cn("h-4 w-4", saved && "fill-brand-500 text-brand-500")} />
                              <span className="sr-only">{saved ? "Remove from" : "Save to"} favorites</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>{saved ? "Remove from favorites" : "Save to favorites"}</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => {
                              navigator.clipboard.writeText(window.location.href)
                              toast.success("Link copied to clipboard")
                            }}>
                              <Share2 className="h-4 w-4" />
                              <span className="sr-only">Share</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Share this offer</TooltipContent>
                        </Tooltip>
                      </div>
                    </div>

                    <p className="mb-6 text-lg text-muted-foreground">{offer.description}</p>

                    {/* Discount highlight */}
                    <div className="mb-6 flex flex-wrap items-center gap-3">
                      <div className={`inline-block rounded-lg bg-gradient-to-r ${offer.color} px-5 py-2.5 text-base font-bold text-white shadow-sm`}>
                        {offer.discount}
                      </div>
                      {savingsValue && (
                        <div className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400">
                          <DollarSign className="h-4 w-4" />
                          {savingsValue}
                        </div>
                      )}
                    </div>

                    {offer.tags && (
                      <div className="mb-6 flex flex-wrap gap-2">
                        {offer.tags.map((tag) => {
                          const Icon = tagIcons[tag] || Tag
                          return (
                            <Badge key={tag} variant="outline" className="gap-1 px-3 py-1">
                              <Icon className="h-3 w-3" /> {tag}
                            </Badge>
                          )
                        })}
                      </div>
                    )}

                    <Separator className="mb-6" />

                    {offer.notes && offer.notes.length > 0 && (
                      <div className="mb-6">
                        <h2 className="mb-3 text-lg font-semibold">Important Notes</h2>
                        <ul className="space-y-2">
                          {offer.notes.map((note, i) => (
                            <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {offer.howToClaim && offer.howToClaim.length > 0 && (
                      <div className="mb-6">
                        <h2 className="mb-3 text-lg font-semibold">How to Claim</h2>
                        <ol className="space-y-3">
                          {offer.howToClaim.map((step, i) => (
                            <li key={i} className="flex gap-4">
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-sm font-semibold text-brand-600 dark:text-brand-400">
                                {i + 1}
                              </span>
                              <span className="pt-0.5 text-sm text-muted-foreground">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {offer.isReferral && (
                      <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300">
                        Claim link is a referral link &mdash; signing up through it gives you an extra bonus on top of the free offer.
                      </div>
                    )}

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button
                        size="lg"
                        className={cn("gap-1.5", claimed && "border-emerald-500 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400")}
                        onClick={() => toggleClaimed(slug)}
                        asChild={!claimed}
                      >
                        {claimed ? (
                          <span className="inline-flex items-center gap-1.5">
                            <CheckCircle2 className="h-4 w-4" />
                            Mark as unclaimed
                          </span>
                        ) : (
                          <a href={offer.claimUrl || "#"} target="_blank" rel="noopener noreferrer">
                            Claim This Offer
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        )}
                      </Button>
                      <Button size="lg" variant="outline" asChild>
                        <Link href={`/${catSlug}`}>
                          More in {offer.category}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>

                    <div className="mt-6">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1.5 text-xs text-muted-foreground"
                        onClick={() => {
                          toast.success("Thanks for the report!", {
                            description: "Our team will review this offer.",
                          })
                        }}
                      >
                        <Flag className="h-3.5 w-3.5" />
                        Report expired or incorrect
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Prev / Next */}
                {(prevOffer || nextOffer) && (
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    {prevOffer ? (
                      <Link
                        href={`/offer/${prevOffer.id}`}
                        className={cn(
                          "group flex items-center gap-3 rounded-xl border border-border/50 p-4 transition-all hover:border-transparent hover:shadow-md",
                          "text-left",
                        )}
                      >
                        <ArrowLeft className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-1" />
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground">Previous</p>
                          <p className="truncate text-sm font-medium">{prevOffer.name}</p>
                        </div>
                      </Link>
                    ) : <div />}
                    {nextOffer && (
                      <Link
                        href={`/offer/${nextOffer.id}`}
                        className="group flex items-center justify-end gap-3 rounded-xl border border-border/50 p-4 text-right transition-all hover:border-transparent hover:shadow-md"
                      >
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground">Next</p>
                          <p className="truncate text-sm font-medium">{nextOffer.name}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                      </Link>
                    )}
                  </div>
                )}

                {/* Similar offers */}
                <div className="mt-10">
                  <h2 className="mb-4 text-lg font-bold">Similar offers you might like</h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {(getOffersByCategory(offer.category).filter((o) => o.id !== slug).slice(0, 4) || []).map((ro) => (
                      <Link
                        key={ro.id}
                        href={`/offer/${ro.id}`}
                        className="group flex items-center gap-3 rounded-xl border border-border/50 p-4 transition-all hover:border-transparent hover:shadow-md"
                      >
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${ro.color} text-xs font-bold text-white`}>
                          {ro.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium leading-tight group-hover:text-brand-600 dark:group-hover:text-brand-400">{ro.name}</p>
                          <p className="text-xs text-muted-foreground">{ro.discount}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {relatedOffers.length > 0 && (
                  <Card className="border-border/50">
                    <CardContent className="p-5">
                      <h3 className="mb-4 text-sm font-semibold">More in {offer.category}</h3>
                      <div className="space-y-3">
                        {relatedOffers.map((ro) => (
                          <Link
                            key={ro.id}
                            href={`/offer/${ro.id}`}
                            className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
                          >
                            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${ro.color} text-[10px] font-bold text-white`}>
                              {ro.name.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium leading-tight">{ro.name}</p>
                              <p className="truncate text-xs text-muted-foreground">{ro.discount}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <Link
                        href={`/${catSlug}`}
                        className="mt-3 flex items-center justify-center gap-1 rounded-lg border border-border/50 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
                      >
                        View all {getCategoryByName(offer.category)?.count || ""} offers
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </CardContent>
                  </Card>
                )}

                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <h3 className="mb-2 text-sm font-semibold">About this offer</h3>
                    <ul className="space-y-2 text-xs text-muted-foreground">
                      <li className="flex justify-between">
                        <span>Category</span>
                        <Link href={`/${catSlug}`} className="font-medium text-foreground underline underline-offset-2">
                          {offer.category}
                        </Link>
                      </li>
                      <li className="flex justify-between">
                        <span>Audience</span>
                        <span className={cn("font-medium", offer.audience === "everyone" ? "text-sky-600 dark:text-sky-400" : "text-brand-600 dark:text-brand-400")}>
                          {offer.audience === "everyone" ? "Everyone" : "Students"}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Verification</span>
                        <span className="font-medium text-emerald-600 dark:text-emerald-400">Verified</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Updated</span>
                        <span className="font-medium">June 2026</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </PageTransition>
      <Footer />
    </div>
  )
}
