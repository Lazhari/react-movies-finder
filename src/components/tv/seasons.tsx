"use client";

import { RatingBadge } from "@/components/media/rating-badge";
import { formatYear, getPosterURL } from "@/lib/movies";
import { cn } from "@/lib/utils";
import { ChevronRight, Layers } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Season } from "@/types/tv";

interface SeasonsProps {
  seasons: Season[];
}

export default function Seasons({ seasons }: SeasonsProps) {
  const filtered = seasons.filter((s) => s.season_number > 0);
  const [selectedIndex, setSelectedIndex] = useState(filtered.length - 1);

  if (filtered.length === 0) return null;

  const selected = filtered[selectedIndex];

  return (
    <section className="space-y-6 px-4 sm:px-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
          <Layers className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-primary sm:text-2xl">Seasons</h2>
          <p className="text-xs text-muted-foreground">
            {filtered.length} season{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Season selector pills */}
      <div
        className="flex gap-2 overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {filtered.map((season, i) => (
          <button
            key={season.id}
            onClick={() => setSelectedIndex(i)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all",
              i === selectedIndex
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground",
            )}
          >
            {season.name}
          </button>
        ))}
      </div>

      {/* Selected season detail */}
      {selected && (
        <div className="glass overflow-hidden rounded-2xl">
          <div className="flex flex-col gap-6 p-5 sm:flex-row sm:p-6">
            {/* Poster */}
            <div className="relative mx-auto aspect-[2/3] w-40 shrink-0 overflow-hidden rounded-xl shadow-lg sm:mx-0 sm:w-48">
              {selected.poster_path ? (
                <Image
                  src={getPosterURL(selected.poster_path, "medium")}
                  alt={selected.name}
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted text-sm text-muted-foreground">
                  No Poster
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-1 flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-bold">{selected.name}</h3>
                {selected.vote_average > 0 && (
                  <RatingBadge rating={selected.vote_average} size="sm" />
                )}
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span>{selected.episode_count} episodes</span>
                {selected.air_date && (
                  <span>Aired {formatYear(selected.air_date)}</span>
                )}
              </div>

              {selected.overview ? (
                <p className="max-w-xl text-sm leading-relaxed text-foreground/80">
                  {selected.overview}
                </p>
              ) : (
                <p className="text-sm italic text-muted-foreground/50">
                  No overview available for this season.
                </p>
              )}
            </div>
          </div>

          {/* All seasons quick list */}
          {filtered.length > 1 && (
            <div className="border-t border-white/5">
              <div className="grid grid-cols-1 divide-y divide-white/5 sm:grid-cols-2 sm:divide-y-0">
                {filtered.map((season, i) => (
                  <button
                    key={season.id}
                    onClick={() => setSelectedIndex(i)}
                    className={cn(
                      "flex items-center gap-3 px-5 py-3 text-left transition-colors",
                      i === selectedIndex
                        ? "bg-white/5"
                        : "hover:bg-white/[0.03]",
                    )}
                  >
                    <div className="relative h-12 w-8 shrink-0 overflow-hidden rounded">
                      {season.poster_path ? (
                        <Image
                          src={getPosterURL(season.poster_path, "small")}
                          alt={season.name}
                          fill
                          className="object-cover"
                          sizes="32px"
                        />
                      ) : (
                        <div className="h-full w-full bg-muted" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          "truncate text-sm font-medium",
                          i === selectedIndex
                            ? "text-primary"
                            : "text-foreground/70",
                        )}
                      >
                        {season.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {season.episode_count} ep
                        {season.air_date
                          ? ` \u00B7 ${formatYear(season.air_date)}`
                          : ""}
                      </p>
                    </div>
                    {season.vote_average > 0 && (
                      <span className="text-xs font-medium text-muted-foreground">
                        {season.vote_average.toFixed(1)}
                      </span>
                    )}
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 shrink-0",
                        i === selectedIndex
                          ? "text-primary"
                          : "text-muted-foreground/30",
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
