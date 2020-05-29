import * as React from 'react';
import { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '../../redux/reducers/Types';
import { getActiveTorrents } from '../../redux/actions/torrentClientApiActions';
import { getActiveTorrents as getActiveTorrentsRoute } from '../../routes/routes';
import { MenuContainer } from './MenuContainer/MenuContainer';
import { AddTorrent } from './AddTorrent/AddTorrent';
import { TorrentListContainer } from './TorrentListContainer/TorrentListContainer';

const serviceName = 'Torrent Backend Service';

export const TorrentClientPage = () => {
    const dispatch = useDispatch();
    const { torrentClientApi, services } = useSelector((state: IApplicationState) => state);
    const backendConfig = services[serviceName].configuration as {
        categories: string[];
        directories: string[];
    };

    useEffect(() => {
        if (!torrentClientApi.fetched) {
            dispatch(getActiveTorrents(getActiveTorrentsRoute));
        }
    }, [dispatch, torrentClientApi]);

    return (
        <Container maxWidth={'xl'}>
            <AddTorrent {...backendConfig} />
            <MenuContainer/>

            <TorrentListContainer torrents={torrentClientApi.torrents}/>
        </Container>
    );
};
