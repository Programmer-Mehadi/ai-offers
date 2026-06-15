"use client"

import { Cookie } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (consent !== "accepted" && consent !== "rejected") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem("cookie-consent", "accepted")
    setVisible(false)
  }

  function reject() {
    localStorage.setItem("cookie-consent", "rejected")
    setVisible(false)
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 inset-x-0 z-50 border-t border-border bg-background p-4 shadow-lg transition-all duration-500 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-sm sm:rounded-xl sm:border",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none",
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400">
          <Cookie className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">We use cookies</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            We use essential cookies for site functionality. Optional analytics help us improve.
          </p>
          <div className="mt-3 flex gap-2">
            <Button size="sm" onClick={accept}>Accept all</Button>
            <Button size="sm" variant="outline" onClick={reject}>Essential only</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

