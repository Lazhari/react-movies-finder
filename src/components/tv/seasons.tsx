import { RatingBadge } from "@/components/media/rating-badge";
import { formatYear, getPosterURL } from "@/lib/movies";
import { Season } from "@/types/tv";
import Image from "next/image";
import Link from "next/link";

interface SeasonsProps {
  showId: number;
  seasons: Season[];
}

export default function Seasons({ showId, seasons }: SeasonsProps) {
  const filtered = seasons.filter((s) => s.season_number > 0);

  if (filtered.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="px-4 text-xl font-bold text-primary sm:px-8 sm:text-2xl">
        Seasons
      </h2>

      <div
        className="flex gap-4 overflow-x-auto px-4 pb-4 sm:px-8"
        style={{ scrollbarWidth: "none" }}
      >
        {filtered.map((season) => (
          <Link
            key={season.id}
            href={`/tv/${showId}/seasons/${season.season_number}`}
            className="group w-36 shrink-0 space-y-2 sm:w-40"
          >
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
              {season.poster_path ? (
                <Image
                  src={getPosterURL(season.poster_path, "medium")}
                  alt={season.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="160px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted">
                  <span className="text-2xl font-bold text-muted-foreground">
                    S{season.season_number}
                  </span>
                </div>
              )}
              {season.vote_average > 0 && (
                <div className="absolute right-2 top-2">
                  <RatingBadge rating={season.vote_average} size="sm" />
                </div>
              )}
            </div>
            <div>
              <p className="truncate text-sm font-medium transition-colors group-hover:text-primary">
                {season.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {season.episode_count} episodes
                {season.air_date
                  ? ` \u00B7 ${formatYear(season.air_date)}`
                  : ""}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
