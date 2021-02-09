import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Pagination from 'material-ui-flat-pagination'
import { useRouter } from 'next/router'

import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { fetchMoviesByGenre } from '../../src/actions/moviesActions'

import MoviesCardList from '../../src/components/MoviesCardList'
import Loader from '../../src/components/common/Loader'

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

const GenrePage = () => {
  const router = useRouter()
  const { genre: genreParams } = router.query as { genre: string[] }
  const dispatch = useDispatch()
  const { movies, loading, page, totalResults } = useSelector(
    (state) => state.moviesStore
  )
  const classes = useStyles()

  const handlePageChange = (offset) => {
    const pageNumber = offset / 20 + 1
    const [genreId] = genreParams
    dispatch(fetchMoviesByGenre(pageNumber, genreId))
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    if (genreParams && genreParams.length > 0) {
      const [genreId] = genreParams
      dispatch(fetchMoviesByGenre(1, genreId))
    }
  }, [dispatch, genreParams])

  return (
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
              limit={20}
              offset={(page - 1) * 20}
              total={totalResults}
              onClick={(e, offset) => handlePageChange(offset)}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default GenrePage
