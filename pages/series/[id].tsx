import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import { makeStyles, Theme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import {
  getTvShowCredits,
  getTvShowDetails,
  getTvShowVideos,
} from '@actions/tvShowAction'
import Loader from '@components/common/Loader'
import SEO from '@components/common/Seo'
import { RootState } from '@src/reducers'
import { TvShowState } from '@src/reducers/tvShowReducer'
import TvShowHeader from '@src/components/TvShowHeader'
import ActorsList from '@components/ActorsList'

const useStyles = makeStyles((_theme: Theme) => ({
  root: {
    // display: "flex"
  },
}))

const Series: NextPage = () => {
  const router = useRouter()
  const { id: tvShowId } = router.query
  const dispatch = useDispatch()
  const { tvShow, cast, video, loading } = useSelector<RootState, TvShowState>(
    (store) => store.tvShowStore
  )
  const classes = useStyles()

  useEffect(() => {
    if (tvShowId) {
      const id = parseInt(tvShowId as string, 10)
      dispatch(getTvShowDetails(id))
      dispatch(getTvShowCredits(id))
      dispatch(getTvShowVideos(id))
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
            <div>
              {cast && cast.length ? (
                <div>
                  <Typography variant="h6" component="h1">
                    Top Billed Cast
                  </Typography>
                  <ActorsList actors={cast} />
                </div>
              ) : null}
            </div>
          </Container>
        </>
      )}
    </div>
  )
}

export default Series
