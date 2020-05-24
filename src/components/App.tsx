import React from 'react';
import './App.module.scss';
import 'typeface-roboto';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ApplicationBar as AppBar } from './AppBar/AppBar';
import styles from './App.module.scss';
import { Route, Switch } from 'react-router-dom';
import { Homepage } from '../containers/Homepage/Homepage';
import { TorrentSearchPage } from '../containers/TorrentSearch/TorrentSearchPage';
import { TorrentClientPage } from '../containers/TorrentClient/TorrentClientPage';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#C51A4A'
        },
        secondary: {
            main: '#6CC04A'
        },
        background: {
            default: '#333333',
            paper: '#EEE'
        }
    },
    spacing: 8
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AppBar/>
            <div className={styles.ApplicationContainer}>
                <Switch>
                    <Route path={'/pi-tor'}>
                        <TorrentClientPage/>
                    </Route>
                    <Route path={'/torrent'}>
                        <TorrentSearchPage/>
                    </Route>
                    <Route path={'/'}><Homepage/></Route>
                </Switch>
            </div>
        </ThemeProvider>
    );
}

export default App;
