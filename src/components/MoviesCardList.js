import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MovieCard from "./MovieCard";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center"
  }
}));

const MoviesCardList = ({
  movies,
  loading,
  hideOverview = false,
  itemsPerRow = 4
}) => {
  const classes = useStyles();
  const moviesList = () => {
    return movies.map(movie => (
      <Grid item lg={3} sm={6} md={4} xs={12} key={movie.id}>
        <MovieCard
          movie={movie}
          loading={loading}
          hideOverview={hideOverview}
        />
      </Grid>
    ));
  };

  return (
    <Grid container spacing={3} className={classes.root}>
      {moviesList()}
    </Grid>
  );
};

export default MoviesCardList;
