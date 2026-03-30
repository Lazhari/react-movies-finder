export interface TMDBPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface TMDBError {
  status_code: number;
  status_message: string;
  success: boolean;
}

export interface WatchProvider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface WatchProviderResult {
  link: string;
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
}

export interface WatchProvidersResponse {
  id: number;
  results: Record<string, WatchProviderResult>;
}

export interface CollectionDetails {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  parts: import("@/types/movies").Movie[];
}

export interface DiscoverParams {
  page?: number;
  sort_by?: string;
  with_genres?: string;
  primary_release_year?: number;
  "primary_release_date.gte"?: string;
  "primary_release_date.lte"?: string;
  "vote_average.gte"?: number;
  "vote_average.lte"?: number;
  with_original_language?: string;
  with_watch_providers?: string;
  watch_region?: string;
}

export interface StreamingProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
  display_priority: number;
}

export interface PersonImages {
  id: number;
  profiles: {
    aspect_ratio: number;
    file_path: string;
    height: number;
    width: number;
    vote_average: number;
    vote_count: number;
  }[];
}
