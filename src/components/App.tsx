import React from 'react';
import './App.module.scss';
import 'typeface-roboto';
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {appBar as AppBar} from "./AppBar/AppBar";
import {Container, Paper} from '@material-ui/core';
import ActuatorContainer from '../containers/ActuatorContainer/ActuatorContainer';
import styles from './App.module.scss';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#C51A4A',
        },
        secondary: {
            main: '#6CC04A',
        },
        background: {
            default: '#333333',
            paper: '#EEE',
        }
    },
    spacing: 8
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AppBar/>
            <Container className={styles.ApplicationContainer}>
                <Paper>
                    <ActuatorContainer selector="Raspi Backend Service"/>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}

export default App;
