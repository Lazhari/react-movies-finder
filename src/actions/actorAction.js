import axios from "axios";
import { GET_ACTOR_PROFILE, GET_ACTOR_CREDIT_MOVIES } from "./actionsType";

export function getPeopleProfile(person_id) {
  return dispatch => {
    dispatch({
      type: GET_ACTOR_PROFILE,
      payload: axios.get(
        `https://api.themoviedb.org/3/person/${person_id}?api_key=fed69657ba4cc6e1078d2a6a95f51c8c&language=en-US`
      )
    });
  };
}

export function getActorCreditMovies(id) {
  return dispatch => {
    dispatch({
      type: GET_ACTOR_CREDIT_MOVIES,
      payload: axios.get(
        `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=fed69657ba4cc6e1078d2a6a95f51c8c&language=en-US`
      )
    });
  };
}
