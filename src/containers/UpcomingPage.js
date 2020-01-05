import React, { Component } from "react";
import { connect } from "react-redux";
import Pagination from "material-ui-flat-pagination";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { fetchMovies } from "../actions/moviesActions";

import MoviesCardList from "../components/MoviesCardList";

const styles = {
  root: {
    marginTop: 50
  },
  paginationContainer: {
    marginTop: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};

class UpcomingPage extends Component {
  componentWillMount() {
    this.props.fetchMovies(1, "upcoming");
  }

  handlePageChange(offset) {
    const pageNumber = offset / 20 + 1;
    this.props.fetchMovies(pageNumber, "upcoming");
    window.scrollTo(0, 0);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h4" component="h1" gutterBottom>
          Upcoming Movies
        </Typography>
        <MoviesCardList movies={this.props.movies} cols={6} />
        <div className={classes.paginationContainer}>
          <Pagination
            limit={20}
            offset={(this.props.page - 1) * 20}
            total={this.props.totalResults}
            onClick={(e, offset) => this.handlePageChange(offset)}
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
  { fetchMovies }
)(withStyles(styles)(UpcomingPage));
