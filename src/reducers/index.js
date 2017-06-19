import { combineReducers } from 'redux';

import MoviesReducer from './movies-reducer';

const reducers = {
    moviesStore: MoviesReducer
};

const rootReducer = combineReducers(reducers);
export default rootReducer;