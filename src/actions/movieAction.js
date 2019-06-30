import { client } from "./";
import {
  FETCH_MOVIE_DETAILS,
  FETCH_MOVIE_VIDEOS,
  FETCH_RELATED_MOVIES,
  FETCH_MOVIE_CAST,
  FETCH_MOVIE_REVIEWS,
  CLEANING_MOVIE_STATE
} from "./actionsType";

export function fetchMovie(id) {
  return dispatch => {
    dispatch({
      type: FETCH_MOVIE_DETAILS,
      payload: client.get(
        `/movie/${id}?api_key=fed69657ba4cc6e1078d2a6a95f51c8c&language=en-US`
      )
    });
  };
}

export function fetchMovieVideos(id) {
  return dispatch => {
    dispatch({
      type: FETCH_MOVIE_VIDEOS,
      payload: client.get(
        `/movie/${id}/videos?api_key=fed69657ba4cc6e1078d2a6a95f51c8c&language=en-US`
      )
    });
  };
}

export function fetchMovieReviews(id) {
  return dispatch => {
    dispatch({
      type: FETCH_MOVIE_REVIEWS,
      payload: client.get(
        `/movie/${id}/reviews?api_key=fed69657ba4cc6e1078d2a6a95f51c8c&language=en-US`
      )
    });
  };
}

export function fetchRelatedMovies(id) {
  return dispatch => {
    dispatch({
      type: FETCH_RELATED_MOVIES,
      payload: client.get(
        `/movie/${id}/similar?api_key=fed69657ba4cc6e1078d2a6a95f51c8c&language=en-US`
      )
    });
  };
}

export function fetchMovieActors(id) {
  return dispatch => {
    dispatch({
      type: FETCH_MOVIE_CAST,
      payload: client.get(
        `/movie/${id}/credits?api_key=fed69657ba4cc6e1078d2a6a95f51c8c&language=en-US`
      )
    });
  };
}

export function cleaningMovieReducer() {
  return dispatch => {
    dispatch({
      type: CLEANING_MOVIE_STATE,
      payload: {}
    });
  };
}
