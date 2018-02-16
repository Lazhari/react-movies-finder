import {
    GET_ACTOR_PROFILE
} from '../actions/actionsType';

const defaultState = {
    loading: false,
    profile: {},
    movies: []
};

export default (state = defaultState, action={}) => {
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
        default: {
            return state;
        }
    }
};