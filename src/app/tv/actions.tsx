'use server'

import TVShowCard from '@/components/tv/card'
import { ApiResponse, ReqOptions } from '@/types/common'
import { Credits } from '@/types/credits'
import { Video } from '@/types/movies'
import { TVShow, TVShowDetails } from '@/types/tv'

const baseURL = process.env.MOVIE_DB_URL
const apiKey = process.env.MOVIE_DB_API_KEY

export async function fetchTvSeries(opts: ReqOptions) {
  const resp = await fetch(
    `${baseURL}/tv/popular?api_key=${apiKey}&page=${opts.page}`
  )
  const data: ApiResponse<TVShow> = await resp.json()
  return data?.results.map((tv, idx) => (
    <TVShowCard key={tv.id} tv={tv} index={idx} />
  ))
}

export async function fetchTvDetails(id: number) {
  const resp = await fetch(`${baseURL}/tv/${id}?api_key=${apiKey}`)
  const data: TVShowDetails = await resp.json()
  return data
}

export async function fetchTvVideos(id: number) {
  const resp = await fetch(`${baseURL}/tv/${id}/videos?api_key=${apiKey}`)
  const data: ApiResponse<Video> = await resp.json()
  const trailers = data.results.filter(
    (video) =>
      video.site === 'YouTube' && video.type === 'Trailer' && video.official
  )
  return {
    trailers,
    videos: data.results.filter((video) => video.site === 'YouTube'),
  }
}

export async function fetchTvCredits(id: number) {
  const resp = await fetch(`${baseURL}/tv/${id}/credits?api_key=${apiKey}`)
  const data: Credits = await resp.json()
  return data
}

export async function fetchRecommendedTvShows(id: number) {
  const resp = await fetch(
    `${baseURL}/tv/${id}/recommendations?api_key=${apiKey}&limit=16`
  )
  const data: ApiResponse<TVShow> = await resp.json()
  return data?.results.map((tv, idx) => (
    <TVShowCard key={tv.id} tv={tv} index={idx} />
  ))
}
