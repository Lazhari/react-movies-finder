'use server'

import { MovieDetails } from '@/models/movie'
import { MovieCredits } from '@/types/credits'
import { MovieVideos } from '@/types/movies'

const baseURL = process.env.MOVIE_DB_URL
const apiKey = process.env.MOVIE_DB_API_KEY

export async function fetchMovieDetail(id: number) {
  const resp = await fetch(`${baseURL}/movie/${id}?api_key=${apiKey}`)
  const data: MovieDetails = await resp.json()
  return data
}

export async function fetchMovieCredits(id: number) {
  const resp = await fetch(`${baseURL}/movie/${id}/credits?api_key=${apiKey}`)
  const data: MovieCredits = await resp.json()
  return data
}

export async function FetchMovieVideos(id: number) {
  const resp = await fetch(`${baseURL}/movie/${id}/videos?api_key=${apiKey}`)
  const data: MovieVideos = await resp.json()

  const trailers = data.results.filter(
    (video) =>
      video.site === 'YouTube' && video.type === 'Trailer' && video.official
  )

  return {
    trailers,
    videos: data.results,
  }
}
