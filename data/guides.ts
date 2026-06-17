import * as api from '@/lib/api'

export interface Guide {
  id: string
  slug: string
  title: string
  description: string
  category: string
  author: string
  date: string
  readTime: string
  sections: { heading: string; content: string }[]
}

export async function getGuides(): Promise<Guide[]> {
  return api.getGuides()
}

export async function getGuideBySlug(slug: string): Promise<Guide | undefined> {
  try {
    return await api.getGuideBySlug(slug)
  } catch {
    return undefined
  }
}
