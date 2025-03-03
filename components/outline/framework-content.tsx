"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { FilterControls } from "../filters/filter-controls"
import { ActionButtons } from "../shared/action-buttons"
import { OutlineSection } from "./outline-section"
import { FavoritesView } from "./favorites-view"
import { useOutline } from "@/contexts/outline-context"
import type { OutlineSection as OutlineSectionType } from "@/types/outline"

interface FrameworkContentProps {
  outlineData: Record<string, OutlineSectionType>
}

export function FrameworkContent({ outlineData }: FrameworkContentProps) {
  const {
    activeFilter,
    setActiveFilter,
    expandedSections,
    toggleSection,
    expandedDefinitions,
    setExpandedDefinitions,
    favorites,
    toggleFavorite,
    showDefinitions,
    setShowDefinitions,
    setExpandedSections,
  } = useOutline()

  return (
    <>
      <div className="w-full bg-zinc-900 border-b border-zinc-800 px-4 py-2">
        <div className="flex justify-start items-center gap-4">
          <FilterControls activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          <ActionButtons
            activeFilter={activeFilter}
            showDefinitions={showDefinitions}
            setActiveFilter={setActiveFilter}
            setShowDefinitions={setShowDefinitions}
            setExpandedSections={setExpandedSections}
          />
        </div>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="max-w-4xl space-y-4 mx-6">
          {activeFilter === "favorites" ? (
            <FavoritesView outlineData={outlineData} favorites={favorites} toggleFavorite={toggleFavorite} />
          ) : (
            Object.entries(outlineData).map(([title, section]) => (
              <OutlineSection
                key={title}
                title={title}
                section={section}
                activeFilter={activeFilter}
                expandedSections={expandedSections}
                toggleSection={toggleSection}
                expandedDefinitions={expandedDefinitions}
                setExpandedDefinitions={setExpandedDefinitions}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                showDefinitions={showDefinitions}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </>
  )
}

