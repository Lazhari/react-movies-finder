import { AxiosResponse } from 'axios'
import { Keyword } from '@models/common'
import { TvShow } from '@models/tv'
import { Video, Movie } from '@models/movie'
import { Cast, Crew } from '@models/actor'
import { CreditCast, CreditCrew } from '@models/credit'
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
export type TvShowsList = ListResponse<TvShow>

export interface AxiosAction<T, D> {
  type: T
  payload: AxiosResponse<D>
}

export interface AsyncAxiosAction<T, D> {
  type: T
  payload: Promise<AxiosResponse<D>>
}

export interface VideosResponse {
  id: number
  results: Video[]
}

export interface CreditsResponse {
  id: number
  cast: CreditCast[]
  crew: CreditCrew[]
}

export interface KeywordsList {
  id: number
  results: Keyword
}
