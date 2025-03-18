"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { FavoriteButton } from "@/components/ui/favorite-button"

type EpisodeCardProps = {
  id: number
  name: string
  airDate: string
  episode: string
  index?: number
  showFavoriteButton?: boolean
}

export function EpisodeCard({ id, name, airDate, episode, index = 0, showFavoriteButton = false }: EpisodeCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/episodes/${id}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="bg-green-50/50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 rounded-lg p-6 hover:border-green-500 dark:hover:border-green-400 transition-all hover:shadow-lg dark:hover:shadow-[0_0_15px_rgba(74,222,128,0.3)] h-full flex flex-col relative">
        {showFavoriteButton && (
          <div className="absolute top-2 right-2 z-10">
            <FavoriteButton type="episodes" id={id} />
          </div>
        )}

        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{name.toUpperCase()}</h3>
        <div className="mt-auto">
          <div className="text-sm text-yellow-600 dark:text-yellow-400 mb-1">Air Date: {airDate}</div>
          <div className="text-sm text-green-600 dark:text-green-400">Episode: {episode}</div>
        </div>
      </div>
    </Link>
  )
}

