import { AnyAction } from 'redux';
import initialState from './initialState';

export const routingReducer = (
    state= initialState.location,
    action: AnyAction) => {
    return state;
};
