'use server'

import MovieCard from '@/components/movies/card'
import { Movie } from '@/models/movie'

const baseURL = process.env.MOVIE_DB_URL
const apiKey = process.env.MOVIE_DB_API_KEY

export async function fetchGenres() {
  const resp = await fetch(
    `${baseURL}/genre/movie/list?api_key=${apiKey}&language=en-US`
  )
  const data = await resp.json()
  return data
}

export async function fetchMovies(page = 1) {
  const resp = await fetch(
    `${baseURL}/movie/popular?api_key=${apiKey}&page=${page}`
  )
  const data = await resp.json()
  return data?.results?.map((movie: Movie, idx: number) => (
    <MovieCard key={movie.id} movie={movie} index={idx} />
  ))
}
