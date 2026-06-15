import { Cookie, FileText, Lock, Mail, Shield } from "lucide-react"
import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"

const sections = [
  {
    icon: FileText,
    title: "Privacy Promise",
    content:
      "OfferPerks respects your privacy. We do not sell, rent, or share your personal data with third parties for their marketing purposes. Favorites are stored locally in your browser using localStorage â€” they never touch our servers. We use minimal analytics to understand which offers are popular, and this data is anonymized.",
  },
  {
    icon: Cookie,
    title: "Cookie Usage",
    content:
      "We use essential cookies for site functionality (theme preference, session management). Optional analytics cookies help us understand how visitors use the site. You can manage your cookie preferences at any time through your browser settings. No third-party tracking cookies are used without explicit consent.",
  },
  {
    icon: Shield,
    title: "Terms of Use",
    content:
      "OfferPerks is a free informational resource for discovering student discounts. All offer details â€” including pricing, eligibility, and availability â€” are subject to change by the provider. We verify offers regularly but recommend confirming current terms on the provider's official website before making any purchase or commitment.",
  },
  {
    icon: Mail,
    title: "Data Requests",
    content:
      "You have the right to request access, correction, or deletion of any personal data we hold. Since we store minimal data (none without your consent), most requests can be handled immediately. For privacy-related inquiries, reach out to our privacy team and we'll respond within 30 days.",
  },
]

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-violet-600 shadow-md">
              <Lock className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Privacy, Cookies & Terms</h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              How we handle your data, cookies, and the terms that govern your use of OfferPerks.
            </p>
          </div>

          <div className="space-y-6">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <Card key={section.title} className="border-border/50">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold">{section.title}</h2>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-10 rounded-xl border border-border/50 bg-muted/30 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Questions about privacy or terms?{" "}
              <Link href="/contact" className="font-medium text-foreground underline underline-offset-2">
                Contact our privacy team
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

