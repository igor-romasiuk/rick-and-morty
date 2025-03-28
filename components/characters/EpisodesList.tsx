import Link from "next/link"
import { EpisodesListProps } from "@/types/characters"

export function EpisodesList({ episodes }: EpisodesListProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Episodes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {episodes.map((episode) => (
          <Link key={episode.id} href={`/episodes/${episode.id}`}>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 rounded-lg p-4 hover:border-green-600 dark:hover:border-green-400 transition-all">
              <h3 className="font-bold mb-2 text-gray-900 dark:text-white">{episode.name}</h3>
              <p className="text-sm text-yellow-600 dark:text-yellow-400">{episode.episode}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{episode.air_date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 