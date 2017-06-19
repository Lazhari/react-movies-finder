import React, {Component} from 'react';

import { Route } from 'react-router-dom';

import Header from './components/blocks/Header';

import HomePage from './containers/HomePage';
import TopSeriesPage from './containers/TopSeriesPage';
import UpcomingPage from './containers/UpcomingPage';
import GenrePage from './containers/GenrePage';
import MoviesCategoryContainer from './containers/MoviesCategoryContainer';

import './App.css';

class App extends Component {

    render() {
        return (
            <div>
                <Header/>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xs-12 col-sm-4 col-md-3 col-lg-2">
                            <MoviesCategoryContainer/>
                        </div>
                        <div className="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                            <Route exact path="/" component={HomePage}/>
                            <Route exact path="/upcoming" component={UpcomingPage}/>
                            <Route exact path="/series" component={TopSeriesPage}/>
                            <Route exact path="/genres/:id/:genre" component={GenrePage}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
