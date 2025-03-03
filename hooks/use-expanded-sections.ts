"use client"

import { useState, useCallback } from "react"

export function useExpandedSections() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})

  const toggleSection = useCallback((sectionTitle: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }))
  }, [])

  return {
    expandedSections,
    setExpandedSections,
    toggleSection,
  }
}

