import Image from "next/image"
import { FavoriteButton } from "@/components/ui/FavoriteButton"

interface CharacterImageProps {
  image: string
  name: string
  showFavorite: boolean
  characterId?: number
}

export function CharacterImage({ image, name, showFavorite, characterId }: CharacterImageProps) {
  return (
    <div className="relative aspect-square border-4 border-green-200 dark:border-green-500/50 rounded-lg overflow-hidden">
      <Image 
        src={image || "/placeholder.svg"} 
        alt={name} 
        fill 
        className="object-cover" 
        priority={false}
        loading="lazy" 
      />
      
      {showFavorite && characterId && (
        <div className="absolute top-2 right-2">
          <FavoriteButton 
            type="characters" 
            id={characterId} 
          />
        </div>
      )}
    </div>
  )
} 