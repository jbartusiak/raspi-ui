import { IEndpointSpec, ITorrentClientAPITorrentItem } from '../reducers/Types';
import { handleError } from './torrentApiActions';
import { UPDATE_ACTIVE_TORRENT_SUCCESS } from './actionTypes';
import { beginApiCall } from './apiCallActions';

const setActiveTorrents = (torrents: ITorrentClientAPITorrentItem[]) => ({
    type: UPDATE_ACTIVE_TORRENT_SUCCESS,
    torrents,
});

export const getActiveTorrents = ({ host, port, uri }: IEndpointSpec) => {
    return (dispatch: Function) => {
        dispatch(beginApiCall('GET_ACTIVE_TORRENTS'));
        const url = `http://${host}:${port}${uri}`;
        fetch(url)
            .then(result => result.json())
            .then(result => {
                console.log(result);
                dispatch(setActiveTorrents(result.torrents));
            })
            .catch(err => handleError(dispatch, err));
    };
};
