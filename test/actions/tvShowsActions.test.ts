import { RootState } from '@src/reducers'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createPromise } from 'redux-promise-middleware'
import * as actions from '@actions/tvShowsActions'
import * as types from '@actions/actionsType'

import { client } from '@actions/index'
jest.mock('@actions/index')

const mockedClient = client as jest.Mocked<typeof client>

describe('tvShowsActions', () => {
  const resp = { data: [] }
  const middlewares = [thunk, createPromise()]
  const mockStore = configureStore<RootState, any>(middlewares)
  let store

  beforeEach(() => {
    store = mockStore({} as RootState)
  })

  afterEach(() => {
    jest.mock('@actions/index').resetAllMocks()
  })

  describe('fetchTvShows()', () => {
    const baseAction = types.FETCH_TV_SHOWS
    it('should create a fulfilled action to fetch tv shows', () => {
      mockedClient.get.mockResolvedValueOnce(resp)

      return store.dispatch(actions.fetchTvShows()).then(() => {
        const dispatchedActions = store.getActions()

        const actionTypes = dispatchedActions.map((action) => action.type)

        expect(actionTypes).toEqual([
          `${baseAction}_PENDING`,
          `${baseAction}_FULFILLED`,
        ])
      })
    })

    it('should create a rejected action to fetch tv shows', () => {
      mockedClient.get.mockResolvedValue(resp)

      return store.dispatch(actions.fetchTvShows()).catch(() => {
        const dispatchedActions = store.getActions()

        const actionTypes = dispatchedActions.map((action) => action.type)

        expect(actionTypes).toEqual([
          `${baseAction}_PENDING`,
          `${baseAction}_REJECTED`,
        ])
      })
    })
  })

  describe('fetchTvGenres()', () => {
    const baseAction = types.FETCH_TV_GENRES
    it('should create a fulfilled action to fetch the tv genres', () => {
      mockedClient.get.mockResolvedValueOnce(resp)

      return store.dispatch(actions.fetchTvGenres()).then(() => {
        const dispatchedActions = store.getActions()

        const actionTypes = dispatchedActions.map((action) => action.type)

        expect(actionTypes).toEqual([
          `${baseAction}_PENDING`,
          `${baseAction}_FULFILLED`,
        ])
      })
    })

    it('should create a rejected action to fetch the tv genres', () => {
      mockedClient.get.mockRejectedValue(resp)

      return store.dispatch(actions.fetchTvGenres()).catch(() => {
        const dispatchedActions = store.getActions()

        const actionTypes = dispatchedActions.map((action) => action.type)

        expect(actionTypes).toEqual([
          `${baseAction}_PENDING`,
          `${baseAction}_REJECTED`,
        ])
      })
    })
  })
})
