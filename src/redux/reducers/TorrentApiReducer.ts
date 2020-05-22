import initialState from './initialState';
import { AnyAction } from 'redux';
import {
    GET_PROVIDERS_SUCCESS,
    IGetProvidersAction,
    GET_ENABLED_PROVIDERS_SUCCESS,
    IGetEnabledProvidersAction,
    UPDATE_QUERY,
    UPDATE_ENABLED_PROVIDERS_SUCCESS,
    UPDATE_CATEGORY,
    SEARCH_RESULTS_SUCCESS,
} from '../actions/actionTypes';
import { ITorrentProvider } from './Types';

const composeCategories = (enabledProviders: ITorrentProvider[]) =>
    enabledProviders
        .flatMap(el => el.categories)
        .filter((element, index, self) => self.indexOf(element) === index);

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
        const categories = composeCategories(enabledProviders);

        return {
            ...state,
            enabledProviders: enabledProviders.map(provider => provider.name),
            categories: categories.length > 0 ? categories : ['None'],
            category: categories[0] || 'None',
        };
    }
    if (action.type === UPDATE_ENABLED_PROVIDERS_SUCCESS) {
        return state;
    }
    if (action.type === UPDATE_QUERY) {
        const { query } = action as AnyAction & { query: string };
        return {
            ...state,
            query,
        };
    }
    if (action.type === UPDATE_CATEGORY) {
        const { category } = action as AnyAction & { category: string };
        return {
            ...state,
            category,
        };
    }
    if (action.type === SEARCH_RESULTS_SUCCESS) {
        const { results } = action;

        return {
            ...state,
            results,
        };
    }
    return state;
};
