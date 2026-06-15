import {
  BadgeCheck,
  Bot,
  FileCheck,
  Globe,
  RefreshCw,
  Shield,
  Users,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"

const steps = [
  {
    icon: FileCheck,
    title: "Manual Review",
    description:
      "Every offer is checked by a human before going live. We verify official sources, eligibility rules, region restrictions, and whether the offer is still active.",
  },
  {
    icon: Bot,
    title: "AI Cross-Check",
    description:
      "AI scans each offer for outdated details, broken links, hidden conditions, and conflicting info. It only flags issues — no offers are auto-published.",
  },
  {
    icon: Globe,
    title: "Trusted Sources Only",
    description:
      "We pull from official company pages, university portals, public announcements, and verified communities. No user-submitted offers go live without source confirmation.",
  },
  {
    icon: RefreshCw,
    title: "Regular Re-Checks",
    description:
      "Offers are re-checked monthly for pricing, terms, eligibility, and availability. Expired or unclear offers are removed promptly.",
  },
  {
    icon: Shield,
    title: "Clear Labels",
    description:
      "The site labels verification requirements, third-party services like UNiDAYS and SheerID, region-specific deals, and university partnerships.",
  },
  {
    icon: Users,
    title: "Community Corrections",
    description:
      "Students can report issues and submit verified new offers to help keep the directory accurate. Every report is reviewed before action is taken.",
  },
]

export default function HowWeVerifyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-violet-600 shadow-md">
              <BadgeCheck className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How We Verify
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Every offer goes through multiple checks before it lands here. We
              believe student discounts should be trustworthy, not a gamble.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <Card
                  key={step.title}
                  className="relative border-border/50 transition-all hover:border-transparent hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                          {i + 1}
                        </span>
                        <h2 className="font-semibold">{step.title}</h2>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-12 rounded-xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900/50 dark:bg-amber-950/30">
            <div className="flex items-start gap-4">
              <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
              <div>
                <h3 className="font-semibold text-amber-900 dark:text-amber-300">
                  Always Check the Official Site
                </h3>
                <p className="mt-1 text-sm text-amber-800 dark:text-amber-400/80">
                  Companies can change or discontinue offers without notice.
                  We recommend confirming details on the provider&apos;s site
                  before committing to any purchase or subscription.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
