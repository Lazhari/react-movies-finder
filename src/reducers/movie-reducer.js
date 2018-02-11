import {
    FETCH_MOVIE_DETAILS,
    FETCH_MOVIE_VIDEOS,
    FETCH_MOVIE_REVIEWS,
    FETCH_RELATED_MOVIES,
    FETCH_MOVIE_CAST,
    CLEANING_MOVIE_STATE
} from '../actions/actionsType';
const defaultState = {
    loading: false,
    movie: {},
    genres: [],
    productionCompanies: [],
    videos: [],
    trailer: {},
    reviews: [],
    relatedMovies: [],
    actors: []
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
                movie: action.payload.data,
                genres: action.payload.data.genres,
                productionCompanies: action.payload.data.production_companies
            };
        }
        case `${FETCH_MOVIE_VIDEOS}_PENDING`: {
            return {
                ...state,
                loading: true
            };
        }
        case `${FETCH_MOVIE_VIDEOS}_FULFILLED`: {
            const trailer = action.payload.data.results.filter(video => video.site === 'YouTube')[0];
            return {
                ...state,
                loading: false,
                videos: action.payload.data.results,
                trailer: trailer
            };
        }
        case `${FETCH_MOVIE_REVIEWS}_PENDING`: {
            return {
                ...state,
                loading: true
            };
        }
        case `${FETCH_MOVIE_REVIEWS}_FULFILLED`: {
            return {
                ...state,
                loading: false,
                reviews: action.payload.data.results
            };
        }
        case `${FETCH_RELATED_MOVIES}_PENDING`: {
            return {
                ...state,
                loading: true
            };
        }
        case `${FETCH_RELATED_MOVIES}_FULFILLED`: {
            return {
                ...state,
                loading: false,
                relatedMovies: action.payload.data.results
            };
        }
        case `${FETCH_MOVIE_CAST}_PENDING`: {
            return {
                ...state,
                loading: true
            };
        }
        case `${FETCH_MOVIE_CAST}_FULFILLED`: {
            return {
                ...state,
                loading: false,
                actors: action.payload.data.cast.splice(0, 6)
            };
        }
        case CLEANING_MOVIE_STATE: {
            return {
                ...state,
                loading: false,
                movie: {},
                genres: [],
                productionCompanies: [],
                videos: [],
                trailer: {},
                reviews: [],
                relatedMovies: [],
                actors: []
            };
        }
        default: {
            return state;
        }
    }
}
