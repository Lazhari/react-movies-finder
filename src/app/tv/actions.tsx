"use server";

import {
  fetchTVCredits,
  fetchTVRecommendations,
  fetchTVReviews,
  fetchTVShowDetails,
  fetchTVVideos,
  fetchTVWatchProviders,
} from "@/lib/api/tmdb";

export async function getTVShowPageData(id: number) {
  const [show, credits, videos, reviews, recommendations, watchProviders] =
    await Promise.all([
      fetchTVShowDetails(id),
      fetchTVCredits(id),
      fetchTVVideos(id),
      fetchTVReviews(id),
      fetchTVRecommendations(id),
      fetchTVWatchProviders(id),
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
    show,
    credits,
    trailerKey: trailer?.key ?? null,
    reviews: reviews.results.slice(0, 10),
    recommendations: recommendations.results.slice(0, 20),
    watchProviders: watchProviders.results?.US ?? undefined,
  };
}
