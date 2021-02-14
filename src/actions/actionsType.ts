import { Actor } from '@models/actor'
import { Movie } from '@models/movie'
import {
  ActorMovieCreditsResponse,
  AxiosAction,
  AsyncAxiosAction,
} from './types'

export const FETCH_MOVIES = 'FETCH_MOVIES'
export const FETCH_MOVIES_BY_GENRE = 'FETCH_MOVIES_BY_GENRE'
export const FETCH_GENRE = 'FETCH_GENRE'
export const FETCH_MOVIE_DETAILS = 'FETCH_MOVIE_DETAILS'
export const FETCH_MOVIE_VIDEOS = 'FETCH_MOVIE_VIDEOS'
export const FETCH_MOVIE_REVIEWS = 'FETCH_MOVIE_REVIEWS'
export const FETCH_RELATED_MOVIES = 'FETCH_RELATED_MOVIES'
export const FETCH_MOVIE_CAST = 'FETCH_CREDITS_MOVIES'
export const CLEANING_MOVIE_STATE = 'CLEANING_MOVIE_STATE'
export const GET_ACTOR_PROFILE = 'GET_ACTOR_PROFILE'
export const GET_ACTOR_PROFILE_FULFILLED = 'GET_ACTOR_PROFILE_FULFILLED'
export const GET_ACTOR_CREDIT_MOVIES = 'GET_ACTOR_CREDIT_MOVIES'
export const GET_ACTOR_CREDIT_MOVIES_FULFILLED =
  'GET_ACTOR_CREDIT_MOVIES_FULFILLED'
export const FETCH_TV_SHOWS = 'FETCH_TV_SHOWS'
export const FETCH_TV_GENRES = 'FETCH_TV_GENRES'

interface FetchMoviesAction {
  type: typeof FETCH_MOVIES
  payload: Movie[]
}

interface FetchMoviesByGenre {
  type: typeof FETCH_MOVIES_BY_GENRE
  payload: Movie[]
}

export type GetActorCreditMovies = AxiosAction<
  typeof GET_ACTOR_CREDIT_MOVIES,
  ActorMovieCreditsResponse
>

export type AsyncGetActorCreditMovies = AsyncAxiosAction<
  typeof GET_ACTOR_CREDIT_MOVIES,
  ActorMovieCreditsResponse
>

export type GetActorProfile = AxiosAction<typeof GET_ACTOR_PROFILE, Actor>
export type AsyncGetActorProfile = AsyncAxiosAction<
  typeof GET_ACTOR_PROFILE,
  Actor
>

export type MovieActionTypes = FetchMoviesAction | FetchMoviesByGenre
export type ActorActionTypes = GetActorProfile | GetActorCreditMovies
export type AsyncActorActionTypes =
  | AsyncGetActorProfile
  | AsyncGetActorCreditMovies

/**
 * TV Show Action types
 */
export const FETCH_TV_SHOW_DETAILS = 'FETCH_TV_SHOW_DETAILS'
export const FETCH_TV_SHOW_CREDITS = 'FETCH_TV_SHOW_CREDITS'
export const FETCH_TV_SHOW_EXTERNAL_IDS = 'FETCH_TV_SHOW_EXTERNAL_IDS'
export const FETCH_TV_SHOW_KEYWORDS = 'FETCH_TV_SHOW_KEYWORDS'
export const FETCH_TV_SHOW_RECOMMENDATIONS = 'FETCH_TV_SHOW_RECOMMENDATIONS'
export const FETCH_TV_SHOW_REVIEWS = 'FETCH_TV_SHOW_REVIEWS'
export const FETCH_TV_SHOW_SIMILAR = 'FETCH_TV_SHOW_SIMILAR'
export const FETCH_TV_SHOW_VIDEOS = 'FETCH_TV_SHOW_VIDEOS'
