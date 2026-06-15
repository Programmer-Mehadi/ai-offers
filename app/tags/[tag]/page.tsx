import { notFound } from "next/navigation"
import Link from "next/link"
import { Hash, Tag } from "lucide-react"

import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { PageTransition } from "@/components/page-transition"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { getAllOfferTags, getOffersByTag } from "@/data/offers"
import { ToolCard } from "@/app/[category]/tool-card"

export function generateStaticParams() {
  return getAllOfferTags().map((tag) => ({ tag: tag.toLowerCase().replace(/\s+/g, "-") }))
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>
}) {
  const { tag: tagSlug } = await params
  const allTags = getAllOfferTags()
  const matchedTag = allTags.find((t) => t.toLowerCase().replace(/\s+/g, "-") === tagSlug)

  if (!matchedTag) notFound()

  const tagged = getOffersByTag(matchedTag)
  const otherTags = allTags.filter((t) => t !== matchedTag)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <PageTransition>
        <main className="flex-1 pt-24">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <Breadcrumbs items={[
              { label: "Tags", href: "/tools" },
              { label: matchedTag },
            ]} />

            <div className="mb-10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-violet-600 shadow-md">
                <Hash className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{matchedTag}</h1>
              <p className="mt-2 text-muted-foreground">
                {tagged.length} offer{tagged.length !== 1 && "s"} tagged with {matchedTag}
              </p>
            </div>

            {tagged.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Tag className="mb-3 h-8 w-8 text-muted-foreground/50" />
                <p className="text-lg font-medium">No offers found</p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link href="/tools">Browse all offers</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {tagged.map((offer) => (
                  <ToolCard key={offer.id} offer={offer} />
                ))}
              </div>
            )}

            {otherTags.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-4 text-lg font-bold">All tags</h2>
                <div className="flex flex-wrap gap-2">
                  {otherTags.map((t) => (
                    <Link
                      key={t}
                      href={`/tags/${t.toLowerCase().replace(/\s+/g, "-")}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border/50 px-3.5 py-1.5 text-sm transition-all hover:border-transparent hover:bg-muted hover:shadow-sm"
                    >
                      <Hash className="h-3 w-3 text-muted-foreground" />
                      {t}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </PageTransition>
      <Footer />
    </div>
  )
}
