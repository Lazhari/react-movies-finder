import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Container } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'

import ActorsList from '@components/ActorsList'

import {
  fetchMovie,
  fetchMovieVideos,
  fetchMovieReviews,
  fetchRelatedMovies,
  fetchMovieActors,
  cleaningMovieReducer,
} from '@actions/movieAction'

import MovieHeader from '@components/MovieHeader'
import MoviesCardList from '@components/MoviesCardList'
import ReviewsList from '@components/ReviewsList'
import Loader from '@components/common/Loader'
import { RootState } from '@src/reducers'
import { MovieState } from '@src/reducers/movieReducer'

const useStyles = makeStyles((theme) => ({
  root: {},
  reviewsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  moviesContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
}))

const MoviePage: NextPage = () => {
  const router = useRouter()
  const { mid } = router.query
  const dispatch = useDispatch()
  const {
    movie,
    loading,
    genres,
    trailer,
    actors,
    reviews,
    relatedMovies,
  } = useSelector<RootState, MovieState>((state) => state.movieStore)
  const classes = useStyles()

  useEffect(() => {
    if (mid) {
      const movieId = parseInt(mid as string, 10)
      dispatch(fetchMovie(movieId))
      dispatch(fetchMovieVideos(movieId))
      dispatch(fetchMovieReviews(movieId))
      dispatch(fetchRelatedMovies(movieId))
      dispatch(fetchMovieActors(movieId))
    }
    return () => {
      cleaningMovieReducer()
    }
  }, [dispatch, mid])

  return (
    <div className={classes.root}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {movie && movie.id && (
            <MovieHeader movie={movie} genres={genres} trailer={trailer} />
          )}
          <Container maxWidth="xl">
            <Grid container spacing={2}>
              <Grid item lg={12}>
                {actors && actors.length ? (
                  <div>
                    <Typography variant="h6" component="h1">
                      Top Billed Cast
                    </Typography>
                    <ActorsList actors={actors} />
                  </div>
                ) : null}
              </Grid>
            </Grid>
            {reviews.length > 0 && (
              <div className={classes.reviewsContainer}>
                <Typography variant="h5" component="h1" gutterBottom>
                  Reviews
                </Typography>
                <ReviewsList reviews={reviews} />
              </div>
            )}
            {relatedMovies.length > 0 && (
              <div className={classes.moviesContainer}>
                <Typography variant="h5" component="h1" gutterBottom>
                  Related Movies
                </Typography>
                <MoviesCardList movies={relatedMovies} />
              </div>
            )}
          </Container>
        </>
      )}
    </div>
  )
}

export default MoviePage
