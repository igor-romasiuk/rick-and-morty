"use client"

import { CharacterBreadcrumbs } from "@/components/characters/CharacterBreadcrumbs"
import { CharacterImage } from "@/components/characters/CharacterImage"
import { CharacterInfo } from "@/components/characters/CharacterInfo"
import { EpisodesList } from "@/components/characters/EpisodesList"
import { useSession } from "next-auth/react"
import { CharacterDetailsProps } from "@/types/api"

export function CharacterDetails({ character, episodes }: CharacterDetailsProps) {
  const { data: session } = useSession()

  return (
    <div className="container mx-auto px-4 py-8">
      <CharacterBreadcrumbs characterId={character.id} />

      <div className="bg-white dark:bg-black/60 border-2 border-gray-200 dark:border-green-500/30 rounded-lg overflow-hidden p-6 md:p-8 shadow-lg">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <CharacterImage
              image={character.image}
              name={character.name}
              showFavorite={!!session?.user}
              characterId={character.id}
            />
          </div>

          <div className="md:col-span-2">
            <CharacterInfo
              name={character.name}
              status={character.status}
              species={character.species}
              gender={character.gender}
              location={character.location}
              origin={character.origin}
            />
          </div>
        </div>

        <EpisodesList episodes={episodes} />
      </div>
    </div>
  )
} 