"use client"

import { ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <Button
      size="icon"
      className={cn(
        "fixed bottom-6 right-6 z-50 h-10 w-10 rounded-full shadow-lg transition-all duration-300",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none",
      )}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp className="h-4 w-4" />
      <span className="sr-only">Scroll to top</span>
    </Button>
  )
}
