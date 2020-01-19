import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "@reach/router";
import Chip from "@material-ui/core/Chip";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5)
    }
  },
  chip: {
    cursor: "pointer"
  }
}));

const Labels = ({ labels }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {labels.map(label => (
        <Link
          component={RouterLink}
          to={`/genres/${label.id}/${label.name}`}
          underline="none"
        >
          <Chip
            variant="outlined"
            size="small"
            className={classes.chip}
            label={label.name}
            key={label.id}
          />
        </Link>
      ))}
    </div>
  );
};

export default Labels;
