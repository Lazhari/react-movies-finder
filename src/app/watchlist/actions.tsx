"use server";

import { fetchMovieDetails, fetchTVShowDetails } from "@/lib/api/tmdb";

export async function fetchWatchlistDetails(
  entries: { id: number; type: "movie" | "tv" }[],
) {
  const results = await Promise.all(
    entries.map(async (entry) => {
      try {
        if (entry.type === "movie") {
          const movie = await fetchMovieDetails(entry.id);
          return {
            id: movie.id,
            type: "movie" as const,
            title: movie.title,
            posterPath: movie.poster_path,
            rating: movie.vote_average,
            year: movie.release_date,
            overview: movie.overview,
          };
        } else {
          const show = await fetchTVShowDetails(entry.id);
          return {
            id: show.id,
            type: "tv" as const,
            title: show.name,
            posterPath: show.poster_path,
            rating: show.vote_average,
            year: show.first_air_date,
            overview: show.overview,
          };
        }
      } catch {
        return null;
      }
    }),
  );

  return results.filter(Boolean);
}
