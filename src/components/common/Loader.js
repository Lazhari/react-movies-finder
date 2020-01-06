import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 160px)"
  },
  spinnerOne: {
    position: "relative",
    right: 50
  },
  spinnerTwo: {
    position: "relative",
    right: 80
  }
}));

const Loader = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress
        disableShrink
        size={60}
        thickness={2}
        color="secondary"
      />
      <CircularProgress
        disableShrink
        size={40}
        thickness={2}
        className={classes.spinnerOne}
      />
      <CircularProgress
        disableShrink
        size={20}
        thickness={2}
        color="inherit"
        className={classes.spinnerTwo}
      />
    </div>
  );
};

export default Loader;
