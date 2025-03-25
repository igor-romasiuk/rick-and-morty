import { createContext } from "react"

export type User = {
  id: string
  name: string
  email: string
  image?: string
  favorites: {
    characters: number[]
    episodes: number[]
    locations: number[]
  }
}

export type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string } | void>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string; error?: string } | void>
  logout: () => void
  addToFavorites: (type: "characters" | "episodes" | "locations", id: number) => Promise<void>
  removeFromFavorites: (type: "characters" | "episodes" | "locations", id: number) => Promise<void>
  isFavorite: (type: "characters" | "episodes" | "locations", id: number) => boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined) 