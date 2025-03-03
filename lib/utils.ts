import type { OutlineSection } from "@/types/outline"

export const cn = (...args: string[]) => {
  return args.filter(Boolean).join(" ")
}

export const generateId = (path: string, title: string) => {
  return `${path}-${title}`.replace(/\s+/g, "-").toLowerCase()
}

export const findFavoritedItems = (
  section: OutlineSection,
  path: string[] = [],
  favorites: Set<string>,
  results: Array<{ title: string; path: string[]; id: string }> = [],
) => {
  section.items?.forEach((item) => {
    const id = generateId(path.join("-"), item.title)
    if (favorites.has(id)) {
      results.push({
        title: item.title,
        path: [...path],
        id,
      })
    }
  })

  Object.entries(section.sections || {}).forEach(([title, subSection]) => {
    const newPath = [...path, title]
    const sectionId = generateId(path.join("-"), title)
    if (favorites.has(sectionId)) {
      results.push({
        title,
        path: path,
        id: sectionId,
      })
    }
    findFavoritedItems(subSection, newPath, favorites, results)
  })

  return results
}

