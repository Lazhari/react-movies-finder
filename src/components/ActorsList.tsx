import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import ActorCard from './ActorCard'
import { Actor } from '@models/actor'
import { Credit } from '@models/credit'
import { TvShowCreator } from '@models/tv'

interface Props {
  actors: Array<Actor | Credit | TvShowCreator>
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}))

const ActorsList: React.FC<Props> = ({ actors }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {actors.map((actor) => {
        return <ActorCard actor={actor} key={actor.id} />
      })}
    </div>
  )
}

export default ActorsList
