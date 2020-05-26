import initialState from './initialState';
import { AnyAction } from 'redux';
import { UPDATE_ACTIVE_TORRENT_SUCCESS } from '../actions/actionTypes';
import { ITorrentClientAPITorrentItem } from './Types';

export const torrentClientApiReducer = (
    state = initialState.torrentClientApi,
    action: AnyAction
) => {
    if (action.type === UPDATE_ACTIVE_TORRENT_SUCCESS) {
        console.log(action);
        const { torrents } = action as AnyAction & {
            torrents: ITorrentClientAPITorrentItem[];
        };
        return {
            ...state,
            torrents,
        };
    }

    return state;
};
