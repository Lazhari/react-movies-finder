import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import { Router, Redirect, Link as RouterLink } from "@reach/router";

import Header from "./components/blocks/Header";
import HomePage from "./containers/HomePage";
import TopSeriesPage from "./containers/TopSeriesPage";
import UpcomingPage from "./containers/UpcomingPage";
import GenrePage from "./containers/GenrePage";
import MoviesCategoryContainer from "./containers/MoviesCategoryContainer";
import MoviePage from "./containers/MoviePage";
import ActorPage from "./containers/ActorPage";
import TvShowPage from "./containers/TvShowPage";

import customTheme from "./theme";
import { ThemeProvider } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import clsx from "clsx";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import LayersIcon from "@material-ui/icons/Layers";
import FavoriteIcon from "@material-ui/icons/Favorite";
import TheatersIcon from "@material-ui/icons/Theaters";
import Hidden from "@material-ui/core/Hidden";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    [theme.breakpoints.down("md")]: {
      width: "100%"
    }
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.down("md")]: {
      width: "100%"
    }
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "space-between"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  BottomNavigation: {
    position: "fixed",
    width: "100%",
    top: "calc(100vh - 56px)"
  }
}));

function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Header handleDrawerOpen={handleDrawerOpen} open={open} />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <Typography variant="h5" component="h1">
            Categories
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {customTheme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <MoviesCategoryContainer handleDrawerClose={handleDrawerClose} />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <Router>
          <Redirect noThrow from="*" to="/" />
          <HomePage path="/" />
          <UpcomingPage path="/upcoming" />
          <TopSeriesPage path="/series" />
          <GenrePage path="/genres/:genreId/:genre" />
          <MoviePage path="/movies/:movieId" />
          <TvShowPage path="/tvShows/:tvShowId" />
          <ActorPage path="/actors/:actorId" />
        </Router>
      </main>
      <Hidden mdUp>
        <BottomNavigation
          value={"Recents"}
          onChange={(event, newValue) => {
            console.log(newValue);
          }}
          showLabels
          className={classes.BottomNavigation}
        >
          <BottomNavigationAction
            label="Top Movies"
            icon={<FavoriteIcon />}
            component={RouterLink}
            to="/"
          />
          <BottomNavigationAction
            label="Up coming"
            icon={<LayersIcon />}
            component={RouterLink}
            to="/upcoming"
          />
          <BottomNavigationAction
            label="Top Series"
            icon={<TheatersIcon />}
            component={RouterLink}
            to="/series"
          />
        </BottomNavigation>
      </Hidden>
    </ThemeProvider>
  );
}

export default App;
