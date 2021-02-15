import { AxiosResponse } from 'axios'
import { Video, MovieCast } from '@models/movie'
import { Cast, Crew } from '@models/actor'
import { Movie } from '@models/movie'
import { Review } from '@models/review'

export interface ActorMovieCreditsResponse {
  id: number
  cast: Cast[]
  crew: Crew[]
}

export interface ListResponse<R> {
  id: number
  page: number
  total_pages: number
  total_results: number
  results: R[]
}

export type MoviesListResponse = ListResponse<Movie>
export type ReviewListResponse = ListResponse<Review>

export interface AxiosAction<T, D> {
  type: T
  payload: AxiosResponse<D>
}

export interface AsyncAxiosAction<T, D> {
  type: T
  payload: Promise<AxiosResponse<D>>
}

export interface VideoResponse {
  id: number
  results: Video[]
}

export interface CreditsResponse {
  id: number
  cast: MovieCast[]
  crew: Crew[]
}
