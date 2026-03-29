import { MediaCard } from "@/components/media/media-card";
import { Movie } from "@/types/movies";
import { TVShow } from "@/types/tv";
import { Search } from "lucide-react";
import { getSearchResults } from "./actions";

interface Props {
  searchParams: Promise<{ query?: string; page?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { query, page } = await searchParams;

  if (!query) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
        <Search className="h-16 w-16 text-muted-foreground" />
        <h1 className="text-2xl font-bold text-primary">Search</h1>
        <p className="text-muted-foreground">
          Use the search bar to find movies, TV shows, and people.
        </p>
      </main>
    );
  }

  const data = await getSearchResults(query, Number(page) || 1);

  const movies = data.results.filter(
    (item): item is Movie =>
      (item as Movie & { media_type?: string }).media_type === "movie",
  );
  const tvShows = data.results.filter(
    (item): item is TVShow =>
      (item as TVShow & { media_type?: string }).media_type === "tv",
  );

  return (
    <main className="flex flex-1 flex-col gap-8 px-4 py-8 sm:px-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-primary">
          Search Results
        </h1>
        <p className="text-muted-foreground">
          {data.totalResults.toLocaleString()} results for &quot;{query}&quot;
        </p>
      </div>

      {movies.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Movies</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {movies.map((movie, i) => (
              <MediaCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                rating={movie.vote_average}
                year={movie.release_date}
                mediaType="movie"
                index={i}
              />
            ))}
          </div>
        </section>
      )}

      {tvShows.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold">TV Shows</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {tvShows.map((show, i) => (
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
          </div>
        </section>
      )}

      {data.totalResults === 0 && (
        <div className="flex flex-col items-center gap-4 py-16">
          <Search className="h-12 w-12 text-muted-foreground" />
          <p className="text-lg text-muted-foreground">
            No results found for &quot;{query}&quot;
          </p>
        </div>
      )}
    </main>
  );
}
