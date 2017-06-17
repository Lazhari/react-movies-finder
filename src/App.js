import React, {Component} from 'react';

import { Route } from 'react-router-dom';

import Header from './components/blocks/Header';

import HomePage from './containers/HomePage'
import TopSeriesPage from './containers/TopSeriesPage'
import UpcomingPage from './containers/UpcomingPage'

import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <Header/>

                <div className="container">
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/upcoming" component={UpcomingPage}/>
                    <Route exact path="/series" component={TopSeriesPage}/>
                </div>
            </div>
        );
    }
}

export default App;
