import React from 'react';
import {Segment, Grid, Image, Statistic, Icon, Header, Button, Modal, Embed} from 'semantic-ui-react';

import Labels from './Labels';

const MovieHeader = ({movie, genres, productionCompanies, trailer}) => {
    const headerStyle = {
        backgroundImage: `linear-gradient(rgba(3, 3, 3, 0.75), rgba(0, 0, 5, 0.85)), url(https://image.tmdb.org/t/p/w1400_and_h450_bestv2${movie.backdrop_path})`,
        backgroundSize: 'cover',
        padding: 5,
    };
    const getYear = (stringDate) => {
        const d = new Date(stringDate);
        return d.getFullYear();
    };
    return (
        <Segment style={headerStyle}>
            <Grid>
                <Grid.Column width={4}>
                    <Image src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}/>
                </Grid.Column>
                <Grid.Column width={10}>
                    <Header as="h1" inverted>
                        {movie.original_title}
                        <small>({getYear(movie.release_date)})</small>
                    </Header>
                    <Labels labels={genres}/>
                    <Statistic inverted>
                        <Statistic.Value>
                            <Icon name='star' color="yellow" size="tiny"/>
                            {movie.vote_average}
                        </Statistic.Value>
                        <Statistic.Label>User Score</Statistic.Label>
                    </Statistic>
                    <Header as='h3' inverted>
                        Overview:
                        <Header.Subheader>
                            {movie.overview}
                        </Header.Subheader>
                    </Header>
                    <Header as="h4" inverted>Production Companies</Header>
                    <Labels labels={productionCompanies}/>
                </Grid.Column>
                <Grid.Column width={2} textAlign="right">
                    <Modal trigger={<Button content="Play Trailer" icon="youtube" size="mini" color="youtube"/>} basic
                           size="large" floated="right">
                        <Modal.Content>
                            <Embed
                                id={trailer.key}
                                placeholder={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                                source='youtube'
                            />
                        </Modal.Content>
                    </Modal>
                </Grid.Column>
            </Grid>
        </Segment>
    )
};

export default MovieHeader;