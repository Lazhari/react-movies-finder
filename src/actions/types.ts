import { Cast, Crew } from '@models/actor'
import { AxiosResponse } from 'axios'

export interface ActorMovieCreditsResponse {
  id: number
  cast: Cast[]
  crew: Crew[]
}

export interface AxiosAction<T, D> {
  type: T
  payload: AxiosResponse<D>
}

export interface AsyncAxiosAction<T, D> {
  type: T
  payload: Promise<AxiosResponse<D>>
}
