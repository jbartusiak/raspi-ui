import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './components/App';
import {Provider as ReduxProvider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import { configureStore } from './redux/configureStore.dev';
import initialState from './redux/reducers/initialState';

const initialStateKey = 'RASPI_STATE';
const localStorageInitialState = localStorage.getItem(initialStateKey);
const reduxState = localStorageInitialState? JSON.parse(localStorageInitialState) : initialState;

const reduxStore = configureStore(reduxState);

reduxStore.subscribe(() => {
    console.log('Saving to local state');
    const state = reduxStore.getState();
    localStorage.setItem('RASPI_STATE', JSON.stringify(state));
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
