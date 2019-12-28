import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";

import { makeStyles, fade } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Link from "@material-ui/core/Link";

import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

import logo from "../../logo.svg";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
  },
  loadingBar: {
    backgroundColor: "white",
    height: theme.spacing(1),
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

function Header() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <LoadingBar className={classes.loadingBar} />
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <img src={logo} alt="Movies Finder" />
            Movies Finder
          </Typography>
          <nav>
            <Link
              variant="button"
              color="textPrimary"
              component={RouterLink}
              to="/"
              className={classes.link}
            >
              Popular Movies
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              component={RouterLink}
              to="/upcoming"
              className={classes.link}
            >
              Upcoming Movies
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              component={RouterLink}
              to="/series"
              className={classes.link}
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
        </Toolbar>
      </AppBar>
    </div>
  );
}

// class Header extends Component {
//   render() {
//     return (
//       <div>
//         <nav className="navbar navbar-expand-md fixed-top mv-header">
//           <LoadingBar
//             style={{
//               backgroundColor: "white",
//               height: "5px",
//               top: 0,
//               position: "absolute"
//             }}
//           />
//           <NavLink className="navbar-brand" to="/">
//             <img
//               src={logo}
//               className="d-inline-block align-middle mv-logo"
//               alt=""
//             />
//           </NavLink>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-toggle="collapse"
//             data-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav mr-auto">
//               <li className="nav-item">
//                 <NavLink
//                   className="nav-link"
//                   activeClassName="active"
//                   exact
//                   to="/"
//                 >
//                   Popular Movies
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink
//                   className="nav-link"
//                   activeClassName="active"
//                   exact
//                   to="/upcoming"
//                 >
//                   Upcoming Movies
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink
//                   className="nav-link"
//                   activeClassName="active"
//                   exact
//                   to="/series"
//                 >
//                   Popular Series
//                 </NavLink>
//               </li>
//             </ul>
//             <form className="form-inline my-4 my-lg-0 mv-search">
//               <input
//                 className="form-control mr-sm-4"
//                 type="search"
//                 placeholder="Search"
//                 aria-label="Search"
//                 style={{ display: "none" }}
//               />
//               {/* <a href="#">
//                 <i className="fa fa-search"></i>
//               </a> */}
//             </form>
//           </div>
//         </nav>
//       </div>
//     );
//   }
// }

export default Header;
