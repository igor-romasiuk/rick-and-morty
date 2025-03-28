import { Episode } from "./api"

export interface EpisodeCardProps {
  id: number
  name: string
  airDate: string
  episode: string
  showFavoriteButton?: boolean
}

export interface EpisodesGridProps {
  isLoading: boolean
  error: string | null
  episodes: Episode[]
  onClearSearch: () => void
}

export interface EpisodesFiltersProps {
  search: string
  episodeCode: string
} 