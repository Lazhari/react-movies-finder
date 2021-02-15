import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import Container from '@material-ui/core/Container'

import { fetchMoviesByGenre } from '@actions/moviesActions'

import MoviesCardList from '@components/MoviesCardList'
import Loader from '@components/common/Loader'
import { RootState } from '@src/reducers'
import { MoviesState } from '@src/reducers/moviesReducer'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
}))

const GenrePage: NextPage = () => {
  const router = useRouter()
  const { genre: genreParams } = router.query as { genre: string[] }
  const dispatch = useDispatch()
  const { movies, loading, page, totalPages } = useSelector<
    RootState,
    MoviesState
  >((state) => state.moviesStore)
  const classes = useStyles()

  const handlePageChange = (page: number) => {
    const [genreId] = genreParams
    dispatch(fetchMoviesByGenre(page, genreId))
    router.replace({
      pathname: router.asPath,
      query: {
        page,
      },
    })
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    if (router?.isReady && genreParams && genreParams.length > 0) {
      const [genreId] = genreParams
      const { page = 1 } = router.query
      dispatch(fetchMoviesByGenre(parseInt(page as string, 10), genreId))
    }
  }, [dispatch, genreParams, router?.isReady])

  return (
    <Container maxWidth="xl">
      <div className={classes.root}>
        <Typography variant="h4" component="h1" gutterBottom>
          {(genreParams && genreParams[1]) || ''}
        </Typography>
        {loading ? (
          <Loader />
        ) : (
          <>
            <MoviesCardList movies={movies} />
            <div className={classes.paginationContainer}>
              <Pagination
                count={totalPages}
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={(e, page) => handlePageChange(page)}
              />
            </div>
          </>
        )}
      </div>
    </Container>
  )
}

export default GenrePage
