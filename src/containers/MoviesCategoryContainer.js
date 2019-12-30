import React, { Component } from "react";
import { connect } from "react-redux";

import Sidebar from "../components/blocks/Sidebar";

import { fetchGenre } from "../actions/moviesActions";

class MoviesCategoryContainer extends Component {
  componentDidMount() {
    this.props.fetchGenre();
  }

  render() {
    return (
      <Sidebar
        genres={this.props.genres}
        loading={this.props.loading}
        genreId={this.props.genreId}
        handleDrawerClose={this.props.handleDrawerClose}
      />
    );
  }
}

function mapStateToProps(state) {
  const { genres, genreId, loading } = state.moviesStore;
  return { genres, genreId, loading };
}

export default connect(
  mapStateToProps,
  { fetchGenre }
)(MoviesCategoryContainer);
