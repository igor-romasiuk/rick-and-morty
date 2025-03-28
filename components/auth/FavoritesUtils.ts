import type { User } from "./AuthContext"

export function isFavorite(
  user: User | null,
  type: "characters" | "episodes" | "locations",
  id: number
): boolean {
  if (!user) return false
  return user.favorites?.[type]?.includes(id) || false
}

export async function addToFavorites(
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  type: "characters" | "episodes" | "locations",
  id: number
): Promise<void> {
  if (!user) return
  
  console.warn("addToFavorites is deprecated, use the API version instead")
  
  setUser({
    ...user,
    favorites: {
      ...user.favorites,
      [type]: [...user.favorites[type], id]
    }
  })
}

export async function removeFromFavorites(
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  type: "characters" | "episodes" | "locations",
  id: number
): Promise<void> {
  if (!user) return
  
  console.warn("removeFromFavorites is deprecated, use the API version instead")
  
  setUser({
    ...user,
    favorites: {
      ...user.favorites,
      [type]: user.favorites[type].filter(itemId => itemId !== id)
    }
  })
} 