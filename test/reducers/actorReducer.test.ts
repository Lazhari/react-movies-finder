import { ActorState } from '@reducers/actorReducer'
import reducer from '@reducers/actorReducer'
import * as types from '@actions/actionsType'

describe('actor reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as types.ActorActionTypes)).toEqual({
      loading: false,
      profile: {},
      movies: [],
    })
  })

  it('should handle the GET_ACTOR_PROFILE_PENDING', () => {
    expect(
      reducer(
        {} as ActorState,
        {
          type: `${types.GET_ACTOR_PROFILE}_PENDING`,
          payload: {},
        } as types.ActorActionTypes
      )
    ).toEqual({
      loading: true,
    })
  })

  it('should handle the GET_ACTOR_PROFILE_FULFILLED', () => {
    expect(
      reducer(
        {} as ActorState,
        {
          type: `${types.GET_ACTOR_PROFILE}_FULFILLED`,
          payload: {
            data: {
              name: 'Test',
            },
          },
        } as types.ActorActionTypes
      )
    ).toEqual({
      loading: false,
      profile: {
        name: 'Test',
      },
    })
  })

  it('should handle the GET_ACTOR_CREDIT_MOVIES_PENDING', () => {
    expect(
      reducer(
        {} as ActorState,
        {
          type: `${types.GET_ACTOR_CREDIT_MOVIES}_PENDING`,
          payload: {},
        } as types.ActorActionTypes
      )
    ).toEqual({
      loading: true,
    })
  })

  it('should handle the GET_ACTOR_CREDIT_MOVIES_FULFILLED', () => {
    expect(
      reducer(
        {} as ActorState,
        {
          type: `${types.GET_ACTOR_CREDIT_MOVIES}_FULFILLED`,
          payload: {
            data: {
              cast: [],
            },
          },
        } as types.ActorActionTypes
      )
    ).toEqual({
      loading: false,
      movies: [],
    })
  })
})
