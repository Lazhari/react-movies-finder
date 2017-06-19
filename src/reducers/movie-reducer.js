import { FETCH_MOVIE_DETAILS, FETCH_MOVIE_VIDEOS } from '../actions/actionsType';
const defaultState = {
    loading: false,
    movie: {},
    videos: []
};

export default (state = defaultState, action = {}) => {
    switch (action.type) {
        case `${FETCH_MOVIE_DETAILS}_PENDING`: {
            return {
                ...state,
                loading: true
            };
        }
        case `${FETCH_MOVIE_DETAILS}_FULFILLED`: {
            return {
                ...state,
                loading: false,
                movie: action.payload.data
            };
        }
        case `${FETCH_MOVIE_VIDEOS}_PENDING`: {
            return {
                ...state,
                loading: true
            }
        }
        case `${FETCH_MOVIE_VIDEOS}_FULFILLED`: {
            return {
                ...state,
                loading: false,
                videos: action.payload.data.results
            }
        }
        default: {
            return state;
        }
    }
}