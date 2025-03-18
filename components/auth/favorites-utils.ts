import type { User } from "./auth-context"

// Перевіряє, чи є елемент у списку вподобань
export function isFavorite(
  user: User | null,
  type: "characters" | "episodes" | "locations",
  id: number
): boolean {
  if (!user) return false
  return user.favorites?.[type]?.includes(id) || false
}

// Тепер ці функції не потрібні, оскільки вони замінені на API-виклики в auth-provider.tsx
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