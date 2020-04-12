import initialState from './initialState';
import { AnyAction } from 'redux';
import { CONFIGURATION_FETCHED } from '../actions/actionTypes';

export const configurationReducer = (
    state = initialState.configuration,
    action: AnyAction
) => {
    if(action.type===CONFIGURATION_FETCHED) {
        return {
            ...state,
            fetched: true,
        }
    }
    return state;
}