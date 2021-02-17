import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Rating from '@material-ui/lab/Rating'

import Labels from './Labels'
import ActorsList from './ActorsList'

import { TvShowDetails } from '@models/tv'

const useStyles = makeStyles((theme) => ({
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
  rating: {
    marginTop: theme.spacing(1),
  },
  moviePoster: {
    width: theme.spacing(25),
    borderRadius: 5,
    boxShadow: theme.shadows[1],
  },
  infoBlock: {
    marginLeft: theme.spacing(4),
  },
  subTitle: {
    marginLeft: theme.spacing(1),
  },
  labels: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

interface Props {
  tvShow: TvShowDetails
}

const TvShowHeader: React.FC<Props> = ({ tvShow }) => {
  const classes = useStyles()

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
      <div className={classes.moviePosterContainer}>
        <img
          src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${tvShow.poster_path}`}
          alt={tvShow.original_name}
          className={classes.moviePoster}
        />
        <Rating
          className={classes.rating}
          name="read-only"
          value={tvShow.vote_average / 2}
          precision={0.1}
          readOnly
        />
      </div>
      <div className={classes.infoBlock}>
        <Typography variant="h4" component="h1" gutterBottom>
          {tvShow.original_name}
          <small className={classes.subTitle}>({tvShow.first_air_date})</small>
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
              Top Billed Cast
            </Typography>
            <ActorsList actors={tvShow.created_by} />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default TvShowHeader
