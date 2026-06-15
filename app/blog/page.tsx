import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { blogPosts } from "@/data/offers"

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Student Offers Blog</h1>
            <p className="mt-2 text-muted-foreground">
              Tips, comparisons, and guides to help students save money and make the most of their discounts.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Card key={post.id} className="group relative flex flex-col overflow-hidden border-border/50 transition-all duration-300 hover:border-transparent hover:shadow-lg">
                <div className="aspect-[16/9] bg-gradient-to-br from-brand-100 to-violet-100 dark:from-brand-950/30 dark:to-violet-950/30">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-brand-300/50 dark:text-brand-700/50">
                        {post.title.charAt(0)}
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h2 className="mb-2 text-lg font-bold leading-snug tracking-tight group-hover:text-brand-600 dark:group-hover:text-brand-400">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mb-4 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                  <div className="flex items-center justify-between border-t border-border/50 pt-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
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

