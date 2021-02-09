import React from 'react'
import ReactPlayer from 'react-player'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Rating from '@material-ui/lab/Rating'
import IconButton from '@material-ui/core/IconButton'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import CloseIcon from '@material-ui/icons/Close'
import Modal from '@material-ui/core/Modal'

import Labels from './Labels'
import ActorsList from './ActorsList'

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    height: 320,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 24,
  },
  moviePoster: {
    width: '100%',
    borderRadius: 5,
    boxShadow: theme.shadows[1],
  },
  generalInfo: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    '& legend': {
      width: 'inherit',
      marginRight: 8,
    },
  },
  rating: {
    display: 'flex',
    [theme.breakpoints.down('lg')]: {
      marginBottom: theme.spacing(2),
    },
  },
  modalContainer: {
    position: 'absolute',
    height: '90vh',
    width: '100%',
    background: '#111',
  },
  modalHeader: {
    height: '10vh',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 4,
  },
}))

const MovieHeader = ({ movie, genres, trailer, actors }) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const headerStyle = {
    backgroundImage: `linear-gradient(rgba(3, 3, 3, 0.30), rgba(0, 0, 5, 0.30)), url(https://image.tmdb.org/t/p/w1400_and_h450_bestv2${movie.backdrop_path})`,
  }
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div className={classes.root}>
      {trailer && trailer.key && (
        <Modal
          aria-labelledby="Movie Trailer"
          aria-describedby="The Movie Trailer"
          disableScrollLock={true}
          open={open}
          onClose={handleClose}
        >
          <div className={classes.modalContainer}>
            <div className={classes.modalHeader}>
              <Typography variant="h5" component="h1">
                Official Trailer
              </Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailer.key}`}
              controls={true}
              playing
              height="80vh"
              width="100%"
            />
          </div>
        </Modal>
      )}

      <div className={classes.header} style={headerStyle}>
        <IconButton onClick={handleOpen} disabled={!trailer || !trailer.key}>
          <PlayCircleOutlineIcon
            style={{ fontSize: 64, color: '#c53364' }}
          ></PlayCircleOutlineIcon>
        </IconButton>
      </div>
      <Grid container spacing={2}>
        <Grid item lg={3}>
          <img
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`}
            alt={movie.original_title}
            className={classes.moviePoster}
          />
        </Grid>
        <Grid item lg={9}>
          <div>
            <Typography variant="h5" component="h1">
              {movie.original_title}
            </Typography>
            <Typography variant="h6" component="p">
              {movie.release_date}
            </Typography>
          </div>
          <div className={classes.generalInfo}>
            <Grid container>
              <Grid item lg={6} className={classes.rating}>
                <Typography component="legend">{movie.vote_average}</Typography>
                <Rating
                  name="read-only"
                  value={movie.vote_average / 2}
                  precision={0.1}
                  readOnly
                />
              </Grid>
              <Grid item lg={6}>
                <Labels labels={genres} />
              </Grid>
            </Grid>
          </div>
          <div>
            <Typography variant="h6" component="h1">
              Overview
            </Typography>
            <Typography variant="body1">{movie.overview}</Typography>
          </div>
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
    </div>
  )
}

export default MovieHeader
