import { ThunkAction } from 'redux-thunk'

import { MovieDetails } from '@models/movie'
import { RootState } from '@src/reducers'
import { client } from '.'
import {
  FETCH_MOVIE_DETAILS,
  FETCH_MOVIE_VIDEOS,
  FETCH_RELATED_MOVIES,
  FETCH_MOVIE_CAST,
  FETCH_MOVIE_REVIEWS,
  CLEANING_MOVIE_STATE,
  MovieActionTypes,
} from './actionsType'
import {
  CreditsResponse,
  MoviesListResponse,
  ReviewListResponse,
  VideosResponse,
} from './types'

export function fetchMovie(
  id: number
): ThunkAction<void, RootState, unknown, MovieActionTypes> {
  return (dispatch) => {
    dispatch({
      type: FETCH_MOVIE_DETAILS,
      payload: client.get<MovieDetails>(`/movie/${id}`),
    })
  }
}

export function fetchMovieVideos(
  id: number
): ThunkAction<void, RootState, unknown, MovieActionTypes> {
  return (dispatch) => {
    dispatch({
      type: FETCH_MOVIE_VIDEOS,
      payload: client.get<VideosResponse>(`/movie/${id}/videos`),
    })
  }
}

export function fetchMovieReviews(
  id: number
): ThunkAction<void, RootState, unknown, MovieActionTypes> {
  return (dispatch) => {
    dispatch({
      type: FETCH_MOVIE_REVIEWS,
      payload: client.get<ReviewListResponse>(`/movie/${id}/reviews`),
    })
  }
}

export function fetchRelatedMovies(
  id: number
): ThunkAction<void, RootState, unknown, MovieActionTypes> {
  return (dispatch) => {
    dispatch({
      type: FETCH_RELATED_MOVIES,
      payload: client.get<MoviesListResponse>(`/movie/${id}/similar`),
    })
  }
}

export function fetchMovieActors(
  id: number
): ThunkAction<void, RootState, unknown, MovieActionTypes> {
  return (dispatch) => {
    dispatch({
      type: FETCH_MOVIE_CAST,
      payload: client.get<CreditsResponse>(`/movie/${id}/credits`),
    })
  }
}

export function cleaningMovieReducer(): ThunkAction<
  void,
  RootState,
  unknown,
  MovieActionTypes
> {
  return (dispatch) => {
    dispatch({
      type: CLEANING_MOVIE_STATE,
      payload: {},
    })
  }
}
