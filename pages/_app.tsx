import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { Provider } from 'react-redux'
import Link from 'next/link'

import { makeStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import LayersIcon from '@material-ui/icons/Layers'
import FavoriteIcon from '@material-ui/icons/Favorite'
import TheatersIcon from '@material-ui/icons/Theaters'
import Hidden from '@material-ui/core/Hidden'

import theme from '../src/theme'
import Header from '../src/components/blocks/Header'
import Sidebar from '../src/components/blocks/Sidebar'
import { useStore } from '../src/store'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  BottomNavigation: {
    position: 'fixed',
    width: '100%',
    top: 'calc(100vh - 56px)',
  },
}))

export default function App(props) {
  const { Component, pageProps } = props
  const [open, setOpen] = React.useState(false)
  const store = useStore(pageProps.initialReduxState)
  const classes = useStyles()

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <Provider store={store}>
      <React.Fragment>
        <Head>
          <title>Movies Finder v2</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Container maxWidth="xl">
            <Header handleDrawerOpen={handleDrawerOpen} open={open} />
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                <Typography variant="h5" component="h1">
                  Categories
                </Typography>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'ltr' ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
              </div>
              <Divider />
              <Sidebar handleDrawerClose={handleDrawerClose} />
            </Drawer>
            <Component {...pageProps} />
          </Container>
          <Hidden mdUp>
            <BottomNavigation
              value={'Recents'}
              showLabels
              className={classes.BottomNavigation}
            >
              <Link href="/">
                <BottomNavigationAction
                  label="Top Movies"
                  icon={<FavoriteIcon />}
                />
              </Link>
              <Link href="/upcoming">
                <BottomNavigationAction
                  label="Up coming"
                  icon={<LayersIcon />}
                />
              </Link>
              <Link href="/series">
                <BottomNavigationAction
                  label="Top Series"
                  icon={<TheatersIcon />}
                />
              </Link>
            </BottomNavigation>
          </Hidden>
        </ThemeProvider>
      </React.Fragment>
    </Provider>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}
