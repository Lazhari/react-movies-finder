import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";

import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";

import placeholderImage from "../Images/abstract-image.jpg";

const ActorCard = ({ actor }) => {
  const onErrorLoadingImage = e => {
    e.target.src = placeholderImage;
  };
  return (
    <Link to={`/actors/${actor.id}`} component={RouterLink}>
      <Chip
        avatar={
          <Avatar
            alt={actor.name}
            src={`https://image.tmdb.org/t/p/w276_and_h350_face${actor.profile_path}`}
          />
        }
        label={actor.name}
      />
    </Link>
  );
};

ActorCard.propTypes = {
  actor: PropTypes.shape({
    profile_path: PropTypes.string,
    name: PropTypes.string,
    character: PropTypes.string
  })
};

export default ActorCard;
