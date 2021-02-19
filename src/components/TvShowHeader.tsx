import React from 'react'

import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Rating from '@material-ui/lab/Rating'
import Modal from '@material-ui/core/Modal'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import Grid from '@material-ui/core/Grid'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import ReactPlayer from 'react-player'

import Labels from './Labels'
import ActorsList from './ActorsList'

import { TvShowDetails } from '@models/tv'
import { Video } from '@models/movie'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(5),
  },
  moviePosterContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  posterWithPlayerContainer: {
    position: 'relative',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  playIcon: {
    fontSize: theme.spacing(8),
  },
  rating: {
    marginTop: theme.spacing(1),
  },
  moviePoster: {
    width: theme.spacing(25),
    borderRadius: 5,
    boxShadow: theme.shadows[1],
  },
  subTitle: {
    marginLeft: theme.spacing(1),
  },
  labels: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
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

interface Props {
  tvShow: TvShowDetails
  video?: Video
}

const TvShowHeader: React.FC<Props> = ({ tvShow, video }) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const theme = useTheme()

  const headerStyle = {
    backgroundImage: `radial-gradient(
        circle at 20% 50%,
        rgba(16.47%, 15.29%, 14.51%, 0.98) 0%,
        rgba(22.35%, 22.35%, 22.35%, 0.88) 100%),
        url(https://image.tmdb.org/t/p/w1400_and_h450_bestv2${tvShow.backdrop_path}
    )`,
  }
  return (
    <div className={classes.root} style={headerStyle}>
      {video?.key && (
        <Modal
          aria-labelledby="Movie Trailer"
          aria-describedby="The Movie Trailer"
          disableScrollLock={true}
          open={open}
          onClose={() => setOpen(false)}
        >
          <div className={classes.modalContainer}>
            <div className={classes.modalHeader}>
              <Typography variant="h5" component="h1">
                Official Trailer
              </Typography>
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
            </div>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${video.key}`}
              controls={true}
              playing
              height="80vh"
              width="100%"
            />
          </div>
        </Modal>
      )}
      <Grid
        container
        spacing={useMediaQuery(theme.breakpoints.down('sm')) ? 4 : 1}
      >
        <Grid
          item
          xs={12}
          sm={4}
          md={3}
          lg={2}
          className={classes.moviePosterContainer}
        >
          <div className={classes.posterWithPlayerContainer}>
            <img
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${tvShow.poster_path}`}
              alt={tvShow.original_name}
              className={classes.moviePoster}
            />
            <IconButton
              onClick={() => setOpen(true)}
              className={classes.playButton}
            >
              <PlayCircleOutlineIcon className={classes.playIcon} />
            </IconButton>
          </div>
          <Rating
            className={classes.rating}
            name="read-only"
            value={tvShow.vote_average / 2}
            precision={0.1}
            readOnly
          />
        </Grid>
        <Grid item xs={12} sm={8} md={9} lg={10}>
          <Typography variant="h4" component="h1" gutterBottom>
            {tvShow.original_name}
            <small className={classes.subTitle}>
              ({tvShow.first_air_date})
            </small>
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            Overview
          </Typography>
          <Typography gutterBottom>{tvShow.overview}</Typography>
          {tvShow && tvShow.genres && (
            <div className={classes.labels}>
              <Labels labels={tvShow.genres} />
            </div>
          )}
          {tvShow && tvShow.created_by ? (
            <div>
              <Typography variant="h6" component="h1" gutterBottom>
                Created By
              </Typography>
              <ActorsList actors={tvShow.created_by} />
            </div>
          ) : null}
        </Grid>
      </Grid>
    </div>
  )
}

export default TvShowHeader
