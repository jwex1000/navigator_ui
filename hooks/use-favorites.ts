"use client"

import { useState, useCallback } from "react"

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
      } else {
        newFavorites.add(id)
      }
      return newFavorites
    })
  }, [])

  return { favorites, toggleFavorite }
}

