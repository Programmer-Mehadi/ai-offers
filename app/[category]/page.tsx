import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { PageTransition } from "@/components/page-transition"
import {
  getCategories,
  getCategoryGradientClass,
  categoryLookup,
  getCategorySlug,
  getOffersByCategory,
} from "@/data/offers"
import { ToolCard } from "./tool-card"

const categoryDescriptions: Record<string, string> = {
  "ai-and-machine-learning":
    "AI APIs, ML platforms, and data tools — many free with generous credits for students and developers.",
  development:
    "IDEs, code editors, hosting, and developer tools to build and ship faster.",
  productivity:
    "Stay organized and work smarter with discounted productivity tools and AI assistants.",
  design:
    "Professional design software, prototyping tools, and creative suites at student-friendly prices.",
  learning:
    "Online courses, learning platforms, and educational resources to upskill for less.",
  "cloud-and-hosting":
    "Cloud platforms, hosting services, and DevOps tools — stack credits to build for free.",
  media:
    "Music, video, and entertainment subscriptions with significant student discounts.",
  shopping:
    "Retail discounts, shopping benefits, and lifestyle perks for students.",
  "travel-and-finance":
    "Travel deals, banking perks, and financial tools tailored for students.",
  memberships:
    "Professional memberships and organizational discounts for students.",
  security: "VPNs, password managers, and security tools to stay safe online.",
  food: "Food delivery discounts and dining perks to save on meals.",
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category: slug } = await params
  const categoryName = categoryLookup[slug]

  if (!categoryName) {
    notFound()
  }

  const [categories, categoryOffers] = await Promise.all([
    getCategories(),
    getOffersByCategory(categoryName),
  ])
  const cat = categories.find((c) => getCategorySlug(c.name) === slug)
  const gradientClass = cat ? getCategoryGradientClass(cat.color) : ""
  const otherCategories = categories.filter(
    (c) => getCategorySlug(c.name) !== slug
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <PageTransition>
        <main className="flex-1">
          {/* Hero banner */}
          {cat && (
            <section className="relative overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16">
              <div
                className={`absolute inset-0 bg-linear-to-br ${gradientClass} opacity-5 dark:opacity-[0.07]`}
              />
              <div
                className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] ${gradientClass} via-transparent to-transparent opacity-[0.08]`}
              />
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${gradientClass} text-lg font-bold text-white shadow-md`}
                  >
                    {categoryName.charAt(0)}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                      {categoryName}
                    </h1>
                    <p className="mt-1 max-w-xl text-muted-foreground">
                      {categoryDescriptions[slug]}
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground/70">
                      {categoryOffers.length} offers available
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
            {categoryOffers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-lg font-medium">
                  No offers found in this category
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Check back soon for new offers
                </p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link href="/tools">Browse all offers</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categoryOffers.map((offer) => (
                  <ToolCard key={offer.id} offer={offer} />
                ))}
              </div>
            )}

            <div className="mt-12">
              <h2 className="mb-6 text-xl font-bold tracking-tight">
                Other categories
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {otherCategories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/${getCategorySlug(c.name)}`}
                    className="group flex items-center gap-3 rounded-xl border border-border/50 p-4 transition-all hover:border-transparent hover:shadow-md"
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-linear-to-br ${getCategoryGradientClass(c.color)} text-xs font-bold text-white`}
                    >
                      {c.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm leading-tight font-medium">
                        {c.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {c.count} offers
                      </p>
                    </div>
                    <ArrowUpRight className="ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
      </PageTransition>
      <Footer />
    </div>
  )
}
