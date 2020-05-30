import {
    IEndpointSpec,
    INewTorrentForm,
    ITorrentClientAPITorrentItem,
} from '../reducers/Types';
import { handleError } from './torrentApiActions';
import {
    ADD_TORRENT_SUCCESS,
    START_TORRENT_SUCCESS,
    STOP_TORRENT_SUCCESS,
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

const startTorrentsSuccess = () => ({
    type: START_TORRENT_SUCCESS,
});

const stopTorrentsSuccess = () => ({
    type: STOP_TORRENT_SUCCESS,
});

export const getActiveTorrents = ({ host, port, uri }: IEndpointSpec) => {
    return (dispatch: Function) => {
        dispatch(beginApiCall('GET_ACTIVE_TORRENTS'));
        const url = `http://${host}:${port}${uri}`;
        fetch(url)
            .then(result => result.json())
            .then(result => {
                dispatch(setActiveTorrents(result.torrents));
            })
            .catch(err => handleError(dispatch, err));
    };
};

export const addTorrent = (
    { uri, host, port }: IEndpointSpec,
    { autostart, magnet, category, directory }: INewTorrentForm
) => {
    return (dispatch: Function) => {
        dispatch(beginApiCall('ADD_NEW_TORRENT'));
        const url = `http://${host}:${port}${uri}`;
        const requestBody = {
            magnet,
            autostart,
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

export const startTorrents = (
    { uri, host, port }: IEndpointSpec,
    ids: number[]
) => {
    return (dispatch: Function) => {
        dispatch(beginApiCall('START_TORRENTS'));
        const url = `http://${host}:${port}${uri}`;
        const requestBody = {
            ids,
        };
        doPost(url, requestBody)
            .then(result => result.json())
            .then(() => {
                dispatch(startTorrentsSuccess());
                dispatch(getActiveTorrents(getActiveTorrentsRoute));
            })
            .catch(err => handleError(dispatch, err));
    };
};

export const stopTorrents = (
    { uri, host, port }: IEndpointSpec,
    ids: number[]
) => {
    return (dispatch: Function) => {
        dispatch(beginApiCall('STOP_TORRENTS'));
        const url = `http://${host}:${port}${uri}`;
        const requestBody = {
            ids,
        };
        doPost(url, requestBody)
            .then(result => result.json())
            .then(() => {
                dispatch(stopTorrentsSuccess());
                dispatch(getActiveTorrents(getActiveTorrentsRoute));
            })
            .catch(err => handleError(dispatch, err));
    };
};
