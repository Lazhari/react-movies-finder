'use server'

import { MovieDetails } from '@/models/movie'

const baseURL = process.env.MOVIE_DB_URL
const apiKey = process.env.MOVIE_DB_API_KEY

export async function fetchMovieDetail(id: number) {
  const resp = await fetch(`${baseURL}/movie/${id}?api_key=${apiKey}`)
  const data: MovieDetails = await resp.json()
  return data
}
