import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Pagination from "material-ui-flat-pagination";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { fetchMovies } from "../src/actions/moviesActions";

import MoviesCardList from "../src/components/MoviesCardList";
import Loader from "../src/components/common/Loader";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
  },
  paginationContainer: {
    marginTop: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const UpcomingPage = () => {
  const dispatch = useDispatch();
  const { movies, loading, page, totalResults } = useSelector(
    (state) => state.moviesStore
  );
  const classes = useStyles();

  const handlePageChange = (offset) => {
    const pageNumber = offset / 20 + 1;
    dispatch(fetchMovies(pageNumber, "upcoming"));
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    dispatch(fetchMovies(1, "upcoming"));
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h1" gutterBottom>
        Upcoming Movies
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

export default UpcomingPage;
