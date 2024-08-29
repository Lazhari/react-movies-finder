import { LoadMore } from '@/components/movies/load-more'
import { fetchMovies } from './actions'

export default async function Home() {
  const movies = await fetchMovies()
  return (
    <div className="sm:p-8 sm:py-4 px-8 flex flex-col gap-10 -z-10">
      <h2 className="text-3xl fond-bold">Explore Popular Movies</h2>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {movies}
      </section>
      <LoadMore />
    </div>
  )
}
