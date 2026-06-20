import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { getBlogPosts } from "@/data/offers"

const blogDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
})

function formatBlogDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return blogDateFormatter.format(date)
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <h1 className="font-bold text-3xl sm:text-4xl tracking-tight">
              Blog
            </h1>
            <p className="mt-2 text-muted-foreground">
              Tips, comparisons, and guides to help save money and make the most
              of their discounts.
            </p>
          </div>            <div className="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Card
                key={post.id}
                className="group relative flex flex-col hover:shadow-lg pt-0 border-border/50 hover:border-transparent overflow-hidden transition-all duration-300"
              >
                <div className="bg-gradient-to-br from-brand-100 dark:from-brand-950/30 to-violet-100 dark:to-violet-950/30 aspect-[16/9]">
                  <div className="flex justify-center items-center h-full">
                    <div className="text-center">
                      <div className="font-bold text-brand-300/50 dark:text-brand-700/50 text-4xl">
                        {post.title.charAt(0)}
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="flex flex-col flex-1 p-5">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h2 className="mb-2 font-bold dark:group-hover:text-brand-400 group-hover:text-brand-600 text-lg leading-snug tracking-tight">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h2>
                  <p className="flex-1 mb-4 text-muted-foreground text-sm">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center pt-3 border-border/50 border-t text-muted-foreground text-xs">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatBlogDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
