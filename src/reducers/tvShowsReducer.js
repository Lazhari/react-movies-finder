import { FETCH_TV_SHOWS, FETCH_TV_GENRES } from '@actions/actionsType'
const defaultState = {
  tvShows: [],
  genres: [],
  loadingGenres: false,
  loading: false,
  page: 1,
  totalPages: 1,
  totalResults: 0,
  genreId: 0,
}

function tvShowsReducer(state = defaultState, action = {}) {
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
      return {
        ...state,
        loading: false,
        tvShows: action.payload.data.results,
        page: action.payload.data.page,
        totalPages: action.payload.data.total_pages,
        totalResults: action.payload.data.total_results,
      }
    }
    case `${FETCH_TV_GENRES}_FULFILLED`: {
      return {
        ...state,
        loadingGenres: false,
        genres: action.payload.data.genres,
      }
    }
    default: {
      return state
    }
  }
}

export default tvShowsReducer
