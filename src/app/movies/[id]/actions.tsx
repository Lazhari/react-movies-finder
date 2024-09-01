'use server'

import MovieCard from '@/components/movies/card'
import { Movie, MovieDetails } from '@/models/movie'
import { Credits } from '@/types/credits'
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
  const data: Credits = await resp.json()
  return data
}

export async function fetchMovieVideos(id: number) {
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

export async function fetchRelatedMovies(id: number) {
  const resp = await fetch(
    `${baseURL}/movie/${id}/similar?api_key=${apiKey}&limit=16`
  )
  const data = await resp.json()
  return data?.results?.map((movie: Movie, idx: number) => (
    <MovieCard
      key={movie.id}
      movie={movie}
      index={idx}
      releaseDateFormat="year"
    />
  ))
}

export async function fetchMovieReviews(id: number) {
  const resp = await fetch(
    `${baseURL}/movie/${id}/reviews?api_key=${apiKey}&limit=5`
  )
  const data: ReviewsResponse = await resp.json()
  return data?.results
}
