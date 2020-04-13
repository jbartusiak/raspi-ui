import React, { useEffect } from 'react';
import './App.module.scss';
import 'typeface-roboto';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ApplicationBar as AppBar } from './AppBar/AppBar';
import { Container, Paper } from '@material-ui/core';
import ActuatorContainer from '../containers/ActuatorContainer/ActuatorContainer';
import styles from './App.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getServiceConfiguration } from '../redux/actions/actuatorActions';
import { IApplicationState, ServiceStatus } from '../redux/reducers/Types';
import { beginApiCall } from '../redux/actions/apiCallActions';

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
    const mainServiceName = 'Raspi Backend Service';
    const services = useSelector((state: IApplicationState) => Object.values(state.services));
    const configurationFetched = useSelector((state: IApplicationState) => state.configuration.fetched);
    const dispatch = useDispatch();

    useEffect(() => {
        const { actuator } = services[0];
        if (actuator.status === ServiceStatus.UP && !configurationFetched) {
            dispatch(beginApiCall());
            dispatch(getServiceConfiguration());
        }
    }, [services, configurationFetched, dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <AppBar/>
            <Container className={styles.ApplicationContainer}>
                <Paper style={{ transition: 'all 1s' }}>
                    <ActuatorContainer selector={mainServiceName}/>
                    {Object.values(services).slice(1).map(el =>
                        <ActuatorContainer selector={el.name}/>
                    )}
                </Paper>
            </Container>
        </ThemeProvider>
    )
        ;
}

export default App;
