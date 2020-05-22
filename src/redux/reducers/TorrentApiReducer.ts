import initialState from './initialState';
import { AnyAction } from 'redux';
import {
    GET_PROVIDERS_SUCCESS,
    IGetProvidersAction,
    GET_ENABLED_PROVIDERS_SUCCESS,
    IGetEnabledProvidersAction,
    UPDATE_QUERY,
    UPDATE_ENABLED_PROVIDERS_SUCCESS,
} from '../actions/actionTypes';
import { ITorrentProvider } from './Types';

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
        const categories = enabledProviders
            .map(el => el.categories)
            .flat(1)
            .filter((element, index, self) => self.indexOf(element) === index);

        return {
            ...state,
            enabledProviders: enabledProviders.map(provider => provider.name),
            categories: categories.length > 0 ? categories : ['None'],
            category: categories[0] || 'None',
        };
    }
    if (action.type === UPDATE_ENABLED_PROVIDERS_SUCCESS) {
        const { providers, allProviders } = action as AnyAction & {
            providers: string[];
            allProviders: ITorrentProvider[];
        };

        const categories = allProviders
            .filter(provider => providers.includes(provider.name))
            .map(el => el.categories)
            .flat(1)
            .filter((element, index, self) => self.indexOf(element) === index);

        return {
            ...state,
            enabledProviders: providers,
            categories: categories.length > 0 ? categories : ['None'],
            category: categories[0] || 'None',
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
