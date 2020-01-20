import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { getTvShowDetails } from "../actions/tvShowAction";
import Loader from "../components/common/Loader";

const useStyles = makeStyles(theme => ({
  root: {
    // display: "flex"
  },
  header: {
    height: 320,
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(5)
  },
  moviePoster: {
    width: theme.spacing(25),
    borderRadius: 5,
    boxShadow: theme.shadows[1]
  },
  infoBlock: {
    alignSelf: "normal",
    marginLeft: theme.spacing(4)
  },
  subTitle: {
    marginLeft: theme.spacing(1)
  }
}));

const TvShowPage = ({ tvShowId }) => {
  const dispatch = useDispatch();
  const { tvShow, loading } = useSelector(store => store.tvShowStore);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getTvShowDetails(tvShowId));
  }, [dispatch, tvShowId]);

  const headerStyle = {
    backgroundImage: `radial-gradient(circle at 20% 50%, rgba(16.47%, 15.29%, 14.51%, 0.98) 0%, rgba(22.35%, 22.35%, 22.35%, 0.88) 100%), url(https://image.tmdb.org/t/p/w1400_and_h450_bestv2${tvShow.backdrop_path})`
  };
  return (
    <div className={classes.root}>
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          <div className={classes.header} style={headerStyle}>
            <img
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${tvShow.poster_path}`}
              alt={tvShow.original_name}
              className={classes.moviePoster}
            />
            <div className={classes.infoBlock}>
              <Typography variant="h4" component="h1" gutterBottom>
                {tvShow.original_name}
                <small className={classes.subTitle}>
                  ({tvShow.first_air_date})
                </small>
              </Typography>
              <Typography variant="h6" component="h2" gutterBottom>
                Overview
              </Typography>
              <Typography>{tvShow.overview}</Typography>
              <Typography variant="h6" component="h2">
                Featured Crew
              </Typography>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TvShowPage;
