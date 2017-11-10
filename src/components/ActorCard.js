import React from 'react';


import {Card, CardImg, CardTitle, CardSubtitle, CardBody} from 'reactstrap';

import placeholderImage from '../Images/abstract-image.jpg';

const ActorCard = ({actor}) => {
    const onErrorLoadingImage = (e) => {
        e.target.src = placeholderImage;
    };
    return (

        <Card>
            <CardImg top width="100%" src={`https://image.tmdb.org/t/p/w138_and_h175_bestv2${actor.profile_path}`}
                     alt={actor.name} onError={onErrorLoadingImage}/>
            <CardBody>
                <CardTitle className="h6">
                    <a href="#">Card {actor.name}</a>
                </CardTitle>
                <CardSubtitle>{actor.character}</CardSubtitle>
            </CardBody>
        </Card>

    )
};

export default ActorCard;