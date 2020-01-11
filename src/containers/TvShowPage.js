import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  }
}));

const TvShowPage = () => {
  const classes = useStyles();
  return <div className={classes.root}>TV Show Details</div>;
};

export default TvShowPage;
