import {
  FETCH_MOVIES,
  FETCH_GENRE,
  FETCH_MOVIES_BY_GENRE
} from "../actions/actionsType";
const defaultState = {
  genres: [],
  loading: false,
  movies: [],
  page: 1,
  totalPages: 1,
  totalResults: 0,
  genreId: 0
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case `${FETCH_GENRE}_PENDING`:
    case `${FETCH_MOVIES}_PENDING`:
    case `${FETCH_MOVIES_BY_GENRE}_PENDING`: {
      return {
        ...state,
        loading: true
      };
    }
    case `${FETCH_GENRE}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        genres: action.payload.data.genres
      };
    }

    case `${FETCH_MOVIES}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        movies: action.payload.data.results,
        page: action.payload.data.page,
        totalPages: action.payload.data.total_pages,
        totalResults: action.payload.data.total_results,
        genreId: 0
      };
    }

    case `${FETCH_MOVIES_BY_GENRE}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        movies: action.payload.data.results,
        page: action.payload.data.page,
        totalPages: action.payload.data.total_pages,
        totalResults: action.payload.data.total_results,
        genreId: action.payload.data.id
      };
    }
    default: {
      return state;
    }
  }
};
