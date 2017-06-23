import React from 'react';

import { Card, Image } from 'semantic-ui-react';

import placeholderImage from '../Images/abstract-image.jpg';

const ActorCard = ({actor}) => {
    const onErrorLoadingImage = (e) => {
        e.target.src = placeholderImage;
    };
    return (
        <Card>
            <Image src={`https://image.tmdb.org/t/p/w138_and_h175_bestv2${actor.profile_path}`} onError={onErrorLoadingImage}/>
            <Card.Content>
                <Card.Header>
                    {actor.name}
                </Card.Header>
                <Card.Description>
                    {actor.character}
                </Card.Description>
            </Card.Content>
        </Card>

    )
};

export default ActorCard;