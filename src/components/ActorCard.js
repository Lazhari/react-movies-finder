import React from 'react';

import placeholderImage from '../Images/abstract-image.jpg';

const ActorCard = ({actor}) => {
    const onErrorLoadingImage = (e) => {
        e.target.src = placeholderImage;
    };
    return (
        <div className="thumbnail">
            <img src={`https://image.tmdb.org/t/p/w138_and_h175_bestv2${actor.profile_path}`} alt={actor.name} width={138} height={175} onError={onErrorLoadingImage}/>
            <div>
                <h6 style={{fontSize: 10}}>{actor.name}</h6>
            </div>
        </div>
    )
};

export default ActorCard;