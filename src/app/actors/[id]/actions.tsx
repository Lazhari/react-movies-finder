"use server";

import {
  fetchActorDetails,
  fetchActorImages,
  fetchActorMovieCredits,
} from "@/lib/api/tmdb";

export async function getActorPageData(id: number) {
  const [actor, credits, images] = await Promise.all([
    fetchActorDetails(id),
    fetchActorMovieCredits(id),
    fetchActorImages(id),
  ]);

  const sortedCredits = credits.cast
    .filter((c) => c.release_date)
    .sort(
      (a, b) =>
        new Date(b.release_date).getTime() -
        new Date(a.release_date).getTime(),
    );

  return {
    actor,
    filmography: sortedCredits,
    images: images.profiles,
  };
}
