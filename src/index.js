import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

ReactDOM.render(
    <Router basename="/">
        <Provider store={store}>
            <App />
        </Provider>
    </Router>,
    document.getElementById('root'));
registerServiceWorker();
