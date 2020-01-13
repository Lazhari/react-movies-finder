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
      payload: client.get(`/movie/${id}`)
    });
  };
}

export function fetchMovieVideos(id) {
  return dispatch => {
    dispatch({
      type: FETCH_MOVIE_VIDEOS,
      payload: client.get(`/movie/${id}/videos`)
    });
  };
}

export function fetchMovieReviews(id) {
  return dispatch => {
    dispatch({
      type: FETCH_MOVIE_REVIEWS,
      payload: client.get(`/movie/${id}/reviews`)
    });
  };
}

export function fetchRelatedMovies(id) {
  return dispatch => {
    dispatch({
      type: FETCH_RELATED_MOVIES,
      payload: client.get(`/movie/${id}/similar`)
    });
  };
}

export function fetchMovieActors(id) {
  return dispatch => {
    dispatch({
      type: FETCH_MOVIE_CAST,
      payload: client.get(`/movie/${id}/credits`)
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
