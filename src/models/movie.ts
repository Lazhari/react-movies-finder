import { Country, Language, Genre, ProductionCompany } from './common'

export enum Status {
  RUMORED = 'Rumored',
  PLANNED = 'Planned',
  IN_PRODUCTION = 'In Production',
  POST_PRODUCTION = 'Post Production',
  RELEASED = 'Released',
  CANCELED = 'Canceled',
}
export interface Video {
  id: string
  iso_639_1: string
  iso_3166_1: string
  key: string
  name: string
  site: string
  size: number
  type: string
}

export interface Movie {
  id: number
  poster_path?: string
  adult: boolean
  overview: string
  release_date: string
  gender_ids: number[]
  original_title: string
  original_language: string
  title: string
  backdrop_path?: string
  popularity: number
  vote_count: number
  video: boolean
  vote_average: number
}

export interface MovieDetails {
  id: number
  imdb_id?: string
  adult: boolean
  backdrop_path?: string
  belongs_to_collection?: any
  budget: number
  genres: Genre[]
  original_language: string
  original_title: string
  overview?: string
  popularity: number
  poster_path?: string
  production_companies: ProductionCompany[]
  production_countries: Country[]
  release_date: string
  revenue: number
  runtime?: number
  spoken_languages: Language[]
  status: Status
  tagline?: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}
