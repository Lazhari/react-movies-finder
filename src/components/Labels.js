import React from 'react';

const Labels = ({labels, className='label label-default'}) => {
    const genreLabelStyle = {
        marginLeft: 3
    };
    return (
        <p>
            {
                labels.map(label => (<span className={className} key={label.id} style={genreLabelStyle}>{label.name}</span>))
            }
        </p>
    )
};

export default Labels;