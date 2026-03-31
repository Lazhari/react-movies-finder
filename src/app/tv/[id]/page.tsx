import { MediaCard } from "@/components/media/media-card";
import { MediaCarousel } from "@/components/media/media-carousel";
import { getProfileURL } from "@/lib/movies";
import { cn } from "@/lib/utils";
import Reviews from "@/components/movies/reviews";
import TVHero from "@/components/tv/hero";
import Seasons from "@/components/tv/seasons";
import { Users } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTVShowPageData } from "../actions";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const { show } = await getTVShowPageData(Number(id));
    return {
      title: `${show.name} | Screenbox`,
      description: show.overview,
      openGraph: {
        title: show.name,
        description: show.overview,
        images: show.backdrop_path
          ? [`https://image.tmdb.org/t/p/w1280${show.backdrop_path}`]
          : [],
      },
    };
  } catch {
    return { title: "TV Show Not Found" };
  }
}

export default async function TVShowPage({ params }: Props) {
  const { id } = await params;
  const showId = Number(id);

  if (isNaN(showId)) notFound();

  let data;
  try {
    data = await getTVShowPageData(showId);
  } catch {
    notFound();
  }

  const {
    show,
    credits,
    trailerKey,
    reviews,
    recommendations,
    watchProviders,
  } = data;

  // Split cast into lead (first 6) and supporting
  const leadCast = credits.cast.slice(0, 8);

  return (
    <main className="flex flex-1 flex-col gap-12 pb-16">
      <TVHero
        show={show}
        trailerKey={trailerKey}
        watchProviders={watchProviders}
      />

      {/* Seasons */}
      <Seasons showId={show.id} seasons={show.seasons} />

      {/* Cast */}
      {leadCast.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-center gap-3 px-4 sm:px-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary sm:text-2xl">
                Cast
              </h2>
              <p className="text-xs text-muted-foreground">
                {credits.cast.length} credited member{credits.cast.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div
            className="flex gap-5 overflow-x-auto px-4 pb-2 sm:px-8"
            style={{ scrollbarWidth: "none" }}
          >
            {leadCast.map((member) => (
              <Link
                key={member.credit_id}
                href={`/actors/${member.id}`}
                className="group shrink-0 flex flex-col items-center gap-3 w-28"
              >
                <div
                  className={cn(
                    "relative h-24 w-24 overflow-hidden rounded-full ring-2 transition-all",
                    "ring-transparent group-hover:ring-primary/50",
                  )}
                >
                  {member.profile_path ? (
                    <Image
                      src={getProfileURL(member.profile_path, "medium")}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="96px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-secondary text-lg font-bold text-muted-foreground">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <p className="truncate text-sm font-medium transition-colors group-hover:text-primary w-28">
                    {member.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground w-28">
                    {member.character}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Reviews */}
      <Reviews reviews={reviews} />

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <MediaCarousel title="More Like This">
          {recommendations.map((rec, i) => (
            <div key={rec.id} className="w-[160px] shrink-0 sm:w-[185px]">
              <MediaCard
                id={rec.id}
                title={rec.name}
                posterPath={rec.poster_path}
                rating={rec.vote_average}
                year={rec.first_air_date}
                mediaType="tv"
                index={i}
              />
            </div>
          ))}
        </MediaCarousel>
      )}
    </main>
  );
}
