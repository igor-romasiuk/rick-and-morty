"use client"

import { useFavorites } from "@/components/providers/favorites-provider"
import { useToast } from "@/components/ui/use-toast"
import { CharacterBreadcrumbs } from "./components/CharacterBreadcrumbs"
import { CharacterImage } from "./components/CharacterImage"
import { CharacterInfo } from "./components/CharacterInfo"
import { EpisodesList } from "./components/EpisodesList"
import { useSession } from "next-auth/react"

interface CharacterDetailsProps {
  character: any
  episodes: any[]
}

export function CharacterDetails({ character, episodes }: CharacterDetailsProps) {
  const { data: session } = useSession()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const { toast } = useToast()
  const isFav = session?.user ? isFavorite("characters", character.id) : false

  const handleFavoriteClick = () => {
    if (!session?.user) {
      toast({
        title: "Authentication required",
        description: "Please login to add favorites",
        variant: "destructive",
      })
      return
    }

    if (isFav) {
      removeFromFavorites("characters", character.id)
      toast({
        title: "Removed from favorites",
        description: `${character.name} has been removed from your favorites`,
      })
    } else {
      addToFavorites("characters", character.id)
      toast({
        title: "Added to favorites",
        description: `${character.name} has been added to your favorites`,
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CharacterBreadcrumbs characterId={character.id} />

      <div className="bg-white dark:bg-black/60 border-2 border-gray-200 dark:border-green-500/30 rounded-lg overflow-hidden p-6 md:p-8 shadow-lg">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <CharacterImage
              image={character.image}
              name={character.name}
              isFav={isFav}
              showFavorite={!!session?.user}
              onFavoriteClick={handleFavoriteClick}
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
              characterId={character.id}
            />
          </div>
        </div>

        <EpisodesList episodes={episodes} />
      </div>
    </div>
  )
} 