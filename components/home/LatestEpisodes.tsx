"use client"

import Link from "next/link"
import { Tv } from "lucide-react"
import { PortalCard } from "@/components/common/PortalCard"
import { SciFiButton } from "@/components/common/SciFiButton"
import { Carousel } from "@/components/ui/carousel"
import { Episode } from "@/types/api"

interface LatestEpisodesProps {
  episodes: Episode[]
}

export function LatestEpisodes({ episodes }: LatestEpisodesProps) {
  return (
    <section className="section-dark py-16 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-sci-fi text-gray-900 dark:text-white">Latest Episodes</h2>
          <p className="text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
            Catch up on the latest interdimensional cable episodes and adventures of Rick and Morty.
          </p>
        </div>

        <div className="episodes-carousel-wrapper">
          <Carousel 
            maxItems={20} 
            scrollSpeed={0.1}
            slidesToShow={4}
            centerMode={true}
          >
            {episodes.map((episode: Episode) => (
              <div key={episode.id} className="px-2 py-1">
                <Link href={`/episodes/${episode.id}`} className="block h-full">
                  <PortalCard
                    className="card p-4 sm:p-8 h-[280px] episode-card"
                    variant={episode.id % 2 === 0 ? "blue" : "green"}
                  >
                    <div className="flex flex-col h-full">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 heading-sci-fi truncate">
                        {episode.name}
                      </h3>
                      <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
                        {episode.episode} • {episode.air_date}
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-5 flex-grow line-clamp-3">
                        Join Rick and Morty on their adventure through dimensions and realities.
                      </p>
                      <div className="flex justify-between items-center mt-auto">
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          {episode.characters.length} Characters
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-green-600 dark:text-green-400">Watch Now</span>
                      </div>
                    </div>
                  </PortalCard>
                </Link>
              </div>
            ))}
          </Carousel>
        </div>

        <div className="text-center mt-12">
          <Link href="/episodes" className="inline-block">
            <SciFiButton variant="outline" className="hover:scale-105 transition-transform duration-200 hover:brightness-110">
              <Tv className="mr-2 h-4 w-4" />
              View All Episodes
            </SciFiButton>
          </Link>
        </div>
      </div>
    </section>
  )
} 