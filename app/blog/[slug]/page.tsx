import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"
import Link from "next/link"
import { Fragment } from "react"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { getBlogBySlug } from "@/data/offers"

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogBySlug(slug)

  if (!post) {
    notFound()
  }

  const contentSections = post.content.split("\n## ").map((section, i) => {
    const lines = section.trim().split("\n")
    const heading = i === 0 ? lines[0] : lines[0]
    const body = i === 0 ? lines.slice(1).join("\n").trim() : lines.slice(1).join("\n").trim()
    return { heading, body }
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>

          <header className="mb-8">
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  <Tag className="mr-1 h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{post.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
              <span>by {post.author}</span>
            </div>
          </header>

          <Separator className="mb-8" />

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {contentSections.map((section, i) => (
              <Fragment key={i}>
                {i === 0 ? (
                  <>
                    {section.body.split("\n").map((line, j) => {
                      if (line.startsWith("## ")) {
                        return <h2 key={j} className="mt-8 mb-4 text-2xl font-bold">{line.replace("## ", "")}</h2>
                      }
                      if (line.startsWith("### ")) {
                        return <h3 key={j} className="mt-6 mb-3 text-xl font-bold">{line.replace("### ", "")}</h3>
                      }
                      if (line.startsWith("- **")) {
                        const match = line.match(/- \*\*(.+?)\*\*:?\s*(.*)/)
                        if (match) {
                          return (
                            <div key={j} className="mb-2 flex gap-2">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                              <div>
                                <strong>{match[1]}</strong>
                                {match[2] && <span className="text-muted-foreground"> — {match[2]}</span>}
                              </div>
                            </div>
                          )
                        }
                      }
                      if (line.startsWith("- ")) {
                        return (
                          <div key={j} className="mb-2 flex gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/30" />
                            <span className="text-muted-foreground">{line.replace("- ", "")}</span>
                          </div>
                        )
                      }
                      if (line.startsWith("|")) {
                        return null
                      }
                      if (line.trim() === "") return <div key={j} className="h-3" />
                      return <p key={j} className="mb-4 leading-relaxed text-muted-foreground">{line}</p>
                    })}
                  </>
                ) : (
                  <>
                    <h2 className="mt-10 mb-4 text-2xl font-bold">{section.heading}</h2>
                    {section.body.split("\n").map((line, j) => {
                      if (line.startsWith("### ")) {
                        return <h3 key={j} className="mt-6 mb-3 text-xl font-bold">{line.replace("### ", "")}</h3>
                      }
                      if (line.startsWith("- **")) {
                        const match = line.match(/- \*\*(.+?)\*\*:?\s*(.*)/)
                        if (match) {
                          return (
                            <div key={j} className="mb-2 flex gap-2">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                              <div>
                                <strong>{match[1]}</strong>
                                {match[2] && <span className="text-muted-foreground"> — {match[2]}</span>}
                              </div>
                            </div>
                          )
                        }
                      }
                      if (line.startsWith("- ")) {
                        return (
                          <div key={j} className="mb-2 flex gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/30" />
                            <span className="text-muted-foreground">{line.replace("- ", "")}</span>
                          </div>
                        )
                      }
                      if (line.startsWith("|")) return null
                      if (line.trim() === "") return <div key={j} className="h-3" />
                      return <p key={j} className="mb-4 leading-relaxed text-muted-foreground">{line}</p>
                    })}
                  </>
                )}
              </Fragment>
            ))}
          </div>

          <Separator className="my-10" />

          <div className="rounded-xl border border-border/50 bg-muted/30 p-6">
            <h3 className="mb-2 text-lg font-bold">Enjoying this guide?</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Check out our full catalog of verified student discounts and start saving today.
            </p>
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Browse all offers
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
