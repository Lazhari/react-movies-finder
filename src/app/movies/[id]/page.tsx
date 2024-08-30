import MovieHero from '@/components/movies/hero'
import { fetchMovieDetail } from './actions'

interface MoviePageProps {
  params: {
    id: number
  }
}

export default async function MoviePage({
  params: { id },
}: Readonly<MoviePageProps>) {
  const movieDetails = await fetchMovieDetail(id)
  return (
    <>
      <MovieHero movie={movieDetails} />
    </>
  )
}
