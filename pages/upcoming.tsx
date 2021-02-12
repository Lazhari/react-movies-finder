import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Pagination from '@material-ui/lab/Pagination'

import { fetchMovies } from '@actions/moviesActions'

import MoviesCardList from '@components/MoviesCardList'
import Loader from '@components/common/Loader'
import SEO from '@components/common/Seo'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
  },
  paginationContainer: {
    marginTop: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

const UpcomingPage: NextPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { movies, loading, page, totalPages } = useSelector(
    (state) => state.moviesStore
  )
  const classes = useStyles()

  const handlePageChange = (page: number) => {
    dispatch(fetchMovies(page, 'upcoming'))
    router.replace(router.basePath, {
      query: {
        page,
      },
    })
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    if (router?.isReady) {
      const { page = 1 } = router.query
      dispatch(fetchMovies(parseInt(page as string, 10), 'upcoming'))
    }
  }, [dispatch, router?.isReady])

  return (
    <div className={classes.root}>
      <SEO
        title="Upcoming movies"
        description="A list of upcoming movies in theatres."
      />
      <Typography variant="h4" component="h1" gutterBottom>
        Upcoming Movies
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
  )
}

export default UpcomingPage
