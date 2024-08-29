import { NextPage } from 'next'
import Link from 'next/link'

import { makeStyles, Theme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import NotFoundIcon from '@components/common/icons/NotFoundIcon'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(10),
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: theme.spacing(2),
  },
  homeButton: {
    marginTop: theme.spacing(2),
  },
}))

const Custom404: NextPage = () => {
  const classes = useStyles()
  return (
    <Container className={classes.root} maxWidth="xl">
      <div>
        <NotFoundIcon color="inherit" style={{ fontSize: 160 }} />
      </div>
      <Typography
        align="center"
        variant="h5"
        component="h1"
        className={classes.title}
        gutterBottom
      >
        Page Not Found
      </Typography>
      <Typography align="center" variant="body1">
        Oops! We can&apos;t find the page you are looking for!!
      </Typography>

      <Link href="/">
        <Button variant="outlined" className={classes.homeButton}>
          Back to Home
        </Button>
      </Link>
    </Container>
  )
}

export default Custom404
