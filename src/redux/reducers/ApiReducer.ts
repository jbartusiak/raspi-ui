import initialState from './initialState';
import { AnyAction } from 'redux';
import {
    API_CALL_FAILED,
    BEGIN_API_CALL,
    SERVICE_COMMAND_CALL,
} from '../actions/actionTypes';

export const apiReducer = (api = initialState.api, action: AnyAction) => {
    if (action.type === BEGIN_API_CALL) {
        return {
            ...api,
            apiCallsInProgress: api.apiCallsInProgress + 1,
        };
    }
    if (action.type.includes('SUCCESS') || action.type === API_CALL_FAILED) {
        return {
            ...api,
            apiCallsInProgress: api.apiCallsInProgress - 1,
        };
    }
    if (action.type === SERVICE_COMMAND_CALL) {
        return {
            ...api,
            serviceCommand: true,
        };
    }
    return api;
};
