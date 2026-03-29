"use server";

import {
  fetchActorDetails,
  fetchActorMovieCredits,
} from "@/lib/api/tmdb";

export async function getActorPageData(id: number) {
  const [actor, credits] = await Promise.all([
    fetchActorDetails(id),
    fetchActorMovieCredits(id),
  ]);

  const sortedCredits = credits.cast
    .filter((c) => c.release_date)
    .sort(
      (a, b) =>
        new Date(b.release_date).getTime() -
        new Date(a.release_date).getTime(),
    );

  // Best rated movie with a backdrop for the hero background
  const heroBackdrop =
    [...credits.cast]
      .filter((c) => c.backdrop_path && c.vote_average > 0)
      .sort((a, b) => b.vote_average - a.vote_average)[0]?.backdrop_path ??
    null;

  return {
    actor,
    filmography: sortedCredits,
    heroBackdrop,
  };
}
