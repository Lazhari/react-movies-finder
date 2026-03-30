"use client";

import { ProviderList } from "@/components/media/provider-list";
import { RatingBadge } from "@/components/media/rating-badge";
import { VideoPlayer } from "@/components/media/video-player";
import { Badge } from "@/components/ui/badge";
import { StreamingProvider, WatchProviderResult } from "@/lib/api/types";
import { getBackdropURL, getPosterURL, humanizeDuration } from "@/lib/movies";
import { cn } from "@/lib/utils";
import { Genre } from "@/types/common";
import { MovieDetails } from "@/types/movies";
import { Dice5, Loader2, Shuffle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState, useTransition } from "react";
import { getGenres, getProviders, getRandomMovie } from "./actions";

interface MovieResult {
  movie: MovieDetails;
  trailerKey: string | null;
  providers: WatchProviderResult | undefined;
}

export default function SurprisePage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [streamingProviders, setStreamingProviders] = useState<
    StreamingProvider[]
  >([]);
  const [selectedGenre, setSelectedGenre] = useState<number | undefined>();
  const [selectedProvider, setSelectedProvider] = useState<
    number | undefined
  >();
  const [result, setResult] = useState<MovieResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    Promise.all([getGenres(), getProviders()]).then(([g, p]) => {
      setGenres(g);
      setStreamingProviders(p);
    });
  }, []);

  const shuffle = useCallback(() => {
    startTransition(async () => {
      const data = await getRandomMovie(selectedGenre, selectedProvider);
      if (data) {
        setResult(data);
        setHasLoaded(true);
      }
    });
  }, [selectedGenre, selectedProvider]);

  // Auto-shuffle on first load and filter change
  useEffect(() => {
    shuffle();
  }, [shuffle]);

  return (
    <main className="flex flex-1 flex-col">
      {/* Header area */}
      <div className="space-y-4 px-4 pt-8 sm:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber/20">
              <Dice5 className="h-6 w-6 text-amber" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-primary">
                Surprise Me
              </h1>
              <p className="text-sm text-muted-foreground">
                Can&apos;t decide? Let us pick for you.
              </p>
            </div>
          </div>

          <button
            onClick={shuffle}
            disabled={isPending}
            className="flex items-center gap-2 rounded-xl bg-amber px-5 py-3 font-semibold text-amber-foreground transition-all hover:bg-amber/90 active:scale-95 disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Shuffle className="h-5 w-5" />
            )}
            Shuffle
          </button>
        </div>

        {/* Genre filter */}
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Genre
          </p>
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            style={{ scrollbarWidth: "none" }}
          >
            <button
              onClick={() => setSelectedGenre(undefined)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                selectedGenre === undefined
                  ? "bg-primary text-primary-foreground"
                  : "glass hover:bg-white/10",
              )}
            >
              Any
            </button>
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => setSelectedGenre(genre.id)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  selectedGenre === genre.id
                    ? "bg-primary text-primary-foreground"
                    : "glass hover:bg-white/10",
                )}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>

        {/* Streaming provider filter */}
        {streamingProviders.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Available on
            </p>
            <div
              className="flex gap-2 overflow-x-auto pb-2"
              style={{ scrollbarWidth: "none" }}
            >
              <button
                onClick={() => setSelectedProvider(undefined)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  selectedProvider === undefined
                    ? "bg-primary text-primary-foreground"
                    : "glass hover:bg-white/10",
                )}
              >
                Anywhere
              </button>
              {streamingProviders.map((provider) => (
                <button
                  key={provider.provider_id}
                  onClick={() => setSelectedProvider(provider.provider_id)}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                    selectedProvider === provider.provider_id
                      ? "bg-primary text-primary-foreground"
                      : "glass hover:bg-white/10",
                  )}
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                    alt={provider.provider_name}
                    width={24}
                    height={24}
                    className="rounded"
                  />
                  {provider.provider_name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Result */}
      {isPending && !hasLoaded && (
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
        </div>
      )}

      {result && (
        <div
          className={cn(
            "mt-6 transition-opacity duration-500",
            isPending ? "opacity-40" : "opacity-100",
          )}
        >
          {/* Cinematic card */}
          <section className="relative h-[60vh] w-full overflow-hidden sm:h-[70vh]">
            {result.movie.backdrop_path && (
              <>
                <Image
                  src={getBackdropURL(result.movie.backdrop_path, "original")}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent" />
              </>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12">
              <div className="flex flex-col gap-8 md:flex-row md:gap-12">
                {/* Poster */}
                {result.movie.poster_path && (
                  <div className="hidden shrink-0 md:block">
                    <Link href={`/movies/${result.movie.id}`}>
                      <div className="relative aspect-[2/3] w-52 overflow-hidden rounded-xl shadow-2xl transition-transform hover:scale-[1.02]">
                        <Image
                          src={getPosterURL(result.movie.poster_path, "large")}
                          alt={result.movie.title}
                          fill
                          className="object-cover"
                          sizes="208px"
                        />
                      </div>
                    </Link>
                  </div>
                )}

                {/* Info */}
                <div className="flex flex-1 flex-col justify-end space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <RatingBadge
                      rating={result.movie.vote_average}
                      size="lg"
                    />
                    <span className="text-sm text-white/50">
                      {result.movie.vote_count.toLocaleString()} votes
                    </span>
                  </div>

                  <Link href={`/movies/${result.movie.id}`}>
                    <h2 className="font-display text-3xl font-bold text-white transition-colors hover:text-primary sm:text-4xl lg:text-5xl">
                      {result.movie.title}
                    </h2>
                  </Link>

                  {result.movie.tagline && (
                    <p className="text-base italic text-white/50">
                      {result.movie.tagline}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-2 text-sm text-white/40">
                    {result.movie.release_date && (
                      <span>
                        {new Date(result.movie.release_date).getFullYear()}
                      </span>
                    )}
                    {result.movie.runtime > 0 && (
                      <>
                        <span>&#183;</span>
                        <span>{humanizeDuration(result.movie.runtime)}</span>
                      </>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {result.movie.genres.map((genre) => (
                      <Badge key={genre.id} variant="secondary">
                        {genre.name}
                      </Badge>
                    ))}
                  </div>

                  <p className="line-clamp-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                    {result.movie.overview}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link
                      href={`/movies/${result.movie.id}`}
                      className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      View Details
                    </Link>
                    <VideoPlayer
                      videoKey={result.trailerKey}
                      title={`${result.movie.title} - Trailer`}
                    />
                  </div>

                  <ProviderList providers={result.providers} />
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* No results state */}
      {!isPending && hasLoaded && !result && (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
          <p className="text-lg text-muted-foreground">
            No movies found with those filters. Try a different combination.
          </p>
          <button
            onClick={() => {
              setSelectedGenre(undefined);
              setSelectedProvider(undefined);
            }}
            className="rounded-lg bg-secondary px-4 py-2 text-sm hover:bg-secondary/80"
          >
            Clear Filters
          </button>
        </div>
      )}
    </main>
  );
}
