import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Pagination from 'material-ui-flat-pagination'

import { fetchMovies } from '../src/actions/moviesActions'

import MoviesCardList from '../src/components/MoviesCardList'
import Loader from '../src/components/common/Loader'

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

function Home() {
  const dispatch = useDispatch()
  const { movies, loading, page, totalResults } = useSelector((state) => {
    return state.moviesStore
  })
  const classes = useStyles()
  const handlePageChange = (offset) => {
    const pageNumber = offset / 20 + 1
    dispatch(fetchMovies(pageNumber))
    window.scrollTo(0, 0)
  }
  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

  return (
    <div className={classes.root}>
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
                limit={20}
                offset={(page - 1) * 20}
                total={totalResults}
                onClick={(e, offset) => handlePageChange(offset)}
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default Home
