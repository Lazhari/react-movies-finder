import { Cast, Crew } from '@models/actor'
import { Movie } from '@models/movie'
import { AxiosResponse } from 'axios'

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

export interface AxiosAction<T, D> {
  type: T
  payload: AxiosResponse<D>
}

export interface AsyncAxiosAction<T, D> {
  type: T
  payload: Promise<AxiosResponse<D>>
}
