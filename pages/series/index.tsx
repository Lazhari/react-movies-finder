import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from 'material-ui-flat-pagination'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import Chip from '@material-ui/core/Chip'
import Checkbox from '@material-ui/core/Checkbox'

import { fetchTvShows, fetchTvGenres } from '../../src/actions/tvShowsActions'
import TvShowList from '../../src/components/TvShowList'
import Loader from '../../src/components/common/Loader'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 50,
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  filtersContainer: {
    display: 'flex',
    justifyContent: 'space-between',
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

const TopSeriesPage = () => {
  const dispatch = useDispatch()
  const { tvShows, loading, page, totalResults, genres } = useSelector(
    (state) => state.tvShowsStore
  )
  const classes = useStyles()
  const [sortBy, setSortBy] = React.useState('popularity.desc')
  const [selectedGenres, setSelectedGenres] = React.useState([])

  const handlePageChange = (offset) => {
    const pageNumber = offset / 20 + 1
    dispatch(
      fetchTvShows(pageNumber, {
        sort_by: sortBy,
        with_genres: selectedGenres.join(','),
      })
    )
    window.scrollTo(0, 0)
  }

  const handleChange = (event) => {
    setSortBy(event.target.value)
  }

  const handleGenresChange = (event) => {
    setSelectedGenres(event.target.value)
  }

  useEffect(() => {
    dispatch(
      fetchTvShows(1, {
        sort_by: sortBy,
        with_genres: selectedGenres.join(','),
      })
    )
  }, [dispatch, sortBy, selectedGenres])
  useEffect(() => {
    dispatch(fetchTvGenres())
  }, [dispatch])

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }

  return (
    <div className={classes.root}>
      <div className={classes.filtersContainer}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-mutiple-chip-label">Genre</InputLabel>
          <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            value={selectedGenres}
            onChange={handleGenresChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected: any) => (
              <div className={classes.chips}>
                {genres
                  .filter((genre) => selected.includes(genre.id))
                  .map((genre) => (
                    <Chip
                      key={genre.id}
                      label={genre.name}
                      className={classes.chip}
                    />
                  ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                <Checkbox checked={selectedGenres.indexOf(genre.id) > -1} />
                <ListItemText primary={genre.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Sorted By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sortBy}
            onChange={handleChange}
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
                limit={20}
                offset={(page - 1) * 20}
                total={totalResults}
                onClick={(e, offset) => handlePageChange(offset)}
              />
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}
export default TopSeriesPage
