import { RatingBadge } from "@/components/media/rating-badge";
import { formatYear, getPosterURL } from "@/lib/movies";
import { Season } from "@/types/tv";
import Image from "next/image";

interface SeasonsProps {
  seasons: Season[];
}

export default function Seasons({ seasons }: SeasonsProps) {
  if (!seasons || seasons.length === 0) return null;

  return (
    <section className="space-y-4 px-4 sm:px-8">
      <h2 className="text-xl font-bold text-primary sm:text-2xl">Seasons</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {seasons
          .filter((s) => s.season_number > 0)
          .map((season) => (
            <div
              key={season.id}
              className="glass flex gap-3 rounded-lg p-3 transition-colors hover:bg-white/10"
            >
              <div className="relative aspect-[2/3] w-20 shrink-0 overflow-hidden rounded-md">
                {season.poster_path ? (
                  <Image
                    src={getPosterURL(season.poster_path, "small")}
                    alt={season.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted text-xs text-muted-foreground">
                    No Image
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-semibold">{season.name}</p>
                <p className="text-xs text-muted-foreground">
                  {season.episode_count} episodes
                  {season.air_date
                    ? ` \u00B7 ${formatYear(season.air_date)}`
                    : ""}
                </p>
                {season.vote_average > 0 && (
                  <RatingBadge rating={season.vote_average} size="sm" />
                )}
                {season.overview && (
                  <p className="line-clamp-2 pt-1 text-xs text-foreground/70">
                    {season.overview}
                  </p>
                )}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
