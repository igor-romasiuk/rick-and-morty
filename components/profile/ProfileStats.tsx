"use client"

type User = {
  id?: string
  name?: string
  email?: string
  image?: string
  favorites?: {
    characters: number[]
    episodes: number[]
    locations: number[]
  }
}

interface ProfileStatsProps {
  user: User
}

export function ProfileStats({ user }: ProfileStatsProps) {
  const favorites = user.favorites || { characters: [], episodes: [], locations: [] }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white/90 dark:bg-black/60 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Characters</h3>
        <p className="text-3xl font-bold text-green-600 dark:text-green-400">
          {favorites.characters.length}
        </p>
        <p className="text-gray-600 dark:text-gray-400">Favorite characters</p>
      </div>
      
      <div className="bg-white/90 dark:bg-black/60 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Episodes</h3>
        <p className="text-3xl font-bold text-green-600 dark:text-green-400">
          {favorites.episodes.length}
        </p>
        <p className="text-gray-600 dark:text-gray-400">Favorite episodes</p>
      </div>
      
      <div className="bg-white/90 dark:bg-black/60 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Locations</h3>
        <p className="text-3xl font-bold text-green-600 dark:text-green-400">
          {favorites.locations.length}
        </p>
        <p className="text-gray-600 dark:text-gray-400">Favorite locations</p>
      </div>
    </div>
  )
} 