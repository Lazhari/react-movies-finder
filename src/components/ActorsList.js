import React from 'react';
import { Card } from 'semantic-ui-react';

import ActorCard from './ActorCard';

const ActorsList = ({actors, loading}) => {
    return (
        <Card.Group itemsPerRow={6}>
            {
                actors.map(actor => {
                    return (
                        <ActorCard actor={actor} key={actor.id}/>
                    )
                })
            }
        </Card.Group>
    )
};

export default ActorsList;