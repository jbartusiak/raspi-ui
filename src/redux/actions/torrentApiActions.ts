import { IEndpointSpec, ITorrentProvider } from '../reducers/Types';
import {
    GET_ENABLED_PROVIDERS_SUCCESS,
    GET_PROVIDERS_SUCCESS,
} from './actionTypes';
import { apiCallFailed, beginApiCall } from './apiCallActions';

const setEnabledProviders = (enabledProviders: ITorrentProvider[]) => ({
    type: GET_ENABLED_PROVIDERS_SUCCESS,
    enabledProviders,
});

const setProviders = (providers: ITorrentProvider[]) => ({
    type: GET_PROVIDERS_SUCCESS,
    providers,
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
