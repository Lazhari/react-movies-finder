import { client } from "./";
import {
  FETCH_MOVIES,
  FETCH_GENRE,
  FETCH_MOVIES_BY_GENRE,
  FETCH_MOVIE_DETAILS
} from "./actionsType";

export function fetchGenre() {
  return dispatch => {
    dispatch({
      type: FETCH_GENRE,
      payload: client.get(
        "/genre/movie/list?api_key=fed69657ba4cc6e1078d2a6a95f51c8c&language=en-US"
      )
    });
  };
}

export function fetchMovies(page = 1, type = "popular") {
  return dispatch => {
    dispatch({
      type: FETCH_MOVIES,
      payload: client.get(
        `/movie/${type}?api_key=fed69657ba4cc6e1078d2a6a95f51c8c&language=en-US&page=${page}`
      )
    });
  };
}

export function fetchMoviesByGenre(page = 1, genreId = "") {
  return dispatch => {
    dispatch({
      type: FETCH_MOVIES_BY_GENRE,
      payload: client.get(
        `/genre/${genreId}/movies?api_key=fed69657ba4cc6e1078d2a6a95f51c8c&page=${page}&language=en-US&include_adult=false&sort_by=created_at.asc`
      ),
      genreId
    });
  };
}

export function fetchMovie(id) {
  return dispatch => {
    dispatch({
      type: FETCH_MOVIE_DETAILS,
      payload: client.get(``)
    });
  };
}
