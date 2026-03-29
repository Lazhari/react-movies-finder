import { ProviderList } from "@/components/media/provider-list";
import { RatingBadge } from "@/components/media/rating-badge";
import { VideoPlayer } from "@/components/media/video-player";
import { Badge } from "@/components/ui/badge";
import { WatchProviderResult } from "@/lib/api/types";
import { getBackdropURL, getLogoURL, getPosterURL } from "@/lib/movies";
import { TVShowDetails } from "@/types/tv";
import Image from "next/image";

interface TVHeroProps {
  show: TVShowDetails;
  trailerKey: string | null;
  watchProviders?: WatchProviderResult;
}

export default function TVHero({
  show,
  trailerKey,
  watchProviders,
}: TVHeroProps) {
  return (
    <section className="relative">
      {show.backdrop_path && (
        <div className="absolute inset-0 h-[80vh]">
          <Image
            src={getBackdropURL(show.backdrop_path, "original")}
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
          {show.poster_path && (
            <div className="hidden shrink-0 md:block">
              <div className="relative aspect-[2/3] w-72 overflow-hidden rounded-xl shadow-2xl">
                <Image
                  src={getPosterURL(show.poster_path, "large")}
                  alt={show.name}
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
              <RatingBadge rating={show.vote_average} size="lg" />
              <span className="text-muted-foreground">
                {show.vote_count.toLocaleString()} votes
              </span>
            </div>

            <h1 className="font-display text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
              {show.name}
            </h1>

            {show.tagline && (
              <p className="text-lg italic text-muted-foreground">
                {show.tagline}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>{show.first_air_date?.slice(0, 4)}</span>
              <span>&#183;</span>
              <span>
                {show.number_of_seasons} Season
                {show.number_of_seasons !== 1 ? "s" : ""}
              </span>
              <span>&#183;</span>
              <span>{show.number_of_episodes} Episodes</span>
              <span>&#183;</span>
              <span>{show.status}</span>
            </div>

            {show.networks?.length > 0 && (
              <div className="flex items-center gap-3">
                {show.networks.map((network) =>
                  network.logo_path ? (
                    <div key={network.id} className="relative h-6 w-16">
                      <Image
                        src={getLogoURL(network.logo_path, "medium")}
                        alt={network.name}
                        fill
                        className="object-contain brightness-0 invert"
                        sizes="64px"
                      />
                    </div>
                  ) : (
                    <span
                      key={network.id}
                      className="text-sm text-muted-foreground"
                    >
                      {network.name}
                    </span>
                  ),
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {show.genres.map((genre) => (
                <Badge key={genre.id} variant="secondary">
                  {genre.name}
                </Badge>
              ))}
            </div>

            <p className="max-w-2xl text-base leading-relaxed text-foreground/90">
              {show.overview}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <VideoPlayer
                videoKey={trailerKey}
                title={`${show.name} - Trailer`}
              />
            </div>

            <ProviderList providers={watchProviders} />
          </div>
        </div>
      </div>
    </section>
  );
}
