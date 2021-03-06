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
export const SEARCH_RESULTS_SUCCESS = 'SEARCH_RESULTS_SUCCESS';
export const UPDATE_ENABLED_PROVIDERS_SUCCESS =
    'UPDATE_ENABLED_PROVIDERS_SUCCESS';
export const UPDATE_QUERY = 'UPDATE_QUERY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';

export const UPDATE_ACTIVE_TORRENT_SUCCESS = 'UPDATE_ACTIVE_TORRENT_SUCCESS';
export const ADD_TORRENT_SUCCESS = 'ADD_TORRENT_SUCCESS';
export const START_TORRENT_SUCCESS = 'START_TORRENT_SUCCESS';
export const STOP_TORRENT_SUCCESS = 'STOP_TORRENT_SUCCESS';
export const DELETE_TORRENT_SUCCESS = 'DELETE_TORRENT_SUCCESS';

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
