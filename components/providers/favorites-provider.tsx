"use client"

import { createContext, useContext, ReactNode, useState, useCallback } from "react"
import { useAuth } from "@/components/auth/auth-provider"

type FavoritesContextType = {
  favorites: {
    characters: number[]
    episodes: number[]
    locations: number[]
  } | null
  isLoading: boolean
  addToFavorites: (type: "characters" | "episodes" | "locations", id: number) => Promise<void>
  removeFromFavorites: (type: "characters" | "episodes" | "locations", id: number) => Promise<void>
  isFavorite: (type: "characters" | "episodes" | "locations", id: number) => boolean
  refreshFavorites: () => void
}

const FavoritesContext = createContext<FavoritesContextType | null>(null)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { addToFavorites, removeFromFavorites, isFavorite, user, isLoading } = useAuth()
  const [, setRefreshCounter] = useState(0);
  
  const refreshFavorites = useCallback(() => {
    setRefreshCounter(prev => prev + 1);
  }, []);

  const wrappedAddToFavorites = async (type: "characters" | "episodes" | "locations", id: number) => {
    await addToFavorites(type, id);
    refreshFavorites();
  };

  const wrappedRemoveFromFavorites = async (type: "characters" | "episodes" | "locations", id: number) => {
    await removeFromFavorites(type, id);
    refreshFavorites();
  };

  const wrappedIsFavorite = (type: "characters" | "episodes" | "locations", id: number): boolean => {
    return isFavorite(type, id);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites: user?.favorites || null,
        isLoading,
        addToFavorites: wrappedAddToFavorites,
        removeFromFavorites: wrappedRemoveFromFavorites,
        isFavorite: wrappedIsFavorite,
        refreshFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
} 