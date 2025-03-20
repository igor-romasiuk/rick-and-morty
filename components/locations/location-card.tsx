"use client"

import type React from "react"
import Link from "next/link"
import { FavoriteButton } from "@/components/ui/favorite-button"

type LocationCardProps = {
  id: number
  name: string
  type: string
  dimension: string
  showFavoriteButton?: boolean
}

export function LocationCard({ id, name, type, dimension, showFavoriteButton = false }: LocationCardProps) {
  return (
    <Link href={`/locations/${id}`}>
      <div className="bg-green-50/50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 rounded-lg p-6 hover:border-green-500 dark:hover:border-green-400 transition-all hover:shadow-lg dark:hover:shadow-[0_0_15px_rgba(74,222,128,0.3)] h-full relative">
        {showFavoriteButton && (
          <div className="absolute top-2 right-2 z-10">
            <FavoriteButton type="locations" id={id} />
          </div>
        )}

        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{name.toUpperCase()}</h3>
        <div className="mt-auto">
          <div className="text-sm text-green-600 dark:text-green-400 mb-1">Type: {type}</div>
          <div className="text-sm text-yellow-600 dark:text-yellow-400">Dimension: {dimension}</div>
        </div>
      </div>
    </Link>
  )
}

