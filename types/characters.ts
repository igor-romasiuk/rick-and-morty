import { Character, Episode } from "./api"

export interface CharacterCardProps {
  id: number
  name: string
  status: string
  species: string
  image: string
  index?: number
  showFavoriteButton?: boolean
}

export interface CharacterGridProps {
  isLoading: boolean
  error: string | null
  characters: Character[]
  onClearFilters: () => void
}

export interface CharacterFiltersProps {
  search: string
  status: string
  species: string
  gender: string
}

export interface FloatingHead {
  id: number
  name: string
  image: string
  x: number
  y: number
  size: number
  speed: {
    x: number
    y: number
  }
  rotation: number
  rotationSpeed: number
}

export interface CharacterInfoProps {
  name: string
  status: string
  species: string
  gender: string
  location: { name: string; url: string }
  origin: { name: string; url: string }
}

export interface CharacterImageProps {
  image: string
  name: string
  showFavorite: boolean
  characterId?: number
}

export interface EpisodesListProps {
  episodes: Episode[]
} 