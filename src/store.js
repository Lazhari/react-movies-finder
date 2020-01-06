import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { createPromise } from "redux-promise-middleware";
import { composeWithDevTools } from "redux-devtools-extension";
import { loadingBarMiddleware } from "react-redux-loading-bar";

import rootReducer from "./reducers";

const promise = createPromise({ types: { fulfilled: "success" } });

const middleware = composeWithDevTools(
  applyMiddleware(promise, thunk, loadingBarMiddleware())
);

export default createStore(rootReducer, middleware);
