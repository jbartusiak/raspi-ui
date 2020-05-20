import { AnyAction } from 'redux';
import { IService, ServiceStatus } from '../reducers/Types';

export const ROUTING_CHANGED = 'ROUTING_CHANGED';

export const GET_SERVICE_STATUS_SUCCESSS = 'GET_SERVICE_STATUS_SUCCESSS';
export const GET_SERVICE_CONFIGURATION_SUCCESS =
    'GET_SERVICE_CONFIGURATION_SUCCESS';
export const GET_CONFIGURATION_SUCCESS = 'GET_CONFIGURATION_SUCCESS';

export const BEGIN_API_CALL = 'BEGIN_API_CALL';
export const API_CALL_FAILED = 'API_CALL_FAILED';
export const SERVICE_COMMAND_CALL = 'SERVICE_COMMAND_CALL';
export const SERVICE_COMMAND_SUCCESS = 'SERVICE_COMMAND_SUCCESS';

export const GET_ALL_PROVIDERS = 'GET_ALL_PROVIDERS';
export const MODIFY_PROVIDERS = 'MODIFY_PROVIDERS';
export const MODIFY_PROVIDERS_SUCCESS = 'MODIFY_PROVIDERS_SUCCESS';

export interface IRoutingAction extends AnyAction {
    location: string;
}
export interface IActuateAction extends AnyAction {
    service: IService;
    status: ServiceStatus;
}
export interface IUpdateServicesAction extends AnyAction {
    services: { [name: string]: IService };
}
