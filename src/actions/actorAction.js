import { client } from './'
import { GET_ACTOR_PROFILE, GET_ACTOR_CREDIT_MOVIES } from './actionsType'

export function getPeopleProfile(person_id) {
  return (dispatch) => {
    dispatch({
      type: GET_ACTOR_PROFILE,
      payload: client.get(`/person/${person_id}`),
    })
  }
}

export function getActorCreditMovies(id) {
  return (dispatch) => {
    dispatch({
      type: GET_ACTOR_CREDIT_MOVIES,
      payload: client.get(`/person/${id}/movie_credits`),
    })
  }
}
