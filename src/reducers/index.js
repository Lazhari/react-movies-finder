import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar'
import MoviesReducer from './movies-reducer';
import MovieReducer from './movie-reducer';

const reducers = {
    moviesStore: MoviesReducer,
    movieStore: MovieReducer,
    loadingBar: loadingBarReducer,
};

const rootReducer = combineReducers(reducers);
export default rootReducer;
