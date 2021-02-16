import { RootState } from '@reducers/index'
import { ThunkAction } from 'redux-thunk'
import { client } from '.'
import { Genre } from '@models/common'
import {
  FETCH_TV_SHOWS,
  FETCH_TV_GENRES,
  TvShowsActionTypes,
} from './actionsType'
import { TvShowsList } from './types'

export function fetchTvShows(
  page = 1,
  filters = {}
): ThunkAction<void, RootState, unknown, TvShowsActionTypes> {
  return (dispatch) => {
    dispatch({
      type: FETCH_TV_SHOWS,
      payload: client.get<TvShowsList>('/discover/tv', {
        params: {
          page,
          ...filters,
        },
      }),
    })
  }
}

export function fetchTvGenres(): ThunkAction<
  void,
  RootState,
  unknown,
  TvShowsActionTypes
> {
  return (dispatch) => {
    dispatch({
      type: FETCH_TV_GENRES,
      payload: client.get<{ genres: Genre[] }>('/genre/tv/list'),
    })
  }
}
