import Cast from '@/components/movies/cast'
import MovieHero from '@/components/movies/hero'
import {
  fetchMovieCredits,
  fetchMovieDetail,
  fetchMovieVideos,
  fetchRelatedMovies,
} from './actions'

interface MoviePageProps {
  params: {
    id: number
  }
}

export default async function MoviePage({
  params: { id },
}: Readonly<MoviePageProps>) {
  const movieDetails = await fetchMovieDetail(id)
  const credits = await fetchMovieCredits(id)
  const { trailers, videos } = await fetchMovieVideos(id)
  const movies = await fetchRelatedMovies(id)
  return (
    <>
      <MovieHero
        movie={movieDetails}
        trailers={trailers.length > 0 ? trailers : videos}
      />
      <Cast cast={credits.cast} title={movieDetails.title} />
      <div className="w-full mx-auto px-6 md:px-12 py-6">
        <h2 className="text-xl font-bold mb-2">Similar Movies</h2>
        <section className="grid xl:grid-cols-10 lg:grid-cols-5 sm:grid-cols-4 grid-cols-2 gap-4">
          {movies}
        </section>
      </div>
    </>
  )
}
