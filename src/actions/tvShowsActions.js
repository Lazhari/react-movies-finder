import { client } from "./";
import { FETCH_TV_SHOWS } from "./actionsType";

export function fetchTvShows(page = 1) {
  return dispatch => {
    dispatch({
      type: FETCH_TV_SHOWS,
      payload: client.get(
        `/discover/tv?api_key=fed69657ba4cc6e1078d2a6a95f51c8c&language=en-US&page=${page}`
      )
    });
  };
}
