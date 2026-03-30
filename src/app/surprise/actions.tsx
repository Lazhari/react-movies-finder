"use server";

import {
  discoverMovies,
  fetchAvailableProviders,
  fetchMovieDetails,
  fetchMovieGenres,
  fetchMovieVideos,
  fetchMovieWatchProviders,
} from "@/lib/api/tmdb";
import { DiscoverParams } from "@/lib/api/types";

export async function getGenres() {
  const { genres } = await fetchMovieGenres();
  return genres;
}

export async function getProviders() {
  const all = await fetchAvailableProviders("US");
  // Return top providers by priority (lower = more popular)
  return all
    .sort((a, b) => a.display_priority - b.display_priority)
    .slice(0, 15);
}

export async function getRandomMovie(genreId?: number, providerId?: number) {
  const params: DiscoverParams = {
    sort_by: "popularity.desc",
    "vote_average.gte": 6,
    page: 1,
  };
  if (genreId) params.with_genres = String(genreId);
  if (providerId) {
    params.with_watch_providers = String(providerId);
    params.watch_region = "US";
  }

  // First call to get total pages
  const initial = await discoverMovies(params);
  if (initial.total_results === 0) return null;

  const maxPage = Math.min(initial.total_pages, 20);
  const randomPage = Math.floor(Math.random() * maxPage) + 1;

  // Fetch the random page
  const data = await discoverMovies({ ...params, page: randomPage });
  const randomIndex = Math.floor(Math.random() * data.results.length);
  const movie = data.results[randomIndex];

  if (!movie) return null;

  // Fetch rich details
  const [details, videos, watchProviders] = await Promise.all([
    fetchMovieDetails(movie.id),
    fetchMovieVideos(movie.id),
    fetchMovieWatchProviders(movie.id),
  ]);

  const trailer =
    videos.results.find(
      (v) => v.site === "YouTube" && v.type === "Trailer" && v.official,
    ) ??
    videos.results.find(
      (v) => v.site === "YouTube" && v.type === "Trailer",
    ) ??
    videos.results.find((v) => v.site === "YouTube");

  return {
    movie: details,
    trailerKey: trailer?.key ?? null,
    providers: watchProviders.results?.US ?? undefined,
  };
}
