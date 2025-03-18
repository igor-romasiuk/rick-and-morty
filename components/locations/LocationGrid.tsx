import { Location } from "@/types/api"
import { LocationCard } from "@/components/locations/location-card"
import { Button } from "@/components/ui/button"
import { LocationsGridSkeleton } from "@/app/locations/loading"

interface LocationGridProps {
  isLoading: boolean
  error: string | null
  locations: Location[]
  onClearFilters: () => void
}

export function LocationGrid({
  isLoading,
  error,
  locations,
  onClearFilters,
}: LocationGridProps) {
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
        <Button 
          variant="outline" 
          className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-500/20"
          onClick={onClearFilters}
        >
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {isLoading ? (
        <LocationsGridSkeleton />
      ) : locations.length > 0 ? (
        locations.map((location) => (
          <LocationCard
            key={location.id}
            id={location.id}
            name={location.name}
            type={location.type}
            dimension={location.dimension}
          />
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">No locations found</p>
          <Button 
            variant="outline" 
            className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-500/20"
            onClick={onClearFilters}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
} 