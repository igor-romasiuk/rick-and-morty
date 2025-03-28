export interface FavoritesContextType {
  favorites: {
    characters: number[]
    episodes: number[]
    locations: number[]
  } | null
  isLoading: boolean
  addToFavorites: (type: "characters" | "episodes" | "locations", id: number) => Promise<void>
  removeFromFavorites: (type: "characters" | "episodes" | "locations", id: number) => Promise<void>
  isFavorite: (type: "characters" | "episodes" | "locations", id: number) => boolean
  refreshFavorites: () => void
} 