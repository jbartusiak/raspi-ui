import { ACTUATE, UPDATE_SERVICES } from './actionTypes';
import { IService, ServiceStatus } from '../reducers/Types';

export const setServiceStatus = (service: IService, status: ServiceStatus) => ({
    type: ACTUATE,
    service,
    status
});

export const updateServices = (services: IService[]) => ({
    type: UPDATE_SERVICES,
    services
});

export const getConfiguration = () => {
    return (dispatch: Function) => {
        return fetch('http://192.168.0.254:8888/configuration/raspi-ui-dev.json',
        )
            .then(response => {
                return response.json();
            })
            .then(response => {
                dispatch(updateServices(response));
            })
            .catch(error=> {
                console.error(error);
            });
    };
};

export function actuate(service: IService) {
    const handleError = (error: Error, service: IService, dispatch: Function) => {
        console.error(error);
        dispatch(setServiceStatus(service, ServiceStatus.DOWN));
    }

    return (dispatch: Function) => {
        const { uri, port, actuator } = service;
        try {
            return fetch(`http://${uri}:${port}${actuator.health}`)
                .then(response => response.text())
                .then(response => {
                    const regex = new RegExp(actuator.parseStatus);
                    const matchesRegex = regex.test(response);
                    if(matchesRegex) {
                        dispatch(setServiceStatus(service, ServiceStatus.UP))
                    }
                    else {
                        dispatch(setServiceStatus(service, ServiceStatus.DOWN));
                    }
                })
                .catch(error=>handleError(error, service, dispatch));
        }
        catch (error) {
            handleError(error, service, dispatch);
        }
    };
}
