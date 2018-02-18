import React from 'react';
import { Badge } from 'reactstrap';

const Labels = ({ labels }) => {
    return (
        <span style={{ paddingLeft: 20 }}>
            {
                labels.map(label => (<Badge color='primary' key={label.id} style={{ marginRight: 5 }}>{label.name}</Badge>))
            }
        </span>
    )
};

export default Labels;