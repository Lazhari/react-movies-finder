import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import MovieCard from './MovieCard'

import { Movie } from '@models/movie'
import { Cast } from '@models/actor'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

interface Props {
  movies: Array<Movie | Cast>
}

const MoviesCardList: React.FC<Props> = ({ movies }) => {
  const classes = useStyles()
  const moviesList = () => {
    return movies.map((movie) => (
      <Grid item lg={3} sm={6} md={4} xs={12} key={movie.id}>
        <MovieCard movie={movie} />
      </Grid>
    ))
  }

  return (
    <Grid container spacing={3} className={classes.root}>
      {moviesList()}
    </Grid>
  )
}

export default MoviesCardList
