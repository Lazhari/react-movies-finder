import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";
import moviesReducer from "./moviesReducer";
import movieReducer from "./movieReducer";
import actorReducer from "./actorReducer";
import tvShowsReducer from "./tvShowsReducer";

const reducers = {
  moviesStore: moviesReducer,
  movieStore: movieReducer,
  actorStore: actorReducer,
  loadingBar: loadingBarReducer,
  tvShowsStore: tvShowsReducer
};

const rootReducer = combineReducers(reducers);
export default rootReducer;
