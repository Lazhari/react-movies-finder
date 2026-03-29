import { discoverMovies, fetchMovieGenres } from "@/lib/api/tmdb";
import { getBackdropURL } from "@/lib/movies";
import { cn } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function daysUntil(dateString: string): number {
  const release = new Date(dateString);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  release.setHours(0, 0, 0, 0);
  return Math.ceil(
    (release.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );
}

function formatReleaseLabel(dateString: string): string {
  const days = daysUntil(dateString);
  if (days <= 0) return "Out now";
  if (days === 1) return "Tomorrow";
  if (days <= 7) return `${days} days`;
  if (days <= 30) return `${Math.ceil(days / 7)} weeks`;
  return `${Math.ceil(days / 30)} months`;
}

function formatFullDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function toISODate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export default async function UpcomingPage() {
  const today = new Date();
  const threeMonthsLater = new Date(today);
  threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

  const [page1, page2, genresData] = await Promise.all([
    discoverMovies({
      "primary_release_date.gte": toISODate(today),
      "primary_release_date.lte": toISODate(threeMonthsLater),
      sort_by: "popularity.desc",
      page: 1,
    }),
    discoverMovies({
      "primary_release_date.gte": toISODate(today),
      "primary_release_date.lte": toISODate(threeMonthsLater),
      sort_by: "popularity.desc",
      page: 2,
    }),
    fetchMovieGenres(),
  ]);

  const genreMap = new Map(genresData.genres.map((g) => [g.id, g.name]));

  const allMovies = [...page1.results, ...page2.results];

  const sorted = allMovies
    .filter((m) => m.release_date)
    .sort(
      (a, b) =>
        new Date(a.release_date).getTime() -
        new Date(b.release_date).getTime(),
    );

  // Most popular future movie with a backdrop becomes the spotlight
  const spotlight = allMovies.find((m) => m.backdrop_path);
  const rest = sorted.filter((m) => m.id !== spotlight?.id);

  // Group remaining by month
  const grouped = rest.reduce(
    (acc, movie) => {
      const date = new Date(movie.release_date);
      const key = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });
      if (!acc[key]) acc[key] = [];
      acc[key].push(movie);
      return acc;
    },
    {} as Record<string, typeof rest>,
  );

  return (
    <main className="flex flex-1 flex-col gap-10">
      {/* Spotlight */}
      {spotlight && (
        <Link
          href={`/movies/${spotlight.id}`}
          className="group relative h-[50vh] w-full overflow-hidden sm:h-[60vh]"
        >
          <Image
            src={getBackdropURL(spotlight.backdrop_path, "original")}
            alt={spotlight.title}
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 space-y-3 p-6 sm:p-12">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber px-3 py-1 text-xs font-bold text-amber-foreground">
                <Clock className="h-3 w-3" />
                {formatReleaseLabel(spotlight.release_date)}
              </span>
              <span className="text-sm text-white/60">
                {formatFullDate(spotlight.release_date)}
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold text-white drop-shadow-lg sm:text-4xl lg:text-5xl">
              {spotlight.title}
            </h2>
            {spotlight.overview && (
              <p className="line-clamp-2 max-w-2xl text-sm text-white/70 sm:text-base">
                {spotlight.overview}
              </p>
            )}
            {spotlight.genre_ids.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {spotlight.genre_ids.slice(0, 4).map((gid) => (
                  <span
                    key={gid}
                    className="rounded-full bg-white/10 px-3 py-0.5 text-xs text-white/80 backdrop-blur-sm"
                  >
                    {genreMap.get(gid) ?? ""}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Link>
      )}

      {/* Timeline */}
      <div className="space-y-10 px-4 pb-12 sm:px-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary">
            Coming Soon
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {sorted.length} movies on the horizon
          </p>
        </div>

        {Object.entries(grouped).map(([month, movies]) => (
          <section key={month} className="relative space-y-5">
            {/* Month header */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-primary">{month}</h2>
                <p className="text-xs text-muted-foreground">
                  {movies.length} release{movies.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            {/* Movie list */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {movies.map((movie) => {
                const days = daysUntil(movie.release_date);
                return (
                  <Link
                    key={movie.id}
                    href={`/movies/${movie.id}`}
                    className="group flex gap-4 rounded-xl p-3 transition-colors hover:bg-secondary/50"
                  >
                    {/* Poster */}
                    <div className="relative aspect-[2/3] w-20 shrink-0 overflow-hidden rounded-lg sm:w-24">
                      {movie.poster_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                          alt={movie.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="96px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted text-xs text-muted-foreground">
                          No Poster
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
                      <h3 className="truncate text-sm font-semibold leading-tight transition-colors group-hover:text-primary">
                        {movie.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {formatFullDate(movie.release_date)}
                      </p>
                      {movie.genre_ids.length > 0 && (
                        <p className="truncate text-xs text-muted-foreground/70">
                          {movie.genre_ids
                            .slice(0, 3)
                            .map((gid) => genreMap.get(gid))
                            .filter(Boolean)
                            .join(" \u00B7 ")}
                        </p>
                      )}
                      <span
                        className={cn(
                          "mt-0.5 inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                          days <= 7
                            ? "bg-amber/20 text-amber"
                            : days <= 30
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-secondary text-muted-foreground",
                        )}
                      >
                        <Clock className="h-2.5 w-2.5" />
                        {formatReleaseLabel(movie.release_date)}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
