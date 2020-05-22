import { IEndpointSpec, ITorrentProvider } from '../reducers/Types';
import {
    GET_ENABLED_PROVIDERS_SUCCESS,
    GET_PROVIDERS_SUCCESS,
    UPDATE_ENABLED_PROVIDERS_SUCCESS,
    UPDATE_QUERY,
} from './actionTypes';
import { apiCallFailed, beginApiCall } from './apiCallActions';
import { doPost } from './actuatorActions';
import { IOptions } from '../../components/CheckboxGroup/CheckboxGroup';

const setEnabledProviders = (enabledProviders: ITorrentProvider[]) => ({
    type: GET_ENABLED_PROVIDERS_SUCCESS,
    enabledProviders,
});

const setProviders = (providers: ITorrentProvider[]) => ({
    type: GET_PROVIDERS_SUCCESS,
    providers,
});

const setUpdatedEnabledProviders = (
    providers: string[],
    allProviders: ITorrentProvider[]
) => ({
    type: UPDATE_ENABLED_PROVIDERS_SUCCESS,
    providers,
    allProviders,
});

export const updateQuery = (query: string) => ({
    type: UPDATE_QUERY,
    query,
});

const handleError = (dispatch: Function, error: Error) => {
    console.log(error);
    dispatch(apiCallFailed(error.message));
};

export const getAllProviders = ({ host, port, uri }: IEndpointSpec) => {
    return (dispatch: Function) => {
        dispatch(beginApiCall('GET_ALL_PROVIDERS'));
        const url = `http://${host}:${port}${uri}`;
        try {
            fetch(url)
                .then(result => result.json())
                .then(result => dispatch(setProviders(result.providers)))
                .catch(error => handleError(dispatch, error));
        } catch (error) {
            handleError(dispatch, error);
        }
    };
};

export const getEnabledProviders = ({ host, port, uri }: IEndpointSpec) => {
    return (dispatch: Function) => {
        dispatch(beginApiCall('GET_ENABLED_PROVIDERS'));
        const url = `http://${host}:${port}${uri}`;
        try {
            fetch(url)
                .then(result => result.json())
                .then(result =>
                    dispatch(setEnabledProviders(result.enabledProviders))
                )
                .catch(error => handleError(dispatch, error));
        } catch (error) {
            handleError(dispatch, error);
        }
    };
};

export const updateEnabledProviders = (
    { host, port, uri }: IEndpointSpec,
    providers: IOptions,
    allProviders: ITorrentProvider[]
) => {
    return (dispatch: Function) => {
        dispatch(beginApiCall('UPDATE_ENABLED_PROVIDERS'));
        const url = `http://${host}:${port}${uri}`;
        try {
            doPost(url, providers)
                .then(result => result.json())
                .then(result =>
                    dispatch(
                        setUpdatedEnabledProviders(
                            result.enabledProviders,
                            allProviders
                        )
                    )
                )
                .catch(error => handleError(dispatch, error));
        } catch (error) {
            handleError(dispatch, error);
        }
    };
};

export const performSearch = (spec: IEndpointSpec, query: string) => {};
