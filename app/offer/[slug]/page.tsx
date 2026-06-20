"use client"

import { notFound, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  CheckCircle2,
  DollarSign,
  Flag,
  Gem,
  Globe,
  Heart,
  Link2,
  LucideIcon,
  Share2,
  Sparkles,
  Tag,
  Users,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useAuth } from "@/components/auth-provider"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { PageTransition } from "@/components/page-transition"
import { getOfferBySlug, getOffers, getCategorySlug } from "@/data/offers"
import { cn } from "@/lib/utils"

const tagIcons: Record<string, LucideIcon> = {
  API: Globe,
  Free: Award,
  Credit: Users,
  Discount: Tag,
  Developer: Link2,
  AI: Sparkles,
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
  const [offer, setOffer] =
    useState<Awaited<ReturnType<typeof getOfferBySlug>>>(undefined)
  const [offers, setOffers] = useState<Awaited<ReturnType<typeof getOffers>>>(
    []
  )
  const [loading, setLoading] = useState(true)
  const { wishlistIds, claimedIds, toggleWishlist, toggleClaimed } = useAuth()

  useEffect(() => {
    Promise.all([getOfferBySlug(slug), getOffers()]).then(([o, all]) => {
      setOffer(o)
      setOffers(all)
      setLoading(false)
    })
  }, [slug])

  if (loading) return null
  if (!offer) notFound()

  const saved = wishlistIds.includes(slug)
  const claimed = claimedIds.includes(slug)
  const savingsValue = extractValue(offer.discount)

  async function handleWishlistToggle() {
    try {
      const result = await toggleWishlist(slug)
      toast.success(
        result.saved ? "Saved to wishlist" : "Removed from wishlist",
        {
          description: "Your wishlist is synced to your account.",
        }
      )
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to update wishlist"
      )
    }
  }

  async function handleClaimedToggle() {
    try {
      const result = await toggleClaimed(slug)
      toast.success(
        result.claimed ? "Marked as claimed!" : "Marked as unclaimed"
      )
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to update claimed status"
      )
    }
  }

  const currentIndex = offers.findIndex((o) => o.id === slug)
  const prevOffer = currentIndex > 0 ? offers[currentIndex - 1] : null
  const nextOffer =
    currentIndex < offers.length - 1 ? offers[currentIndex + 1] : null
  const relatedOffers = offers
    .filter((o) => o.category === offer.category && o.id !== slug)
    .slice(0, 4)
  const categoryOfferCount = offers.filter(
    (o) => o.category === offer.category
  ).length
  const catSlug = getCategorySlug(offer.category)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <PageTransition>
        <main className="flex-1 pt-24">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-5xl">
            <Breadcrumbs
              items={[
                { label: "Offers", href: "/tools" },
                { label: offer.category, href: `/categories/${catSlug}` },
                { label: offer.name },
              ]}
            />

            <div className="gap-8 grid lg:grid-cols-3">
              <div className="lg:col-span-2">
                {/* Hero card */}
                <Card className="border-border/50 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${offer.color}`} />
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-6">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div
                          className={`flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br ${offer.color} text-base sm:text-xl font-bold text-white shadow-md`}
                        >
                          {offer.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl break-words">
                            {offer.name}
                          </h1>
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1">
                            <Link
                              href={`/categories/${catSlug}`}
                              className="text-muted-foreground hover:text-foreground text-sm underline underline-offset-2 transition-colors"
                            >
                              {offer.category}
                            </Link>
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
                            {offer.featured && (
                              <Badge
                                variant="secondary"
                                className="gap-1 bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400"
                              >
                                <Sparkles className="w-3 h-3" /> Featured
                              </Badge>
                            )}
                            {offer.hidden_gem && (
                              <Badge
                                variant="secondary"
                                className="gap-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400"
                              >
                                <Gem className="w-3 h-3" /> Hidden Gem
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1.5">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-9 h-9"
                              onClick={() => {
                                void handleWishlistToggle()
                              }}
                            >
                              <Heart
                                className={cn(
                                  "w-4 h-4",
                                  saved && "fill-brand-500 text-brand-500"
                                )}
                              />
                              <span className="sr-only">
                                {saved ? "Remove from" : "Save to"} wishlist
                              </span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {saved
                              ? "Remove from wishlist"
                              : "Save to wishlist"}
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-9 h-9"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  window.location.href
                                )
                                toast.success("Link copied to clipboard")
                              }}
                            >
                              <Share2 className="w-4 h-4" />
                              <span className="sr-only">Share</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Share this offer</TooltipContent>
                        </Tooltip>
                      </div>
                    </div>

                    <p className="mb-6 text-muted-foreground text-lg">
                      {offer.description}
                    </p>

                    {/* Discount highlight */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <div
                        className={`inline-block rounded-lg bg-gradient-to-r ${offer.color} px-5 py-2.5 text-base font-bold text-white shadow-sm`}
                      >
                        {offer.discount}
                      </div>
                      {savingsValue && (
                        <div className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-2 border border-emerald-200 dark:border-emerald-900/50 rounded-lg font-semibold text-emerald-700 dark:text-emerald-400 text-sm">
                          <DollarSign className="w-4 h-4" />
                          {savingsValue}
                        </div>
                      )}
                    </div>

                    {offer.tags && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {offer.tags.map((tag) => {
                          const Icon = tagIcons[tag] || Tag
                          return (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="gap-1 px-3 py-1"
                            >
                              <Icon className="w-3 h-3" /> {tag}
                            </Badge>
                          )
                        })}
                      </div>
                    )}

                    <Separator className="mb-6" />

                    {offer.notes && offer.notes.length > 0 && (
                      <div className="mb-6">
                        <h2 className="mb-3 font-semibold text-lg">
                          Important Notes
                        </h2>
                        <ul className="space-y-2">
                          {offer.notes.map((note, i) => (
                            <li
                              key={i}
                              className="flex gap-3 text-muted-foreground text-sm"
                            >
                              <span className="bg-brand-500 mt-1.5 rounded-full w-1.5 h-1.5 shrink-0" />
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {offer.howToClaim && offer.howToClaim.length > 0 && (
                      <div className="mb-6">
                        <h2 className="mb-3 font-semibold text-lg">
                          How to Claim
                        </h2>
                        <ol className="space-y-3">
                          {offer.howToClaim.map((step, i) => (
                            <li key={i} className="flex gap-4">
                              <span className="flex justify-center items-center bg-brand-500/10 rounded-full w-7 h-7 font-semibold text-brand-600 dark:text-brand-400 text-sm shrink-0">
                                {i + 1}
                              </span>
                              <span className="pt-0.5 text-muted-foreground text-sm">
                                {step}
                              </span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {offer.isReferral && (
                      <div className="bg-amber-50 dark:bg-amber-950/30 mb-6 px-4 py-3 border border-amber-200 dark:border-amber-900/50 rounded-lg text-amber-800 dark:text-amber-300 text-sm">
                        Claim link is a referral link &mdash; signing up through
                        it gives you an extra bonus on top of the free offer.
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        size="lg"
                        className={cn(
                          "gap-1.5",
                          claimed &&
                            "border-emerald-500 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400"
                        )}
                        onClick={() => { void handleClaimedToggle() }}
                        asChild={!claimed}
                      >
                        {claimed ? (
                          <span className="inline-flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            Mark as unclaimed
                          </span>
                        ) : (
                          <a
                            href={offer.claimUrl || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Claim This Offer
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        )}
                      </Button>
                      <Button size="lg" variant="outline" asChild>
                        <Link href={`/categories/${catSlug}`}>
                          More in {offer.category}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>

                    <div className="mt-6">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1.5 text-muted-foreground text-xs"
                        onClick={() => {
                          toast.success("Thanks for the report!", {
                            description: "Our team will review this offer.",
                          })
                        }}
                      >
                        <Flag className="w-3.5 h-3.5" />
                        Report expired or incorrect
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Prev / Next */}
                {(prevOffer || nextOffer) && (
                  <div className="gap-4 grid grid-cols-2 mt-6">
                    {prevOffer ? (
                      <Link
                        href={`/offer/${prevOffer.id}`}
                        className={cn(
                          "group flex items-center gap-3 hover:shadow-md p-4 border border-border/50 hover:border-transparent rounded-xl transition-all",
                          "text-left"
                        )}
                      >
                        <ArrowLeft className="w-4 h-4 text-muted-foreground transition-transform group-hover:-translate-x-1 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-muted-foreground text-xs">
                            Previous
                          </p>
                          <p className="font-medium text-sm truncate">
                            {prevOffer.name}
                          </p>
                        </div>
                      </Link>
                    ) : (
                      <div />
                    )}
                    {nextOffer && (
                      <Link
                        href={`/offer/${nextOffer.id}`}
                        className="group flex justify-end items-center gap-3 hover:shadow-md p-4 border border-border/50 hover:border-transparent rounded-xl text-right transition-all"
                      >
                        <div className="min-w-0">
                          <p className="text-muted-foreground text-xs">Next</p>
                          <p className="font-medium text-sm truncate">
                            {nextOffer.name}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground transition-transform group-hover:translate-x-1 shrink-0" />
                      </Link>
                    )}
                  </div>
                )}

                {/* Similar offers */}
                <div className="mt-10">
                  <h2 className="mb-4 font-bold text-lg">
                    Similar offers you might like
                  </h2>
                  <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                    {relatedOffers.map((ro) => (
                      <Link
                        key={ro.id}
                        href={`/offer/${ro.id}`}
                        className="group flex items-center gap-3 hover:shadow-md p-4 border border-border/50 hover:border-transparent rounded-xl transition-all"
                      >
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${ro.color} text-xs font-bold text-white`}
                        >
                          {ro.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium dark:group-hover:text-brand-400 group-hover:text-brand-600 text-sm leading-tight">
                            {ro.name}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {ro.discount}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 shrink-0" />
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
                      <h3 className="mb-4 font-semibold text-sm">
                        More in {offer.category}
                      </h3>
                      <div className="space-y-3">
                        {relatedOffers.map((ro) => (
                          <Link
                            key={ro.id}
                            href={`/offer/${ro.id}`}
                            className="flex items-center gap-3 hover:bg-muted p-2 rounded-lg transition-colors"
                          >
                            <div
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${ro.color} text-[10px] font-bold text-white`}
                            >
                              {ro.name.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-sm truncate leading-tight">
                                {ro.name}
                              </p>
                              <p className="text-muted-foreground text-xs truncate">
                                {ro.discount}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <Link
                        href={`/categories/${catSlug}`}
                        className="flex justify-center items-center gap-1 hover:bg-muted mt-3 py-2 border border-border/50 rounded-lg font-medium text-muted-foreground text-xs transition-colors"
                      >
                        View all {categoryOfferCount || ""} offers
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </CardContent>
                  </Card>
                )}

                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <h3 className="mb-2 font-semibold text-sm">
                      About this offer
                    </h3>
                    <ul className="space-y-2 text-muted-foreground text-xs">
                      <li className="flex justify-between">
                        <span>Category</span>
                        <Link
                          href={`/categories/${catSlug}`}
                          className="font-medium text-foreground underline underline-offset-2"
                        >
                          {offer.category}
                        </Link>
                      </li>
                      <li className="flex justify-between">
                        <span>Audience</span>
                        <span
                          className={cn(
                            "font-medium",
                            offer.audience === "everyone"
                              ? "text-sky-600 dark:text-sky-400"
                              : "text-brand-600 dark:text-brand-400"
                          )}
                        >
                          {offer.audience === "everyone"
                            ? "Everyone"
                            : "Students"}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Verification</span>
                        <span className="font-medium text-emerald-600 dark:text-emerald-400">
                          Verified
                        </span>
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
