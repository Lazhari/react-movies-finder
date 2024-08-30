import { LoadMore } from '@/components/movies/load-more'
import { fetchMoviesByGenre } from '../../actions'

interface GenrePageProps {
  params: {
    id: number
  }
  searchParams: { [key: string]: string | undefined }
}
export default async function GenrePage({
  params: { id },
  searchParams,
}: Readonly<GenrePageProps>) {
  const name = searchParams.name
  const movies = await fetchMoviesByGenre({ genreId: id, page: 1 })
  return (
    <main className="flex flex-1 flex-col gap-2 px-4 md:gap-4">
      <div className="sm:p-8 sm:py-4 px-4 flex flex-col gap-10">
        <h2 className="text-2xl font-bold text-primary">{name} Movies</h2>
        <section className="grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10">
          {movies}
        </section>
        <LoadMore fetchAction={fetchMoviesByGenre} genreId={id} />
      </div>
    </main>
  )
}
