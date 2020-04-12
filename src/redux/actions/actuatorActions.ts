import { ACTUATE } from './actionTypes';
import { IService, ServiceStatus } from '../reducers/Types';

export function actuate(service: IService) {
    return (dispatch: Function) => {
        const { uri, port, actuator } = service;
        return fetch(`http://${uri}:${port}${actuator.health}`)
            .then(response => response.json())
            .then(response => {
                actuator.parseStatus.test(JSON.stringify(response)) ?
                    dispatch(setServiceStatus(service, ServiceStatus.UP)) :
                    dispatch(setServiceStatus(service, ServiceStatus.DOWN));
            });
    };
}

export const setServiceStatus = (service:IService, status:ServiceStatus) => ({
    type: ACTUATE,
    service,
    status,
});