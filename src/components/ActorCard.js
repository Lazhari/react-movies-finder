import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Card, CardImg, CardTitle, CardSubtitle, CardBody } from 'reactstrap';

import placeholderImage from '../Images/abstract-image.jpg';

const ActorCard = ({ actor }) => {
    const onErrorLoadingImage = (e) => {
        e.target.src = placeholderImage;
    };
    const imageStyle = {
        display: 'block',
        height: '10vh',
        //clipPath: 'polygon(0 0, 100% 0%, 100% 90%, 0 100%)',
        objectFit: 'cover',
        objectPosition: 'center'
    };
    return (

        <Card style={{ backgroundColor: 'transparent', border: 'none' }}>
            <CardImg top width="100%" src={`https://image.tmdb.org/t/p/w276_and_h350_face${actor.profile_path}`}
                alt={actor.name} onError={onErrorLoadingImage} style={imageStyle} />
            <CardBody style={{ paddingRight: 0, paddingLeft: 0 }}>
                <CardTitle className="h6" style={{ fontSize: 14, height: 30, color: '#e9e9e9', fontWeight: 100 }}>
                    <Link to={`/actors/${actor.id}`}>{actor.name}</Link>
                </CardTitle>
            </CardBody>
        </Card>

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