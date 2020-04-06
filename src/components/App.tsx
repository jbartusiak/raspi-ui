import React from 'react';
import './App.css';
import 'typeface-roboto';
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {appBar as AppBar} from "./AppBar/AppBar";
import {Container, Paper} from '@material-ui/core';

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
            <Container>
                <Paper>
                    <div className="App">
                        <h2>Hello</h2>
                        {process.env.NODE_ENV}
                    </div>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}

export default App;
