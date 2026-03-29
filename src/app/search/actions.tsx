"use server";

import { fetchMovieGenres, searchMulti } from "@/lib/api/tmdb";
import { redirect } from "next/navigation";

export async function search(formData: FormData) {
  const query = formData.get("query") as string;
  if (query?.trim()) {
    redirect(`/search?query=${encodeURIComponent(query.trim())}`);
  }
}

export async function getSearchResults(query: string, page: number = 1) {
  const [results, genresData] = await Promise.all([
    searchMulti(query, page),
    fetchMovieGenres(),
  ]);

  return {
    results: results.results,
    totalPages: results.total_pages,
    totalResults: results.total_results,
    genres: genresData.genres,
  };
}
