import React, {Component} from 'react';

import { Route } from 'react-router-dom';
import { Container, Sidebar, Grid, Segment } from 'semantic-ui-react';

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
                    <Container style={{padding: '50px 10px'}} fluid>
                        <Grid>
                            <Grid.Column width={2}>
                                <MoviesCategoryContainer/>
                            </Grid.Column>

                            <Grid.Column stretched width={14}>
                                <Segment padded color='blue'>
                                    <Route exact path="/" component={HomePage}/>
                                    <Route exact path="/upcoming" component={UpcomingPage}/>
                                    <Route exact path="/series" component={TopSeriesPage}/>
                                    <Route exact path="/genres/:id/:genre" component={GenrePage}/>
                                    <Route exact path="/movies/:id" component={MoviePage}/>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                    </Container>
                </Sidebar.Pusher>
            </div>
        );
    }
}

export default App;
