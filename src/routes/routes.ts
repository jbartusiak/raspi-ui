import { IEndpointSpec } from '../redux/reducers/Types';

const host = '192.168.0.254';
const port = '3001';

export const getAllProviders: IEndpointSpec = {
    host,
    port,
    uri: '/providers',
};

export const getEnabledProviders: IEndpointSpec = {
    host,
    port,
    uri: '/providers/enabled',
};

export const updateProviders: IEndpointSpec = {
    host,
    port,
    uri: '/providers',
};

export const performSearch: IEndpointSpec = {
    host,
    port,
    uri: '/torrent/search',
};

export const getMagnet: IEndpointSpec = {
    host,
    port,
    uri: '/torrent/magnet',
};

export const getActiveTorrents: IEndpointSpec = {
    host,
    port,
    uri: '/transmission/active',
};

export const startTorrents: IEndpointSpec = {
    host,
    port,
    uri: '/transmission/start',
};

export const stopTorrents: IEndpointSpec = {
    host,
    port,
    uri: '/transmission/stop',
};

export const addNewTorrent: IEndpointSpec = {
    host,
    port,
    uri: '/transmission/new',
};
