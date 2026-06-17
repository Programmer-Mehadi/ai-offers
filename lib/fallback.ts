const fallbacks: Record<string, unknown> = {
  '/offers': [],
  '/categories': [],
  '/blog': [],
  '/guides': [],
  '/changelog': [],
  '/testimonials': [],
  '/resources': [],
  '/student-types': [],
  '/regions': [],
  '/stats': { offersCount: 0, categoriesCount: 0, studentsServed: 0 },
}

export function getFallback(path: string): unknown {
  const cleanPath = path.split('?')[0]
  if (cleanPath in fallbacks) return fallbacks[cleanPath]
  if (/^\/(offers|blog|guides)\//.test(cleanPath)) return null
  return []
}
