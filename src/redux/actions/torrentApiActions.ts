import { IEndpointSpec, ITorrentProvider } from '../reducers/Types';
import {
    GET_ENABLED_PROVIDERS_SUCCESS,
    GET_PROVIDERS_SUCCESS,
    SEARCH_RESULTS_SUCCESS,
    UPDATE_CATEGORY,
    UPDATE_ENABLED_PROVIDERS_SUCCESS,
    UPDATE_QUERY,
} from './actionTypes';
import { apiCallFailed, beginApiCall } from './apiCallActions';
import { doPost } from './actuatorActions';
import { IOptions } from '../../components/CheckboxGroup/CheckboxGroup';
import { getEnabledProviders as getEnabledProvidersRoute } from '../../routes/routes';
import { Torrent } from 'torrent-search-api';

const setEnabledProviders = (enabledProviders: ITorrentProvider[]) => ({
    type: GET_ENABLED_PROVIDERS_SUCCESS,
    enabledProviders,
});

const setProviders = (providers: ITorrentProvider[]) => ({
    type: GET_PROVIDERS_SUCCESS,
    providers,
});

const setUpdatedEnabledProviders = {
    type: UPDATE_ENABLED_PROVIDERS_SUCCESS,
};

export const updateQuery = (query: string) => ({
    type: UPDATE_QUERY,
    query,
});

export const updateCategory = (category: string) => ({
    type: UPDATE_CATEGORY,
    category,
});

export const setSearchResults = (results: Torrent[]) => ({
    type: SEARCH_RESULTS_SUCCESS,
    results,
});

export const handleError = (dispatch: Function, error: Error) => {
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
    providers: IOptions
) => {
    return (dispatch: Function) => {
        dispatch(beginApiCall('UPDATE_ENABLED_PROVIDERS'));
        const url = `http://${host}:${port}${uri}`;
        try {
            doPost(url, providers)
                .then(result => result.json())
                .then(() => {
                    dispatch(setUpdatedEnabledProviders);
                    dispatch(getEnabledProviders(getEnabledProvidersRoute));
                })
                .catch(error => handleError(dispatch, error));
        } catch (error) {
            handleError(dispatch, error);
        }
    };
};

export const performSearch = (
    { host, port, uri }: IEndpointSpec,
    query: string,
    categories: string | string[],
    limit: number = 40
) => {
    return (dispatch: Function) => {
        dispatch(beginApiCall('PERFORM_SEARCH'));
        const url = `http://${host}:${port}${uri}`;
        try {
            doPost(url, {
                categories: Array.isArray(categories)
                    ? categories
                    : [categories],
                limit,
                query,
            })
                .then(res => res.json())
                .then(res => {
                    const results = res.results as Torrent[];
                    dispatch(setSearchResults(results));
                })
                .catch(error => handleError(dispatch, error));
        } catch (error) {
            handleError(dispatch, error);
        }
    };
};
