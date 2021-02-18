import { FetchTvShowRecommendationsAction } from './../actions/actionsType'
import { Reducer } from 'redux'
import {
  FETCH_TV_SHOW_DETAILS,
  FETCH_TV_SHOW_CREDITS,
  FETCH_TV_SHOW_VIDEOS,
  FETCH_TV_SHOW_RECOMMENDATIONS,
  FetchTvShowCreditsAction,
  FetchTvShowDetailsAction,
  TvShowsActionTypes,
  FetchTvShowVideosAction,
} from '@actions/actionsType'
import { TvShowDetails, TvShow } from '@models/tv'
import { CreditCast } from '@models/credit'
import { Video } from '@models/movie'

export interface TvShowState {
  loading: boolean
  tvShow: TvShowDetails
  cast: CreditCast[]
  video: Video | undefined
  recommendations: TvShow[]
}

const defaultState: TvShowState = {
  loading: false,
  tvShow: {} as TvShowDetails,
  cast: [],
  video: undefined,
  recommendations: [],
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
    case `${FETCH_TV_SHOW_VIDEOS}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        video: (action as FetchTvShowVideosAction).payload.data.results.filter(
          (v) => v.site === 'YouTube'
        )[0],
      }
    }
    case `${FETCH_TV_SHOW_RECOMMENDATIONS}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        recommendations: (action as FetchTvShowRecommendationsAction).payload
          .data.results,
      }
    }
    default:
      return state
  }
}

export default tvShowReducer
