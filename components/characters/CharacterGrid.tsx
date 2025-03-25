import { Character } from "@/types/api"
import { CharacterCard } from "@/components/characters/CharacterCard"
import { Button } from "@/components/ui/Button"
import { Skeleton } from "@/components/ui/skeleton"

export function CharactersGridSkeleton() {
  return (
    <>
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="bg-gray-50 dark:bg-black/40 border border-green-500/30 rounded-lg overflow-hidden">
          <Skeleton className="aspect-square w-full" />
          <div className="p-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-1" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </>
  )
}

interface CharacterGridProps {
  isLoading: boolean
  error: string | null
  characters: Character[]
  onClearFilters: () => void
}

export function CharacterGrid({
  isLoading,
  error,
  characters,
  onClearFilters,
}: CharacterGridProps) {
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
        <Button 
          variant="outline" 
          className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-500/20"
          onClick={onClearFilters}
        >
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      {isLoading ? (
        <CharactersGridSkeleton />
      ) : characters.length > 0 ? (
        characters.map((character) => (
          <CharacterCard
            key={character.id}
            id={character.id}
            name={character.name}
            status={character.status}
            species={character.species}
            image={character.image}
            index={character.id}
          />
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">No characters found</p>
          <Button 
            variant="outline" 
            className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-500/20"
            onClick={onClearFilters}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
} 