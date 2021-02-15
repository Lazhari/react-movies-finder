import { RootState } from '@src/reducers'
import { client } from '.'
import { ActorMovieCreditsResponse } from './types'
import {
  GET_ACTOR_PROFILE,
  GET_ACTOR_CREDIT_MOVIES,
  AsyncActorActionTypes,
} from './actionsType'
import { Actor } from '@models/actor'
import { ThunkAction } from 'redux-thunk'
/**
 * Get the primary person details by id.
 * @param person_id - The person Id
 */
export function getPeopleProfile(
  personId: number
): ThunkAction<void, RootState, unknown, AsyncActorActionTypes> {
  return (dispatch) => {
    dispatch({
      type: GET_ACTOR_PROFILE,
      payload: client.get<Actor>(`/person/${personId}`),
    })
  }
}

/**
 * Get the movie credits for a person.
 */
export function getActorCreditMovies(
  personId: number
): ThunkAction<void, RootState, unknown, AsyncActorActionTypes> {
  return (dispatch) => {
    dispatch({
      type: GET_ACTOR_CREDIT_MOVIES,
      payload: client.get<ActorMovieCreditsResponse>(
        `/person/${personId}/movie_credits`
      ),
    })
  }
}
