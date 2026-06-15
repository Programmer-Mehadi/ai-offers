"use client"

import { useCallback, useEffect, useState } from "react"

function getCompare(): string[] {
  try { return JSON.parse(localStorage.getItem("compare") || "[]") } catch { return [] }
}

export function useCompare() {
  const [ids, setIds] = useState<string[]>(() => getCompare())

  useEffect(() => {
    const handler = () => setIds(getCompare())
    window.addEventListener("storage", handler)
    window.addEventListener("compare-updated", handler)
    return () => {
      window.removeEventListener("storage", handler)
      window.removeEventListener("compare-updated", handler)
    }
  }, [])

  const toggle = useCallback((id: string) => {
    const current = getCompare()
    const idx = current.indexOf(id)
    if (idx === -1) {
      if (current.length >= 3) return
      current.push(id)
    } else {
      current.splice(idx, 1)
    }
    localStorage.setItem("compare", JSON.stringify(current))
    setIds(current)
    window.dispatchEvent(new Event("compare-updated"))
  }, [])

  const clear = useCallback(() => {
    localStorage.setItem("compare", JSON.stringify([]))
    setIds([])
    window.dispatchEvent(new Event("compare-updated"))
  }, [])

  return { compareIds: ids, toggleCompare: toggle, clearCompare: clear }
}

