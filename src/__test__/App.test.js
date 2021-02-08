import React from "react";
import { render } from "@testing-library/react";
import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from "@reach/router";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import App from "../App";
import store from "../store";

function renderWithRouter(
  ui,
  { route = "/", history = createHistory(createMemorySource(route)) } = {}
) {
  return {
    ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
    history,
  };
}

test("full app rendering/navigating", async () => {
  const {
    container,
    history: { navigate },
  } = renderWithRouter(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const appContainer = container;
  expect(appContainer.innerHTML).toMatch("Popular Movies");

  await navigate("/upcoming");
  expect(container.innerHTML).toMatch("Upcoming Movies");

  await navigate("/series");
  expect(container.innerHTML).toMatch("Genre");
});
