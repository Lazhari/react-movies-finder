import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store";
import App from "./App";
import ScrollToTop from "./components/ScrollToTop";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Provider store={store}>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
