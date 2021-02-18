import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import { makeStyles, Theme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import {
  getTvShowCredits,
  getTvShowDetails,
  getTvShowRecommendations,
  getTvShowVideos,
} from '@actions/tvShowAction'
import Loader from '@components/common/Loader'
import SEO from '@components/common/Seo'
import { RootState } from '@src/reducers'
import { TvShowState } from '@src/reducers/tvShowReducer'
import TvShowHeader from '@src/components/TvShowHeader'
import ActorsList from '@components/ActorsList'
import TvShowList from '@components/TvShowList'
import TvSeasonCard from '@components/TvSeasonCard'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // display: "flex"
  },
  hasMarginBottom: {
    marginBottom: theme.spacing(4),
  },
}))

const Series: NextPage = () => {
  const router = useRouter()
  const { id: tvShowId } = router.query
  const dispatch = useDispatch()
  const { tvShow, cast, video, recommendations, loading } = useSelector<
    RootState,
    TvShowState
  >((store) => store.tvShowStore)
  const classes = useStyles()

  useEffect(() => {
    if (tvShowId) {
      const id = parseInt(tvShowId as string, 10)
      dispatch(getTvShowDetails(id))
      dispatch(getTvShowCredits(id))
      dispatch(getTvShowVideos(id))
      dispatch(getTvShowRecommendations(id))
    }
  }, [dispatch, tvShowId])

  return (
    <div className={classes.root}>
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          <SEO title={tvShow.original_name} description={tvShow.overview} />
          <TvShowHeader tvShow={tvShow} video={video} />

          <Container maxWidth="xl">
            <Grid container>
              {cast && cast.length ? (
                <Grid item xs={12} className={classes.hasMarginBottom}>
                  <Typography variant="h6" component="h1">
                    Top Billed Cast
                  </Typography>
                  <ActorsList actors={cast} />
                </Grid>
              ) : null}
              <Grid item xs={12} className={classes.hasMarginBottom}>
                <Typography variant="h5" component="h1" gutterBottom>
                  Seasons
                </Typography>
                <Grid container spacing={4}>
                  {tvShow.seasons?.map((season) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      xl={2}
                      key={season.id}
                    >
                      <TvSeasonCard season={season} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              {recommendations?.length > 0 && (
                <Grid item xs={12} className={classes.hasMarginBottom}>
                  <Typography variant="h5" component="h1" gutterBottom>
                    Recommended TV Shows
                  </Typography>
                  <TvShowList tvShows={recommendations} />
                </Grid>
              )}
            </Grid>
          </Container>
        </>
      )}
    </div>
  )
}

export default Series
