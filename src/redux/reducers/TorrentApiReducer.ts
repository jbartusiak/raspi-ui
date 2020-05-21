import initialState from './initialState';
import { AnyAction } from 'redux';
import {
    GET_PROVIDERS_SUCCESS,
    IGetProvidersAction,
    GET_ENABLED_PROVIDERS_SUCCESS,
    IGetEnabledProvidersAction,
    UPDATE_QUERY,
} from '../actions/actionTypes';

export const torrentAPIReducer = (
    state = initialState.torrentApi,
    action: AnyAction
) => {
    if (action.type === GET_PROVIDERS_SUCCESS) {
        const { providers } = action as IGetProvidersAction;
        return {
            ...state,
            allProviders: providers,
        };
    }
    if (action.type === GET_ENABLED_PROVIDERS_SUCCESS) {
        const { enabledProviders } = action as IGetEnabledProvidersAction;
        return {
            ...state,
            enabledProviders: enabledProviders.map(provider => provider.name),
        };
    }
    if (action.type === UPDATE_QUERY) {
        const { query } = action as AnyAction & { query: string };
        return {
            ...state,
            query,
        };
    }
    return state;
};
