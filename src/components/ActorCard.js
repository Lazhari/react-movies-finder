import React from 'react';


import {Card, CardImg, CardTitle, CardSubtitle, CardBody} from 'reactstrap';

import placeholderImage from '../Images/abstract-image.jpg';

const ActorCard = ({actor}) => {
    const onErrorLoadingImage = (e) => {
        e.target.src = placeholderImage;
    };
    const imageStyle = {
        display: 'block',
        height: '40vh',
        clipPath: 'polygon(0 0, 100% 0%, 100% 90%, 0 100%)'
    };
    return (

        <Card>
            <CardImg top width="100%" src={`https://image.tmdb.org/t/p/w138_and_h175_bestv2${actor.profile_path}`}
                     alt={actor.name} onError={onErrorLoadingImage} style={imageStyle}/>
            <CardBody>
                <CardTitle className="h6 text-center" style={{fontSize: 14, height: 40}}>
                    <a href="#">Card {actor.name}</a>
                </CardTitle>
                <CardSubtitle style={{fontSize: 12}} className="text-center">{actor.character}</CardSubtitle>
            </CardBody>
        </Card>

    )
};

export default ActorCard;