"use client"

import { useSession } from "next-auth/react"
import { CharacterCard } from "@/components/characters/CharacterCard"
import { FavoriteButton } from "@/components/ui/FavoriteButton"

interface Character {
  id: number
  name: string
  status: string
  species: string
  image: string
}

interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
}

interface EpisodeDetailsProps {
  episode: Episode
  characters: Character[]
}

export function EpisodeDetails({ episode, characters }: EpisodeDetailsProps) {
  const { data: session } = useSession()

  return (
    <>
      <div className="bg-white dark:bg-black/60 border-2 border-gray-200 dark:border-green-500/30 rounded-lg overflow-hidden p-6 md:p-8 mb-8 shadow-lg">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-green-400">{episode.name.toUpperCase()}</h1>
          {session?.user && (
            <FavoriteButton 
              type="episodes" 
              id={episode.id} 
              className="ml-4"
            />
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
          <div className="text-center">
            <p className="text-yellow-600 dark:text-yellow-400 text-lg mb-1">Air Date:</p>
            <p className="text-xl text-gray-900 dark:text-white">{episode.air_date}</p>
          </div>

          <div className="text-center">
            <p className="text-green-600 dark:text-green-400 text-lg mb-1">Episode Code:</p>
            <p className="text-xl text-gray-900 dark:text-white">{episode.episode}</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Characters in this episode:</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {characters.map((character, index) => (
          <CharacterCard
            key={character.id}
            id={character.id}
            name={character.name}
            status={character.status}
            species={character.species}
            image={character.image}
            index={index}
          />
        ))}
      </div>
    </>
  )
} 