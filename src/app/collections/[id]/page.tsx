import { MediaCard } from "@/components/media/media-card";
import { RatingBadge } from "@/components/media/rating-badge";
import { fetchCollection } from "@/lib/api/tmdb";
import { getBackdropURL } from "@/lib/movies";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const collection = await fetchCollection(Number(id));
    return {
      title: `${collection.name} | Screenbox`,
      description: collection.overview,
    };
  } catch {
    return { title: "Collection Not Found" };
  }
}

export default async function CollectionPage({ params }: Props) {
  const { id } = await params;
  const collectionId = Number(id);

  if (isNaN(collectionId)) notFound();

  let collection;
  try {
    collection = await fetchCollection(collectionId);
  } catch {
    notFound();
  }

  const sortedParts = [...collection.parts].sort(
    (a, b) =>
      new Date(a.release_date || "9999").getTime() -
      new Date(b.release_date || "9999").getTime(),
  );

  const avgRating =
    sortedParts.length > 0
      ? sortedParts.reduce((sum, m) => sum + m.vote_average, 0) /
        sortedParts.length
      : 0;

  return (
    <main className="flex flex-1 flex-col gap-8 pb-12">
      <section className="relative h-[50vh] w-full overflow-hidden">
        {collection.backdrop_path && (
          <>
            <Image
              src={getBackdropURL(collection.backdrop_path, "original")}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
          </>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-16">
          <h1 className="font-display text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
            {collection.name}
          </h1>
          {collection.overview && (
            <p className="mt-4 max-w-2xl text-foreground/80">
              {collection.overview}
            </p>
          )}
          <div className="mt-4 flex items-center gap-4">
            <RatingBadge rating={avgRating} size="lg" />
            <span className="text-muted-foreground">
              {sortedParts.length} movie
              {sortedParts.length !== 1 ? "s" : ""} in collection
            </span>
          </div>
        </div>
      </section>

      <section className="space-y-4 px-4 sm:px-8">
        <h2 className="text-xl font-bold text-primary sm:text-2xl">
          Movies in Release Order
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {sortedParts.map((movie, i) => (
            <MediaCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              rating={movie.vote_average}
              year={movie.release_date}
              mediaType="movie"
              index={i}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
