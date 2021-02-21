import { RootState } from '@src/reducers'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createPromise } from 'redux-promise-middleware'
import * as actions from '@actions/tvShowAction'
import * as types from '@actions/actionsType'

import { client } from '@actions/index'

jest.mock('@actions/index')

const mockedClient = client as jest.Mocked<typeof client>

describe('tvShowActions', () => {
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

  describe('getTvShowDetails()', () => {
    it('should create fulfilled action to get tv show details', async () => {
      mockedClient.get.mockResolvedValueOnce(resp)

      return store.dispatch(actions.getTvShowDetails(12)).then(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${types.FETCH_TV_SHOW_DETAILS}_PENDING`,
          `${types.FETCH_TV_SHOW_DETAILS}_FULFILLED`,
        ])
      })
    })

    it('should create rejected action to get tv show details', async () => {
      mockedClient.get.mockRejectedValue(new Error())

      return store.dispatch(actions.getTvShowDetails(12)).catch(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${types.FETCH_TV_SHOW_DETAILS}_PENDING`,
          `${types.FETCH_TV_SHOW_DETAILS}_REJECTED`,
        ])
      })
    })
  })

  describe('getTvShowCredits()', () => {
    it('should create fulfilled action to get tv show credits', async () => {
      mockedClient.get.mockResolvedValueOnce(resp)

      return store.dispatch(actions.getTvShowCredits(12)).then(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${types.FETCH_TV_SHOW_CREDITS}_PENDING`,
          `${types.FETCH_TV_SHOW_CREDITS}_FULFILLED`,
        ])
      })
    })

    it('should create rejected action to get tv show credits', async () => {
      mockedClient.get.mockRejectedValue(new Error())

      return store.dispatch(actions.getTvShowCredits(12)).catch(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${types.FETCH_TV_SHOW_CREDITS}_PENDING`,
          `${types.FETCH_TV_SHOW_CREDITS}_REJECTED`,
        ])
      })
    })
  })

  describe('getTvShowExternalIds()', () => {
    it('should create fulfilled action to get tv show external IDs', async () => {
      mockedClient.get.mockResolvedValueOnce(resp)

      return store.dispatch(actions.getTvShowExternalIds(12)).then(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${types.FETCH_TV_SHOW_EXTERNAL_IDS}_PENDING`,
          `${types.FETCH_TV_SHOW_EXTERNAL_IDS}_FULFILLED`,
        ])
      })
    })

    it('should create rejected action to get tv show external IDs', async () => {
      mockedClient.get.mockRejectedValue(new Error())

      return store.dispatch(actions.getTvShowExternalIds(12)).catch(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${types.FETCH_TV_SHOW_EXTERNAL_IDS}_PENDING`,
          `${types.FETCH_TV_SHOW_EXTERNAL_IDS}_REJECTED`,
        ])
      })
    })
  })

  describe('getTvShowKeywords()', () => {
    const baseAction = types.FETCH_TV_SHOW_KEYWORDS

    it('should create fulfilled action to get tv show keywords', async () => {
      mockedClient.get.mockResolvedValueOnce(resp)

      return store.dispatch(actions.getTvShowKeywords(12)).then(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${baseAction}_PENDING`,
          `${baseAction}_FULFILLED`,
        ])
      })
    })

    it('should create rejected action to get tv show keywords', async () => {
      mockedClient.get.mockRejectedValue(new Error())

      return store.dispatch(actions.getTvShowKeywords(12)).catch(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${baseAction}_PENDING`,
          `${baseAction}_REJECTED`,
        ])
      })
    })
  })

  describe('getTvShowRecommendations()', () => {
    const baseAction = types.FETCH_TV_SHOW_RECOMMENDATIONS

    it('should create fulfilled action to get tv show recommendations', async () => {
      mockedClient.get.mockResolvedValueOnce(resp)

      return store.dispatch(actions.getTvShowRecommendations(12)).then(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${baseAction}_PENDING`,
          `${baseAction}_FULFILLED`,
        ])
      })
    })

    it('should create rejected action to get tv show recommendations', async () => {
      mockedClient.get.mockRejectedValue(new Error())

      return store.dispatch(actions.getTvShowRecommendations(12)).catch(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${baseAction}_PENDING`,
          `${baseAction}_REJECTED`,
        ])
      })
    })
  })

  describe('getTvShowReviews()', () => {
    const baseAction = types.FETCH_TV_SHOW_REVIEWS

    it('should create fulfilled action to get tv show reviews', async () => {
      mockedClient.get.mockResolvedValueOnce(resp)

      return store.dispatch(actions.getTvShowReviews(12)).then(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${baseAction}_PENDING`,
          `${baseAction}_FULFILLED`,
        ])
      })
    })

    it('should create rejected action to get tv show reviews', async () => {
      mockedClient.get.mockRejectedValue(new Error())

      return store.dispatch(actions.getTvShowReviews(12)).catch(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${baseAction}_PENDING`,
          `${baseAction}_REJECTED`,
        ])
      })
    })
  })

  describe('getTvShowSimilar()', () => {
    const baseAction = types.FETCH_TV_SHOW_SIMILAR

    it('should create fulfilled action to get tv show similar', async () => {
      mockedClient.get.mockResolvedValueOnce(resp)

      return store.dispatch(actions.getTvShowSimilar(12)).then(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${baseAction}_PENDING`,
          `${baseAction}_FULFILLED`,
        ])
      })
    })

    it('should create rejected action to get tv show similar', async () => {
      mockedClient.get.mockRejectedValue(new Error())

      return store.dispatch(actions.getTvShowSimilar(12)).catch(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${baseAction}_PENDING`,
          `${baseAction}_REJECTED`,
        ])
      })
    })
  })

  describe('getTvShowVideos()', () => {
    const baseAction = types.FETCH_TV_SHOW_VIDEOS

    it('should create fulfilled action to get tv show videos', async () => {
      mockedClient.get.mockResolvedValueOnce(resp)

      return store.dispatch(actions.getTvShowVideos(12)).then(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${baseAction}_PENDING`,
          `${baseAction}_FULFILLED`,
        ])
      })
    })

    it('should create rejected action to get tv show videos', async () => {
      mockedClient.get.mockRejectedValue(new Error())

      return store.dispatch(actions.getTvShowVideos(12)).catch(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${baseAction}_PENDING`,
          `${baseAction}_REJECTED`,
        ])
      })
    })
  })
})
