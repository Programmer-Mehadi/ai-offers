import { notFound } from "next/navigation"
import { Calendar, Clock, Tag } from "lucide-react"
import Link from "next/link"
import { Fragment } from "react"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { ReadingProgress } from "@/components/reading-progress"
import { Newsletter } from "@/components/newsletter"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { blogPosts, getBlogBySlug } from "@/data/offers"

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogBySlug(slug)

  if (!post) notFound()

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2)

  const contentSections = post.content.split("\n## ").map((section, i) => {
    const lines = section.trim().split("\n")
    const heading = i === 0 ? lines[0] : lines[0]
    const body = i === 0 ? lines.slice(1).join("\n").trim() : lines.slice(1).join("\n").trim()
    return { heading, body }
  })

  const tocItems = contentSections.map((s) => ({
    id: s.heading.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
    label: s.heading,
  }))

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <ReadingProgress />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_250px]">
            <article className="min-w-0">
              <Breadcrumbs items={[
                { label: "Blog", href: "/blog" },
                { label: post.title },
              ]} />

              <header className="mb-8">
                <div className="mb-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      <Tag className="mr-1 h-3 w-3" /> {tag}
                    </Badge>
                  ))}
                </div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{post.title}</h1>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {post.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {post.readTime}</span>
                  <span>by {post.author}</span>
                </div>
              </header>

              <Separator className="mb-8" />

              <div className="prose prose-neutral dark:prose-invert max-w-none">
                {contentSections.map((section, i) => (
                  <Fragment key={i}>
                    {i === 0 ? (
                      <div>
                        {section.body.split("\n").map((line, j) => {
                          if (line.startsWith("## ")) return <h2 key={j} id={line.replace("## ", "").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")} className="mt-8 mb-4 text-2xl font-bold">{line.replace("## ", "")}</h2>
                          if (line.startsWith("### ")) return <h3 key={j} className="mt-6 mb-3 text-xl font-bold">{line.replace("### ", "")}</h3>
                          if (line.startsWith("- **")) {
                            const m = line.match(/- \*\*(.+?)\*\*:?\s*(.*)/)
                            if (m) return (
                              <div key={j} className="mb-2 flex gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                                <div><strong>{m[1]}</strong>{m[2] && <span className="text-muted-foreground"> — {m[2]}</span>}</div>
                              </div>
                            )
                          }
                          if (line.startsWith("- ")) return (
                            <div key={j} className="mb-2 flex gap-2">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/30" />
                              <span className="text-muted-foreground">{line.replace("- ", "")}</span>
                            </div>
                          )
                          if (line.startsWith("|")) return null
                          if (line.trim() === "") return <div key={j} className="h-3" />
                          return <p key={j} className="mb-4 leading-relaxed text-muted-foreground">{line}</p>
                        })}
                        {section.body.split("\n").length > 20 && (
                          <div className="my-8 rounded-xl border border-border/50 bg-muted/30 p-5">
                            <Newsletter />
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <h2 id={section.heading.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")} className="mt-10 mb-4 text-2xl font-bold">{section.heading}</h2>
                        {section.body.split("\n").map((line, j) => {
                          if (line.startsWith("### ")) return <h3 key={j} className="mt-6 mb-3 text-xl font-bold">{line.replace("### ", "")}</h3>
                          if (line.startsWith("- **")) {
                            const m = line.match(/- \*\*(.+?)\*\*:?\s*(.*)/)
                            if (m) return (
                              <div key={j} className="mb-2 flex gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                                <div><strong>{m[1]}</strong>{m[2] && <span className="text-muted-foreground"> — {m[2]}</span>}</div>
                              </div>
                            )
                          }
                          if (line.startsWith("- ")) return (
                            <div key={j} className="mb-2 flex gap-2">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/30" />
                              <span className="text-muted-foreground">{line.replace("- ", "")}</span>
                            </div>
                          )
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
                 <p className="mb-4 text-sm text-muted-foreground">Check out our full catalog of verified discounts and free tools.</p>
                <Link href="/tools" className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90">
                  Browse all offers
                </Link>
              </div>

              {relatedPosts.length > 0 && (
                <div className="mt-10">
                  <h3 className="mb-4 text-lg font-bold">Related articles</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {relatedPosts.map((rp) => (
                      <Link key={rp.id} href={`/blog/${rp.slug}`} className="group rounded-xl border border-border/50 p-5 transition-all hover:border-transparent hover:shadow-md">
                        <div className="mb-2 flex flex-wrap gap-1.5">
                          {rp.tags.slice(0, 2).map((t) => (<Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>))}
                        </div>
                        <h4 className="font-semibold leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-400">{rp.title}</h4>
                        <p className="mt-1 text-xs text-muted-foreground">{rp.date} · {rp.readTime}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {tocItems.length > 1 && (
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <h3 className="mb-3 text-sm font-semibold">On this page</h3>
                  <nav className="space-y-1.5">
                    {tocItems.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block text-xs text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
