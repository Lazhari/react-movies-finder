import { client } from './'
import { FETCH_TV_SHOWS, FETCH_TV_GENRES } from './actionsType'

export function fetchTvShows(page = 1, filters = {}) {
  return (dispatch) => {
    dispatch({
      type: FETCH_TV_SHOWS,
      payload: client.get('/discover/tv', {
        params: {
          page,
          ...filters,
        },
      }),
    })
  }
}

export function fetchTvGenres() {
  return (dispatch) => {
    dispatch({
      type: FETCH_TV_GENRES,
      payload: client.get('/genre/tv/list'),
    })
  }
}
