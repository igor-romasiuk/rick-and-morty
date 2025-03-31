"use client"

import { useState, useEffect, useCallback } from "react"
import { useSession } from "next-auth/react"
import { toast } from "@/components/ui/use-toast"

type FavoriteType = "characters" | "episodes" | "locations"

interface Favorites {
  id: string
  userId: string
  characters: number[]
  episodes: number[]
  locations: number[]
}

export function useFavorites() {
  const { data: session } = useSession()
  const [favorites, setFavorites] = useState<Favorites | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchFavorites = useCallback(async () => {
    if (!session?.user) return

    try {
      setIsLoading(true)
      const response = await fetch("/api/favorites")
      
      if (!response.ok) {
        throw new Error("Failed to fetch favorites")
      }
      
      const data = await response.json()
      setFavorites(data)
    } catch (error) {
      console.error("Error fetching favorites:", error)
      toast({
        title: "Error",
        description: "Failed to load favorites",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [session?.user])

  const addToFavorites = useCallback(async (type: FavoriteType, id: number) => {
    if (!session?.user) return

    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          id,
          action: "add",
        }),
      })
      
      if (!response.ok) {
        throw new Error("Failed to add to favorites")
      }
      
      const data = await response.json()
      setFavorites(data)
      
      toast({
        title: "Added to favorites",
        description: `Added to your favorite ${type}`,
      })
    } catch (error) {
      console.error("Error adding to favorites:", error)
      toast({
        title: "Error",
        description: "Failed to add to favorites",
        variant: "destructive",
      })
    }
  }, [session?.user])

  const removeFromFavorites = useCallback(async (type: FavoriteType, id: number) => {
    if (!session?.user) return

    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          id,
          action: "remove",
        }),
      })
      
      if (!response.ok) {
        throw new Error("Failed to remove from favorites")
      }
      
      const data = await response.json()
      setFavorites(data)
      
      toast({
        title: "Removed from favorites",
        description: `Removed from your favorite ${type}`,
      })
    } catch (error) {
      console.error("Error removing from favorites:", error)
      toast({
        title: "Error",
        description: "Failed to remove from favorites",
        variant: "destructive",
      })
    }
  }, [session?.user])

  const isFavorite = useCallback((type: FavoriteType, id: number): boolean => {
    if (!favorites) return false
    return favorites[type].includes(id)
  }, [favorites])

  useEffect(() => {
    if (session?.user) {
      fetchFavorites()
    } else {
      setFavorites(null)
      setIsLoading(false)
    }
  }, [session?.user, fetchFavorites])

  return {
    favorites,
    isLoading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    fetchFavorites,
  }
} 