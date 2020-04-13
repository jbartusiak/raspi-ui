import initialState from './initialState';
import { AnyAction } from 'redux';
import { API_CALL_FAILED, BEGIN_API_CALL } from '../actions/actionTypes';

export const apiCallsReducer = (
    state = initialState.apiCallsInProgress,
    action: AnyAction
) => {
    if(action.type===BEGIN_API_CALL) {
        return ++state;
    }
    if(action.type.includes('SUCCESS') || action.type===API_CALL_FAILED){
        return --state;
    }
    return state;
}