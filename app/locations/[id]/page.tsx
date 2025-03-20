import Link from "next/link"
import { locationService } from "@/services/api"
import { LocationDetails } from "./LocationDetails"
import { Button } from "@/components/ui/button"

export default async function LocationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    const location = await locationService.getLocation(id)
    const residents = await locationService.getLocationResidents(location.residents)

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-4">
          <Link href="/" className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
            Home
          </Link>
          <span className="mx-2 text-gray-500">&gt;</span>
          <Link href="/locations" className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
            Locations
          </Link>
          <span className="mx-2 text-gray-500">&gt;</span>
          <span className="text-gray-900 dark:text-white">{id}</span>
        </div>

        <LocationDetails location={location} residents={residents} />
      </div>
    )
  } catch (error: unknown) {
    console.error("Failed to fetch location:", error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-black/60 border border-green-500/30 rounded-lg overflow-hidden p-6 md:p-8 text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">
            Location not found
          </h1>
          <p className="mb-6">
            The location you&apos;re looking for doesn&apos;t exist in this dimension.
          </p>
          <Link href="/locations">
            <Button
              variant="outline"
              className="border-green-500 text-green-400 hover:bg-green-500/20"
            >
              Back to Locations
            </Button>
          </Link>
        </div>
      </div>
    )
  }
}

