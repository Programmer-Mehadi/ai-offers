const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/v1"

import { getFallback } from "./fallback"

type ApiEnvelope<T> = {
  success: boolean
  data: T | { data: T; meta?: unknown }
  meta?: unknown
}

async function fetchApi<T>(path: string): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, { next: { revalidate: 60 } })
    if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`)
    const json = (await res.json()) as ApiEnvelope<T>
    const payload = json.data
    if (payload && typeof payload === "object") {
      // { success: true, data: { items: [...], meta: {...} } }  (paginated list)
      if ("items" in payload) return (payload as { items: T }).items
      // { success: true, data: { data: T } }  (double-wrapped)
      if ("data" in payload) return (payload as { data: T }).data
    }
    return payload as T
  } catch {
    return getFallback(path) as T
  }
}

function mapOffer(raw: Record<string, unknown>) {
  return { ...raw, id: raw.slug } as import("@/data/offers").Offer
}

function mapCategory(raw: Record<string, unknown>) {
  return { ...raw, id: raw._id, slug: raw.slug as string } as import("@/data/offers").Category
}

function mapBlogPost(raw: Record<string, unknown>) {
  return { ...raw, id: raw.slug } as import("@/data/offers").BlogPost
}

function mapTestimonial(raw: Record<string, unknown>) {
  return { ...raw, id: raw._id } as import("@/data/testimonials").Testimonial
}

function mapGuide(raw: Record<string, unknown>) {
  return { ...raw, id: raw.slug } as import("@/data/guides").Guide
}

function mapChangelog(raw: Record<string, unknown>) {
  return raw as unknown as import("@/data/changelog").ChangelogEntry
}

function mapResource(raw: Record<string, unknown>) {
  return { ...raw, id: raw._id } as import("@/data/offers").Resource
}

function mapRegion(raw: Record<string, unknown>) {
  return {
    ...raw,
    id: raw.name ?? raw._id,
  } as { id: string; label: string; flag?: string }
}

export async function getOffers() {
  const raw = await fetchApi<Record<string, unknown>[]>("/offers")
  return raw.map(mapOffer)
}

export async function getOfferBySlug(slug: string) {
  const raw = await fetchApi<Record<string, unknown>>(`/offers/${slug}`)
  return mapOffer(raw)
}

export async function getCategories() {
  const raw = await fetchApi<Record<string, unknown>[]>("/categories")
  return raw.map(mapCategory)
}

export async function getBlogPosts() {
  const raw = await fetchApi<Record<string, unknown>[]>("/blog")
  return raw.map(mapBlogPost)
}

export async function getBlogPostBySlug(slug: string) {
  const raw = await fetchApi<Record<string, unknown>>(`/blog/${slug}`)
  return mapBlogPost(raw)
}

export async function getStudentTypes() {
  return fetchApi<{ id: string; label: string; icon: string }[]>(
    "/student-types"
  )
}

export async function getRegions() {
  const raw = await fetchApi<Record<string, unknown>[]>("/regions")
  return raw.map(mapRegion)
}

export async function getGuides() {
  const raw = await fetchApi<Record<string, unknown>[]>("/guides")
  return raw.map(mapGuide)
}

export async function getGuideBySlug(slug: string) {
  const raw = await fetchApi<Record<string, unknown>>(`/guides/${slug}`)
  return mapGuide(raw)
}

export async function getTestimonials() {
  const raw = await fetchApi<Record<string, unknown>[]>("/testimonials")
  return raw.map(mapTestimonial)
}

export async function getChangelog() {
  const raw = await fetchApi<Record<string, unknown>[]>("/changelog")
  return raw.map(mapChangelog)
}

export async function getResources() {
  const raw = await fetchApi<Record<string, unknown>[]>("/resources")
  return raw.map(mapResource)
}

export async function getStats() {
  return fetchApi<Record<string, number>>("/stats")
}
