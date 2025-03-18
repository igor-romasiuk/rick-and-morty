import Link from "next/link"

interface CharacterInfoProps {
  name: string
  status: string
  species: string
  gender: string
  location: { name: string; url: string }
  origin: { name: string; url: string }
  characterId?: number
}

export function CharacterInfo({
  name,
  status,
  species,
  gender,
  location,
  origin,
  characterId,
}: CharacterInfoProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-green-400">{name}</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Character Details</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="text-gray-600 dark:text-gray-400 w-20">Status:</span>
              <span className={`font-medium ${
                status.toLowerCase() === "alive" 
                  ? "text-green-600 dark:text-green-400" 
                  : status.toLowerCase() === "dead" 
                    ? "text-red-600 dark:text-red-400" 
                    : "text-yellow-600 dark:text-yellow-400"
              }`}>{status}</span>
            </li>
            <li className="flex items-center">
              <span className="text-gray-600 dark:text-gray-400 w-20">Species:</span>
              <span className="font-medium text-green-600 dark:text-green-400">{species}</span>
            </li>
            <li className="flex items-center">
              <span className="text-gray-600 dark:text-gray-400 w-20">Gender:</span>
              <span className="font-medium text-green-600 dark:text-green-400">{gender}</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Location</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="text-gray-600 dark:text-gray-400 w-20">Origin:</span>
              {origin.url ? (
                <Link href={`/locations/${origin.url.split('/').pop()}`} className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                  {origin.name}
                </Link>
              ) : (
                <span className="font-medium text-green-600 dark:text-green-400">{origin.name}</span>
              )}
            </li>
            <li className="flex items-center">
              <span className="text-gray-600 dark:text-gray-400 w-20">Location:</span>
              {location.url ? (
                <Link href={`/locations/${location.url.split('/').pop()}`} className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                  {location.name}
                </Link>
              ) : (
                <span className="font-medium text-green-600 dark:text-green-400">{location.name}</span>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
} 