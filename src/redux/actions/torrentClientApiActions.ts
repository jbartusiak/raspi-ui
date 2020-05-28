import {
    IEndpointSpec,
    INewTorrentForm,
    ITorrentClientAPITorrentItem,
} from '../reducers/Types';
import { handleError } from './torrentApiActions';
import {
    ADD_TORRENT_SUCCESS,
    UPDATE_ACTIVE_TORRENT_SUCCESS,
} from './actionTypes';
import { beginApiCall } from './apiCallActions';
import { doPost } from './actuatorActions';
import { getActiveTorrents as getActiveTorrentsRoute } from '../../routes/routes';

const setActiveTorrents = (torrents: ITorrentClientAPITorrentItem[]) => ({
    type: UPDATE_ACTIVE_TORRENT_SUCCESS,
    torrents,
});

const addTorrentSuccess = () => ({
    type: ADD_TORRENT_SUCCESS,
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

export const addTorrent = (
    { uri, host, port }: IEndpointSpec,
    { magnet, category, directory }: INewTorrentForm
) => {
    return (dispatch: Function) => {
        dispatch(beginApiCall('ADD_NEW_TORRENT'));
        const url = `http://${host}:${port}${uri}`;
        const requestBody = {
            magnet,
            autostart: false,
            downloadDir: `/mount/${directory}/Media/${category}`,
        };
        doPost(url, requestBody)
            .then(() => {
                dispatch(addTorrentSuccess());
                dispatch(getActiveTorrents(getActiveTorrentsRoute));
            })
            .catch(err => handleError(dispatch, err));
    };
};
