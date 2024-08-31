'use server'

import TVShowCard from '@/components/tv/card'
import { ApiResponse, ReqOptions } from '@/types/common'
import { TVShow } from '@/types/tv'

const baseURL = process.env.MOVIE_DB_URL
const apiKey = process.env.MOVIE_DB_API_KEY

export async function fetchPopularTv(opts: ReqOptions) {
  const resp = await fetch(
    `${baseURL}/tv/popular?api_key=${apiKey}&page=${opts.page}`
  )
  const data: ApiResponse<TVShow> = await resp.json()
  return data?.results.map((tv, idx) => (
    <TVShowCard key={tv.id} tv={tv} index={idx} />
  ))
}
