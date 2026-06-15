import { notFound } from "next/navigation"
import { ArrowLeft, BookOpen } from "lucide-react"
import Link from "next/link"

import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { ReadingProgress } from "@/components/reading-progress"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Separator } from "@/components/ui/separator"
import { guides } from "@/data/guides"

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }))
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const guide = guides.find((g) => g.slug === slug)
  if (!guide) notFound()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <ReadingProgress />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_250px]">
            <article className="min-w-0">
              <Breadcrumbs items={[
                { label: "Guides", href: "/guides" },
                { label: guide.title },
              ]} />

              <Link href="/guides" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-3.5 w-3.5" /> Back to guides
              </Link>

              <header className="mb-8">
                <div className="mb-3 inline-block rounded-md bg-gradient-to-r from-brand-500/10 to-violet-500/10 px-2.5 py-1 text-[10px] font-semibold text-brand-600 dark:text-brand-400">
                  {guide.category}
                </div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{guide.title}</h1>
                <p className="mt-3 text-lg text-muted-foreground">{guide.description}</p>
                <div className="mt-4 text-sm text-muted-foreground">
                  {guide.date} · {guide.readTime} · by {guide.author}
                </div>
              </header>

              <Separator className="mb-8" />

              <div className="prose prose-neutral dark:prose-invert max-w-none">
                {guide.sections.map((section, i) => (
                  <div key={i} className="mb-8">
                    <h2 id={section.heading.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")} className="mb-4 text-2xl font-bold">
                      {section.heading}
                    </h2>
                    <p className="leading-relaxed text-muted-foreground">{section.content}</p>
                  </div>
                ))}
              </div>

              <Separator className="my-10" />

              <div className="rounded-xl border border-border/50 bg-muted/30 p-6">
                <h3 className="mb-2 text-lg font-bold">Enjoy this guide?</h3>
                <p className="mb-4 text-sm text-muted-foreground">Browse our full collection of verified discounts and free tools.</p>
                <Link href="/tools" className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90">
                  Browse all offers
                </Link>
              </div>
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <h3 className="mb-3 text-sm font-semibold">On this page</h3>
                <nav className="space-y-1.5">
                  {guide.sections.map((section) => (
                    <a
                      key={section.heading}
                      href={`#${section.heading.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
                      className="block text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {section.heading}
                    </a>
                  ))}
                </nav>
                <div className="mt-6 border-t border-border pt-4">
                  <Link href="/guides" className="flex items-center gap-2 text-xs font-medium text-brand-600 dark:text-brand-400">
                    <BookOpen className="h-3.5 w-3.5" /> All guides
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
