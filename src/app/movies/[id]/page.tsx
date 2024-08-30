import Cast from '@/components/movies/cast'
import MovieHero from '@/components/movies/hero'
import {
  fetchMovieCredits,
  fetchMovieDetail,
  FetchMovieVideos,
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
  const { trailers, videos } = await FetchMovieVideos(id)
  return (
    <>
      <MovieHero
        movie={movieDetails}
        trailers={trailers.length > 0 ? trailers : videos}
      />
      <div>
        <Cast cast={credits.cast} title={movieDetails.title} />
      </div>
    </>
  )
}
