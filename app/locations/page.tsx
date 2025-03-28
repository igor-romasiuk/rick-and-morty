import { Suspense } from "react"
import Link from "next/link"
import { locationService } from "@/services/api"
import { LocationFilters } from "@/components/locations/LocationFilters"
import { LocationsGridSkeleton } from "./loading"
import { LocationsList } from "./LocationsList"
import { SearchParams, ApiParams } from "@/types/api"

interface Props {
  searchParams: Promise<SearchParams>
}

export default async function LocationsPage({ searchParams }: Props) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const type = params.type || ""
  const dimension = params.dimension || ""
  const name = params.name || ""

  const apiParams: ApiParams = { page }
  if (type && type !== "all") apiParams.type = type
  if (dimension && dimension !== "all") apiParams.dimension = dimension
  if (name) apiParams.name = name

  return (
    <div className="container mx-auto px-4 py-8 bg-white dark:bg-black min-h-screen">
      <div className="flex items-center mb-4">
        <Link href="/" className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
          Home
        </Link>
        <span className="mx-2 text-gray-400">&gt;</span>
        <span className="text-gray-600 dark:text-white">Locations</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">Locations</h1>

      <LocationFilters
        search={name}
        type={type}
        dimension={dimension}
      />

      <Suspense fallback={<LocationsGridSkeleton />}>
        <LocationsListWrapper params={apiParams} />
      </Suspense>
    </div>
  )
}

async function LocationsListWrapper({ params }: { params: ApiParams }) {
  try {
    const { results: locations, info } = await locationService.getLocations(params)
    return <LocationsList locations={locations} info={info} params={params} />
  } catch (error: unknown) {
    console.error("Failed to fetch locations:", error)
    return (
      <div className="text-center py-8">
        <p className="text-red-600 dark:text-red-400 mb-4">Failed to fetch locations</p>
        <Link 
          href="/locations"
          className="inline-flex items-center justify-center px-4 py-2 border border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-500/20 rounded-md"
        >
          Try Again
        </Link>
      </div>
    )
  }
}

