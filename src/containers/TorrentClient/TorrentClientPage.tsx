import React, { useEffect, useRef, useState } from 'react';
import { Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '../../redux/reducers/Types';
import { getActiveTorrents, startTorrents, stopTorrents } from '../../redux/actions/torrentClientApiActions';
import {
    getActiveTorrents as getActiveTorrentsRoute,
    startTorrents as startTorrentsRoute,
    stopTorrents as stopTorrentsRoute
} from '../../routes/routes';
import { MenuContainer } from './MenuContainer/MenuContainer';
import { AddTorrent } from './AddTorrent/AddTorrent';
import { TorrentListContainer } from './TorrentListContainer/TorrentListContainer';
import { FadeDiv } from '../../components/AnimationComponents/FadeDiv';
import { EButtonIds } from '../../components/TorrentControls/TorrentControls';

const serviceName = 'Torrent Backend Service';

export const TorrentClientPage = () => {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState<{ [id: number]: boolean }>({});
    const intervalRef = useRef(new Set<number>());
    const { torrentClientApi, services } = useSelector((state: IApplicationState) => state);
    const backendConfig = services[serviceName].configuration as {
        categories: string[];
        directories: string[];
    };

    const getCheckedTorrentsIds = () => {
        const selectedEntries = Object.entries(selected).filter(([, value]) => value);
        return selectedEntries.map(([id]) => Number.parseInt(id));
    };

    const onSelectedChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const [, idStr] = event.target.id.split('-');
        const index = Number.parseInt(idStr);
        const newSelected = {
            ...selected,
            [index]: event.target.checked
        };
        setSelected(newSelected);
        console.log(newSelected);
    };

    const onAllSelectedChanged = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const newSelected: { [id: number]: boolean } = {};
        torrentClientApi.torrents.forEach(torrent => {
            newSelected[torrent.id] = evt.target.checked;
        });
        setSelected(newSelected);
    };

    const onIconClicked = ({ currentTarget }: React.MouseEvent<HTMLElement>) => {
        console.log(currentTarget);
        const checkedTorrentsIds = getCheckedTorrentsIds() as number[];
        switch (currentTarget.id) {
            case EButtonIds.PLAY: {
                dispatch(startTorrents(startTorrentsRoute, checkedTorrentsIds));
                break;
            }
            case EButtonIds.PAUSE: {
                dispatch(stopTorrents(stopTorrentsRoute, checkedTorrentsIds));
                break;
            }
            case EButtonIds.STOP: {
                dispatch(stopTorrents(stopTorrentsRoute, checkedTorrentsIds));
                break;
            }
            case EButtonIds.DELETE: {

                break;
            }
            default:
                console.error(`Handler for ${currentTarget.id} not found!`);
        }
    };

    useEffect(() => {
        if (!torrentClientApi.fetched) {
            dispatch(getActiveTorrents(getActiveTorrentsRoute));
        } else if (torrentClientApi.torrents.length !== Object.entries(selected).length) {
            const newSelected: { [id: number]: boolean } = {};
            torrentClientApi.torrents.forEach(torrent => {
                newSelected[torrent.id] = false;
            });
            setSelected(newSelected);
        }
    }, [dispatch, torrentClientApi, selected]);

    useEffect(() => {
        if (torrentClientApi.torrents.some(torrent => torrent.status !== 0)) {
            intervalRef.current.forEach(el => window.clearInterval(el));
            intervalRef.current.add(window.setInterval(() => {
                dispatch(getActiveTorrents(getActiveTorrentsRoute));
            }, 5000));
        } else intervalRef.current.forEach(el => window.clearInterval(el));
    }, [dispatch, intervalRef, torrentClientApi.torrents]);

    return (
        <Container maxWidth={'xl'}>
            <AddTorrent {...backendConfig} />
            <MenuContainer
                handleChecked={onAllSelectedChanged}
                selected={Object.values(selected)}
                handleAdd={onIconClicked}
                handlePause={onIconClicked}
                handleStop={onIconClicked}
                handleDelete={onIconClicked}
                handleStart={onIconClicked}
            />

            <FadeDiv shouldDisplay={true}>
                {
                    torrentClientApi.torrents.length &&
                    Object.entries(selected).length &&
                    <TorrentListContainer
                        selected={selected}
                        handleChange={onSelectedChanged}
                        torrents={torrentClientApi.torrents}/>
                }
            </FadeDiv>
        </Container>
    );
};
