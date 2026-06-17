import * as api from '@/lib/api'

export interface Testimonial {
  id: string
  name: string
  role: string
  school: string
  avatar: string
  content: string
  saved: string
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return api.getTestimonials()
}
