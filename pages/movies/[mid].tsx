import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

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

const MoviePage = () => {
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
  } = useSelector((state) => state.movieStore)
  const classes = useStyles()

  useEffect(() => {
    if (mid) {
      dispatch(fetchMovie(mid))
      dispatch(fetchMovieVideos(mid))
      dispatch(fetchMovieReviews(mid))
      dispatch(fetchRelatedMovies(mid))
      dispatch(fetchMovieActors(mid))
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
            <MovieHeader
              movie={movie}
              genres={genres}
              trailer={trailer}
              actors={actors}
            />
          )}
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
        </>
      )}
    </div>
  )
}

export default MoviePage
