import React from 'react';
import './App.module.scss';
import 'typeface-roboto';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ApplicationBar as AppBar } from './AppBar/AppBar';
import { Container } from '@material-ui/core';
import styles from './App.module.scss';
import { Route, Switch } from 'react-router-dom';
import { Homepage } from '../containers/Homepage/Homepage';

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
            <AppBar />
            <Container className={styles.ApplicationContainer}>
                <Switch>
                    <Route path={'/torrent'}>
                        <div>TorrentPage</div>
                    </Route>
                    <Route path={'/'}><Homepage/></Route>
                </Switch>
            </Container>
        </ThemeProvider>
    );
}

export default App;
