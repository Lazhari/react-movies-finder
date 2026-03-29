import ActorHero from "@/components/actors/hero";
import { MediaCard } from "@/components/media/media-card";
import { PhotoGrid } from "@/components/media/photo-grid";
import { IMAGE_SIZES } from "@/lib/constants";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getActorPageData } from "./actions";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const { actor } = await getActorPageData(Number(id));
    return {
      title: `${actor.name} | Movies Finder`,
      description:
        actor.biography?.slice(0, 160) ||
        `${actor.name} filmography and photos`,
    };
  } catch {
    return { title: "Actor Not Found" };
  }
}

export default async function ActorPage({ params }: Props) {
  const { id } = await params;
  const actorId = Number(id);

  if (isNaN(actorId)) notFound();

  let data;
  try {
    data = await getActorPageData(actorId);
  } catch {
    notFound();
  }

  const { actor, filmography, images } = data;

  return (
    <main className="flex flex-1 flex-col gap-8 pb-12">
      <ActorHero actor={actor} />

      <PhotoGrid
        images={images}
        baseUrl={IMAGE_SIZES.profile.medium}
        title="Photos"
      />

      {filmography.length > 0 && (
        <section className="space-y-4 px-4 sm:px-8">
          <h2 className="text-xl font-bold text-primary sm:text-2xl">
            Filmography
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filmography.slice(0, 40).map((movie, i) => (
              <MediaCard
                key={`${movie.id}-${movie.credit_id}`}
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
      )}
    </main>
  );
}
