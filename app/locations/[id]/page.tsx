import Link from "next/link"
import { locationService } from "@/services/api"
import { CharacterCard } from "@/components/characters/character-card"
import { LocationDetails } from "./LocationDetails"

export default async function LocationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
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
}

