import Link from "next/link"
import { episodeService } from "@/services/api"
import { EpisodeDetails } from "./EpisodeDetails"

export default async function EpisodeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const episode = await episodeService.getEpisode(id)
  const characters = await episodeService.getEpisodeCharacters(episode.characters)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-4">
        <Link href="/" className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
          Home
        </Link>
        <span className="mx-2 text-gray-500">&gt;</span>
        <Link href="/episodes" className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
          Episodes
        </Link>
        <span className="mx-2 text-gray-500">&gt;</span>
        <span className="text-gray-900 dark:text-white">{id}</span>
      </div>

      <EpisodeDetails episode={episode} characters={characters} />
    </div>
  )
}

