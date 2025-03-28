export interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  favorites: {
    characters: number[];
    episodes: number[];
    locations: number[];
  };
}

export interface APIResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
}

export interface APIError {
  error: string;
}

export interface SearchParams {
  page?: string;
  status?: string;
  species?: string;
  gender?: string;
  name?: string;
  type?: string;
  dimension?: string;
  episode?: string;
}

export interface ApiParams {
  page: number;
  status?: string;
  species?: string;
  gender?: string;
  name?: string;
  type?: string;
  dimension?: string;
  episode?: string;
}

export interface PaginationInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface LocationDetailsProps {
  location: Location;
  residents: Character[];
}

export interface CharacterDetailsProps {
  character: Character;
  episodes: Episode[];
}

export interface LocationsListProps {
  locations: Location[];
  isLoading?: boolean;
  info: PaginationInfo;
  params: ApiParams;
}

export interface EpisodesListProps {
  episodes: Episode[];
  isLoading: boolean;
}

export interface EpisodeDetailsProps {
  episode: Episode;
  characters: Character[];
} 