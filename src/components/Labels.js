import React from 'react';
import { Label } from 'semantic-ui-react';

const Labels = ({labels}) => {
    return (
        <Label.Group size="tiny">
            {
                labels.map(label => (<Label color='teal' tag key={label.id}>{label.name}</Label>))
            }
        </Label.Group>
    )
};

export default Labels;