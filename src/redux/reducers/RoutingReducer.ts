import { ACTION_TYPE } from '../actions/actionTypes';
import initialState, { IInitialState } from './initialState';
import { Reducer } from 'react';
import { AnyAction } from 'redux';

export const routingReducer: Reducer<IInitialState, AnyAction> = (
    state: IInitialState = initialState,
    action: AnyAction
) => {
    if (action.type === ACTION_TYPE.ROUTING_CHANGE) {
        return state;
    } else {
        return state;
    }
};
