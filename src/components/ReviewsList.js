import React from 'react';
import {Comment, Icon, Header} from 'semantic-ui-react';

const ReviewsList = ({reviews}) => {
    return (
        <Comment.Group size='small'>
            <Header as='h2' content='Reviews' dividing/>
            {
                reviews.map(review => {
                    return (
                        <Comment key={review.id}>
                            <Comment.Content>
                                <Comment.Author as='a' href={review.url}
                                                target='_blank'> { review.author }:</Comment.Author>
                                <Comment.Text>
                                    { review.content }
                                </Comment.Text>
                            </Comment.Content>
                        </Comment>
                    )
                })
            }
        </Comment.Group>
    )
}

export default ReviewsList;
