import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";
import MoviesReducer from "./movies-reducer";
import MovieReducer from "./movie-reducer";
import ActorReducer from "./actor-reducer";

const reducers = {
  moviesStore: MoviesReducer,
  movieStore: MovieReducer,
  actorStore: ActorReducer,
  loadingBar: loadingBarReducer
};

const rootReducer = combineReducers(reducers);
export default rootReducer;
