import { TvShowDetails } from '@models/tv'
import { MovieDetails } from '@models/movie'
import { Actor } from '@models/actor'
import { Genre } from '@models/common'
import { ExternalIds } from '@models/externalIds'
import {
  ActorMovieCreditsResponse,
  AxiosAction,
  AsyncAxiosAction,
  MoviesListResponse,
  ReviewListResponse,
  CreditsResponse,
  TvShowsList,
  VideosResponse,
  KeywordsList,
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

/**
 * ActorActionTypes
 */
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

export type ActorActionTypes = GetActorProfile | GetActorCreditMovies
export type AsyncActorActionTypes =
  | AsyncGetActorProfile
  | AsyncGetActorCreditMovies

/**
 * MoviesActionTypes
 */
export type FetchMoviesAction = AxiosAction<
  typeof FETCH_MOVIES,
  MoviesListResponse
>
export type AsyncFetchMoviesAction = AsyncAxiosAction<
  typeof FETCH_MOVIES,
  MoviesListResponse
>

export type FetchGenreAction = AxiosAction<
  typeof FETCH_GENRE,
  { genres: Genre[] }
>
export type AsyncFetchGenreAction = AsyncAxiosAction<
  typeof FETCH_GENRE,
  { genres: Genre[] }
>

export type FetchMoviesByGenreAction = AxiosAction<
  typeof FETCH_MOVIES_BY_GENRE,
  MoviesListResponse
> & { genreId: string }
export type AsyncFetchMoviesByGenreAction = AsyncAxiosAction<
  typeof FETCH_MOVIES_BY_GENRE,
  MoviesListResponse
> & { genreId: string }

export type MoviesActionTypes =
  | FetchMoviesAction
  | AsyncFetchMoviesAction
  | FetchGenreAction
  | AsyncFetchGenreAction
  | FetchMoviesByGenreAction
  | AsyncFetchMoviesByGenreAction

/**
 * Movie Actions
 */
export type FetchMovieDetailsAction = AxiosAction<
  typeof FETCH_MOVIE_DETAILS,
  MovieDetails
>
export type AsyncFetchMovieDetailsAction = AsyncAxiosAction<
  typeof FETCH_MOVIE_DETAILS,
  MovieDetails
>

export type FetchMovieVideosAction = AxiosAction<
  typeof FETCH_MOVIE_VIDEOS,
  VideosResponse
>
export type AsyncFetchMovieVideosAction = AsyncAxiosAction<
  typeof FETCH_MOVIE_VIDEOS,
  VideosResponse
>

export type FetchMovieReviewsAction = AxiosAction<
  typeof FETCH_MOVIE_REVIEWS,
  ReviewListResponse
>
export type AsyncFetchMovieReviewsAction = AsyncAxiosAction<
  typeof FETCH_MOVIE_REVIEWS,
  ReviewListResponse
>

export type FetchRelatedMoviesAction = AxiosAction<
  typeof FETCH_RELATED_MOVIES,
  MoviesListResponse
>
export type AsyncFetchRelatedMoviesAction = AsyncAxiosAction<
  typeof FETCH_RELATED_MOVIES,
  MoviesListResponse
>

export type CleaningMovieStateAction = {
  type: typeof CLEANING_MOVIE_STATE
}

export type FetchMovieCastAction = AxiosAction<
  typeof FETCH_MOVIE_CAST,
  CreditsResponse
>
export type AsyncFetchMovieCastAction = AsyncAxiosAction<
  typeof FETCH_MOVIE_CAST,
  CreditsResponse
>

export type MovieActionTypes =
  | FetchMovieDetailsAction
  | AsyncFetchMovieDetailsAction
  | FetchMovieVideosAction
  | AsyncFetchMovieVideosAction
  | FetchMovieReviewsAction
  | AsyncFetchMovieReviewsAction
  | FetchRelatedMoviesAction
  | AsyncFetchRelatedMoviesAction
  | CleaningMovieStateAction
  | FetchMovieCastAction
  | AsyncFetchMovieCastAction

/**
 * TV Show Action types
 */
export const FETCH_TV_SHOWS = 'FETCH_TV_SHOWS'
export const FETCH_TV_GENRES = 'FETCH_TV_GENRES'

export const FETCH_TV_SHOW_DETAILS = 'FETCH_TV_SHOW_DETAILS'
export const FETCH_TV_SHOW_CREDITS = 'FETCH_TV_SHOW_CREDITS'
export const FETCH_TV_SHOW_EXTERNAL_IDS = 'FETCH_TV_SHOW_EXTERNAL_IDS'
export const FETCH_TV_SHOW_KEYWORDS = 'FETCH_TV_SHOW_KEYWORDS'
export const FETCH_TV_SHOW_RECOMMENDATIONS = 'FETCH_TV_SHOW_RECOMMENDATIONS'
export const FETCH_TV_SHOW_REVIEWS = 'FETCH_TV_SHOW_REVIEWS'
export const FETCH_TV_SHOW_SIMILAR = 'FETCH_TV_SHOW_SIMILAR'
export const FETCH_TV_SHOW_VIDEOS = 'FETCH_TV_SHOW_VIDEOS'

// TVShows actions
// FETCH_TV_SHOW_DETAILS
export type FetchTvShowDetailsAction = AxiosAction<
  typeof FETCH_TV_SHOW_DETAILS,
  TvShowDetails
>
export type AsyncFetchTvShowDetailsAction = AsyncAxiosAction<
  typeof FETCH_TV_SHOW_DETAILS,
  TvShowDetails
>
// FETCH_TV_SHOW_CREDITS
export type FetchTvShowCreditsAction = AxiosAction<
  typeof FETCH_TV_SHOW_CREDITS,
  CreditsResponse
>
export type AsyncFetchTvShowCreditsAction = AsyncAxiosAction<
  typeof FETCH_TV_SHOW_CREDITS,
  CreditsResponse
>
// FETCH_TV_SHOW_EXTERNAL_IDS
export type FetchTvShowExternalIdsAction = AxiosAction<
  typeof FETCH_TV_SHOW_EXTERNAL_IDS,
  ExternalIds
>
export type AsyncFetchTvShowExternalIdsAction = AsyncAxiosAction<
  typeof FETCH_TV_SHOW_EXTERNAL_IDS,
  ExternalIds
>
// FETCH_TV_SHOW_KEYWORDS
export type FetchTvShowKeywordAction = AxiosAction<
  typeof FETCH_TV_SHOW_KEYWORDS,
  KeywordsList
>
export type AsyncFetchTvShowKeywordAction = AsyncAxiosAction<
  typeof FETCH_TV_SHOW_KEYWORDS,
  KeywordsList
>
// FETCH_TV_SHOW_RECOMMENDATIONS
export type FetchTvShowRecommendationsAction = AxiosAction<
  typeof FETCH_TV_SHOW_RECOMMENDATIONS,
  TvShowsList
>
export type AsyncFetchTvShowRecommendationsAction = AsyncAxiosAction<
  typeof FETCH_TV_SHOW_RECOMMENDATIONS,
  TvShowsList
>
// FETCH_TV_SHOW_REVIEWS
export type FetchTvShowReviewsAction = AxiosAction<
  typeof FETCH_TV_SHOW_REVIEWS,
  ReviewListResponse
>
export type AsyncFetchTvShowReviewsAction = AsyncAxiosAction<
  typeof FETCH_TV_SHOW_REVIEWS,
  ReviewListResponse
>
// FETCH_TV_SHOW_SIMILAR
export type FetchSimilarTvShowsAction = AxiosAction<
  typeof FETCH_TV_SHOW_SIMILAR,
  TvShowsList
>
export type AsyncFetchSimilarTvShowsAction = AsyncAxiosAction<
  typeof FETCH_TV_SHOW_SIMILAR,
  TvShowsList
>
// FETCH_TV_SHOW_VIDEOS
export type FetchTvShowVideosAction = AxiosAction<
  typeof FETCH_TV_SHOW_VIDEOS,
  VideosResponse
>
export type AsyncFetchTvShowVideosAction = AsyncAxiosAction<
  typeof FETCH_TV_SHOW_VIDEOS,
  VideosResponse
>

export type FetchTvShowsAction = AxiosAction<typeof FETCH_TV_SHOWS, TvShowsList>
export type AsyncFetchTvShowsAction = AsyncAxiosAction<
  typeof FETCH_TV_SHOWS,
  TvShowsList
>

export type FetchTvShowsGenreAction = AxiosAction<
  typeof FETCH_TV_GENRES,
  { genres: Genre[] }
>
export type AsyncFetchTvShowsGenreAction = AsyncAxiosAction<
  typeof FETCH_TV_GENRES,
  { genres: Genre[] }
>

export type TvShowsActionTypes =
  | FetchTvShowCreditsAction
  | AsyncFetchTvShowCreditsAction
  | FetchTvShowVideosAction
  | AsyncFetchTvShowVideosAction
  | FetchSimilarTvShowsAction
  | AsyncFetchSimilarTvShowsAction
  | FetchTvShowKeywordAction
  | AsyncFetchTvShowKeywordAction
  | FetchTvShowReviewsAction
  | AsyncFetchTvShowReviewsAction
  | FetchTvShowRecommendationsAction
  | AsyncFetchTvShowRecommendationsAction
  | FetchTvShowExternalIdsAction
  | AsyncFetchTvShowExternalIdsAction
  | AsyncFetchTvShowDetailsAction
  | FetchTvShowDetailsAction
  | FetchTvShowsAction
  | AsyncFetchTvShowsAction
  | FetchTvShowsGenreAction
  | AsyncFetchTvShowsGenreAction
