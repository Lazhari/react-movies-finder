import { MediaCard } from "@/components/media/media-card";
import { MediaCarousel } from "@/components/media/media-carousel";
import Cast from "@/components/movies/cast";
import MovieHero from "@/components/movies/hero";
import Reviews from "@/components/movies/reviews";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMoviePageData } from "./actions";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const { movie } = await getMoviePageData(Number(id));
    return {
      title: `${movie.title} | Movies Finder`,
      description: movie.overview,
      openGraph: {
        title: movie.title,
        description: movie.overview,
        images: movie.backdrop_path
          ? [`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`]
          : [],
      },
    };
  } catch {
    return { title: "Movie Not Found" };
  }
}

export default async function MoviePage({ params }: Props) {
  const { id } = await params;
  const movieId = Number(id);

  if (isNaN(movieId)) notFound();

  let data;
  try {
    data = await getMoviePageData(movieId);
  } catch {
    notFound();
  }

  const {
    movie,
    credits,
    trailerKey,
    reviews,
    recommendations,
    watchProviders,
  } = data;

  return (
    <main className="flex flex-1 flex-col gap-8 pb-12">
      <MovieHero
        movie={movie}
        trailerKey={trailerKey}
        watchProviders={watchProviders}
      />

      {movie.belongs_to_collection && (
        <div className="mx-4 sm:mx-8">
          <Link
            href={`/collections/${movie.belongs_to_collection.id}`}
            className="glass block rounded-lg p-4 transition-colors hover:bg-white/10"
          >
            <p className="text-sm text-muted-foreground">Part of</p>
            <p className="text-lg font-semibold text-primary">
              {movie.belongs_to_collection.name}
            </p>
          </Link>
        </div>
      )}

      <Cast cast={credits.cast} />

      <Reviews reviews={reviews} />

      {recommendations.length > 0 && (
        <MediaCarousel title="More Like This">
          {recommendations.map((rec, i) => (
            <div key={rec.id} className="w-[160px] shrink-0 sm:w-[185px]">
              <MediaCard
                id={rec.id}
                title={rec.title}
                posterPath={rec.poster_path}
                rating={rec.vote_average}
                year={rec.release_date}
                mediaType="movie"
                index={i}
              />
            </div>
          ))}
        </MediaCarousel>
      )}
    </main>
  );
}
