import { MediaCard } from "@/components/media/media-card";
import { MediaCarousel } from "@/components/media/media-carousel";
import Cast from "@/components/movies/cast";
import Reviews from "@/components/movies/reviews";
import TVHero from "@/components/tv/hero";
import Seasons from "@/components/tv/seasons";
import { Metadata } from "next";
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
      title: `${show.name} | Movies Finder`,
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

  return (
    <main className="flex flex-1 flex-col gap-8 pb-12">
      <TVHero
        show={show}
        trailerKey={trailerKey}
        watchProviders={watchProviders}
      />

      <Seasons seasons={show.seasons} />

      <Cast cast={credits.cast} />

      <Reviews reviews={reviews} />

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
