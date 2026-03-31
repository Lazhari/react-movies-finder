import { ProviderList } from "@/components/media/provider-list";
import { RatingBadge } from "@/components/media/rating-badge";
import { VideoPlayer } from "@/components/media/video-player";
import { IMAGE_SIZES } from "@/lib/constants";
import {
  fetchTVSeasonDetails,
  fetchTVShowDetails,
  fetchTVVideos,
  fetchTVWatchProviders,
} from "@/lib/api/tmdb";
import {
  formatDate,
  formatYear,
  humanizeDuration,
} from "@/lib/movies";
import { cn } from "@/lib/utils";
import { Calendar, Clock, Play } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string; seasonNumber: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, seasonNumber } = await params;
  try {
    const [show, season] = await Promise.all([
      fetchTVShowDetails(Number(id)),
      fetchTVSeasonDetails(Number(id), Number(seasonNumber)),
    ]);
    return {
      title: `${show.name} - ${season.name} | Screenbox`,
      description: season.overview || `${show.name} ${season.name} episodes`,
    };
  } catch {
    return { title: "Season Not Found" };
  }
}

export default async function SeasonPage({ params }: Props) {
  const { id, seasonNumber } = await params;
  const showId = Number(id);
  const seasonNum = Number(seasonNumber);

  if (isNaN(showId) || isNaN(seasonNum)) notFound();

  let show, season, videos, watchProviders;
  try {
    [show, season, videos, watchProviders] = await Promise.all([
      fetchTVShowDetails(showId),
      fetchTVSeasonDetails(showId, seasonNum),
      fetchTVVideos(showId),
      fetchTVWatchProviders(showId),
    ]);
  } catch {
    notFound();
  }

  const episodes = season.episodes || [];

  // Find a trailer
  const trailer =
    videos.results.find(
      (v) => v.site === "YouTube" && v.type === "Trailer" && v.official,
    ) ??
    videos.results.find(
      (v) => v.site === "YouTube" && v.type === "Trailer",
    ) ??
    videos.results.find((v) => v.site === "YouTube");

  const trailerKey = trailer?.key ?? null;
  const providers = watchProviders.results?.US ?? undefined;

  // Best rated episode with a still for the hero
  const heroEpisode = [...episodes]
    .filter((ep) => ep.still_path && ep.vote_average > 0 && ep.vote_count > 5)
    .sort((a, b) => b.vote_average - a.vote_average)[0];

  const remainingEpisodes = episodes.filter(
    (ep) => ep.id !== heroEpisode?.id,
  );

  // Season selector: all seasons for navigation
  const allSeasons = show.seasons.filter((s) => s.season_number > 0);

  return (
    <main className="flex flex-1 flex-col gap-10 pb-16">
      {/* Hero: best episode */}
      {heroEpisode && (
        <section className="relative h-[45vh] w-full overflow-hidden sm:h-[55vh]">
          <Image
            src={`${IMAGE_SIZES.backdrop.original}${heroEpisode.still_path}`}
            alt={heroEpisode.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 space-y-3 p-6 sm:p-12">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber px-3 py-1 text-xs font-bold text-amber-foreground">
                <Play className="h-3 w-3" fill="currentColor" />
                Best Rated Episode
              </span>
              <RatingBadge rating={heroEpisode.vote_average} size="sm" />
            </div>

            <p className="text-sm text-white/50">
              Episode {heroEpisode.episode_number}
            </p>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              {heroEpisode.name}
            </h2>
            {heroEpisode.overview && (
              <p className="line-clamp-2 max-w-2xl text-sm text-white/60 sm:text-base">
                {heroEpisode.overview}
              </p>
            )}
            <div className="flex items-center gap-3 text-xs text-white/40">
              {heroEpisode.air_date && (
                <span>{formatDate(heroEpisode.air_date)}</span>
              )}
              {heroEpisode.runtime && (
                <span>{humanizeDuration(heroEpisode.runtime)}</span>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <VideoPlayer
                videoKey={trailerKey}
                title={`${show.name} - Trailer`}
              />
            </div>

            <ProviderList providers={providers} />
          </div>
        </section>
      )}

      {/* Header + Season nav */}
      <div className="space-y-5 px-4 sm:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href={`/tv/${showId}`} className="hover:text-primary transition-colors">
            {show.name}
          </Link>
          <span>/</span>
          <span className="text-foreground">{season.name}</span>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-primary sm:text-4xl">
              {season.name}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              {season.air_date && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatYear(season.air_date)}
                </span>
              )}
              <span>{episodes.length} episodes</span>
              {season.vote_average > 0 && (
                <RatingBadge rating={season.vote_average} size="sm" />
              )}
            </div>
            {season.overview && (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/70">
                {season.overview}
              </p>
            )}
          </div>
        </div>

        {/* Trailer + Where to Watch (fallback when no hero episode) */}
        {!heroEpisode && (
          <div className="flex flex-wrap items-start gap-6">
            {trailerKey && (
              <VideoPlayer
                videoKey={trailerKey}
                title={`${show.name} - Trailer`}
              />
            )}
            <ProviderList providers={providers} />
          </div>
        )}

        {/* Season selector */}
        {allSeasons.length > 1 && (
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            style={{ scrollbarWidth: "none" }}
          >
            {allSeasons.map((s) => (
              <Link
                key={s.id}
                href={`/tv/${showId}/seasons/${s.season_number}`}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  s.season_number === seasonNum
                    ? "bg-primary text-primary-foreground"
                    : "glass hover:bg-white/10",
                )}
              >
                S{s.season_number}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Episode list */}
      <section className="space-y-3 px-4 sm:px-8">
        <h2 className="text-lg font-bold text-primary">All Episodes</h2>

        <div className="space-y-2">
          {[...episodes].sort((a, b) => a.episode_number - b.episode_number).map(
            (episode) => (
              <div
                key={episode.id}
                className="group flex gap-4 rounded-xl p-3 transition-colors hover:bg-secondary/50"
              >
                {/* Still image */}
                <div className="relative aspect-video w-36 shrink-0 overflow-hidden rounded-lg sm:w-48">
                  {episode.still_path ? (
                    <Image
                      src={`${IMAGE_SIZES.backdrop.small}${episode.still_path}`}
                      alt={episode.name}
                      fill
                      className="object-cover"
                      sizes="192px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                      <span className="text-lg font-bold text-muted-foreground">
                        E{episode.episode_number}
                      </span>
                    </div>
                  )}
                  {episode.runtime && (
                    <div className="absolute bottom-1 right-1 flex items-center gap-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-white">
                      <Clock className="h-2.5 w-2.5" />
                      {humanizeDuration(episode.runtime)}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col justify-center gap-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">
                        Episode {episode.episode_number}
                      </p>
                      <p className="text-sm font-semibold leading-tight sm:text-base">
                        {episode.name}
                      </p>
                    </div>
                    {episode.vote_average > 0 && (
                      <RatingBadge
                        rating={episode.vote_average}
                        size="sm"
                        className="shrink-0"
                      />
                    )}
                  </div>

                  {episode.air_date && (
                    <p className="text-xs text-muted-foreground">
                      {formatDate(episode.air_date)}
                    </p>
                  )}

                  {episode.overview && (
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-foreground/50 sm:text-sm">
                      {episode.overview}
                    </p>
                  )}
                </div>
              </div>
            ),
          )}
        </div>
      </section>
    </main>
  );
}
