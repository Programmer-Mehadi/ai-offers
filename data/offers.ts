import * as api from '@/lib/api'

export interface Offer {
  id: string
  name: string
  description: string
  discount: string
  category: string
  featured?: boolean
  hidden_gem?: boolean
  underrated?: boolean
  audience?: 'students' | 'everyone'
  url: string
  color: string
  logo?: string
  tags?: string[]
  notes?: string[]
  howToClaim?: string[]
  claimUrl?: string
  isReferral?: boolean
  dateAdded?: string
  popularity?: number
  studentTypes?: string[]
  regions?: string[]
  isExpiring?: boolean
}

export interface Resource {
  id: string
  title: string
  description: string
  icon: string
  href: string
  category: string
}

export interface Category {
  id: string
  name: string
  count: number
  icon: string
  color: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  date: string
  tags: string[]
  readTime: string
}

export const categoryLookup: Record<string, string> = {
  'ai-and-machine-learning': 'AI & Machine Learning',
  'cloud-and-hosting': 'Cloud & Hosting',
  development: 'Development Tools',
  design: 'Design & Creative',
  productivity: 'Productivity',
  learning: 'Learning & Education',
  media: 'Media & Entertainment',
  shopping: 'Shopping & Lifestyle',
  'travel-and-finance': 'Travel & Finance',
  memberships: 'Student Memberships',
  security: 'Security & Privacy',
  food: 'Food & Dining',
}

export function getCategorySlug(name: string): string {
  const entry = Object.entries(categoryLookup).find(([, v]) => v === name)
  return entry ? entry[0] : name.toLowerCase().replace(/\s+/g, '-')
}

export async function getOffers(): Promise<Offer[]> {
  return api.getOffers()
}

export async function getCategories(): Promise<Category[]> {
  return api.getCategories()
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return api.getBlogPosts()
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    return await api.getBlogPostBySlug(slug)
  } catch {
    return undefined
  }
}

export async function getStats() {
  const s = await api.getStats()
  return {
    totalOffers: s.offersCount ?? 0,
    categories: s.categoriesCount ?? 0,
    verifiedDeals: '100%',
    studentsServed: `${s.studentsServed?.toLocaleString() ?? '50K'}+`,
  }
}

export async function getStudentTypes() {
  return api.getStudentTypes()
}

export async function getRegions() {
  return api.getRegions()
}

export async function getResources(): Promise<Resource[]> {
  return api.getResources()
}

export async function getOfferBySlug(slug: string): Promise<Offer | undefined> {
  try {
    return await api.getOfferBySlug(slug)
  } catch {
    return undefined
  }
}

export async function getOffersByCategory(categoryName: string): Promise<Offer[]> {
  const all = await api.getOffers()
  return all.filter((o) => o.category === categoryName)
}

export async function getCategoryByName(name: string): Promise<Category | undefined> {
  const all = await api.getCategories()
  return all.find((c) => c.name === name)
}

export async function getRecentOffers(count = 8): Promise<Offer[]> {
  const all = await api.getOffers()
  return all.slice().reverse().slice(0, count)
}

export async function getExpiringOffers(count = 8): Promise<Offer[]> {
  const all = await api.getOffers()
  return all.filter((o) => o.isExpiring).slice(0, count)
}

export async function getPopularOffers(count = 8): Promise<Offer[]> {
  const all = await api.getOffers()
  return [...all].sort((a, b) => (b.popularity || 0) - (a.popularity || 0)).slice(0, count)
}

export async function getTrendingOffers(count = 6): Promise<Offer[]> {
  const all = await api.getOffers()
  return all.filter((o) => o.featured).slice(0, count)
}

export async function getSimilarOffers(offer: Offer, count = 4): Promise<Offer[]> {
  const all = await api.getOffers()
  const sameCategory = all.filter((o) => o.id !== offer.id && o.category === offer.category)
  if (sameCategory.length >= count) return sameCategory.slice(0, count)
  const fromTags = all.filter(
    (o) =>
      o.id !== offer.id &&
      o.category !== offer.category &&
      o.tags?.some((t) => offer.tags?.includes(t)),
  )
  return [...sameCategory, ...fromTags].slice(0, count)
}

export async function getAllOfferTags(): Promise<string[]> {
  const all = await api.getOffers()
  const tagSet = new Set<string>()
  for (const o of all) {
    o.tags?.forEach((t) => tagSet.add(t))
  }
  return [...tagSet].sort()
}

export async function getOffersByTag(tag: string): Promise<Offer[]> {
  const all = await api.getOffers()
  return all.filter((o) => o.tags?.includes(tag))
}

export async function getRandomOffers(count = 4): Promise<Offer[]> {
  const all = await api.getOffers()
  const shuffled = [...all].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
