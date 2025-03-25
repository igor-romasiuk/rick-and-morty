"use client"

import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from "react"
import { useAuth } from "@/components/auth/AuthProvider"

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
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const refreshFavorites = useCallback(() => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
    
    refreshTimeoutRef.current = setTimeout(() => {
      setRefreshCounter(prev => prev + 1);
      refreshTimeoutRef.current = null;
    }, 300);
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