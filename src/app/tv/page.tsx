import { MediaCard } from "@/components/media/media-card";
import { fetchPopularTVShows } from "@/lib/api/tmdb";

export default async function TVPage() {
  const data = await fetchPopularTVShows(1);

  return (
    <main className="flex flex-1 flex-col gap-8 px-4 py-8 sm:px-8">
      <h1 className="font-display text-3xl font-bold text-primary">
        Popular TV Shows
      </h1>
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data.results.map((show, i) => (
          <MediaCard
            key={show.id}
            id={show.id}
            title={show.name}
            posterPath={show.poster_path}
            rating={show.vote_average}
            year={show.first_air_date}
            mediaType="tv"
            index={i}
          />
        ))}
      </section>
    </main>
  );
}
