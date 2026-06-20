import { HelpCircle, Sparkles, MessageSquareText } from "lucide-react"
import Link from "next/link"

import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { getFaqs, type FaqItem } from "@/data/faq"

function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <details key={faq._id} className="group rounded-xl border border-border/50 bg-card transition-colors open:border-brand-500/30">
          <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-sm font-medium leading-snug marker:hidden [&::-webkit-details-marker]:hidden">
            <span>{faq.question}</span>
            <svg className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <div className="border-t border-border/50 px-5 py-4 text-sm leading-relaxed text-muted-foreground [&_a]:text-brand-600 [&_a:hover]:underline [&_h1]:mb-2 [&_h1]:text-base [&_h1]:font-semibold [&_h1]:text-foreground [&_h2]:mb-2 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:mb-2 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-foreground [&_p]:mb-3 [&_p: last-child]:mb-0 [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-xs [&_pre]:mb-3 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:text-xs [&_blockquote]:mb-3 [&_blockquote]:border-l-2 [&_blockquote]:border-brand-500/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_img]:rounded-lg [&_img]:border [&_img]:border-border/50"
            dangerouslySetInnerHTML={{ __html: faq.answer }} />
        </details>
      ))}
    </div>
  )
}

export default async function FaqPage() {
  const faqs = await getFaqs()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">          <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "FAQ" }]} />

          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-violet-600 shadow-md">
              <HelpCircle className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h1>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Answers to the most common questions about student offers, savings, and how our platform works.
            </p>
          </div>

          {faqs.length === 0 ? (
            <div className="rounded-xl border border-border/50 bg-muted/30 p-12 text-center">
              <HelpCircle className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
              <p className="text-muted-foreground">No FAQs available yet. Check back soon!</p>
            </div>
          ) : (
            <FaqAccordion faqs={faqs} />
          )}

          <div className="mt-10 rounded-xl border border-border/50 bg-muted/30 p-6 text-center">
            <MessageSquareText className="mx-auto mb-2 h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Still have questions?{" "}
              <Link href="/contact" className="font-medium text-foreground underline underline-offset-2">Contact us</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
