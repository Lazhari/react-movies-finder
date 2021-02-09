import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { getTvShowDetails } from '../../src/actions/tvShowAction'
import Loader from '../../src/components/common/Loader'
import Labels from '../../src/components/Labels'
import ActorsList from '../../src/components/ActorsList'

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex"
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(5),
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

const Series = () => {
  const router = useRouter()
  const { id: tvShowId } = router.query
  const dispatch = useDispatch()
  const { tvShow, loading } = useSelector((store) => store.tvShowStore)
  const classes = useStyles()

  useEffect(() => {
    if (tvShowId) {
      dispatch(getTvShowDetails(tvShowId))
    }
  }, [dispatch, tvShowId])

  const headerStyle = {
    backgroundImage: `radial-gradient(circle at 20% 50%, rgba(16.47%, 15.29%, 14.51%, 0.98) 0%, rgba(22.35%, 22.35%, 22.35%, 0.88) 100%), url(https://image.tmdb.org/t/p/w1400_and_h450_bestv2${tvShow.backdrop_path})`,
  }
  return (
    <div className={classes.root}>
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          <div className={classes.header} style={headerStyle}>
            <img
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${tvShow.poster_path}`}
              alt={tvShow.original_name}
              className={classes.moviePoster}
            />
            <div className={classes.infoBlock}>
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
                    Top Billed Cast
                  </Typography>
                  <ActorsList actors={tvShow.created_by} />
                </div>
              ) : null}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Series
