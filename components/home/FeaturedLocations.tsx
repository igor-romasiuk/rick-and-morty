"use client"

import Link from "next/link"
import { Map } from "lucide-react"
import { PortalCard } from "@/components/common/PortalCard"
import { SciFiButton } from "@/components/common/SciFiButton"
import { Carousel } from "@/components/ui/carousel"
import { Location } from "@/types/api"

interface FeaturedLocationsProps {
  locations: Location[]
}
export function FeaturedLocations({ locations }: FeaturedLocationsProps) {
  return (
    <section className="section-light py-16 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-sci-fi text-gray-900 dark:text-white">Featured Locations</h2>
          <p className="text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
            Discover the most bizarre and fascinating places across the multiverse.
          </p>
        </div>

        <div className="locations-carousel-wrapper">
          <Carousel
            maxItems={20}
            scrollSpeed={0.06}
            slidesToShow={3}
            centerMode={true}
          >
            {locations.map((location: Location) => (
              <div key={location.id} className="px-2 py-1">
                <Link href={`/locations/${location.id}`} className="block h-full">
                  <PortalCard
                    className="card p-4 sm:p-7 h-[300px] location-card"
                    variant={location.id % 3 === 0 ? "purple" : location.id % 2 === 0 ? "blue" : "green"}
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="sm:text-xl font-bold text-gray-900 dark:text-white heading-sci-fi truncate max-w-[70%]">
                          {location.name}
                        </h3>
                        <span className="font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
                          #{location.id}
                        </span>
                      </div>
                      <div className="sm:text-sm font-medium text-purple-600 dark:text-purple-400 mb-4">
                        {location.type}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-5 flex-grow line-clamp-3">
                        {location.dimension}
                      </p>
                      <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-200 dark:border-gray-700">
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          Residents: {location.residents.length}
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-green-600 dark:text-green-400">Visit Now</span>
                      </div>
                    </div>
                  </PortalCard>
                </Link>
              </div>
            ))}
          </Carousel>
        </div>

        <div className="text-center mt-12">
          <Link href="/locations" className="inline-block">
            <SciFiButton variant="outline" className="hover:scale-105 transition-transform duration-200 hover:brightness-110">
              <Map className="h-4 w-4" />
              View All Locations
            </SciFiButton>
          </Link>
        </div>
      </div>
    </section>
  )
}
