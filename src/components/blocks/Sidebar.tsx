import React, { useEffect } from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MuiLink from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/styles'

import { fetchGenre } from '@actions/moviesActions'
import { RootState } from '@src/reducers'
import { MoviesState } from '@src/reducers/moviesReducer'

const useStyles = makeStyles(() => ({
  root: {},
  linkText: {
    color: 'white',
  },
}))

const Sidebar = ({ handleDrawerClose }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { genres } = useSelector<RootState, MoviesState>(
    (state) => state.moviesStore
  )
  useEffect(() => {
    dispatch(fetchGenre())
  }, [dispatch])

  const genreLinks = () => {
    if (genres && genres.length > 0) {
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
                <ListItemText
                  primary={genre.name}
                  className={classes.linkText}
                />
              </ListItem>
            </MuiLink>
          </Link>
        )
      })
    }
  }

  return <List>{genreLinks()}</List>
}
export default Sidebar
