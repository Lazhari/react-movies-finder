import React from 'react';

import ActorCard from './ActorCard';

const ActorsList = ({actors, loading}) => {
    return (
        <div className="row">
            {
                actors.map(actor => {
                    return (
                        <div className="col" key={actor.id}>
                            <ActorCard actor={actor}/>
                        </div>
                    )
                })
            }
        </div>
    )
};

export default ActorsList;