import Cast from '@/components/movies/cast'
import TvHero from '@/components/tv/hero'
import TvSeasons from '@/components/tv/seasons'
import {
  fetchRecommendedTvShows,
  fetchTvCredits,
  fetchTvDetails,
  fetchTvVideos,
} from '../actions'

export default async function SeriesPage({
  params: { id },
}: {
  params: { id: number }
}) {
  const tv = await fetchTvDetails(id)
  const { trailers, videos } = await fetchTvVideos(id)
  const credits = await fetchTvCredits(id)
  const recommended = await fetchRecommendedTvShows(id)
  return (
    <div>
      <TvHero tv={tv} trailers={trailers.length > 0 ? trailers : videos} />
      <TvSeasons seasons={tv.seasons} />

      {credits.cast.length > 0 && <Cast cast={credits.cast} title={tv.name} />}
      <div className="w-full mx-auto px-6 md:px-12 py-6">
        <h2 className="text-xl font-bold mb-2">Recommended</h2>
        <section className="grid xl:grid-cols-10 lg:grid-cols-5 sm:grid-cols-4 grid-cols-2 gap-4">
          {recommended}
        </section>
      </div>
    </div>
  )
}
