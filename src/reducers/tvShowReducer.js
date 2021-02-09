import { FETCH_TV_SHOW_DETAILS } from '../actions/actionsType'

const defaultState = {
  loading: false,
  tvShow: {},
}

function tvShowReducer(state = defaultState, action = {}) {
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
        tvShow: action.payload.data,
      }
    }
    default:
      return state
  }
}

export default tvShowReducer
