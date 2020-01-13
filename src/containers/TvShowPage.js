import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  }
}));

const TvShowPage = ({ tvShowId }) => {
  const classes = useStyles();
  return <div className={classes.root}>TV Show Details</div>;
};

export default TvShowPage;
