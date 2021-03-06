import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './components/App';
import {Provider as ReduxProvider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import { configureStore } from './redux/configureStore.dev';
import initialState, { subscribeListener } from './redux/reducers/initialState';

const reduxStore = configureStore(initialState);

reduxStore.subscribe(() => {
    subscribeListener(reduxStore);
});

render(
    <ReduxProvider store={reduxStore}>
        <React.StrictMode>
            <Router>
                <App/>
            </Router>
        </React.StrictMode>
    </ReduxProvider>,
    document.getElementById('root')
);
