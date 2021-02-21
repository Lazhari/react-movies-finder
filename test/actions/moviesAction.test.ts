import { RootState } from '@src/reducers'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createPromise } from 'redux-promise-middleware'
import * as actions from '@actions/moviesActions'
import * as types from '@actions/actionsType'

import { client } from '@actions/index'

jest.mock('@actions/index')

const mockedClient = client as jest.Mocked<typeof client>

describe('moviesActions', () => {
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

  describe('fetchGenre()', () => {
    it('should create fulfilled action to fetch genres', async () => {
      mockedClient.get.mockResolvedValueOnce(resp)

      return store.dispatch(actions.fetchGenre()).then(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${types.FETCH_GENRE}_PENDING`,
          `${types.FETCH_GENRE}_FULFILLED`,
        ])
      })
    })

    it('should create rejected action to fetch genres', async () => {
      mockedClient.get.mockRejectedValue(new Error())

      return store.dispatch(actions.fetchGenre()).catch(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${types.FETCH_GENRE}_PENDING`,
          `${types.FETCH_GENRE}_REJECTED`,
        ])
      })
    })
  })

  describe('fetchMovies()', () => {
    it('should create fulfilled action to fetch movies', async () => {
      mockedClient.get.mockResolvedValueOnce(resp)

      return store.dispatch(actions.fetchMovies()).then(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${types.FETCH_MOVIES}_PENDING`,
          `${types.FETCH_MOVIES}_FULFILLED`,
        ])
      })
    })

    it('should create rejected action to fetch movies', async () => {
      mockedClient.get.mockRejectedValue(new Error())

      return store.dispatch(actions.fetchMovies()).catch(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${types.FETCH_MOVIES}_PENDING`,
          `${types.FETCH_MOVIES}_REJECTED`,
        ])
      })
    })
  })

  describe('fetchMoviesByGenre()', () => {
    it('should create fulfilled action to fetch movies by a genre', async () => {
      mockedClient.get.mockResolvedValueOnce(resp)

      return store.dispatch(actions.fetchMoviesByGenre()).then(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${types.FETCH_MOVIES_BY_GENRE}_PENDING`,
          `${types.FETCH_MOVIES_BY_GENRE}_FULFILLED`,
        ])
      })
    })

    it('should create rejected action to fetch movies by a genre', async () => {
      mockedClient.get.mockRejectedValue(new Error())

      return store.dispatch(actions.fetchMoviesByGenre()).catch(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${types.FETCH_MOVIES_BY_GENRE}_PENDING`,
          `${types.FETCH_MOVIES_BY_GENRE}_REJECTED`,
        ])
      })
    })
  })
})
