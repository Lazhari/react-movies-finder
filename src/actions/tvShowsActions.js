import { client } from "./";
import { FETCH_TV_SHOWS, FETCH_TV_GENRES } from "./actionsType";

export function fetchTvShows(page = 1, filters = {}) {
  return dispatch => {
    dispatch({
      type: FETCH_TV_SHOWS,
      payload: client.get("/discover/tv", {
        params: {
          api_key: "fed69657ba4cc6e1078d2a6a95f51c8c",
          language: "en-US",
          page,
          ...filters
        }
      })
    });
  };
}

export function fetchTvGenres() {
  return dispatch => {
    dispatch({
      type: FETCH_TV_GENRES,
      payload: client.get("/genre/tv/list", {
        language: "en-US"
      })
    });
  };
}
