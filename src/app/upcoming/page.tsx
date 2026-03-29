import { MediaCard } from "@/components/media/media-card";
import { fetchUpcomingMovies } from "@/lib/api/tmdb";

export default async function UpcomingPage() {
  const data = await fetchUpcomingMovies(1);

  const grouped = data.results.reduce(
    (acc, movie) => {
      if (!movie.release_date) return acc;
      const date = new Date(movie.release_date);
      const key = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });
      if (!acc[key]) acc[key] = [];
      acc[key].push(movie);
      return acc;
    },
    {} as Record<string, typeof data.results>,
  );

  return (
    <main className="flex flex-1 flex-col gap-8 px-4 py-8 sm:px-8">
      <h1 className="font-display text-3xl font-bold text-primary">
        Upcoming Movies
      </h1>

      {Object.entries(grouped).map(([month, movies]) => (
        <section key={month} className="space-y-4">
          <h2 className="text-xl font-semibold text-muted-foreground">
            {month}
          </h2>
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
      ))}
    </main>
  );
}
