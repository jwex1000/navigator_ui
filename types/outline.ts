export interface OutlineItem {
  title: string
  level: string
  id?: string
}

export interface OutlineSection {
  description?: string
  items?: OutlineItem[]
  sections?: Record<string, OutlineSection>
}

