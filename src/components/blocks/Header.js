import React from "react";
import { Link as RouterLink } from "@reach/router";
import LoadingBar from "react-redux-loading-bar";

import { makeStyles, fade } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Link from "@material-ui/core/Link";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import clsx from "clsx";

import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

import Logo from "../common/icons/Logo";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appTitle: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
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
  title: {
    flexGrow: 1,
    marginLeft: 8
  },
  link: {
    margin: theme.spacing(1, 1.5)
  },
  loadingBar: {
    backgroundColor: "white",
    height: theme.spacing(0.25),
    top: 0,
    position: "absolute"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
}));

function Header({ handleDrawerOpen, open }) {
  const classes = useStyles();
  const theme = useTheme();
  const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <LoadingBar className={classes.loadingBar} />
        <Toolbar>
          <IconButton
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.appTitle}>
            <Logo fill="#fff" height={54} width={54} />
            <Typography variant="h6" className={classes.title}>
              Movies Finder
            </Typography>
          </div>
          {isUpSm && (
            <>
              <nav>
                <Link
                  variant="button"
                  color="textPrimary"
                  component={RouterLink}
                  to="/"
                  className={classes.link}
                  underline="none"
                >
                  Popular Movies
                </Link>
                <Link
                  variant="button"
                  color="textPrimary"
                  component={RouterLink}
                  to="/upcoming"
                  className={classes.link}
                  underline="none"
                >
                  Upcoming Movies
                </Link>
                <Link
                  variant="button"
                  color="textPrimary"
                  component={RouterLink}
                  to="/series"
                  className={classes.link}
                  underline="none"
                >
                  Popular Series
                </Link>
              </nav>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
