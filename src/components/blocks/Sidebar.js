import React from "react";
import { Link as RouterLink } from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {},
  linkText: {
    color: "white"
  }
}));

const Sidebar = ({ genres, loading, genreId, handleDrawerClose }) => {
  const classes = useStyles();
  const genreLinks = () => {
    return genres.map(genre => {
      return (
        <Link
          component={RouterLink}
          to={`/genres/${genre.id}/${genre.name}`}
          onClick={handleDrawerClose}
          underline="none"
        >
          <ListItem button key={genre.id} className={classes.root}>
            <ListItemText primary={genre.name} className={classes.linkText} />
          </ListItem>
        </Link>
      );
    });
  };

  return <List>{genreLinks()}</List>;
};
export default Sidebar;
