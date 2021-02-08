import React from "react";
import Link from "next/link";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MuiLink from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  linkText: {
    color: "white",
  },
}));

const Sidebar = ({ genres, loading, genreId, handleDrawerClose }) => {
  const classes = useStyles();
  const genreLinks = () => {
    return genres.map((genre) => {
      return (
        <Link
          href={`/genres/[...genre]`}
          as={`/genres/${genre.id}/${genre.name}`}
          shallow
          key={genre.id}
        >
          <MuiLink
            href={`/genres/${genre.id}/${genre.name}`}
            onClick={handleDrawerClose}
            underline="none"
            key={genre.id}
          >
            <ListItem button className={classes.root}>
              <ListItemText primary={genre.name} className={classes.linkText} />
            </ListItem>
          </MuiLink>
        </Link>
      );
    });
  };

  return <List>{genreLinks()}</List>;
};
export default Sidebar;
