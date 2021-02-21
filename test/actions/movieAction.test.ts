import { RootState } from '@src/reducers'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createPromise } from 'redux-promise-middleware'
import * as actions from '@actions/movieAction'
import * as types from '@actions/actionsType'

import { client } from '@actions/index'

jest.mock('@actions/index')

const mockedClient = client as jest.Mocked<typeof client>

describe('movieActions', () => {
  const resp = { data: { name: 'X Test' } }
  const middlewares = [thunk, createPromise()]
  const mockStore = configureStore<RootState, any>(middlewares)
  let store

  beforeEach(() => {
    store = mockStore({} as RootState)
  })

  afterEach(() => {
    jest.mock('@actions/index').resetAllMocks()
  })

  describe('fetchMovie()', () => {
    it('should create fulfilled action to fetch movie', async () => {
      mockedClient.get.mockResolvedValueOnce(resp)

      return store.dispatch(actions.fetchMovie(12)).then(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${types.FETCH_MOVIE_DETAILS}_PENDING`,
          `${types.FETCH_MOVIE_DETAILS}_FULFILLED`,
        ])
      })
    })

    it('should create rejected action to fetch movie', async () => {
      mockedClient.get.mockRejectedValue(new Error())

      return store.dispatch(actions.fetchMovie(12)).catch(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${types.FETCH_MOVIE_DETAILS}_PENDING`,
          `${types.FETCH_MOVIE_DETAILS}_REJECTED`,
        ])
      })
    })
  })

  describe('fetchMovieVideos()', () => {
    it('should create fulfilled action to fetch movie videos', async () => {
      mockedClient.get.mockResolvedValueOnce(resp)

      return store.dispatch(actions.fetchMovieVideos(12)).then(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${types.FETCH_MOVIE_VIDEOS}_PENDING`,
          `${types.FETCH_MOVIE_VIDEOS}_FULFILLED`,
        ])
      })
    })

    it('should create rejected action to fetch movie videos', async () => {
      mockedClient.get.mockRejectedValue(new Error())

      return store.dispatch(actions.fetchMovieVideos(12)).catch(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${types.FETCH_MOVIE_VIDEOS}_PENDING`,
          `${types.FETCH_MOVIE_VIDEOS}_REJECTED`,
        ])
      })
    })
  })

  describe('fetchMovieReviews()', () => {
    it('should create fulfilled action to fetch movie reviews', async () => {
      mockedClient.get.mockResolvedValueOnce(resp)

      return store.dispatch(actions.fetchMovieReviews(12)).then(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${types.FETCH_MOVIE_REVIEWS}_PENDING`,
          `${types.FETCH_MOVIE_REVIEWS}_FULFILLED`,
        ])
      })
    })

    it('should create rejected action to fetch movie reviews', async () => {
      mockedClient.get.mockRejectedValue(new Error())

      return store.dispatch(actions.fetchMovieReviews(12)).catch(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${types.FETCH_MOVIE_REVIEWS}_PENDING`,
          `${types.FETCH_MOVIE_REVIEWS}_REJECTED`,
        ])
      })
    })
  })

  describe('fetchRelatedMovies()', () => {
    it('should create fulfilled action to fetch related movies', async () => {
      mockedClient.get.mockResolvedValueOnce(resp)

      return store.dispatch(actions.fetchRelatedMovies(12)).then(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${types.FETCH_RELATED_MOVIES}_PENDING`,
          `${types.FETCH_RELATED_MOVIES}_FULFILLED`,
        ])
      })
    })

    it('should create rejected action to fetch movie related movies', async () => {
      mockedClient.get.mockRejectedValue(new Error())

      return store.dispatch(actions.fetchRelatedMovies(12)).catch(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${types.FETCH_RELATED_MOVIES}_PENDING`,
          `${types.FETCH_RELATED_MOVIES}_REJECTED`,
        ])
      })
    })
  })

  describe('fetchMovieActors()', () => {
    it('should create fulfilled action to fetch movie actors', async () => {
      mockedClient.get.mockResolvedValueOnce(resp)

      return store.dispatch(actions.fetchMovieActors(12)).then(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${types.FETCH_MOVIE_CAST}_PENDING`,
          `${types.FETCH_MOVIE_CAST}_FULFILLED`,
        ])
      })
    })

    it('should create rejected action to fetch movie actors', async () => {
      mockedClient.get.mockRejectedValue(new Error())

      return store.dispatch(actions.fetchMovieActors(12)).catch(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${types.FETCH_MOVIE_CAST}_PENDING`,
          `${types.FETCH_MOVIE_CAST}_REJECTED`,
        ])
      })
    })
  })
  describe('cleaningMovieReducer()', () => {
    it('should create clean the movie reducer', async () => {
      mockedClient.get.mockResolvedValueOnce(resp)
      store.dispatch(actions.cleaningMovieReducer())

      const dispatchedActions = store.getActions()
      const actionsTypes = dispatchedActions.map((action) => action.type)

      expect(actionsTypes).toEqual([types.CLEANING_MOVIE_STATE])
    })
  })
})
