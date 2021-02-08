import React, { useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MuiLink from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/styles";

import { fetchGenre } from "../../actions/moviesActions";

const useStyles = makeStyles((theme) => ({
  root: {},
  linkText: {
    color: "white",
  },
}));

const Sidebar = ({ handleDrawerClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { genres, genreId, loading } = useSelector(
    (state) => state.moviesStore
  );
  useEffect(() => {
    dispatch(fetchGenre());
  }, [dispatch]);

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
