export interface Label {
  id: string
  name: string
}

export interface Country {
  iso_3166_1: string
  name: string
}

export interface Language {
  iso_639_1: string
  name: string
  english_name?: string
}

export interface Genre {
  id: number
  name: string
}

export interface Network {
  id: number
  name: string
  logo_path?: string
  origin_country: string
}

export interface ProductionCompany {
  id: number
  name: string
  logo_path?: string
  origin_country: string
}

export interface Keyword {
  id: number
  name: string
}
