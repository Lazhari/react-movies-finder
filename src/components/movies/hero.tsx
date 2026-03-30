import { ProviderList } from "@/components/media/provider-list";
import { RatingBadge } from "@/components/media/rating-badge";
import { VideoPlayer } from "@/components/media/video-player";
import { WatchlistButton } from "@/components/media/watchlist-button";
import { Badge } from "@/components/ui/badge";
import { WatchProviderResult } from "@/lib/api/types";
import {
  formatYear,
  getBackdropURL,
  getPosterURL,
  humanizeDuration,
} from "@/lib/movies";
import { MovieDetails } from "@/types/movies";
import Image from "next/image";

interface MovieHeroProps {
  movie: MovieDetails;
  trailerKey: string | null;
  watchProviders?: WatchProviderResult;
}

export default function MovieHero({
  movie,
  trailerKey,
  watchProviders,
}: MovieHeroProps) {
  return (
    <section className="relative">
      {movie.backdrop_path && (
        <div className="absolute inset-0 h-[80vh]">
          <Image
            src={getBackdropURL(movie.backdrop_path, "original")}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
        </div>
      )}

      <div className="relative mx-auto max-w-screen-xl px-4 pb-12 pt-8 sm:px-8 sm:pt-16">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          {movie.poster_path && (
            <div className="hidden shrink-0 md:block">
              <div className="relative aspect-[2/3] w-72 overflow-hidden rounded-xl shadow-2xl">
                <Image
                  src={getPosterURL(movie.poster_path, "large")}
                  alt={movie.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="288px"
                />
              </div>
            </div>
          )}

          <div className="flex flex-1 flex-col justify-end space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <RatingBadge rating={movie.vote_average} size="lg" />
              <span className="text-muted-foreground">
                {movie.vote_count.toLocaleString()} votes
              </span>
            </div>

            <h1 className="font-display text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="text-lg italic text-muted-foreground">
                {movie.tagline}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>{formatYear(movie.release_date)}</span>
              {movie.runtime > 0 && (
                <>
                  <span>&#183;</span>
                  <span>{humanizeDuration(movie.runtime)}</span>
                </>
              )}
              {movie.status && (
                <>
                  <span>&#183;</span>
                  <span>{movie.status}</span>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <Badge key={genre.id} variant="secondary">
                  {genre.name}
                </Badge>
              ))}
            </div>

            <p className="max-w-2xl text-base leading-relaxed text-foreground/90">
              {movie.overview}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <VideoPlayer
                videoKey={trailerKey}
                title={`${movie.title} - Trailer`}
              />
              <WatchlistButton
                id={movie.id}
                type="movie"
                title={movie.title}
                posterPath={movie.poster_path}
                rating={movie.vote_average}
                year={movie.release_date}
              />
            </div>

            {(movie.budget > 0 || movie.revenue > 0) && (
              <div className="flex flex-wrap gap-6 pt-4">
                {movie.budget > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground">Budget</p>
                    <p className="font-semibold">
                      ${(movie.budget / 1_000_000).toFixed(0)}M
                    </p>
                  </div>
                )}
                {movie.revenue > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground">Revenue</p>
                    <p className="font-semibold">
                      ${(movie.revenue / 1_000_000).toFixed(0)}M
                    </p>
                  </div>
                )}
              </div>
            )}

            <ProviderList providers={watchProviders} />
          </div>
        </div>
      </div>
    </section>
  );
}
