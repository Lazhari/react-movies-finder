import { discoverMovies, fetchMovieGenres } from "@/lib/api/tmdb";
import { getBackdropURL } from "@/lib/movies";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function GenresPage() {
  const { genres } = await fetchMovieGenres();

  const genreMovies = await Promise.all(
    genres.map((genre) =>
      discoverMovies({
        with_genres: String(genre.id),
        sort_by: "popularity.desc",
        page: 1,
      }).then((res) => ({
        genreId: genre.id,
        backdrop: res.results[0]?.backdrop_path ?? null,
        movieTitle: res.results[0]?.title ?? null,
        movieCount: res.total_results,
      })),
    ),
  );

  const backdropMap = new Map(
    genreMovies.map((g) => [
      g.genreId,
      { backdrop: g.backdrop, movieTitle: g.movieTitle, count: g.movieCount },
    ]),
  );

  return (
    <main className="flex flex-1 flex-col gap-10 px-4 py-8 sm:px-8">
      <div>
        <h1 className="font-display text-4xl font-bold text-primary">
          Genres
        </h1>
        <p className="mt-2 text-muted-foreground">
          Explore movies by the genres you love
        </p>
      </div>

      <div className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:grid-cols-3 lg:auto-rows-[220px] lg:grid-cols-4">
        {genres.map((genre, i) => {
          const data = backdropMap.get(genre.id);
          const isFeatured = i < 2;

          return (
            <Link
              key={genre.id}
              href={`/genres/${genre.id}?name=${encodeURIComponent(genre.name)}`}
              className={cn(
                "group relative overflow-hidden rounded-2xl",
                isFeatured && "sm:col-span-2 sm:row-span-2",
              )}
            >
              {data?.backdrop ? (
                <Image
                  src={getBackdropURL(
                    data.backdrop,
                    isFeatured ? "large" : "medium",
                  )}
                  alt={genre.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes={
                    isFeatured
                      ? "(max-width: 640px) 100vw, 50vw"
                      : "(max-width: 640px) 50vw, 25vw"
                  }
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-secondary to-background" />
              )}

              {/* Overlay layers */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
                <h2
                  className={cn(
                    "font-display font-bold text-white drop-shadow-lg",
                    isFeatured
                      ? "text-2xl sm:text-3xl lg:text-4xl"
                      : "text-base sm:text-lg",
                  )}
                >
                  {genre.name}
                </h2>
                {data?.count && (
                  <p
                    className={cn(
                      "mt-1 text-white/60",
                      isFeatured ? "text-sm" : "text-xs",
                    )}
                  >
                    {data.count.toLocaleString()} titles
                  </p>
                )}
                <div className="mt-2 flex items-center gap-1 text-sm font-medium text-white/80 opacity-0 transition-all duration-300 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100">
                  Explore
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>

              {/* Border glow on hover */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/0 transition-all duration-500 group-hover:ring-white/20" />
            </Link>
          );
        })}
      </div>
    </main>
  );
}
