import { Star } from "lucide-react"
import type { OutlineSection } from "@/types/outline"

interface FavoritesViewProps {
  outlineData: Record<string, OutlineSection>
  favorites: Set<string>
  toggleFavorite: (id: string) => void
}

const generateId = (path: string, title: string) => {
  return `${path}-${title}`.replace(/\s+/g, "-").toLowerCase()
}

const findFavoritedItems = (
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

export function FavoritesView({ outlineData, favorites, toggleFavorite }: FavoritesViewProps) {
  const allFavorites = Object.entries(outlineData).flatMap(([title, section]) =>
    findFavoritedItems(section, [title], favorites),
  )

  if (allFavorites.length === 0) {
    return (
      <div className="text-left text-zinc-400 py-8">
        No favorites yet. Click the star icon next to any item to add it to your favorites.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {allFavorites.map(({ title, path, id }) => (
        <div key={id} className="bg-zinc-800/50 rounded-lg p-4 group">
          <div className="flex items-center justify-between">
            <h3 className="text-lg text-zinc-100">{title}</h3>
            <button onClick={() => toggleFavorite(id)} className="focus:outline-none">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            </button>
          </div>
          <div className="mt-2 text-sm text-zinc-400">
            {path.map((item, index) => (
              <span key={index}>
                <span className="hover:text-zinc-200 cursor-pointer underline underline-offset-2">{item}</span>
                {index < path.length - 1 && <span className="mx-2">{">"}</span>}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

