"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { ProfileHeader } from "@/components/profile/ProfileHeader"
import { ProfileStats } from "@/components/profile/ProfileStats"
import { FavoritesList } from "@/components/profile/FavoritesList"
import { ProfileSkeleton } from "@/components/profile/ProfileSkeleton"
import { characterService, episodeService, locationService } from "@/services/api"
import { useFavorites } from "@/components/providers/FavoritesProvider"
import type { Character, Episode, Location } from "@/types/api"

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const isLoading = status === "loading"
  const user = session?.user
  
  const { favorites, isLoading: isLoadingFavorites } = useFavorites()
  const [favoriteCharacters, setFavoriteCharacters] = useState<Character[]>([])
  const [favoriteEpisodes, setFavoriteEpisodes] = useState<Episode[]>([])
  const [favoriteLocations, setFavoriteLocations] = useState<Location[]>([])
  const [isLoadingItems, setIsLoadingItems] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    const fetchFavoriteItems = async () => {
      if (!favorites) return
      
      setIsLoadingItems(true)
      
      try {
        if (favorites.characters.length > 0) {
          const charactersPromises = favorites.characters.map((id: number) => 
            characterService.getCharacter(id.toString())
          )
          const charactersResults = await Promise.all(charactersPromises)
          setFavoriteCharacters(charactersResults)
        } else {
          setFavoriteCharacters([])
        }
        
        if (favorites.episodes.length > 0) {
          const episodesPromises = favorites.episodes.map((id: number) => 
            episodeService.getEpisode(id.toString())
          )
          const episodesResults = await Promise.all(episodesPromises)
          setFavoriteEpisodes(episodesResults)
        } else {
          setFavoriteEpisodes([])
        }
        
        if (favorites.locations.length > 0) {
          const locationsPromises = favorites.locations.map((id: number) => 
            locationService.getLocation(id.toString())
          )
          const locationsResults = await Promise.all(locationsPromises)
          setFavoriteLocations(locationsResults)
        } else {
          setFavoriteLocations([])
        }
      } catch (error) {
        console.error("Error fetching favorite items:", error)
      } finally {
        setIsLoadingItems(false)
      }
    }
    
    fetchFavoriteItems()
  }, [favorites])

  if (isLoading) {
    return <ProfileSkeleton />
  }

  if (!user) {
    return null
  }

  const userWithFavorites = {
    ...user,
    favorites: favorites || { characters: [], episodes: [], locations: [] }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileHeader user={userWithFavorites} />
      <ProfileStats user={userWithFavorites} />
      <FavoritesList
        isLoadingFavorites={isLoadingFavorites || isLoadingItems}
        favoriteCharacters={favoriteCharacters}
        favoriteEpisodes={favoriteEpisodes}
        favoriteLocations={favoriteLocations}
      />
    </div>
  )
}

