import {
  FETCH_MOVIE_DETAILS,
  FETCH_MOVIE_VIDEOS,
  FETCH_MOVIE_REVIEWS,
  FETCH_RELATED_MOVIES,
  FETCH_MOVIE_CAST,
  CLEANING_MOVIE_STATE,
  MovieActionTypes,
  FetchMovieDetailsAction,
  FetchMovieVideosAction,
  FetchMovieReviewsAction,
  FetchRelatedMoviesAction,
  FetchMovieCastAction,
} from '@actions/actionsType'
import { Genre, ProductionCompany } from '@models/common'
import { CreditCast } from '@models/credit'
import { Movie, MovieDetails, Video } from '@models/movie'
import { Review } from '@models/review'
import { Reducer } from 'redux'

export interface MovieState {
  loading: boolean
  movie: MovieDetails
  genres: Genre[]
  productionCompanies: ProductionCompany[]
  videos: Video[]
  trailer: Video
  reviews: Review[]
  relatedMovies: Movie[]
  actors: CreditCast[]
}

const defaultState: MovieState = {
  loading: false,
  movie: {} as MovieDetails,
  genres: [],
  productionCompanies: [],
  videos: [],
  trailer: {} as Video,
  reviews: [],
  relatedMovies: [],
  actors: [],
}

const movieReducer: Reducer<MovieState, MovieActionTypes> = (
  state: MovieState = defaultState,
  action: MovieActionTypes
) => {
  switch (action.type) {
    case `${FETCH_MOVIE_DETAILS}_PENDING`:
    case `${FETCH_MOVIE_CAST}_PENDING`:
    case `${FETCH_MOVIE_VIDEOS}_PENDING`:
    case `${FETCH_MOVIE_REVIEWS}_PENDING`:
    case `${FETCH_RELATED_MOVIES}_PENDING`: {
      return {
        ...state,
        loading: true,
      }
    }
    case `${FETCH_MOVIE_DETAILS}_FULFILLED`: {
      const { data } = (action as FetchMovieDetailsAction).payload
      return {
        ...state,
        loading: false,
        movie: data,
        genres: data.genres,
        productionCompanies: data.production_companies,
      }
    }

    case `${FETCH_MOVIE_VIDEOS}_FULFILLED`: {
      const trailer = (action as FetchMovieVideosAction).payload.data.results.filter(
        (video) => video.site === 'YouTube'
      )[0]
      return {
        ...state,
        loading: false,
        videos: (action as FetchMovieVideosAction).payload.data.results,
        trailer: trailer,
      }
    }

    case `${FETCH_MOVIE_REVIEWS}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        reviews: (action as FetchMovieReviewsAction).payload.data.results,
      }
    }

    case `${FETCH_RELATED_MOVIES}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        relatedMovies: (action as FetchRelatedMoviesAction).payload.data
          .results,
      }
    }
    case `${FETCH_MOVIE_CAST}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        actors: (action as FetchMovieCastAction).payload.data.cast.splice(0, 8),
      }
    }
    case CLEANING_MOVIE_STATE: {
      return {
        ...state,
        ...defaultState,
      }
    }
    default: {
      return state
    }
  }
}

export default movieReducer
