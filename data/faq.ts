import * as api from '@/lib/api'

export interface FaqItem {
  _id: string
  question: string
  answer: string
  order: number
}

export async function getFaqs(): Promise<FaqItem[]> {
  return api.getFaqs()
}
