import MovieCard from '@/components/movies/card'
import TVShowCard from '@/components/tv/card'
import { Movie } from '@/models/movie'
import { TVShow } from '@/types/tv'
import { searchMulti } from './actions'

type SearchPageProps = {
  searchParams: Promise<{
    query: string
  }>
}

export default async function SearchPage(props: SearchPageProps) {
  const searchParams = await props.searchParams
  const { query } = searchParams
  const results = await searchMulti(query)

  return (
    <main className="flex flex-1 flex-col gap-2 px-4 md:gap-4">
      <div className="sm:p-8 sm:py-4 px-4 flex flex-col gap-10">
        <h2 className="text-2xl font-bold text-primary">
          Search Results for &ldquo;{query}&rdquo;
        </h2>
        <section className="grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10">
          {results?.map(
            (result: Movie & TVShow & { media_type: string }, idx: number) => {
              if (result.media_type === 'movie') {
                return <MovieCard key={result.id} movie={result} index={idx} />
              } else if (result.media_type === 'tv') {
                return <TVShowCard key={result.id} tv={result} index={idx} />
              }
              return null
            }
          )}
        </section>
      </div>
    </main>
  )
}
