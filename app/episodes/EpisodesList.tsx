"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { EpisodeCard } from "@/components/episodes/EpisodeCard"
import { Pagination } from "@/components/common/Pagination"
import { EpisodesListProps } from "@/types/api"

export function EpisodesList({ episodes, info, params }: EpisodesListProps) {
  const { data: session } = useSession()
  
  if (!episodes.length) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">No episodes found</p>
        <Link 
          href="/episodes"
          className="inline-flex items-center justify-center px-4 py-2 border border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-500/20 rounded-md"
        >
          Clear Search
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {episodes.map((episode) => (
          <EpisodeCard
            key={episode.id}
            id={episode.id}
            name={episode.name}
            airDate={episode.air_date}
            episode={episode.episode}
            showFavoriteButton={!!session?.user}
          />
        ))}
      </div>

      <Pagination
        currentPage={params.page}
        totalPages={info.pages}
        baseUrl="/episodes"
        query={{
          ...(params.name && { name: params.name }),
          ...(params.episode && { episode: params.episode })
        }}
      />
    </>
  )
} 