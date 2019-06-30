import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import ScrollToTop from "./components/ScrollToTop";
import App from "./App";
import store from "./store";

import HomePage from "./containers/HomePage";

describe("Testing the / route", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Router basename="/">
        <Provider store={store}>
          <ScrollToTop>
            <MemoryRouter initialEntries={["/"]}>
              <App />
            </MemoryRouter>
          </ScrollToTop>
        </Provider>
      </Router>
    );
  });

  it("shows a HomePage", () => {
    expect(wrapper.find(HomePage).length).toEqual(1);
  });
  afterEach(() => {
    wrapper.unmount();
  });
});
