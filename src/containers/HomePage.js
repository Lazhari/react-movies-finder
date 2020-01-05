import React, { Component } from "react";
import { connect } from "react-redux";
// import Pagination from "react-js-pagination";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Pagination from "material-ui-flat-pagination";

import { fetchMovies } from "../actions/moviesActions";

import MoviesCardList from "../components/MoviesCardList";

const styles = {
  root: {
    marginTop: 50
  }
};

class HomePage extends Component {
  componentWillMount() {
    this.props.fetchMovies();
  }

  handlePageChange(offset) {
    const pageNumber = offset / 20 + 1;
    this.props.fetchMovies(pageNumber);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h4" component="h1" gutterBottom>
          Popular Movies
        </Typography>
        <div className="row">
          <MoviesCardList movies={this.props.movies} cols={6} />

          {this.props.movies && this.props.movies.length ? (
            <div className="col-md-12 text-center">
              <Pagination
                limit={20}
                offset={(this.props.page - 1) * 20}
                total={this.props.totalResults}
                onClick={(e, offset) => this.handlePageChange(offset)}
              />
            </div>
          ) : null}
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
  { fetchMovies }
)(withStyles(styles)(HomePage));
