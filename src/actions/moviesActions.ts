import { RootState } from '@src/reducers'
import { MoviesListResponse } from './types'
import { Genre } from '@models/common'
import { client } from '.'
import {
  FETCH_MOVIES,
  FETCH_GENRE,
  FETCH_MOVIES_BY_GENRE,
  MoviesActionTypes,
} from './actionsType'
import { ThunkAction } from 'redux-thunk'

export function fetchGenre(): ThunkAction<
  void,
  RootState,
  unknown,
  MoviesActionTypes
> {
  return (dispatch) => {
    dispatch({
      type: FETCH_GENRE,
      payload: client.get<{ genres: Genre[] }>('/genre/movie/list'),
    })
  }
}

export function fetchMovies(
  page = 1,
  type = 'popular'
): ThunkAction<void, RootState, unknown, MoviesActionTypes> {
  return (dispatch) => {
    dispatch({
      type: FETCH_MOVIES,
      payload: client.get<MoviesListResponse>(`/movie/${type}`, {
        params: {
          page,
        },
      }),
    })
  }
}

export function fetchMoviesByGenre(
  page = 1,
  genreId = ''
): ThunkAction<void, RootState, unknown, MoviesActionTypes> {
  return (dispatch) => {
    dispatch({
      type: FETCH_MOVIES_BY_GENRE,
      payload: client.get<MoviesListResponse>(`/genre/${genreId}/movies`, {
        params: {
          page,
          include_adult: false,
          sort_by: 'created_at.asc',
        },
      }),
      genreId,
    })
  }
}
