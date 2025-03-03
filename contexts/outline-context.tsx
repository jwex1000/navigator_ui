"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { SkillLevel } from "@/constants/skill-levels"

interface OutlineContextType {
  activeFilter: SkillLevel | "favorites"
  setActiveFilter: (filter: SkillLevel | "favorites") => void
  expandedSections: Record<string, boolean>
  toggleSection: (sectionTitle: string) => void
  setExpandedSections: (sections: Record<string, boolean>) => void
  expandedDefinitions: Record<string, boolean>
  setExpandedDefinitions: (fn: (prev: Record<string, boolean>) => Record<string, boolean>) => void
  favorites: Set<string>
  toggleFavorite: (id: string) => void
  showDefinitions: boolean
  setShowDefinitions: (show: boolean) => void
}

const OutlineContext = createContext<OutlineContextType | undefined>(undefined)

export function OutlineProvider({ children }: { children: ReactNode }) {
  const [activeFilter, setActiveFilter] = useState<SkillLevel | "favorites">("all")
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [expandedDefinitions, setExpandedDefinitions] = useState<Record<string, boolean>>({})
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [showDefinitions, setShowDefinitions] = useState(true)

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }))
  }

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
      } else {
        newFavorites.add(id)
      }
      return newFavorites
    })
  }

  return (
    <OutlineContext.Provider
      value={{
        activeFilter,
        setActiveFilter,
        expandedSections,
        toggleSection,
        setExpandedSections,
        expandedDefinitions,
        setExpandedDefinitions,
        favorites,
        toggleFavorite,
        showDefinitions,
        setShowDefinitions,
      }}
    >
      {children}
    </OutlineContext.Provider>
  )
}

export function useOutline() {
  const context = useContext(OutlineContext)
  if (context === undefined) {
    throw new Error("useOutline must be used within an OutlineProvider")
  }
  return context
}

