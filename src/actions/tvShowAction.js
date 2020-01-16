import { client } from "./";

import {
  FETCH_TV_SHOW_DETAILS,
  FETCH_TV_SHOW_CREDITS,
  FETCH_TV_SHOW_EXTERNAL_IDS,
  FETCH_TV_SHOW_KEYWORDS,
  FETCH_TV_SHOW_RECOMMENDATIONS,
  FETCH_TV_SHOW_REVIEWS,
  FETCH_TV_SHOW_SIMILAR,
  FETCH_TV_SHOW_VIDEOS
} from "./actionsType";

export function getTvShowDetails(tvId) {
  return dispatch => {
    dispatch({
      type: FETCH_TV_SHOW_DETAILS,
      payload: client.get(`/tv/${tvId}`)
    });
  };
}

export function getTvShowCredits(tvId) {
  return dispatch => {
    dispatch({
      type: FETCH_TV_SHOW_CREDITS,
      payload: client.get(`/tv/${tvId}/credits`)
    });
  };
}

export function getTvShowExternalIds(tvId) {
  return dispatch => {
    dispatch({
      type: FETCH_TV_SHOW_EXTERNAL_IDS,
      payload: client.get(`/tv/${tvId}/external_ids`)
    });
  };
}

export function getTvShowKeywords(tvId) {
  return dispatch => {
    dispatch({
      type: FETCH_TV_SHOW_KEYWORDS,
      payload: client.get(`/tv/${tvId}/keywords`)
    });
  };
}

export function getTvShowRecommendations(tvId) {
  return dispatch => {
    dispatch({
      type: FETCH_TV_SHOW_RECOMMENDATIONS,
      payload: client.get(`/tv/${tvId}/recommendations`)
    });
  };
}

export function getTvShowReviews(tvId) {
  return dispatch => {
    dispatch({
      type: FETCH_TV_SHOW_REVIEWS,
      payload: client.get(`/tv/${tvId}/reviews`)
    });
  };
}

export function getTvShowSimilar(tvId) {
  return dispatch => {
    dispatch({
      type: FETCH_TV_SHOW_SIMILAR,
      payload: client.get(`/tv/${tvId}/reviews`)
    });
  };
}

export function getTvShowVideos(tvId) {
  return dispatch => {
    dispatch({
      type: FETCH_TV_SHOW_VIDEOS,
      payload: client.get(`/tv/${tvId}/videos`)
    });
  };
}
