import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TvShowCard from './TvShowCard'
import { TvShow } from '@models/tv'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}))

interface Props {
  tvShows: TvShow[]
}

const TvShowList: React.FC<Props> = ({ tvShows }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {tvShows.map((tvShow) => (
          <Grid item lg={3} sm={4} md={4} xs={12} key={tvShow.id}>
            <TvShowCard tvShow={tvShow} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default TvShowList
