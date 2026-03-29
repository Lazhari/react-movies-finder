import ActorHero from "@/components/actors/hero";
import { RatingBadge } from "@/components/media/rating-badge";
import { formatYear, getPosterURL } from "@/lib/movies";
import { cn } from "@/lib/utils";
import { Clapperboard } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getActorPageData } from "./actions";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const { actor } = await getActorPageData(Number(id));
    return {
      title: `${actor.name} | Movies Finder`,
      description:
        actor.biography?.slice(0, 160) ||
        `${actor.name} filmography`,
    };
  } catch {
    return { title: "Actor Not Found" };
  }
}

export default async function ActorPage({ params }: Props) {
  const { id } = await params;
  const actorId = Number(id);

  if (isNaN(actorId)) notFound();

  let data;
  try {
    data = await getActorPageData(actorId);
  } catch {
    notFound();
  }

  const { actor, filmography, heroBackdrop } = data;

  const avgRating =
    filmography.length > 0
      ? filmography.reduce((sum, m) => sum + m.vote_average, 0) /
        filmography.length
      : 0;

  // Group filmography by decade
  const byDecade = filmography.reduce(
    (acc, movie) => {
      const year = new Date(movie.release_date).getFullYear();
      const decade = `${Math.floor(year / 10) * 10}s`;
      if (!acc[decade]) acc[decade] = [];
      acc[decade].push(movie);
      return acc;
    },
    {} as Record<string, typeof filmography>,
  );

  // Top 5 highest rated for a "best of" highlight
  const bestOf = [...filmography]
    .filter((m) => m.vote_count > 50)
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 5);

  return (
    <main className="flex flex-1 flex-col gap-10 pb-12">
      <ActorHero
        actor={actor}
        heroBackdrop={heroBackdrop}
        movieCount={filmography.length}
        avgRating={avgRating}
      />

      {/* Best performances */}
      {bestOf.length > 0 && (
        <section className="space-y-5 px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber/20">
              <Clapperboard className="h-5 w-5 text-amber" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary sm:text-2xl">
                Best Performances
              </h2>
              <p className="text-xs text-muted-foreground">
                Highest rated appearances
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-5">
            {bestOf.map((movie) => (
              <Link
                key={`best-${movie.id}-${movie.credit_id}`}
                href={`/movies/${movie.id}`}
                className="group relative aspect-[2/3] overflow-hidden rounded-xl"
              >
                {movie.poster_path ? (
                  <Image
                    src={getPosterURL(movie.poster_path, "large")}
                    alt={movie.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="20vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted text-sm text-muted-foreground">
                    No Poster
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 space-y-1 p-3">
                  <div className="flex items-center gap-2">
                    <RatingBadge rating={movie.vote_average} size="sm" />
                  </div>
                  <p className="text-sm font-semibold text-white">
                    {movie.title}
                  </p>
                  <p className="text-xs text-white/50">
                    as {movie.character || "Unknown"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Filmography by decade */}
      <section className="space-y-8 px-4 sm:px-8">
        <h2 className="text-xl font-bold text-primary sm:text-2xl">
          Filmography
        </h2>

        {Object.entries(byDecade).map(([decade, movies]) => (
          <div key={decade} className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-display text-2xl font-bold text-muted-foreground/30">
                {decade}
              </span>
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">
                {movies.length} film{movies.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="space-y-1">
              {movies.map((movie) => (
                <Link
                  key={`${movie.id}-${movie.credit_id}`}
                  href={`/movies/${movie.id}`}
                  className="group flex items-center gap-4 rounded-lg px-3 py-2.5 transition-colors hover:bg-secondary/50"
                >
                  {/* Mini poster */}
                  <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded">
                    {movie.poster_path ? (
                      <Image
                        src={getPosterURL(movie.poster_path, "small")}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    ) : (
                      <div className="h-full w-full bg-muted" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium transition-colors group-hover:text-primary">
                      {movie.title}
                    </p>
                    {movie.character && (
                      <p className="truncate text-xs text-muted-foreground">
                        as {movie.character}
                      </p>
                    )}
                  </div>

                  {/* Year */}
                  <span className="shrink-0 text-xs text-muted-foreground/50">
                    {formatYear(movie.release_date)}
                  </span>

                  {/* Rating */}
                  {movie.vote_average > 0 && (
                    <span
                      className={cn(
                        "shrink-0 text-xs font-semibold",
                        movie.vote_average >= 7
                          ? "text-green-400"
                          : movie.vote_average >= 5
                            ? "text-yellow-400"
                            : "text-red-400",
                      )}
                    >
                      {movie.vote_average.toFixed(1)}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
