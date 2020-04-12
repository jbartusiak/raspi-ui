import { AnyAction } from 'redux';
import { IService, ServiceStatus } from '../reducers/Types';

export const ROUTING_CHANGED = 'ROUTING_CHANGED';
export const ACTUATE = 'ACTUATE';
export const UPDATE_SERVICES = 'UPDATE_SERVICES';
export const CONFIGURATION_FETCHED = 'CONFIGURATION_FETCHED';

export interface IRoutingAction extends AnyAction {
    location: string;
}
export interface IActuateAction extends AnyAction {
    service: IService;
    status: ServiceStatus;
}
export interface IUpdateServicesAction extends AnyAction {
    services: { [name: string]: IService};
}