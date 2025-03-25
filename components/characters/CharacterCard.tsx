"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { FavoriteButton } from "@/components/ui/FavoriteButton"

type CharacterCardProps = {
  id: number
  name: string
  status: string
  species: string
  image: string
  index?: number
  showFavoriteButton?: boolean
}

export function CharacterCard({
  id,
  name,
  status,
  species,
  image,
  index = 0,
  showFavoriteButton = false,
}: CharacterCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/characters/${id}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="block h-full">
      <div className="h-full flex flex-col bg-white/40 dark:bg-black/40 border border-gray-200 dark:border-green-500/30 rounded-lg overflow-hidden hover:border-green-500 dark:hover:border-green-400 transition-all hover:shadow-lg dark:hover:shadow-[0_0_15px_rgba(74,222,128,0.3)] group">
        <div className="w-full aspect-square relative overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            sizes="(max-width: 500px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

          {isHovered && showFavoriteButton && (
            <div className="absolute top-2 right-2">
              <FavoriteButton type="characters" id={id} />
            </div>
          )}
        </div>

        <div className="flex-1 p-3 sm:p-4 border-t border-gray-200 dark:border-green-500/30 bg-white/60 dark:bg-black/60">
          <h3 className="text-base sm:text-lg font-bold text-green-600 dark:text-green-400 mb-1 truncate">{name.toUpperCase()}</h3>
          <div className="flex flex-col text-xs sm:text-sm space-y-0.5">
            <span className="text-gray-600 dark:text-gray-400">
              Status:{" "}
              <span
                className={`${
                  status.toLowerCase() === "alive"
                    ? "text-green-600 dark:text-green-400"
                    : status.toLowerCase() === "dead"
                      ? "text-red-500 dark:text-red-400"
                      : "text-yellow-500 dark:text-yellow-400"
                }`}
              >
                {status}
              </span>
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              Species: <span className="text-green-600 dark:text-green-400">{species}</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

