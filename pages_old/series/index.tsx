import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { Container } from '@material-ui/core'

import { fetchTvShows, fetchTvGenres } from '@actions/tvShowsActions'
import TvShowList from '@components/TvShowList'
import Loader from '@components/common/Loader'
import SEO from '@components/common/Seo'
import { RootState } from '@src/reducers'
import { TvShowsState } from '@src/reducers/tvShowsReducer'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(10),
    },
  },
  filtersContainer: {
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}))

const sortOptions = [
  {
    label: 'Average Vote DESC',
    value: 'vote_average.desc',
  },
  {
    label: 'Average Vote ASC',
    value: 'vote_average.asc',
  },
  {
    label: 'First Air Date DESC',
    value: 'first_air_date.desc',
  },
  {
    label: 'First Air Date ASC',
    value: 'first_air_date.asc',
  },
  {
    label: 'Popularity DESC',
    value: 'popularity.desc',
  },
  {
    label: 'Popularity ASC',
    value: 'popularity.asc',
  },
]

const TopSeriesPage: NextPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { tvShows, loading, page, totalPages, genres } = useSelector<
    RootState,
    TvShowsState
  >((state) => state.tvShowsStore)
  const classes = useStyles()
  const [sortBy, setSortBy] = React.useState('popularity.desc')
  const [selectedGenres, setSelectedGenres] = React.useState('')

  const handlePageChange = (page: number) => {
    dispatch(
      fetchTvShows(page, {
        sort_by: sortBy,
        with_genres: selectedGenres,
      })
    )
    router.replace(router.basePath, {
      query: {
        page,
      },
    })
    window.scrollTo(0, 0)
  }

  const handleChange = (event) => {
    setSortBy(event.target.value)
  }

  const handleGenresChange = (event) => {
    setSelectedGenres(event.target.value)
    setSortBy('popularity.desc')
  }

  useEffect(() => {
    if (router?.isReady) {
      const { page = 1 } = router.query
      dispatch(
        fetchTvShows(parseInt(page as string, 10), {
          sort_by: sortBy,
          with_genres: selectedGenres,
        })
      )
    }
  }, [dispatch, sortBy, selectedGenres, router?.isReady])

  useEffect(() => {
    dispatch(fetchTvGenres())
  }, [dispatch])

  return (
    <Container maxWidth="xl">
      <div className={classes.root}>
        <SEO title="List TV Shows" description="TV shows list" />
        <div className={classes.filtersContainer}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="genre-label"
              value={selectedGenres}
              onChange={handleGenresChange}
              label="Genre"
            >
              {genres.map((genre) => (
                <MenuItem value={genre.id} key={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="sort-by-label">Sorted By</InputLabel>
            <Select
              labelId="sort-by-label"
              id="sort-by-label-select-outlined"
              value={sortBy}
              onChange={handleChange}
              label="Sorted By"
            >
              {sortOptions.map((sortOption) => (
                <MenuItem value={sortOption.value} key={sortOption.value}>
                  {sortOption.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <>
            <TvShowList tvShows={tvShows} />
            {tvShows && tvShows.length ? (
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
          </>
        )}
      </div>
    </Container>
  )
}
export default TopSeriesPage
