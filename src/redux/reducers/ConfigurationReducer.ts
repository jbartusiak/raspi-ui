import initialState from './initialState';
import { AnyAction } from 'redux';
import { GET_CONFIGURATION_SUCCESS } from '../actions/actionTypes';

export const configurationReducer = (
    state = initialState.configuration,
    action: AnyAction
) => {
    if(action.type===GET_CONFIGURATION_SUCCESS) {
        return {
            ...state,
            fetched: true,
        }
    }
    return state;
}