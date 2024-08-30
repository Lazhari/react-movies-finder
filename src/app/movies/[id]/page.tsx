import Cast from '@/components/movies/cast'
import MovieHero from '@/components/movies/hero'
import { fetchMovieCredits, fetchMovieDetail } from './actions'

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
  return (
    <>
      <MovieHero movie={movieDetails} />
      <div>
        <Cast cast={credits.cast} title={movieDetails.title} />
      </div>
    </>
  )
}
