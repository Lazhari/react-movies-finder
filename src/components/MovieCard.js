import React from "react";
import Image from "next/image";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Fab from "@material-ui/core/Fab";
import MuiLink from "@material-ui/core/Link";
import { Typography } from "@material-ui/core";

import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
  },
  media: {
    width: "100%",
    minHeight: 364,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const MovieCard = ({ movie, loading, hideOverview }) => {
  const classes = useStyles();
  const onErrorLoadingImage = (e) => {
    e.target.src = "/abstract-image.jpg";
  };
  return (
    <Card className={classes.card}>
      <CardHeader
        title={
          <Typography variant="body2" component="h1">
            {movie.original_title}
          </Typography>
        }
        subheader={"Release: " + movie.release_date || "Unknown"}
      />
      <Link href={`/movies/[mid]`} as={`/movies/${movie.id}`} shallow>
        <MuiLink
          underline="none"
          variant="inherit"
          href={`/movies/${movie.id}`}
        >
          <Image
            alt={movie.original_title}
            className={classes.media}
            onError={onErrorLoadingImage}
            layout="responsive"
            width={600}
            height={900}
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`}
          />
        </MuiLink>
      </Link>

      <CardActions disableSpacing className={classes.actions}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <Fab size="small" color="secondary" aria-label="Ratting">
          <Typography variant="button">
            {movie.vote_average.toString().split(".")[0]}
            <sup>.{movie.vote_average.toString().split(".")[1] || 0}</sup>
          </Typography>
        </Fab>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
