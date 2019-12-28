import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "./components/blocks/Header";
import HomePage from "./containers/HomePage";
import TopSeriesPage from "./containers/TopSeriesPage";
import UpcomingPage from "./containers/UpcomingPage";
import GenrePage from "./containers/GenrePage";
import MoviesCategoryContainer from "./containers/MoviesCategoryContainer";
import MoviePage from "./containers/MoviePage";
import ActorPage from "./containers/ActorPage";

import theme from "./theme";
import { ThemeProvider } from "@material-ui/core";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-6 col-lg-2 col-md-2 sidebar-offcanvas"
              id="sidebar"
            >
              <MoviesCategoryContainer />
            </div>
            <div className="col-12 col-md-10 col-lg-10">
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/upcoming" component={UpcomingPage} />
                <Route exact path="/series" component={TopSeriesPage} />
                <Route exact path="/genres/:id/:genre" component={GenrePage} />
                <Route exact path="/movies/:id" component={MoviePage} />
                <Route exact path="/actors/:id" component={ActorPage} />
              </Switch>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
