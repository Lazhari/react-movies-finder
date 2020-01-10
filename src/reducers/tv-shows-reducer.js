import { FETCH_TV_SHOWS } from "../actions/actionsType";
const defaultState = {
  tvShows: [],
  loading: false,
  page: 1,
  totalPages: 1,
  totalResults: 0,
  genreId: 0
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case `${FETCH_TV_SHOWS}_PENDING`: {
      return {
        ...state,
        loading: true
      };
    }
    case `${FETCH_TV_SHOWS}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        tvShows: action.payload.data.results,
        page: action.payload.data.page,
        totalPages: action.payload.data.total_pages,
        totalResults: action.payload.data.total_results
      };
    }
    default: {
      return state;
    }
  }
};
