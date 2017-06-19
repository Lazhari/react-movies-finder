import axios from 'axios';
import { FETCH_MOVIE_DETAILS, FETCH_MOVIE_VIDEOS } from './actionsType';


export function fetchMovie(id) {
    return dispatch => {
        dispatch({
            type: FETCH_MOVIE_DETAILS,
            payload: axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=fed69657ba4cc6e1078d2a6a95f51c8c&language=en-US`)
        })
    }
}

export function fetchMovieVideos(id) {
    return dispatch => {
        dispatch({
            type: FETCH_MOVIE_VIDEOS,
            payload: axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=fed69657ba4cc6e1078d2a6a95f51c8c&language=en-US`)
        })
    }
}