import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Card, CardImg, CardTitle, CardSubtitle, CardBody } from 'reactstrap';

import placeholderImage from '../Images/abstract-image.jpg';

const ActorCard = ({ actor }) => {
    const onErrorLoadingImage = (e) => {
        e.target.src = placeholderImage;
    };
    return (

        <Card className="actor-card">
            <CardImg top width="100%" src={`https://image.tmdb.org/t/p/w276_and_h350_face${actor.profile_path}`}
                alt={actor.name} onError={onErrorLoadingImage} className="actor-card__face" />
            <CardBody className="actor-card__body">
                <CardTitle className="h6 actor-card__name">
                    <Link to={`/actors/${actor.id}`}>{actor.name}</Link>
                </CardTitle>
            </CardBody>
        </Card >

    )
};

ActorCard.propTypes = {
    actor: PropTypes.shape({
        profile_path: PropTypes.string,
        name: PropTypes.string,
        character: PropTypes.string
    })
};

export default ActorCard;