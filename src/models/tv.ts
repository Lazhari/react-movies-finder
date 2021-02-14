import { Country, Genre, Language, Network, ProductionCompany } from './common'

export interface TvShowCreator {
  id: number
  credit_id: string
  name: string
  gender: number
  profile_path?: string
}

export interface Episode {
  id: number
  air_date: string
  episode_number: number
  name: string
  overview: string
  production_code: string
  season_number: number
  still_path?: string
  vote_average: number
  vote_count: number
}

export interface Season {
  id: number
  air_date: string
  episode_count: number
  name: string
  overview: string
  poster_path: string
  season_number: number
}

export interface TvShow {
  id: number
  poster_path?: string
  popularity: number
  backdrop_path?: string
  vote_average: number
  overview: string
  first_air_date: string
  origin_country: string[]
  genre_ids: number[]
  original_language: string
  vote_count: number
  name: string
  original_name: string
}

export interface TvShowDetails {
  id: string
  backdrop_path?: string
  created_by: TvShowCreator[]
  episode_run_time: number[]
  first_air_date: string
  genres: Genre[]
  homepage: string
  in_production: boolean
  language: string[]
  last_air_date: string
  last_episode_to_air: Episode
  name: string
  next_episode_to_air?: Episode
  networks: Network[]
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path?: string
  production_companies: ProductionCompany[]
  production_countries: Country[]
  seasons: Season[]
  spoken_languages: Language[]
  status: string
  tagline: string
  type: string
  vote_average: number
  vote_count: number
}
