import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Pagination from "material-ui-flat-pagination";

import { fetchMovies } from "../actions/moviesActions";

import MoviesCardList from "../components/MoviesCardList";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 50
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

const HomePage = () => {
  const dispatch = useDispatch();
  const { movies, loading, page, totalResults } = useSelector(
    state => state.moviesStore
  );
  const classes = useStyles();
  const handlePageChange = offset => {
    const pageNumber = offset / 20 + 1;
    dispatch(fetchMovies(pageNumber));
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    dispatch(fetchMovies());
  }, []);
  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h1" gutterBottom>
        Popular Movies
      </Typography>
      <div>
        <MoviesCardList movies={movies} cols={6} />

        {movies && movies.length ? (
          <div className={classes.paginationContainer}>
            <Pagination
              limit={20}
              offset={(page - 1) * 20}
              total={totalResults}
              onClick={(e, offset) => handlePageChange(offset)}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

// class HomePage extends Component {
//   componentWillMount() {
//     fetchMovies();
//   }

//   render() {}
// }

// function mapStateToProps(state) {
//   const { movies, loading, page, totalResults } = state.moviesStore;
//   return { movies, loading, page, totalResults };
// }

export default HomePage;
