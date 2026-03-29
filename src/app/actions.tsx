"use server";

import {
  fetchMovieGenres,
  fetchPopularMovies,
  fetchPopularTVShows,
  fetchTrending,
  fetchUpcomingMovies,
} from "@/lib/api/tmdb";

export async function getHomePageData() {
  const [trendingDay, trendingWeek, popular, popularTV, upcoming, genresData] =
    await Promise.all([
      fetchTrending("all", "day"),
      fetchTrending("all", "week"),
      fetchPopularMovies(1),
      fetchPopularTVShows(1),
      fetchUpcomingMovies(1),
      fetchMovieGenres(),
    ]);

  return {
    trendingDay: trendingDay.results,
    trendingWeek: trendingWeek.results,
    popularMovies: popular.results,
    popularTV: popularTV.results,
    upcoming: upcoming.results,
    genres: genresData.genres,
  };
}
