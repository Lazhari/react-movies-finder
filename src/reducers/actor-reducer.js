import {
    GET_ACTOR_PROFILE,
    GET_ACTOR_CREDIT_MOVIES
} from '../actions/actionsType';

const defaultState = {
    loading: false,
    profile: {},
    movies: []
};

export default (state = defaultState, action = {}) => {
    switch (action.type) {
        case `${GET_ACTOR_PROFILE}_PENDING`: {
            return {
                ...state,
                loading: true
            }
        }
        case `${GET_ACTOR_PROFILE}_FULFILLED`: {
            return {
                ...state,
                profile: action.payload.data
            }
        }
        case `${GET_ACTOR_CREDIT_MOVIES}_PENDING`: {
            return {
                ...state,
                loading: true
            }
        }
        case `${GET_ACTOR_CREDIT_MOVIES}_FULFILLED`: {
            return {
                ...state,
                movies: action.payload.data.cast
            }
        }
        default: {
            return state;
        }
    }
};