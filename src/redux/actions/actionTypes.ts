import { AnyAction } from 'redux';
import { IService, ITorrentProvider, ServiceStatus } from '../reducers/Types';

export const ROUTING_CHANGED = 'ROUTING_CHANGED';

export const GET_SERVICE_STATUS_SUCCESSS = 'GET_SERVICE_STATUS_SUCCESSS';
export const GET_SERVICE_CONFIGURATION_SUCCESS =
    'GET_SERVICE_CONFIGURATION_SUCCESS';
export const GET_CONFIGURATION_SUCCESS = 'GET_CONFIGURATION_SUCCESS';

export const BEGIN_API_CALL = 'BEGIN_API_CALL';
export const API_CALL_FAILED = 'API_CALL_FAILED';
export const SERVICE_COMMAND_CALL = 'SERVICE_COMMAND_CALL';
export const SERVICE_COMMAND_SUCCESS = 'SERVICE_COMMAND_SUCCESS';

export const GET_PROVIDERS_SUCCESS = 'GET_PROVIDERS_SUCCESS';
export const GET_ENABLED_PROVIDERS_SUCCESS = 'GET_ENABLED_PROVIDERS_SUCCESS';
export const UPDATE_ENABLED_PROVIDERS_SUCCESS =
    'UPDATE_ENABLED_PROVIDERS_SUCCESS';
export const UPDATE_QUERY = 'UPDATE_QUERY';

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

export interface IGetProvidersAction extends AnyAction {
    providers: ITorrentProvider[];
}

export interface IGetEnabledProvidersAction extends AnyAction {
    enabledProviders: ITorrentProvider[];
}
