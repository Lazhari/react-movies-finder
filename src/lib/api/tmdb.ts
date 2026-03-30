import { Actor, ActorMovieCredits } from "@/types/actors";
import { Genre } from "@/types/common";
import { Credits } from "@/types/credits";
import { Movie, MovieDetails, MovieVideos } from "@/types/movies";
import { ReviewsResponse } from "@/types/review";
import { SeasonDetails, TVShow, TVShowDetails } from "@/types/tv";
import {
  CollectionDetails,
  DiscoverParams,
  PersonImages,
  StreamingProvider,
  TMDBError,
  TMDBPaginatedResponse,
  WatchProvidersResponse,
} from "./types";

const BASE_URL = process.env.MOVIE_DB_URL ?? "https://api.themoviedb.org/3";
const API_KEY = process.env.MOVIE_DB_API_KEY ?? "";

class TMDBClientError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "TMDBClientError";
  }
}

export async function tmdbFetch<T>(
  path: string,
  params?: Record<string, string>,
): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("api_key", API_KEY);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, value);
      }
    }
  }

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    const error: TMDBError = await response.json().catch(() => ({
      status_code: response.status,
      status_message: response.statusText,
      success: false,
    }));
    throw new TMDBClientError(error.status_code, error.status_message);
  }

  return response.json() as Promise<T>;
}

// ── Trending ──

export async function fetchTrending(
  mediaType: "all" | "movie" | "tv" = "all",
  timeWindow: "day" | "week" = "day",
): Promise<TMDBPaginatedResponse<Movie | TVShow>> {
  return tmdbFetch(`/trending/${mediaType}/${timeWindow}`);
}

// ── Movies ──

export async function fetchPopularMovies(
  page: number = 1,
): Promise<TMDBPaginatedResponse<Movie>> {
  return tmdbFetch("/movie/popular", { page: String(page) });
}

export async function fetchUpcomingMovies(
  page: number = 1,
): Promise<TMDBPaginatedResponse<Movie>> {
  return tmdbFetch("/movie/upcoming", { page: String(page) });
}

export async function fetchMovieDetails(id: number): Promise<MovieDetails> {
  return tmdbFetch(`/movie/${id}`);
}

export async function fetchMovieCredits(id: number): Promise<Credits> {
  return tmdbFetch(`/movie/${id}/credits`);
}

export async function fetchMovieVideos(id: number): Promise<MovieVideos> {
  return tmdbFetch(`/movie/${id}/videos`);
}

export async function fetchMovieReviews(
  id: number,
  page: number = 1,
): Promise<ReviewsResponse> {
  return tmdbFetch(`/movie/${id}/reviews`, { page: String(page) });
}

export async function fetchMovieRecommendations(
  id: number,
): Promise<TMDBPaginatedResponse<Movie>> {
  return tmdbFetch(`/movie/${id}/recommendations`);
}

export async function fetchMovieWatchProviders(
  id: number,
): Promise<WatchProvidersResponse> {
  return tmdbFetch(`/movie/${id}/watch/providers`);
}

// ── TV Shows ──

export async function fetchPopularTVShows(
  page: number = 1,
): Promise<TMDBPaginatedResponse<TVShow>> {
  return tmdbFetch("/tv/popular", { page: String(page) });
}

export async function fetchTVShowDetails(id: number): Promise<TVShowDetails> {
  return tmdbFetch(`/tv/${id}`);
}

export async function fetchTVCredits(id: number): Promise<Credits> {
  return tmdbFetch(`/tv/${id}/credits`);
}

export async function fetchTVVideos(id: number): Promise<MovieVideos> {
  return tmdbFetch(`/tv/${id}/videos`);
}

export async function fetchTVReviews(
  id: number,
  page: number = 1,
): Promise<ReviewsResponse> {
  return tmdbFetch(`/tv/${id}/reviews`, { page: String(page) });
}

export async function fetchTVRecommendations(
  id: number,
): Promise<TMDBPaginatedResponse<TVShow>> {
  return tmdbFetch(`/tv/${id}/recommendations`);
}

export async function fetchTVWatchProviders(
  id: number,
): Promise<WatchProvidersResponse> {
  return tmdbFetch(`/tv/${id}/watch/providers`);
}

export async function fetchTVSeasonDetails(
  tvId: number,
  seasonNumber: number,
): Promise<SeasonDetails> {
  return tmdbFetch(`/tv/${tvId}/season/${seasonNumber}`);
}

// ── Genres ──

export async function fetchMovieGenres(): Promise<{ genres: Genre[] }> {
  return tmdbFetch("/genre/movie/list", { language: "en-US" });
}

export async function fetchTVGenres(): Promise<{ genres: Genre[] }> {
  return tmdbFetch("/genre/tv/list", { language: "en-US" });
}

// ── Search & Discover ──

export async function searchMulti(
  query: string,
  page: number = 1,
): Promise<TMDBPaginatedResponse<Movie | TVShow>> {
  return tmdbFetch("/search/multi", {
    query,
    page: String(page),
    include_adult: "false",
  });
}

export async function discoverMovies(
  params: DiscoverParams,
): Promise<TMDBPaginatedResponse<Movie>> {
  const queryParams: Record<string, string> = {};
  if (params.page) queryParams.page = String(params.page);
  if (params.sort_by) queryParams.sort_by = params.sort_by;
  if (params.with_genres) queryParams.with_genres = params.with_genres;
  if (params.primary_release_year)
    queryParams.primary_release_year = String(params.primary_release_year);
  if (params["primary_release_date.gte"])
    queryParams["primary_release_date.gte"] =
      params["primary_release_date.gte"];
  if (params["primary_release_date.lte"])
    queryParams["primary_release_date.lte"] =
      params["primary_release_date.lte"];
  if (params["vote_average.gte"])
    queryParams["vote_average.gte"] = String(params["vote_average.gte"]);
  if (params["vote_average.lte"])
    queryParams["vote_average.lte"] = String(params["vote_average.lte"]);
  if (params.with_original_language)
    queryParams.with_original_language = params.with_original_language;
  if (params.with_watch_providers)
    queryParams.with_watch_providers = params.with_watch_providers;
  if (params.watch_region)
    queryParams.watch_region = params.watch_region;

  return tmdbFetch("/discover/movie", queryParams);
}

export async function discoverTV(
  params: DiscoverParams,
): Promise<TMDBPaginatedResponse<TVShow>> {
  const queryParams: Record<string, string> = {};
  if (params.page) queryParams.page = String(params.page);
  if (params.sort_by) queryParams.sort_by = params.sort_by;
  if (params.with_genres) queryParams.with_genres = params.with_genres;
  if (params["vote_average.gte"])
    queryParams["vote_average.gte"] = String(params["vote_average.gte"]);

  return tmdbFetch("/discover/tv", queryParams);
}

// ── Collections ──

export async function fetchCollection(
  id: number,
): Promise<CollectionDetails> {
  return tmdbFetch(`/collection/${id}`);
}

// ── Watch Providers ──

export async function fetchAvailableProviders(
  region: string = "US",
): Promise<StreamingProvider[]> {
  const data = await tmdbFetch<{ results: StreamingProvider[] }>(
    "/watch/providers/movie",
    { watch_region: region },
  );
  return data.results;
}

// ── People ──

export async function fetchActorDetails(id: number): Promise<Actor> {
  return tmdbFetch(`/person/${id}`);
}

export async function fetchActorMovieCredits(
  id: number,
): Promise<ActorMovieCredits> {
  return tmdbFetch(`/person/${id}/movie_credits`);
}

export async function fetchActorImages(id: number): Promise<PersonImages> {
  return tmdbFetch(`/person/${id}/images`);
}
