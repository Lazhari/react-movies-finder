import {
  FetchTvShowCreditsAction,
  FETCH_TV_SHOW_CREDITS,
} from './../actions/actionsType'
import { Reducer } from 'redux'
import {
  FETCH_TV_SHOW_DETAILS,
  FetchTvShowDetailsAction,
  TvShowsActionTypes,
} from '@actions/actionsType'
import { TvShowDetails } from '@models/tv'
import { CreditCast } from '@src/models/credit'

export interface TvShowState {
  loading: boolean
  tvShow: TvShowDetails
  cast: CreditCast[]
}

const defaultState: TvShowState = {
  loading: false,
  tvShow: {} as TvShowDetails,
  cast: [],
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
    case `${FETCH_TV_SHOW_CREDITS}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        cast: (action as FetchTvShowCreditsAction).payload.data.cast,
      }
    }
    default:
      return state
  }
}

export default tvShowReducer
