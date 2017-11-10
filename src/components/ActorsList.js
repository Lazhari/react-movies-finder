import React from 'react';

import ActorCard from './ActorCard';

const ActorsList = ({actors, loading}) => {
    return (
        <div className="row">
            {
                actors.map(actor => {
                    return (
                        <div className="col-md-2">
                            <ActorCard actor={actor} key={actor.id}/>
                        </div>
                    )
                })
            }
        </div>
    )
};

export default ActorsList;