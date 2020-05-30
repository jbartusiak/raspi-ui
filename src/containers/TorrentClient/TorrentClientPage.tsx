import * as React from 'react';
import { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '../../redux/reducers/Types';
import { getActiveTorrents } from '../../redux/actions/torrentClientApiActions';
import { getActiveTorrents as getActiveTorrentsRoute } from '../../routes/routes';
import { MenuContainer } from './MenuContainer/MenuContainer';
import { AddTorrent } from './AddTorrent/AddTorrent';
import { TorrentListContainer } from './TorrentListContainer/TorrentListContainer';
import { FadeDiv } from '../../components/AnimationComponents/FadeDiv';

const serviceName = 'Torrent Backend Service';

export const TorrentClientPage = () => {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState<boolean[]>([]);
    const { torrentClientApi, services } = useSelector((state: IApplicationState) => state);
    const backendConfig = services[serviceName].configuration as {
        categories: string[];
        directories: string[];
    };

    const onSelectedChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const [, idxStr] = event.target.id.split('-');
        const index = Number.parseInt(idxStr) - 1;
        const newArray = [...selected];
        newArray[index] = event.target.checked;
        setSelected(newArray);
        console.log(newArray);
    };

    const onAllSelectedChanged = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (evt.target.checked) {
            setSelected(new Array(torrentClientApi.torrents.length).fill(true));
        } else {
            setSelected(new Array(torrentClientApi.torrents.length).fill(false));
        }
    };

    useEffect(() => {
        if (!torrentClientApi.fetched) {
            dispatch(getActiveTorrents(getActiveTorrentsRoute));
        } else if (torrentClientApi.torrents.length !== selected.length) {
            setSelected(new Array(torrentClientApi.torrents.length).fill(false));
        }
    }, [dispatch, torrentClientApi, selected]);

    return (
        <Container maxWidth={'xl'}>
            <AddTorrent {...backendConfig} />
            <MenuContainer
                onChecked={onAllSelectedChanged}
                selected={selected}
            />

            <FadeDiv shouldDisplay={true}>
                {
                    torrentClientApi.torrents.length &&
                    selected.length &&
                    <TorrentListContainer
                        selected={selected}
                        handleChange={onSelectedChanged}
                        torrents={torrentClientApi.torrents}/>
                }
            </FadeDiv>
        </Container>
    );
};
