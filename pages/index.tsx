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
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 160px)',
  },
  loaderSpinOne: {
    position: 'relative',
    right: 50,
  },
  loaderSpinTwo: {
    position: 'relative',
    right: 80,
  },
}))

const Home: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const { movies, loading, page, totalPages } = useSelector<
    RootState,
    MoviesState
  >((state) => {
    return state.moviesStore
  })
  const classes = useStyles()
  const handlePageChange = (page: number) => {
    dispatch(fetchMovies(page))
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
      dispatch(fetchMovies(parseInt(page as string, 10)))
    }
  }, [dispatch, router?.isReady])

  return (
    <div className={classes.root}>
      <SEO
        title="Popular Movies"
        description="A list of popular movies on TMDb."
      />
      <Typography variant="h4" component="h1" gutterBottom>
        Popular Movies
      </Typography>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <MoviesCardList movies={movies} />
          {movies && movies.length ? (
            <div className={classes.paginationContainer}>
              <Pagination
                count={totalPages}
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={(e, page) => handlePageChange(page)}
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default Home
