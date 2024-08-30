import GenreCarousel from '@/components/genre-carousel'
import { LoadMore } from '@/components/movies/load-more'
import { fetchGenres, fetchMovies } from './actions'

export default async function Home() {
  const movies = await fetchMovies({ page: 1 })
  const { genres }: { genres: { name: string; id: number }[] } =
    await fetchGenres()
  return (
    <>
      <GenreCarousel genres={genres} />
      <div className="sm:p-8 sm:py-4 px-4 flex flex-col gap-10">
        <h2 className="text-2xl font-bold text-primary">
          Explore Popular Movies
        </h2>
        <section className="grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10">
          {movies}
        </section>
        <LoadMore fetchAction={fetchMovies} />
      </div>
    </>
  )
}
