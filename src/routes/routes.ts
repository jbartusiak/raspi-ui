import { IEndpointSpec } from '../redux/reducers/Types';

export const getAllProviders: IEndpointSpec = {
    host: '192.168.0.254',
    port: '3001',
    uri: '/providers',
};

export const getEnabledProviders: IEndpointSpec = {
    host: '192.168.0.254',
    port: '3001',
    uri: '/providers/enabled',
};

export const updateProviders: IEndpointSpec = {
    host: '192.168.0.254',
    port: '3001',
    uri: '/providers',
};