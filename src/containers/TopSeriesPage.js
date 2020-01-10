import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
  },
  filtersContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const sortOptions = [
  {
    label: "Average Vote DESC",
    value: "vote_average.desc"
  },
  {
    label: "Average Vote ASC",
    value: "vote_average.asc"
  },
  {
    label: "First Air Date DESC",
    value: "first_air_date.desc"
  },
  {
    label: "First Air Date ASC",
    value: "first_air_date.asc"
  },
  {
    label: "Popularity DESC",
    value: "popularity.desc"
  },
  {
    label: "Popularity ASC",
    value: "popularity.asc"
  }
];

const TopSeriesPage = () => {
  const dispatch = useDispatch();
  const { tvShows, loading, page, totalResults } = useSelector(
    state => state.tvShows
  );
  const classes = useStyles();
  const [sortBy, setSortBy] = React.useState("popularity.desc");

  const handlePageChange = offset => {
    const pageNumber = offset / 20 + 1;
    dispatch(fetchTvShows(pageNumber, { sort_by: sortBy }));
    window.scrollTo(0, 0);
  };

  const handleChange = event => {
    setSortBy(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchTvShows(1, { sort_by: sortBy }));
  }, [dispatch, sortBy]);

  return (
    <div className={classes.root}>
      <div className={classes.filtersContainer}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Sorted By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sortBy}
            onChange={handleChange}
          >
            {sortOptions.map(sortOption => (
              <MenuItem value={sortOption.value} key={sortOption.value}>
                {sortOption.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
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
