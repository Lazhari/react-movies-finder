import React from 'react'
import Link from 'next/link'

import { makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import MuiLink from '@material-ui/core/Link'
import { Actor } from '@models/actor'
import { CreditCast } from '@models/credit'
import { TvShowCreator } from '@src/models/tv'

interface Props {
  actor: Actor | CreditCast | TvShowCreator
}

const useStyles = makeStyles(() => ({
  hasCursor: {
    cursor: 'pointer',
  },
}))

const ActorCard: React.FC<Props> = ({ actor }) => {
  const classes = useStyles()
  return (
    <Link href={`/actors/[id]`} as={`/actors/${actor.id}`} shallow>
      <MuiLink href={`/actors/${actor.id}`} underline="none">
        <Chip
          avatar={
            <Avatar
              alt={actor.name}
              src={`https://image.tmdb.org/t/p/w276_and_h350_face${actor.profile_path}`}
            />
          }
          label={actor.name}
          className={classes.hasCursor}
          size="medium"
        />
      </MuiLink>
    </Link>
  )
}

export default ActorCard
