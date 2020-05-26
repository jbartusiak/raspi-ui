import initialState from './initialState';
import { AnyAction } from 'redux';
import { UPDATE_ACTIVE_TORRENT_SUCCESS } from '../actions/actionTypes';

export const torrentClientApiReducer = (
    state = initialState.torrentClientApi,
    action: AnyAction
) => {
    if (action.type === UPDATE_ACTIVE_TORRENT_SUCCESS) {
        console.log(action);
        return {
            ...state,
            torrents: [...action.torrents],
        };
    }

    return state;
};
