import React from 'react'
import Link from 'next/link'
import LoadingBar from 'react-redux-loading-bar'

import { makeStyles, fade } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import MuiLink from '@material-ui/core/Link'
import Hidden from '@material-ui/core/Hidden'
import clsx from 'clsx'

import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'

import Logo from '../common/icons/Logo'

interface Props {
  handleDrawerOpen: () => void
  open: boolean
}

interface NavLink {
  title: string
  url: string
}

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appTitle: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    marginLeft: 8,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  loadingBar: {
    backgroundColor: 'white',
    height: theme.spacing(0.25),
    top: 0,
    position: 'absolute',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}))

const navLinks: NavLink[] = [
  {
    title: 'Popular Movies',
    url: '/',
  },
  {
    title: 'Upcoming Movies',
    url: '/upcoming',
  },
  {
    title: 'Popular Series',
    url: '/series',
  },
]

const Header: React.FC<Props> = ({ handleDrawerOpen, open }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
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
          <Link href="/">
            <div className={classes.appTitle}>
              <Logo fill="#fff" height={54} width={54} />
              <Typography variant="h6" className={classes.title}>
                Movies Finder
              </Typography>
            </div>
          </Link>
          <Hidden smDown>
            <nav>
              {navLinks.map((item, index) => (
                <Link href={item.url} key={index} shallow>
                  <MuiLink
                    variant="button"
                    color="textPrimary"
                    href={item.url}
                    className={classes.link}
                    underline="none"
                  >
                    {item.title}
                  </MuiLink>
                </Link>
              ))}
            </nav>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
