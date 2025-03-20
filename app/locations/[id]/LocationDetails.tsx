"use client"

import { useSession } from "next-auth/react"
import { CharacterCard } from "@/components/characters/character-card"
import { FavoriteButton } from "@/components/ui/favorite-button"

interface Location {
  id: number
  name: string
  type: string
  dimension: string
}

interface Character {
  id: number
  name: string
  status: string
  species: string
  image: string
}

interface LocationDetailsProps {
  location: Location
  residents: Character[]
}

export function LocationDetails({ location, residents }: LocationDetailsProps) {
  const { data: session } = useSession()

  return (
    <>
      <div className="bg-white dark:bg-black/60 border-2 border-gray-200 dark:border-green-500/30 rounded-lg overflow-hidden p-6 md:p-8 mb-8 shadow-lg">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-green-400">{location.name}</h1>
          {session?.user && (
            <FavoriteButton 
              type="locations" 
              id={location.id} 
              className="ml-4"
            />
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
          <div className="text-center">
            <p className="text-green-600 dark:text-green-400 text-lg mb-1">Type:</p>
            <p className="text-xl text-gray-900 dark:text-white">{location.type}</p>
          </div>

          <div className="text-center">
            <p className="text-yellow-600 dark:text-yellow-400 text-lg mb-1">Dimension:</p>
            <p className="text-xl text-gray-900 dark:text-white">{location.dimension}</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Residents in this location:</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {residents.length > 0 ? (
          residents.map((resident, index) => (
            <CharacterCard
              key={resident.id}
              id={resident.id}
              name={resident.name}
              status={resident.status}
              species={resident.species}
              image={resident.image}
              index={index}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8 bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-green-500/20 rounded-lg">
            <p className="text-xl text-gray-600 dark:text-gray-400">No known residents</p>
          </div>
        )}
      </div>
    </>
  )
} 