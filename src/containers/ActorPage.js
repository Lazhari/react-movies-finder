import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

import MoviesCardList from "../components/MoviesCardList";
import { getPeopleProfile, getActorCreditMovies } from "../actions/actorAction";
import Loader from "../components/common/Loader";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 50
  },
  media: {
    height: 0,
    paddingTop: "56.25%"
  },
  divider: {
    margin: "16px 0"
  }
}));

const ActorPage = ({ match }) => {
  const dispatch = useDispatch();
  const { profile, movies, loading } = useSelector(state => state.actorStore);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPeopleProfile(match.params.id));
    dispatch(getActorCreditMovies(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <div className={classes.root}>
      {loading ? (
        <Loader />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Card>
              <CardMedia
                className={classes.media}
                image={`https://image.tmdb.org/t/p/w276_and_h350_face${profile.profile_path}`}
                title={profile.name}
              />
              <CardContent className="actor-card__body">
                <Link
                  component={RouterLink}
                  to={`/actors/${profile.id}`}
                  underline="none"
                >
                  <Typography gutterBottom variant="h5" component="h2">
                    {profile.name}
                  </Typography>
                </Link>

                <Typography variant="body1" gutterBottom>
                  Birth day: {profile.birthday}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Place of birth: {profile.place_of_birth}
                </Typography>
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
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={9}>
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
