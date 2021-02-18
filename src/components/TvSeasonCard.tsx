import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { Season } from '@src/models/tv'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      height: 138,
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      width: 'calc(100% - 92px)',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 92,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  })
)

interface Props {
  season: Season
}

const TvSeasonCard: React.FC<Props> = ({ season }) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6">
            {season.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {season.air_date} | {season.episode_count} Episodes
          </Typography>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        image={`https://www.themoviedb.org/t/p/w300${season.poster_path}`}
        title="Live from space album cover"
      />
    </Card>
  )
}

export default TvSeasonCard
