import { MovieDetails, Video } from '@models/movie'
import reducer, { MovieState } from '@reducers/movieReducer'
import * as types from '@actions/actionsType'

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

describe('movie reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as types.MovieActionTypes)).toEqual(
      defaultState
    )
  })

  it('should handle the FETCH_MOVIE_DETAILS_PENDING', () => {
    expect(
      reducer(
        {} as MovieState,
        {
          type: `${types.FETCH_MOVIE_DETAILS}_PENDING`,
          payload: {},
        } as types.MovieActionTypes
      )
    ).toEqual({
      loading: true,
    })
  })

  it('should handle the FETCH_MOVIE_CAST_PENDING', () => {
    expect(
      reducer(
        {} as MovieState,
        {
          type: `${types.FETCH_MOVIE_CAST}_PENDING`,
          payload: {},
        } as types.MovieActionTypes
      )
    ).toEqual({
      loading: true,
    })
  })

  it('should handle the FETCH_MOVIE_VIDEOS_PENDING', () => {
    expect(
      reducer(
        {} as MovieState,
        {
          type: `${types.FETCH_MOVIE_VIDEOS}_PENDING`,
          payload: {},
        } as types.MovieActionTypes
      )
    ).toEqual({
      loading: true,
    })
  })

  it('should handle the FETCH_MOVIE_REVIEWS_PENDING', () => {
    expect(
      reducer(
        {} as MovieState,
        {
          type: `${types.FETCH_MOVIE_REVIEWS}_PENDING`,
          payload: {},
        } as types.MovieActionTypes
      )
    ).toEqual({
      loading: true,
    })
  })

  it('should handle the FETCH_RELATED_MOVIES_PENDING', () => {
    expect(
      reducer(
        {} as MovieState,
        {
          type: `${types.FETCH_RELATED_MOVIES}_PENDING`,
          payload: {},
        } as types.MovieActionTypes
      )
    ).toEqual({
      loading: true,
    })
  })

  it('should handle the FETCH_MOVIE_VIDEOS_FULFILLED', () => {
    const results = [
      { site: 'YouTube', id: '1' },
      { site: 'Vem', id: '2' },
    ]
    expect(
      reducer(
        {} as MovieState,
        {
          type: `${types.FETCH_MOVIE_VIDEOS}_FULFILLED`,
          payload: {
            data: {
              results,
            },
          },
        } as types.MovieActionTypes
      )
    ).toEqual({
      loading: false,
      videos: results,
      trailer: { site: 'YouTube', id: '1' },
    })
  })

  it('should handle the FETCH_RELATED_MOVIES_FULFILLED', () => {
    expect(
      reducer(
        {} as MovieState,
        {
          type: `${types.FETCH_RELATED_MOVIES}_FULFILLED`,
          payload: {
            data: {
              results: [],
            },
          },
        } as types.MovieActionTypes
      )
    ).toEqual({
      loading: false,
      relatedMovies: [],
    })
  })

  it('should handle the FETCH_MOVIE_REVIEWS_FULFILLED', () => {
    expect(
      reducer(
        {} as MovieState,
        {
          type: `${types.FETCH_MOVIE_REVIEWS}_FULFILLED`,
          payload: {
            data: {
              results: [],
            },
          },
        } as types.MovieActionTypes
      )
    ).toEqual({
      loading: false,
      reviews: [],
    })
  })

  it('should handle the FETCH_MOVIE_CAST_FULFILLED', () => {
    expect(
      reducer(
        {} as MovieState,
        {
          type: `${types.FETCH_MOVIE_CAST}_FULFILLED`,
          payload: {
            data: {
              cast: [],
            },
          },
        } as types.MovieActionTypes
      )
    ).toEqual({
      loading: false,
      actors: [],
    })
  })

  it('should handle the CLEANING_MOVIE_STATE', () => {
    expect(
      reducer(
        {} as MovieState,
        {
          type: types.CLEANING_MOVIE_STATE,
        } as types.MovieActionTypes
      )
    ).toEqual(defaultState)
  })
})
