import { RootState } from '@src/reducers'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createPromise } from 'redux-promise-middleware'
import * as actions from '@actions/actorAction'
import * as types from '@actions/actionsType'

import { client } from '@actions/index'

jest.mock('@actions/index')

const mockedClient = client as jest.Mocked<typeof client>

describe('actorActions', () => {
  const resp = { data: { name: 'John Snow' } }
  const middlewares = [thunk, createPromise()]
  const mockStore = configureStore<RootState, any>(middlewares)
  let store

  beforeEach(() => {
    store = mockStore({} as RootState)
  })

  afterEach(() => {
    jest.mock('@actions/index').resetAllMocks()
  })

  describe('getPeopleProfile()', () => {
    it('should create fulfilled action to get people profile', async () => {
      mockedClient.get.mockResolvedValueOnce(resp)

      return store.dispatch(actions.getPeopleProfile(4)).then(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${types.GET_ACTOR_PROFILE}_PENDING`,
          `${types.GET_ACTOR_PROFILE}_FULFILLED`,
        ])
      })
    })

    it('should create rejected action to get people profile', async () => {
      mockedClient.get.mockRejectedValue(new Error())

      return store.dispatch(actions.getPeopleProfile(4)).catch(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${types.GET_ACTOR_PROFILE}_PENDING`,
          `${types.GET_ACTOR_PROFILE}_REJECTED`,
        ])
      })
    })
  })

  describe('getActorCreditMovies()', () => {
    it('should create fulfilled action to get actor credits', async () => {
      mockedClient.get.mockResolvedValueOnce(resp)

      return store.dispatch(actions.getActorCreditMovies(4)).then(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${types.GET_ACTOR_CREDIT_MOVIES}_PENDING`,
          `${types.GET_ACTOR_CREDIT_MOVIES}_FULFILLED`,
        ])
      })
    })

    it('should create rejected action to get actor credits', async () => {
      mockedClient.get.mockRejectedValue(new Error())

      return store.dispatch(actions.getActorCreditMovies(4)).catch(() => {
        const dispatchedActions = store.getActions()

        const actionsTypes = dispatchedActions.map((action) => action.type)

        expect(actionsTypes).toEqual([
          `${types.GET_ACTOR_CREDIT_MOVIES}_PENDING`,
          `${types.GET_ACTOR_CREDIT_MOVIES}_REJECTED`,
        ])
      })
    })
  })
})
