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
import Hidden from '@material-ui/core/Hidden'

// new UI
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import Labels from './Labels'

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
  // New Component
  movieHeader: {
    position: 'relative',
    height: theme.spacing(60),
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  movieInfoContainer: {
    backgroundImage: 'linear-gradient(to top,#111216, #303030)',
  },
  movieHeaderContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3),
      paddingRight: 0,
    },
  },
  trailerButtonContainer: {
    padding: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trailerIcon: {
    marginRight: theme.spacing(1),
  },
}))

const MovieHeader = ({ movie, genres, trailer }) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const headerStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_bestv2${movie.backdrop_path})`,
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

      <Paper className={classes.movieHeader} style={headerStyle}>
        <div className={classes.overlay} />
        <Grid container className={classes.movieInfoContainer}>
          <Grid item md={9} xs={12}>
            <div className={classes.movieHeaderContent}>
              <Typography
                component="h1"
                variant="h4"
                color="inherit"
                gutterBottom
              >
                {movie.original_title}{' '}
                <Hidden xsDown>({movie.release_date})</Hidden>
                <Rating
                  name="read-only"
                  value={movie.vote_average / 2}
                  precision={0.1}
                  readOnly
                />
              </Typography>
              <Typography variant="body2" color="inherit" paragraph>
                {movie.overview}
              </Typography>
              <div>
                <Labels labels={genres} />
              </div>
            </div>
          </Grid>
          <Grid item md={3} xs={12} className={classes.trailerButtonContainer}>
            <Button
              size="large"
              variant="outlined"
              fullWidth
              onClick={handleOpen}
            >
              <PlayCircleOutlineIcon className={classes.trailerIcon} /> Trailer
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default MovieHeader
