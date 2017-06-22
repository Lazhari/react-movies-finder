import React, {Component} from 'react';

import { Route } from 'react-router-dom';
import { Container, Segment, Sidebar, Grid } from 'semantic-ui-react';

import Header from './components/blocks/Header';

import HomePage from './containers/HomePage';
import TopSeriesPage from './containers/TopSeriesPage';
import UpcomingPage from './containers/UpcomingPage';
import GenrePage from './containers/GenrePage';
import MoviesCategoryContainer from './containers/MoviesCategoryContainer';
import MoviePage from './containers/MoviePage';

import './App.css';

class App extends Component {

    render() {
        return (
            <div>
                <Header/>
                <Sidebar.Pusher>
                    <Container style={{marginTop: '50px'}} fluid>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={3}>
                                    <MoviesCategoryContainer/>
                                </Grid.Column>
                                <Grid.Column width={13}>
                                    <Route exact path="/" component={HomePage}/>
                                    <Route exact path="/upcoming" component={UpcomingPage}/>
                                    <Route exact path="/series" component={TopSeriesPage}/>
                                    <Route exact path="/genres/:id/:genre" component={GenrePage}/>
                                    <Route exact path="/movies/:id" component={MoviePage}/>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </Sidebar.Pusher>
            </div>
        );
    }
}

export default App;
