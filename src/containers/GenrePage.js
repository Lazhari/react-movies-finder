import React, { Component } from "react";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { fetchMoviesByGenre } from "../actions/moviesActions";

import MoviesCardList from "../components/MoviesCardList";

const styles = {
  root: {
    marginTop: 50
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};

class GenrePage extends Component {
  componentWillMount() {
    this.props.fetchMoviesByGenre(1, this.props.match.params.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchMoviesByGenre(1, this.props.match.params.id);
    }
  }

  handlePageChange(pageNumber) {
    this.props.fetchMoviesByGenre(pageNumber, this.props.match.params.id);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h4" component="h1" gutterBottom>
          {this.props.match.params.genre}
        </Typography>
        <MoviesCardList movies={this.props.movies} cols={6} />
        <div className={classes.paginationContainer}>
          <Pagination
            activePage={this.props.page}
            itemsCountPerPage={20}
            totalItemsCount={this.props.totalResults}
            pageRangeDisplayed={5}
            innerClass="pagination"
            itemClass="page-item"
            linkClass="page-link"
            disabledClass="disabled"
            activeClass="active"
            onChange={this.handlePageChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { movies, loading, page, totalResults } = state.moviesStore;
  return { movies, loading, page, totalResults };
}

export default connect(
  mapStateToProps,
  { fetchMoviesByGenre }
)(withStyles(styles)(GenrePage));
