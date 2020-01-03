import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5)
    }
  }
}));

const Labels = ({ labels }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {labels.map(label => (
        <Chip
          variant="outlined"
          size="small"
          label={label.name}
          key={label.id}
        />
      ))}
    </div>
  );
};

export default Labels;
