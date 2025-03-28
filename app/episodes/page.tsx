import { Suspense } from "react"
import Link from "next/link"
import { episodeService } from "@/services/api"
import { EpisodesFilters } from "@/components/episodes/EpisodesFilters"
import { EpisodesGridSkeleton } from "./loading"
import { EpisodesList } from "./EpisodesList"
import { SearchParams, ApiParams } from "@/types/api"

interface Props {
  searchParams: Promise<SearchParams>
}

export default async function EpisodesPage({ searchParams }: Props) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const name = params.name || ""
  const episode = params.episode || ""

  const apiParams: ApiParams = { page }
  if (name) apiParams.name = name
  if (episode && episodeService.validateEpisodeCode(episode)) apiParams.episode = episode

  return (
    <div className="container mx-auto px-4 py-8 bg-white dark:bg-black min-h-screen">
      <div className="flex items-center mb-4">
        <Link href="/" className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
          Home
        </Link>
        <span className="mx-2 text-gray-400">&gt;</span>
        <span className="text-gray-600 dark:text-white">Episodes</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">Rick & Morty Episodes</h1>

      <EpisodesFilters
        search={name}
        episodeCode={episode}
      />

      <Suspense fallback={<EpisodesGridSkeleton />}>
        <EpisodesListWrapper params={apiParams} />
      </Suspense>
    </div>
  )
}

async function EpisodesListWrapper({ params }: { params: ApiParams }) {
  try {
    const { results: episodes, info } = await episodeService.getEpisodes(params)
    return <EpisodesList episodes={episodes} info={info} params={params} />
  } catch (error: unknown) {
    console.error("Failed to fetch episodes:", error)
    return (
      <div className="text-center py-8">
        <p className="text-red-600 dark:text-red-400 mb-4">Failed to fetch episodes</p>
        <Link 
          href="/episodes"
          className="inline-flex items-center justify-center px-4 py-2 border border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-500/20 rounded-md"
        >
          Try Again
        </Link>
      </div>
    )
  }
}

