import ActorHero from '@/components/actors/hero'
import MovieCard from '@/components/movies/card'
import { fetchActorDetails, fetchActorMovieCredits } from './actions'

interface ActorPageProps {
  params: {
    id: string
  }
}

export default async function ActorPage({ params }: Readonly<ActorPageProps>) {
  const awaitedParams = await params
  const actorPromise = fetchActorDetails(awaitedParams.id)
  const creditsPromise = fetchActorMovieCredits(awaitedParams.id)

  const [actor, credits] = await Promise.all([actorPromise, creditsPromise])

  const filmography = credits.cast.sort(
    (a, b) =>
      new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
  )

  return (
    <>
      <ActorHero actor={actor} />

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Filmography</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filmography.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} />
          ))}
        </div>
      </div>
    </>
  )
}
