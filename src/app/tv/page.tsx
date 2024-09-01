import { LoadMore } from '@/components/load-more'
import { fetchTvSeries } from './actions'

export default async function TVShowPage() {
  const tvs = await fetchTvSeries({ page: 1 })
  return (
    <main className="flex flex-1 flex-col gap-2 px-4 md:gap-4">
      <div className="sm:p-8 sm:py-4 px-4 flex flex-col gap-10">
        <h2 className="text-2xl font-bold text-primary">Explore Popular TVs</h2>
        <section className="grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10">
          {tvs}
        </section>
        <LoadMore fetchAction={fetchTvSeries} />
      </div>
    </main>
  )
}
