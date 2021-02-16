import { Reducer } from 'redux'
import {
  FETCH_TV_SHOW_DETAILS,
  FetchTvShowDetailsAction,
  TvShowsActionTypes,
} from '@actions/actionsType'
import { TvShowDetails } from '@models/tv'

export interface TvShowState {
  loading: boolean
  tvShow: TvShowDetails
}

const defaultState: TvShowState = {
  loading: false,
  tvShow: {} as TvShowDetails,
}

const tvShowReducer: Reducer<TvShowState, TvShowsActionTypes> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case `${FETCH_TV_SHOW_DETAILS}_PENDING`: {
      return {
        ...state,
        loading: true,
      }
    }
    case `${FETCH_TV_SHOW_DETAILS}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        tvShow: (action as FetchTvShowDetailsAction).payload.data,
      }
    }
    default:
      return state
  }
}

export default tvShowReducer
