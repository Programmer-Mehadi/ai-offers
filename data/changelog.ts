import * as api from '@/lib/api'

export interface ChangelogEntry {
  date: string
  title: string
  description: string
  type: 'new' | 'update' | 'removed' | 'improvement'
}

export async function getChangelog(): Promise<ChangelogEntry[]> {
  return api.getChangelog()
}
