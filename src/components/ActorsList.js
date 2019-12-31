import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import ActorCard from "./ActorCard";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5)
    }
  }
}));

const ActorsList = ({ actors, loading }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {actors.map(actor => {
        return <ActorCard actor={actor} key={actor.id} />;
      })}
    </div>
  );
};

export default ActorsList;
