import { Location } from "./api"

export interface LocationCardProps {
  id: number
  name: string
  type: string
  dimension: string
  showFavoriteButton?: boolean
}

export interface LocationGridProps {
  isLoading: boolean
  error: string | null
  locations: Location[]
  onClearFilters: () => void
}

export interface LocationFiltersProps {
  search: string
  type: string
  dimension: string
} 