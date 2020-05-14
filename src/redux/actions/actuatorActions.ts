import {
    GET_SERVICE_STATUS_SUCCESSS,
    GET_SERVICE_CONFIGURATION_SUCCESS,
} from './actionTypes';
import { ICommand, IService, ServiceStatus } from '../reducers/Types';
import { apiCallFailed, beginApiCall } from './apiCallActions';
import { setConfigurationFetched } from './configurationActions';
import initialState from '../reducers/initialState';
import { act } from 'react-dom/test-utils';

export const setServiceStatus = (service: IService, status: ServiceStatus) => ({
    type: GET_SERVICE_STATUS_SUCCESSS,
    service,
    status,
});

export const setServices = (services: IService[]) => ({
    type: GET_SERVICE_CONFIGURATION_SUCCESS,
    services,
});

export const getServiceConfiguration = () => {
    return (dispatch: Function) => {
        dispatch(setConfigurationFetched());
        dispatch(beginApiCall());

        return fetch(
            'http://192.168.0.254:8888/configuration/raspi-ui-dev.json'
        )
            .then(response => {
                return response.json();
            })
            .then(response => {
                dispatch(setServices(response));
            })
            .catch(error => {
                console.error(error);
                dispatch(apiCallFailed());
            });
    };
};

export function getServiceStatus(service: IService) {
    const handleError = (
        error: Error,
        service: IService,
        dispatch: Function
    ) => {
        console.error(error);
        dispatch(setServiceStatus(service, ServiceStatus.DOWN));
        dispatch(apiCallFailed());
    };

    const handleHttpHealthCheck = (service: IService, dispatch: Function) => {
        const { uri, port, actuator } = service;
        try {
            return fetch(`http://${uri}:${port}${actuator.health}`)
                .then(response => response.text())
                .then(response => {
                    const regex = new RegExp(actuator.parseStatus);
                    const matchesRegex = regex.test(response);
                    if (matchesRegex) {
                        dispatch(setServiceStatus(service, ServiceStatus.UP));
                    } else {
                        dispatch(setServiceStatus(service, ServiceStatus.DOWN));
                    }
                })
                .catch(error => handleError(error, service, dispatch));
        } catch (error) {
            handleError(error, service, dispatch);
        }
    };

    const handleCommandHealthCheck = (
        service: IService,
        dispatch: Function
    ) => {
        const { actuator } = service;
        const requestBody = {
            ...(actuator.health as ICommand),
            elevate: true,
        };
        try {
            return fetch('http://192.168.0.254:8888/execute', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'post',
                body: JSON.stringify(requestBody),
            })
                .then(response => response.text())
                .then(response => {
                    const regex = new RegExp(actuator.parseStatus);
                    if (regex.test(response)) {
                        dispatch(setServiceStatus(service, ServiceStatus.UP));
                    } else {
                        dispatch(setServiceStatus(service, ServiceStatus.DOWN));
                    }
                })
                .catch(error => handleError(error, service, dispatch));
        } catch (error) {
            handleError(error, service, dispatch);
        }
    };

    return (dispatch: Function) => {
        dispatch(beginApiCall());

        if (service.actuator.health.constructor === String) {
            return handleHttpHealthCheck(service, dispatch);
        } else {
            return handleCommandHealthCheck(service, dispatch);
        }
    };
}
