import { MediaCard } from "@/components/media/media-card";
import { MediaCarousel } from "@/components/media/media-carousel";
import { RatingBadge } from "@/components/media/rating-badge";
import { fetchPopularTVShows, fetchTrending, fetchTVGenres } from "@/lib/api/tmdb";
import { getBackdropURL } from "@/lib/movies";
import { cn } from "@/lib/utils";
import { Play, Tv } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TVShow } from "@/types/tv";
import { Movie } from "@/types/movies";

function isTVShow(item: Movie | TVShow): item is TVShow {
  return "name" in item && !("title" in item);
}

export default async function TVPage() {
  const [popular, trendingData, genresData] = await Promise.all([
    fetchPopularTVShows(1),
    fetchTrending("tv", "week"),
    fetchTVGenres(),
  ]);

  const trending = trendingData.results.filter(isTVShow);
  const genreMap = new Map(genresData.genres.map((g) => [g.id, g.name]));

  // Top 3 trending shows for hero cards
  const heroShows = trending.filter((s) => s.backdrop_path).slice(0, 3);
  const remainingTrending = trending.filter(
    (s) => !heroShows.find((h) => h.id === s.id),
  );

  return (
    <main className="flex flex-1 flex-col gap-10">
      {/* Hero section: featured + 2 stacked */}
      <section className="px-4 pt-4 sm:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:h-[480px]">
          {/* Featured show: left 2/3 */}
          {heroShows[0] && (
            <Link
              href={`/tv/${heroShows[0].id}`}
              className="group relative flex-[2] overflow-hidden rounded-2xl min-h-[280px]"
            >
              <Image
                src={getBackdropURL(heroShows[0].backdrop_path, "original")}
                alt={heroShows[0].name}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/0 transition-all group-hover:ring-white/20" />

              <div className="absolute bottom-0 left-0 right-0 space-y-2.5 p-6 sm:p-8">
                <div className="flex items-center gap-2">
                  <RatingBadge rating={heroShows[0].vote_average} size="sm" />
                  {heroShows[0].first_air_date && (
                    <span className="text-xs text-white/50">
                      {new Date(heroShows[0].first_air_date).getFullYear()}
                    </span>
                  )}
                </div>
                <h2 className="font-display text-2xl font-bold text-white drop-shadow-lg sm:text-3xl lg:text-4xl">
                  {heroShows[0].name}
                </h2>
                {heroShows[0].overview && (
                  <p className="line-clamp-2 max-w-xl text-sm text-white/60">
                    {heroShows[0].overview}
                  </p>
                )}
                {heroShows[0].genre_ids.length > 0 && (
                  <p className="text-xs text-white/40">
                    {heroShows[0].genre_ids
                      .slice(0, 3)
                      .map((gid) => genreMap.get(gid))
                      .filter(Boolean)
                      .join(" \u00B7 ")}
                  </p>
                )}
                <div className="flex items-center gap-1 text-xs font-medium text-white/70 opacity-0 translate-y-1 transition-all group-hover:opacity-100 group-hover:translate-y-0">
                  <Play className="h-3 w-3" fill="currentColor" />
                  View Details
                </div>
              </div>
            </Link>
          )}

          {/* Right column: 2 stacked shows */}
          <div className="flex flex-[1] flex-col gap-3">
            {heroShows.slice(1, 3).map((show) => (
              <Link
                key={show.id}
                href={`/tv/${show.id}`}
                className="group relative flex-1 overflow-hidden rounded-2xl min-h-[140px]"
              >
                <Image
                  src={getBackdropURL(show.backdrop_path, "large")}
                  alt={show.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/0 transition-all group-hover:ring-white/20" />

                <div className="absolute bottom-0 left-0 right-0 space-y-1.5 p-4 sm:p-5">
                  <div className="flex items-center gap-2">
                    <RatingBadge rating={show.vote_average} size="sm" />
                    {show.first_air_date && (
                      <span className="text-xs text-white/50">
                        {new Date(show.first_air_date).getFullYear()}
                      </span>
                    )}
                  </div>
                  <h2 className="font-display text-lg font-bold text-white drop-shadow-lg sm:text-xl">
                    {show.name}
                  </h2>
                  {show.genre_ids.length > 0 && (
                    <p className="text-xs text-white/40">
                      {show.genre_ids
                        .slice(0, 3)
                        .map((gid) => genreMap.get(gid))
                        .filter(Boolean)
                        .join(" \u00B7 ")}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending this week carousel */}
      {remainingTrending.length > 0 && (
        <MediaCarousel title="Trending This Week">
          {remainingTrending.slice(0, 20).map((show, i) => (
            <div key={show.id} className="w-[160px] shrink-0 sm:w-[185px]">
              <MediaCard
                id={show.id}
                title={show.name}
                posterPath={show.poster_path}
                rating={show.vote_average}
                year={show.first_air_date}
                mediaType="tv"
                index={i}
              />
            </div>
          ))}
        </MediaCarousel>
      )}

      {/* Popular grid */}
      <section className="space-y-6 px-4 pb-12 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
            <Tv className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary sm:text-2xl">
              Popular TV Shows
            </h2>
            <p className="text-xs text-muted-foreground">
              Most watched right now
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {popular.results.map((show, i) => (
            <MediaCard
              key={show.id}
              id={show.id}
              title={show.name}
              posterPath={show.poster_path}
              rating={show.vote_average}
              year={show.first_air_date}
              mediaType="tv"
              index={i}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
