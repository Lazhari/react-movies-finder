import {
  GET_ACTOR_PROFILE,
  GET_ACTOR_CREDIT_MOVIES,
  ActorActionTypes,
  GetActorCreditMovies,
} from '@actions/actionsType'
import { Actor, Cast } from '@src/models/actor'
import { Reducer } from 'redux'

export interface ActorState {
  loading: boolean
  profile: Actor
  movies: Cast[]
}

const defaultState: ActorState = {
  loading: false,
  profile: {} as Actor,
  movies: [],
}

const actorReducer: Reducer<ActorState, ActorActionTypes> = (
  state: ActorState = defaultState,
  action: ActorActionTypes
) => {
  switch (action.type) {
    case `${GET_ACTOR_PROFILE}_PENDING`:
    case `${GET_ACTOR_CREDIT_MOVIES}_PENDING`: {
      return {
        ...state,
        loading: true,
      }
    }
    case `${GET_ACTOR_PROFILE}_FULFILLED`: {
      return {
        ...state,
        profile: action.payload.data as Actor,
        loading: false,
      }
    }
    case `${GET_ACTOR_CREDIT_MOVIES}_FULFILLED`: {
      return {
        ...state,
        movies: (action as GetActorCreditMovies).payload.data.cast,
        loading: false,
      }
    }
    default: {
      return state
    }
  }
}

export default actorReducer
