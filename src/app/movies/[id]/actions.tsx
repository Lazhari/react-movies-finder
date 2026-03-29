"use server";

import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchMovieRecommendations,
  fetchMovieReviews,
  fetchMovieVideos,
  fetchMovieWatchProviders,
} from "@/lib/api/tmdb";

export async function getMoviePageData(id: number) {
  const [movie, credits, videos, reviews, recommendations, watchProviders] =
    await Promise.all([
      fetchMovieDetails(id),
      fetchMovieCredits(id),
      fetchMovieVideos(id),
      fetchMovieReviews(id),
      fetchMovieRecommendations(id),
      fetchMovieWatchProviders(id),
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
    movie,
    credits,
    trailerKey: trailer?.key ?? null,
    reviews: reviews.results.slice(0, 10),
    recommendations: recommendations.results.slice(0, 20),
    watchProviders: watchProviders.results?.US ?? undefined,
  };
}
