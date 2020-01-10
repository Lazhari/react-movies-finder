import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";
import MoviesReducer from "./movies-reducer";
import MovieReducer from "./movie-reducer";
import ActorReducer from "./actor-reducer";
import TvShowsReducer from "./tv-shows-reducer";

const reducers = {
  moviesStore: MoviesReducer,
  movieStore: MovieReducer,
  actorStore: ActorReducer,
  loadingBar: loadingBarReducer,
  tvShows: TvShowsReducer
};

const rootReducer = combineReducers(reducers);
export default rootReducer;
