import { Genre } from '@models/common'
import {
  FETCH_MOVIES,
  FETCH_GENRE,
  FETCH_MOVIES_BY_GENRE,
  MoviesActionTypes,
  FetchGenreAction,
  FetchMoviesAction,
  FetchMoviesByGenreAction,
} from '@actions/actionsType'
import { Movie } from '@models/movie'
import { Reducer } from 'redux'

export interface MoviesState {
  genres: Genre[]
  loading: boolean
  movies: Movie[]
  page: number
  totalPages: number
  totalResults: number
  genreId: number
}

const defaultState: MoviesState = {
  genres: [],
  loading: false,
  movies: [],
  page: 1,
  totalPages: 1,
  totalResults: 0,
  genreId: 0,
}

const moviesReducer: Reducer<MoviesState, MoviesActionTypes> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case `${FETCH_GENRE}_PENDING`:
    case `${FETCH_MOVIES}_PENDING`:
    case `${FETCH_MOVIES_BY_GENRE}_PENDING`: {
      return {
        ...state,
        loading: true,
      }
    }
    case `${FETCH_GENRE}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        genres: (action as FetchGenreAction).payload.data.genres,
      }
    }

    case `${FETCH_MOVIES}_FULFILLED`: {
      const {
        results: movies,
        page,
        total_pages,
        total_results,
      } = (action as FetchMoviesAction).payload.data
      return {
        ...state,
        loading: false,
        movies,
        page,
        totalPages: total_pages,
        totalResults: total_results,
        genreId: 0,
      }
    }

    case `${FETCH_MOVIES_BY_GENRE}_FULFILLED`: {
      const {
        results,
        page,
        total_pages,
        total_results,
        id,
      } = (action as FetchMoviesByGenreAction).payload.data
      return {
        ...state,
        loading: false,
        movies: results,
        page,
        totalPages: total_pages,
        totalResults: total_results,
        genreId: id,
      }
    }
    default: {
      return state
    }
  }
}

export default moviesReducer
