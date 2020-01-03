import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import {
  fetchMovie,
  fetchMovieVideos,
  fetchMovieReviews,
  fetchRelatedMovies,
  fetchMovieActors,
  cleaningMovieReducer
} from "../actions/movieAction";

import MovieHeader from "../components/MovieHeader";
import MoviesCardList from "../components/MoviesCardList";
import ReviewsList from "../components/ReviewsList";

const styles = {
  root: {},
  reviewsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16
  },
  moviesContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16
  }
};

class MoviePage extends Component {
  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.fetchMovie(id);
    this.props.fetchMovieVideos(id);
    this.props.fetchMovieReviews(id);
    this.props.fetchRelatedMovies(id);
    this.props.fetchMovieActors(id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.cleaningMovieReducer();
      const { id } = this.props.match.params;
      this.props.fetchMovie(id);
      this.props.fetchMovieVideos(id);
      this.props.fetchMovieReviews(id);
      this.props.fetchRelatedMovies(id);
      this.props.fetchMovieActors(id);
    }
  }

  componentWillUnmount() {
    this.props.cleaningMovieReducer();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <MovieHeader
          movie={this.props.movie}
          genres={this.props.genres}
          productionCompanies={this.props.productionCompanies}
          trailer={this.props.trailer}
          actors={this.props.actors}
        />
        {this.props.reviews && this.props.reviews.length && (
          <div className={classes.reviewsContainer}>
            <Typography variant="h5" component="h1" gutterBottom>
              Reviews
            </Typography>
            <ReviewsList reviews={this.props.reviews} />
          </div>
        )}
        {this.props.relatedMovies && this.props.relatedMovies.length && (
          <div className={classes.moviesContainer}>
            <Typography variant="h5" component="h1" gutterBottom>
              Related Movies
            </Typography>
            <MoviesCardList
              movies={this.props.relatedMovies}
              hideOverview={true}
              itemsPerRow={4}
            />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.movieStore;
}

export default connect(
  mapStateToProps,
  {
    fetchMovie,
    fetchMovieVideos,
    fetchMovieReviews,
    fetchRelatedMovies,
    fetchMovieActors,
    cleaningMovieReducer
  }
)(withStyles(styles)(MoviePage));
