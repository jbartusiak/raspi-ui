import initialState from './initialState';
import { AnyAction } from 'redux';
import { MODIFY_PROVIDERS_SUCCESS } from '../actions/actionTypes';

export const torrentAPIReducer = (
    state = initialState.torrentApi,
    action: AnyAction
) => {
    if (action.type === MODIFY_PROVIDERS_SUCCESS) {
        return state;
    }
    return state;
};
