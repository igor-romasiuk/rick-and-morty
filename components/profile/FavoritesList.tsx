"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { CharacterCard } from "@/components/characters/character-card"
import { EpisodeCard } from "@/components/episodes/episode-card"
import { LocationCard } from "@/components/locations/location-card"
import type { Character, Episode, Location } from "@/types/api"

interface FavoritesListProps {
  isLoadingFavorites: boolean
  favoriteCharacters: Character[]
  favoriteEpisodes: Episode[]
  favoriteLocations: Location[]
}

export function FavoritesList({
  isLoadingFavorites,
  favoriteCharacters,
  favoriteEpisodes,
  favoriteLocations,
}: FavoritesListProps) {
  const [activeTab, setActiveTab] = useState<string>("characters");

  useEffect(() => {
    const savedTab = localStorage.getItem("favoritesActiveTab");
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem("favoritesActiveTab", value);
  };

  if (isLoadingFavorites) {
    return <div className="text-center py-8">Loading favorites...</div>
  }

  const hasFavorites = 
    favoriteCharacters.length > 0 || 
    favoriteEpisodes.length > 0 || 
    favoriteLocations.length > 0

  if (!hasFavorites) {
    return (
      <div className="bg-white/90 dark:bg-black/60 p-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-bold mb-4">Your Favorites</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          You haven't added any favorites yet. Explore characters, episodes, and locations to add them to your favorites!
        </p>
      </div>
    )
  }

  return (
    <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="w-full grid grid-cols-3">
        <TabsTrigger value="characters">Characters</TabsTrigger>
        <TabsTrigger value="episodes">Episodes</TabsTrigger>
        <TabsTrigger value="locations">Locations</TabsTrigger>
      </TabsList>

      <TabsContent value="characters">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Favorite Characters</h2>
        {renderCharactersList(isLoadingFavorites, favoriteCharacters)}
      </TabsContent>

      <TabsContent value="episodes">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Favorite Episodes</h2>
        {renderEpisodesList(isLoadingFavorites, favoriteEpisodes)}
      </TabsContent>

      <TabsContent value="locations">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Favorite Locations</h2>
        {renderLocationsList(isLoadingFavorites, favoriteLocations)}
      </TabsContent>
    </Tabs>
  )
}

function renderCharactersList(isLoading: boolean, characters: Character[]) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-80 rounded-lg" />
        ))}
      </div>
    )
  }

  if (characters.length === 0) {
    return (
      <EmptyState
        message="You haven't added any characters to your favorites yet."
        linkHref="/characters"
        linkText="Explore Characters"
      />
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {characters.map((character, index) => (
        <CharacterCard
          key={character.id}
          id={character.id}
          name={character.name}
          status={character.status}
          species={character.species}
          image={character.image}
          index={index}
          showFavoriteButton={true}
        />
      ))}
    </div>
  )
}

function renderEpisodesList(isLoading: boolean, episodes: Episode[]) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-lg" />
        ))}
      </div>
    )
  }

  if (episodes.length === 0) {
    return (
      <EmptyState
        message="You haven't added any episodes to your favorites yet."
        linkHref="/episodes"
        linkText="Explore Episodes"
      />
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {episodes.map((episode, index) => (
        <EpisodeCard
          key={episode.id}
          id={episode.id}
          name={episode.name}
          airDate={episode.air_date}
          episode={episode.episode}
          index={index}
          showFavoriteButton={true}
        />
      ))}
    </div>
  )
}

function renderLocationsList(isLoading: boolean, locations: Location[]) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-lg" />
        ))}
      </div>
    )
  }

  if (locations.length === 0) {
    return (
      <EmptyState
        message="You haven't added any locations to your favorites yet."
        linkHref="/locations"
        linkText="Explore Locations"
      />
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {locations.map((location, index) => (
        <LocationCard
          key={location.id}
          id={location.id}
          name={location.name}
          type={location.type}
          dimension={location.dimension}
          index={index}
          showFavoriteButton={true}
        />
      ))}
    </div>
  )
}

interface EmptyStateProps {
  message: string
  linkHref: string
  linkText: string
}

function EmptyState({ message, linkHref, linkText }: EmptyStateProps) {
  return (
    <div className="text-center py-12 bg-gray-50 dark:bg-black/30 rounded-lg border border-gray-200 dark:border-green-500/20">
      <p className="text-gray-600 dark:text-gray-400 mb-4">{message}</p>
      <Link href={linkHref}>
        <Button variant="outline" className="border-green-600 dark:border-green-500 text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-500/20">
          {linkText}
        </Button>
      </Link>
    </div>
  )
} 