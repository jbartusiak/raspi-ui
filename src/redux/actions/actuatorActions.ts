import {
    GET_SERVICE_CONFIGURATION_SUCCESS,
    GET_SERVICE_STATUS_SUCCESSS,
    SERVICE_COMMAND_CALL,
} from './actionTypes';
import {
    ControlActions,
    ICommand,
    IService,
    ServiceStatus,
} from '../reducers/Types';
import { apiCallFailed, beginApiCall } from './apiCallActions';
import { setConfigurationFetched } from './configurationActions';

export const setServiceStatus = (service: IService, status: ServiceStatus) => ({
    type: GET_SERVICE_STATUS_SUCCESSS,
    service,
    status,
});

export const setServices = (services: IService[]) => ({
    type: GET_SERVICE_CONFIGURATION_SUCCESS,
    services,
});

export const issueCommand = () => ({ type: SERVICE_COMMAND_CALL });

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

export const doPost = (url: string, requestBody: {}) => {
    return fetch(url, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify(requestBody),
    });
};

const doCommand = (requestBody: {}) =>
    doPost('http://192.168.0.254:8888/execute', requestBody);

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
            doCommand(requestBody)
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

export function runCommand(service: IService, command: ControlActions) {
    return (dispatch: Function) => {
        dispatch(issueCommand());
        dispatch(beginApiCall());
        dispatch(setServiceStatus(service, ServiceStatus.UNKNOWN));
    };
}
