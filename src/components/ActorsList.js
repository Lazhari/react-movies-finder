import React from 'react';
import Masonry from 'react-masonry-component';

import ActorCard from './ActorCard';

const ActorsList = ({actors, loading}) => {
    return (
        <div className="row">
            <Masonry updateOnEachImageLoad={true}>
            {
                actors.map(actor => {
                    return (
                        <div className="col-md-2" key={actor.id}>
                            <ActorCard actor={actor}/>
                        </div>
                    )
                })
            }
            </Masonry>
        </div>
    )
};

export default ActorsList;