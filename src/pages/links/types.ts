// src/data/pages/links/models.ts

export interface LinkItem {
  id: string
  title: string
  shortUrl: string
  longUrl: string
  createdAt: string
  clickCount: number
  tags?: string[]
}
