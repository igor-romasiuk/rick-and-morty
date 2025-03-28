import { EpisodeCard } from "@/components/episodes/EpisodeCard"
import { Button } from "@/components/ui/Button"
import { EpisodesGridSkeleton } from "@/app/episodes/loading"
import { EpisodesGridProps } from "@/types/episodes"

export function EpisodesGrid({
  isLoading,
  error,
  episodes,
  onClearSearch,
}: EpisodesGridProps) {
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
        <Button 
          variant="outline" 
          className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-500/20"
          onClick={onClearSearch}
        >
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {isLoading ? (
        <EpisodesGridSkeleton />
      ) : episodes.length > 0 ? (
        episodes.map((episode) => (
          <EpisodeCard
            key={episode.id}
            id={episode.id}
            name={episode.name}
            episode={episode.episode}
            airDate={episode.air_date}
          />
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">No episodes found</p>
          <Button 
            variant="outline" 
            className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-500/20"
            onClick={onClearSearch}
          >
            Clear Search
          </Button>
        </div>
      )}
    </div>
  )
} 