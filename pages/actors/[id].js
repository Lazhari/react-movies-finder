import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import MuiLink from "@material-ui/core/Link";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import MoviesCardList from "../../src/components/MoviesCardList";
import {
  getPeopleProfile,
  getActorCreditMovies,
} from "../../src/actions/actorAction";
import Loader from "../../src/components/common/Loader";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  divider: {
    margin: "16px 0",
  },
}));

const ActorPage = () => {
  const router = useRouter();
  const { id: actorId } = router.query;
  const dispatch = useDispatch();
  const { profile, movies, loading } = useSelector((state) => state.actorStore);
  const classes = useStyles();
  const theme = useTheme();
  const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    if (actorId) {
      dispatch(getPeopleProfile(actorId));
      dispatch(getActorCreditMovies(actorId));
    }
  }, [dispatch, actorId]);

  return (
    <div className={classes.root}>
      {loading ? (
        <Loader />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} lg={3}>
            <Card>
              <CardMedia
                className={classes.media}
                image={`https://image.tmdb.org/t/p/w276_and_h350_face${profile.profile_path}`}
                title={profile.name}
              />
              <CardContent className="actor-card__body">
                <Link
                  href={`/actors/[id]`}
                  as={`/actors/${profile.id}`}
                  shallow
                >
                  <MuiLink href={`/actors/${profile.id}`} underline="none">
                    <Typography gutterBottom variant="h5" component="h2">
                      {profile.name}
                    </Typography>
                  </MuiLink>
                </Link>

                <Typography variant="body1" gutterBottom>
                  Birth day: {profile.birthday}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Place of birth: {profile.place_of_birth}
                </Typography>
                {isUpSm && (
                  <>
                    <Divider className={classes.divider} />
                    <Typography gutterBottom variant="h5" component="h2">
                      Biography
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      align="justify"
                    >
                      {profile.biography}
                    </Typography>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={9}>
            <Typography variant="h5" component="h1" gutterBottom>
              Known For
            </Typography>
            <MoviesCardList
              movies={movies}
              hideOverview={true}
              itemsPerRow={4}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default ActorPage;
