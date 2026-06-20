import { BookOpen } from "lucide-react"
import Link from "next/link"

import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card, CardContent } from "@/components/ui/card"
import { getGuides } from "@/data/guides"

export default async function GuidesIndexPage() {
  const guides = await getGuides()
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
          <Breadcrumbs items={[{ label: "Guides" }]} />

          <div className="mb-10 text-center">
            <div className="flex justify-center items-center bg-gradient-to-br from-amber-500 to-orange-600 shadow-md mx-auto mb-4 rounded-2xl w-14 h-14">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <h1 className="font-bold text-3xl sm:text-4xl tracking-tight">
              Savings Guides
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Handpicked strategies and insights to help you make the most of
              exclusive discounts and free tools.
            </p>
          </div>

          <div className="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <Link key={guide.id} href={`/guides/${guide.slug}`}>
                <Card className="group hover:shadow-lg border-border/50 hover:border-transparent h-full transition-all duration-300 cursor-pointer">
                  <CardContent className="flex flex-col p-6 h-full">
                    <div className="inline-block bg-gradient-to-r from-amber-500/10 to-orange-500/10 mb-3 px-2.5 py-1 rounded-md w-fit font-semibold text-[10px] text-amber-600 dark:text-amber-400">
                      {guide.category}
                    </div>
                    <h2 className="font-bold dark:group-hover:text-brand-400 group-hover:text-brand-600 text-lg leading-snug">
                      {guide.title}
                    </h2>
                    <p className="flex-1 mt-2 text-muted-foreground text-sm line-clamp-2">
                      {guide.description}
                    </p>
                    <div className="mt-4 text-muted-foreground text-xs">
                      {guide.date} · {guide.readTime}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
