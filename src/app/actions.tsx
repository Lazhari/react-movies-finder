'use server'

import MovieCard from '@/components/movies/card'
import { Movie } from '@/models/movie'
import { MoviesReqOptions } from '@/types/movies'

const baseURL = process.env.MOVIE_DB_URL
const apiKey = process.env.MOVIE_DB_API_KEY

export async function fetchGenres() {
  const resp = await fetch(
    `${baseURL}/genre/movie/list?api_key=${apiKey}&language=en-US`
  )
  const data = await resp.json()
  return data
}

export async function fetchMovies(opts: MoviesReqOptions) {
  const resp = await fetch(
    `${baseURL}/movie/popular?api_key=${apiKey}&page=${opts.page}`
  )
  const data = await resp.json()
  return data?.results?.map((movie: Movie, idx: number) => (
    <MovieCard key={movie.id} movie={movie} index={idx} />
  ))
}

export async function fetchUpcomingMovies(opts: MoviesReqOptions) {
  const resp = await fetch(
    `${baseURL}/movie/upcoming?api_key=${apiKey}&page=${opts.page}`
  )
  const data = await resp.json()
  return data?.results?.map((movie: Movie, idx: number) => (
    <MovieCard key={movie.id} movie={movie} index={idx} />
  ))
}

export async function fetchMoviesByGenre(opts: MoviesReqOptions) {
  const resp = await fetch(
    `${baseURL}/genre/${opts?.genreId}/movies?api_key=${apiKey}&page=${opts.page}`
  )
  const data = await resp.json()
  return data?.results?.map((movie: Movie, idx: number) => (
    <MovieCard key={movie.id} movie={movie} index={idx} />
  ))
}
