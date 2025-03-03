import { ChevronDown, ChevronRight, Star } from "lucide-react"
import type { OutlineItem, OutlineSection as OutlineSectionType } from "@/types/outline"
import type { SkillLevel } from "@/constants/skill-levels"

interface OutlineSectionProps {
  title: string
  section: OutlineSectionType
  level?: number
  path?: string
  activeFilter: SkillLevel | "favorites"
  expandedSections: Record<string, boolean>
  toggleSection: (path: string) => void
  expandedDefinitions: Record<string, boolean>
  setExpandedDefinitions: (expandedDefinitions: (prevState: Record<string, boolean>) => Record<string, boolean>) => void
  favorites: Set<string>
  toggleFavorite: (id: string) => void
  showDefinitions: boolean
}

const generateId = (path: string, title: string) => {
  return `${path}-${title}`.replace(/\s+/g, "-").toLowerCase()
}

export function OutlineSection({
  title,
  section,
  level = 0,
  path = "",
  activeFilter,
  expandedSections,
  toggleSection,
  expandedDefinitions,
  setExpandedDefinitions,
  favorites,
  toggleFavorite,
  showDefinitions,
}: OutlineSectionProps) {
  const hasContent = section.items?.length > 0 || Object.keys(section.sections || {}).length > 0
  const isExpanded = expandedSections[title]
  const currentPath = path ? `${path}-${title}` : title

  // Define matchesFilter function first
  const matchesFilter = (item: OutlineItem) => {
    if (activeFilter === "all" || activeFilter === "favorites") return true
    return item.level === activeFilter
  }

  // Filter items based on the active filter
  const filteredItems = section.items?.filter(matchesFilter) || []

  // Check if this section or its subsections have any matching content
  const hasMatchingContent = (() => {
    if (activeFilter === "all" || activeFilter === "favorites") return true

    const hasMatchingItems = filteredItems.length > 0
    const hasMatchingSubsections = Object.values(section.sections || {}).some((subSection) => {
      const hasDirectMatches = subSection.items?.some(matchesFilter) ?? false
      const hasNestedMatches = Object.values(subSection.sections || {}).some(
        (s) => s.items?.some(matchesFilter) ?? false,
      )
      return hasDirectMatches || hasNestedMatches
    })

    return hasMatchingItems || hasMatchingSubsections
  })()

  if (!hasMatchingContent) {
    return null
  }

  return (
    <div className="w-full">
      <div className="relative">
        {level > 0 && <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-800" style={{ left: "0.5rem" }} />}
        <div className={level > 0 ? "pl-6" : ""}>
          {hasContent && (
            <button
              onClick={() => toggleSection(title)}
              className={`w-full flex items-start text-left p-2 hover:bg-zinc-900 rounded-md transition-colors relative ${
                level === 0 ? "text-lg font-semibold" : "text-base"
              }`}
            >
              <div className="w-4 h-4 mr-2 flex-shrink-0 text-zinc-400">
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </div>
              <span className="text-zinc-100 flex items-center gap-2 group">
                {title}
                {level > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(generateId(path, title))
                    }}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${
                        favorites.has(generateId(path, title))
                          ? "text-yellow-400 opacity-100 fill-yellow-400"
                          : "text-zinc-400"
                      }`}
                    />
                  </button>
                )}
              </span>
            </button>
          )}

          {!hasContent && (
            <div className={`w-full flex items-center p-2 ${level === 0 ? "text-lg font-semibold" : "text-base"}`}>
              <div className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="text-zinc-100">{title}</span>
            </div>
          )}

          {section.description && isExpanded && showDefinitions && (
            <div className="mt-2 mb-4">
              <div className="bg-zinc-800/50 rounded-lg p-4">
                <div className={`text-sm text-zinc-300 text-left ${!expandedDefinitions[title] ? "line-clamp-3" : ""}`}>
                  {section.description}
                </div>
                {section.description.length > 150 && (
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setExpandedDefinitions((prev) => ({
                          ...prev,
                          [title]: !prev[title],
                        }))
                      }}
                      className="text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-800 px-2 py-1 rounded"
                    >
                      {expandedDefinitions[title] ? "Show less" : "Read more"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {isExpanded && filteredItems && filteredItems.length > 0 && (
            <div className="mt-2 space-y-1">
              {filteredItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center text-sm p-2 text-zinc-300 hover:bg-zinc-900 rounded-md group relative"
                >
                  <div className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="flex items-center gap-2">
                    {item.title}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(generateId(currentPath, item.title))
                      }}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${
                          favorites.has(generateId(currentPath, item.title))
                            ? "text-yellow-400 opacity-100 fill-yellow-400"
                            : "text-zinc-400"
                        }`}
                      />
                    </button>
                  </span>
                </div>
              ))}
            </div>
          )}

          {isExpanded && section.sections && (
            <div className="mt-2 space-y-1">
              {Object.entries(section.sections).map(([subTitle, subSection]) => (
                <OutlineSection
                  key={subTitle}
                  title={subTitle}
                  section={subSection}
                  level={level + 1}
                  path={currentPath}
                  activeFilter={activeFilter}
                  expandedSections={expandedSections}
                  toggleSection={toggleSection}
                  expandedDefinitions={expandedDefinitions}
                  setExpandedDefinitions={setExpandedDefinitions}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  showDefinitions={showDefinitions}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

