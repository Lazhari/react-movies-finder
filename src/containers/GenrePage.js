import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "material-ui-flat-pagination";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { fetchMoviesByGenre } from "../actions/moviesActions";

import MoviesCardList from "../components/MoviesCardList";
import Loader from "../components/common/Loader";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 50
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(2)
  }
}));

const GenrePage = ({ match }) => {
  const dispatch = useDispatch();
  const { movies, loading, page, totalResults } = useSelector(
    state => state.moviesStore
  );
  const classes = useStyles();

  const handlePageChange = offset => {
    const pageNumber = offset / 20 + 1;
    dispatch(fetchMoviesByGenre(pageNumber, match.params.id));
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    dispatch(fetchMoviesByGenre(1, match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h1" gutterBottom>
        {match.params.genre}
      </Typography>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MoviesCardList movies={movies} cols={6} />
          <div className={classes.paginationContainer}>
            <Pagination
              limit={20}
              offset={(page - 1) * 20}
              total={totalResults}
              onClick={(e, offset) => handlePageChange(offset)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default GenrePage;
