"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { LocationCard } from "@/components/locations/location-card"
import { Pagination } from "@/components/pagination"

interface Location {
  id: number
  name: string
  type: string
  dimension: string
}

interface ApiParams {
  page: number
  type?: string
  dimension?: string
  name?: string
}

interface LocationsListProps {
  locations: Location[]
  info: {
    pages: number
  }
  params: ApiParams
}

export function LocationsList({ locations, info, params }: LocationsListProps) {
  const { data: session } = useSession()
  
  if (!locations.length) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">No locations found</p>
        <Link 
          href="/locations"
          className="inline-flex items-center justify-center px-4 py-2 border border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-500/20 rounded-md"
        >
          Clear Filters
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {locations.map((location) => (
          <LocationCard
            key={location.id}
            id={location.id}
            name={location.name}
            type={location.type}
            dimension={location.dimension}
            showFavoriteButton={!!session?.user}
          />
        ))}
      </div>

      <Pagination
        currentPage={params.page}
        totalPages={info.pages}
        baseUrl="/locations"
        query={{
          ...(params.type && { type: params.type }),
          ...(params.dimension && { dimension: params.dimension }),
          ...(params.name && { name: params.name })
        }}
      />
    </>
  )
} 