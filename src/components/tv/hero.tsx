import { ProviderList } from "@/components/media/provider-list";
import { RatingBadge } from "@/components/media/rating-badge";
import { VideoPlayer } from "@/components/media/video-player";
import { Badge } from "@/components/ui/badge";
import { WatchProviderResult } from "@/lib/api/types";
import { formatDate, getBackdropURL, getLogoURL, getPosterURL } from "@/lib/movies";
import { cn } from "@/lib/utils";
import { TVShowDetails } from "@/types/tv";
import { Calendar, Clapperboard } from "lucide-react";
import Image from "next/image";

interface TVHeroProps {
  show: TVShowDetails;
  trailerKey: string | null;
  watchProviders?: WatchProviderResult;
}

function statusColor(status: string): string {
  switch (status) {
    case "Returning Series":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "Ended":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "Canceled":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "In Production":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    default:
      return "bg-secondary text-muted-foreground";
  }
}

export default function TVHero({
  show,
  trailerKey,
  watchProviders,
}: TVHeroProps) {
  return (
    <section className="relative">
      {show.backdrop_path && (
        <div className="absolute inset-0 h-[85vh]">
          <Image
            src={getBackdropURL(show.backdrop_path, "original")}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent" />
        </div>
      )}

      <div className="relative mx-auto max-w-screen-xl px-4 pb-12 pt-12 sm:px-8 sm:pt-20">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          {/* Poster */}
          {show.poster_path && (
            <div className="hidden shrink-0 md:block">
              <div className="relative aspect-[2/3] w-72 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
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

          {/* Info */}
          <div className="flex flex-1 flex-col justify-end space-y-5">
            {/* Status + Rating row */}
            <div className="flex flex-wrap items-center gap-3">
              <RatingBadge rating={show.vote_average} size="lg" />
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold",
                  statusColor(show.status),
                )}
              >
                <span className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  show.status === "Returning Series" ? "bg-green-400 animate-pulse" : "bg-current",
                )} />
                {show.status}
              </span>
              <span className="text-sm text-muted-foreground">
                {show.vote_count.toLocaleString()} votes
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
              {show.name}
            </h1>

            {show.tagline && (
              <p className="text-lg italic text-muted-foreground">
                {show.tagline}
              </p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <span>{show.first_air_date?.slice(0, 4)}{show.last_air_date && show.status === "Ended" ? `\u2013${show.last_air_date.slice(0, 4)}` : ""}</span>
              <span>&#183;</span>
              <span>
                {show.number_of_seasons} Season{show.number_of_seasons !== 1 ? "s" : ""}
              </span>
              <span>&#183;</span>
              <span>{show.number_of_episodes} Episodes</span>
              {show.episode_run_time.length > 0 && (
                <>
                  <span>&#183;</span>
                  <span>{show.episode_run_time[0]}m per episode</span>
                </>
              )}
            </div>

            {/* Networks */}
            {show.networks?.length > 0 && (
              <div className="flex items-center gap-4">
                {show.networks.map((network) =>
                  network.logo_path ? (
                    <div key={network.id} className="relative h-7 w-20">
                      <Image
                        src={getLogoURL(network.logo_path, "medium")}
                        alt={network.name}
                        fill
                        className="object-contain brightness-0 invert"
                        sizes="80px"
                      />
                    </div>
                  ) : (
                    <span
                      key={network.id}
                      className="text-sm font-medium text-muted-foreground"
                    >
                      {network.name}
                    </span>
                  ),
                )}
              </div>
            )}

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {show.genres.map((genre) => (
                <Badge key={genre.id} variant="secondary">
                  {genre.name}
                </Badge>
              ))}
            </div>

            {/* Overview */}
            <p className="max-w-2xl text-base leading-relaxed text-foreground/90">
              {show.overview}
            </p>

            {/* Creators */}
            {show.created_by?.length > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <Clapperboard className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Created by</span>
                <span className="font-medium">
                  {show.created_by.map((c) => c.name).join(", ")}
                </span>
              </div>
            )}

            {/* Next episode */}
            {show.next_episode_to_air && (
              <div className="glass inline-flex max-w-md items-start gap-3 rounded-xl p-4">
                <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-amber">Next Episode</p>
                  <p className="text-sm font-medium">
                    S{show.next_episode_to_air.season_number}E{show.next_episode_to_air.episode_number}: {show.next_episode_to_air.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(show.next_episode_to_air.air_date)}
                  </p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-1">
              <VideoPlayer
                videoKey={trailerKey}
                title={`${show.name} - Trailer`}
              />
            </div>

            {/* Watch Providers */}
            <ProviderList providers={watchProviders} />
          </div>
        </div>
      </div>
    </section>
  );
}
