import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";

import { fetchTvShows } from "../actions/tvShowsActions";
import TvShowList from "../components/TvShowList";
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

const TopSeriesPage = () => {
  const dispatch = useDispatch();
  const { tvShows, loading, page, totalResults } = useSelector(
    state => state.tvShows
  );
  const classes = useStyles();

  const handlePageChange = offset => {
    const pageNumber = offset / 20 + 1;
    dispatch(fetchTvShows(pageNumber));
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    dispatch(fetchTvShows());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <TvShowList tvShows={tvShows} cols={6} />
          {tvShows && tvShows.length ? (
            <div className={classes.paginationContainer}>
              <Pagination
                limit={20}
                offset={(page - 1) * 20}
                total={totalResults}
                onClick={(e, offset) => handlePageChange(offset)}
              />
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};
export default TopSeriesPage;
