import React from 'react';
import { Badge } from 'reactstrap';

const Labels = ({ labels }) => {
    return (
        <div>
            {
                labels.map(label => (<Badge color='primary' key={label.id} style={{ marginRight: 5 }}>{label.name}</Badge>))
            }
        </div>
    )
};

export default Labels;