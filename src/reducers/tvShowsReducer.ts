import { Reducer } from 'redux'
import {
  FETCH_TV_SHOWS,
  FETCH_TV_GENRES,
  FetchTvShowsAction,
  FetchTvShowsGenreAction,
  TvShowsActionTypes,
} from '@actions/actionsType'
import { TvShow } from '@models/tv'
import { Genre } from '@models/common'

export interface TvShowsState {
  tvShows: TvShow[]
  genres: Genre[]
  loadingGenres: boolean
  loading: boolean
  page: number
  totalPages: number
  totalResults: number
}

const defaultState: TvShowsState = {
  tvShows: [],
  genres: [],
  loadingGenres: false,
  loading: false,
  page: 1,
  totalPages: 1,
  totalResults: 0,
}

const tvShowsReducer: Reducer<TvShowsState, TvShowsActionTypes> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case `${FETCH_TV_SHOWS}_PENDING`:
    case `${FETCH_TV_GENRES}_PENDING`: {
      return {
        ...state,
        loading: true,
        loadingGenres: true,
      }
    }
    case `${FETCH_TV_SHOWS}_FULFILLED`: {
      const {
        results,
        page,
        total_pages,
        total_results,
      } = (action as FetchTvShowsAction).payload.data
      return {
        ...state,
        loading: false,
        tvShows: results,
        page,
        totalPages: total_pages,
        totalResults: total_results,
      }
    }
    case `${FETCH_TV_GENRES}_FULFILLED`: {
      return {
        ...state,
        loadingGenres: false,
        genres: (action as FetchTvShowsGenreAction).payload.data.genres,
      }
    }
    default: {
      return state
    }
  }
}

export default tvShowsReducer
