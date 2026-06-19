import {
  Award,
  BadgeCheck,
  Building2,
  FileCheck,
  RefreshCw,
  ScanSearch,
  Sparkles,
  UserCheck,
  Users,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"

const steps = [
  {
    number: 1,
    icon: UserCheck,
    title: "Human Review First",
    description:
      "Our team manually reviews every offer before it goes live—verifying details, eligibility, and availability.",
    iconBg: "bg-emerald-100 dark:bg-emerald-950/40",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    badge: "bg-emerald-500",
    titleColor: "text-emerald-700 dark:text-emerald-400",
    bar: "bg-emerald-500",
  },
  {
    number: 2,
    icon: ScanSearch,
    title: "Smart Data Checks",
    description:
      "Our system scans for outdated info, broken links, hidden terms, and conflicting details.",
    iconBg: "bg-blue-100 dark:bg-blue-950/40",
    iconColor: "text-blue-600 dark:text-blue-400",
    badge: "bg-blue-500",
    titleColor: "text-blue-700 dark:text-blue-400",
    bar: "bg-blue-500",
  },
  {
    number: 3,
    icon: Building2,
    title: "Verified Sources Only",
    description:
      "We source offers from official institutions, government portals, and trusted partners only.",
    iconBg: "bg-violet-100 dark:bg-violet-950/40",
    iconColor: "text-violet-600 dark:text-violet-400",
    badge: "bg-violet-500",
    titleColor: "text-violet-700 dark:text-violet-400",
    bar: "bg-violet-500",
  },
  {
    number: 4,
    icon: RefreshCw,
    title: "Ongoing Re-Checks",
    description:
      "Offers are re-verified regularly to ensure pricing, terms, and deadlines are always current.",
    iconBg: "bg-orange-100 dark:bg-orange-950/40",
    iconColor: "text-orange-600 dark:text-orange-400",
    badge: "bg-orange-500",
    titleColor: "text-orange-700 dark:text-orange-400",
    bar: "bg-orange-500",
  },
  {
    number: 5,
    icon: FileCheck,
    title: "Clear & Honest Labels",
    description:
      "We highlight key conditions, restrictions, and fine print—so you know what to expect.",
    iconBg: "bg-emerald-100 dark:bg-emerald-950/40",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    badge: "bg-emerald-500",
    titleColor: "text-emerald-700 dark:text-emerald-400",
    bar: "bg-emerald-500",
  },
  {
    number: 6,
    icon: Users,
    title: "Community Feedback",
    description:
      "Students can report issues and share feedback. We review every report and take action fast.",
    iconBg: "bg-blue-100 dark:bg-blue-950/40",
    iconColor: "text-blue-600 dark:text-blue-400",
    badge: "bg-blue-500",
    titleColor: "text-blue-700 dark:text-blue-400",
    bar: "bg-blue-500",
  },
]

export default function HowWeVerifyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-6xl">
          <div className="mb-12 text-center">
            <div className="relative mx-auto mb-6 w-20 h-20">
              <div className="absolute inset-0 border-2 border-amber-300 dark:border-amber-700/60 border-dashed rounded-full" />
              <div className="absolute inset-2 flex justify-center items-center bg-emerald-100 dark:bg-emerald-950/40 rounded-full">
                <BadgeCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <div className="inline-flex relative justify-center items-center gap-3">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <h1 className="font-bold text-slate-900 dark:text-white text-3xl sm:text-4xl tracking-tight">
                Our Verification Process
              </h1>
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              We go beyond basic checks to ensure every offer is safe, accurate,
              and truly valuable for students.
            </p>
          </div>

          <div className="gap-6 grid sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <Card
                  key={step.title}
                  className="relative flex flex-col bg-card hover:shadow-md border border-border/50 rounded-2xl overflow-hidden transition-shadow"
                >
                  <CardContent className="flex flex-col flex-1 p-6">
                    <div className="flex justify-between items-start mb-5">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white ${step.badge}`}
                      >
                        {step.number}
                      </div>
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-full ${step.iconBg}`}
                      >
                        <Icon className={`h-6 w-6 ${step.iconColor}`} />
                      </div>
                    </div>
                    <h2 className={`text-lg font-bold ${step.titleColor}`}>
                      {step.title}
                    </h2>
                    <p className="flex-1 mt-2 text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                    <div
                      className={`mt-6 h-1 w-full rounded-full ${step.bar}`}
                    />
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 mt-12 border border-amber-200 dark:border-amber-900/50 rounded-2xl overflow-hidden">
            <div className="flex items-start gap-4 p-6">
              <div className="flex justify-center items-center bg-amber-400/30 dark:bg-amber-500/20 rounded-full w-12 h-12 shrink-0">
                <Award className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-amber-900 dark:text-amber-300 text-lg">
                  Your Safety Comes First
                </h3>
                <div className="bg-amber-500 mt-2 rounded-full w-12 h-0.5" />
                <p className="mt-3 text-amber-800 dark:text-amber-400/80 text-sm">
                  Always confirm final details on the official provider&apos;s
                  website before making any purchase or commitment. Information
                  can change at any time.
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
