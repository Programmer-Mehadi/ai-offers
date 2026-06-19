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
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Guides" }]} />

          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-md">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Student Guides</h1>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
               In-depth guides to help you make the most of discounts, free tools, and student offers.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <Link key={guide.id} href={`/guides/${guide.slug}`}>
                <Card className="group h-full cursor-pointer border-border/50 transition-all duration-300 hover:border-transparent hover:shadow-lg">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="mb-3 inline-block w-fit rounded-md bg-gradient-to-r from-amber-500/10 to-orange-500/10 px-2.5 py-1 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                      {guide.category}
                    </div>
                    <h2 className="text-lg font-bold leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-400">{guide.title}</h2>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">{guide.description}</p>
                    <div className="mt-4 text-xs text-muted-foreground">
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

