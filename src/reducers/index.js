import { combineReducers } from 'redux';

import MoviesReducer from './movies-reducer';
import MovieReducer from './movie-reducer';

const reducers = {
    moviesStore: MoviesReducer,
    movieStore: MovieReducer
};

const rootReducer = combineReducers(reducers);
export default rootReducer;
