import { ExternalIds } from '@models/externalIds'
import { TvShowDetails } from '@models/tv'
import { RootState } from '@src/reducers'
import { ThunkAction } from 'redux-thunk'
import { client } from '.'

import {
  FETCH_TV_SHOW_DETAILS,
  FETCH_TV_SHOW_CREDITS,
  FETCH_TV_SHOW_EXTERNAL_IDS,
  FETCH_TV_SHOW_KEYWORDS,
  FETCH_TV_SHOW_RECOMMENDATIONS,
  FETCH_TV_SHOW_REVIEWS,
  FETCH_TV_SHOW_SIMILAR,
  FETCH_TV_SHOW_VIDEOS,
  TvShowsActionTypes,
} from './actionsType'
import {
  CreditsResponse,
  KeywordsList,
  ReviewListResponse,
  TvShowsList,
  VideosResponse,
} from './types'

export function getTvShowDetails(
  tvId: number
): ThunkAction<void, RootState, unknown, TvShowsActionTypes> {
  return (dispatch) =>
    dispatch({
      type: FETCH_TV_SHOW_DETAILS,
      payload: client.get<TvShowDetails>(`/tv/${tvId}`),
    })
}

export function getTvShowCredits(
  tvId: number
): ThunkAction<void, RootState, unknown, TvShowsActionTypes> {
  return (dispatch) =>
    dispatch({
      type: FETCH_TV_SHOW_CREDITS,
      payload: client.get<CreditsResponse>(`/tv/${tvId}/credits`),
    })
}

export function getTvShowExternalIds(
  tvId: number
): ThunkAction<void, RootState, unknown, TvShowsActionTypes> {
  return (dispatch) =>
    dispatch({
      type: FETCH_TV_SHOW_EXTERNAL_IDS,
      payload: client.get<ExternalIds>(`/tv/${tvId}/external_ids`),
    })
}

export function getTvShowKeywords(
  tvId: number
): ThunkAction<void, RootState, unknown, TvShowsActionTypes> {
  return (dispatch) =>
    dispatch({
      type: FETCH_TV_SHOW_KEYWORDS,
      payload: client.get<KeywordsList>(`/tv/${tvId}/keywords`),
    })
}

export function getTvShowRecommendations(
  tvId: number
): ThunkAction<void, RootState, unknown, TvShowsActionTypes> {
  return (dispatch) =>
    dispatch({
      type: FETCH_TV_SHOW_RECOMMENDATIONS,
      payload: client.get<TvShowsList>(`/tv/${tvId}/recommendations`),
    })
}

export function getTvShowReviews(
  tvId: number
): ThunkAction<void, RootState, unknown, TvShowsActionTypes> {
  return (dispatch) =>
    dispatch({
      type: FETCH_TV_SHOW_REVIEWS,
      payload: client.get<ReviewListResponse>(`/tv/${tvId}/reviews`),
    })
}

export function getTvShowSimilar(
  tvId: number
): ThunkAction<void, RootState, unknown, TvShowsActionTypes> {
  return (dispatch) =>
    dispatch({
      type: FETCH_TV_SHOW_SIMILAR,
      payload: client.get<TvShowsList>(`/tv/${tvId}/reviews`),
    })
}

export function getTvShowVideos(
  tvId: number
): ThunkAction<void, RootState, unknown, TvShowsActionTypes> {
  return (dispatch) =>
    dispatch({
      type: FETCH_TV_SHOW_VIDEOS,
      payload: client.get<VideosResponse>(`/tv/${tvId}/videos`),
    })
}
