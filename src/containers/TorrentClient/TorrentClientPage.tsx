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
import { EButtonIds } from '../../components/TorrentControls/TorrentControls';

const serviceName = 'Torrent Backend Service';

export const TorrentClientPage = () => {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState<boolean[]>([]);
    const { torrentClientApi, services } = useSelector((state: IApplicationState) => state);
    const backendConfig = services[serviceName].configuration as {
        categories: string[];
        directories: string[];
    };

    const getCheckedTorrentsIds = () => {
        const result = selected.map((el, idx) => {
            if (el) return torrentClientApi.torrents[idx].id;
            else return null;
        }).filter(el=>!!el);
        console.log(result);
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

    const onIconClicked = ({ currentTarget }: React.MouseEvent<HTMLElement>) => {
        console.log(currentTarget);
        switch (currentTarget.id) {
            case EButtonIds.PLAY: {
                console.log(getCheckedTorrentsIds());
                break;
            }
            case EButtonIds.PAUSE: {

                break;
            }
            case EButtonIds.STOP: {

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
        } else if (torrentClientApi.torrents.length !== selected.length) {
            setSelected(new Array(torrentClientApi.torrents.length).fill(false));
        }
    }, [dispatch, torrentClientApi, selected]);

    return (
        <Container maxWidth={'xl'}>
            <AddTorrent {...backendConfig} />
            <MenuContainer
                handleChecked={onAllSelectedChanged}
                selected={selected}
                handleAdd={onIconClicked}
                handlePause={onIconClicked}
                handleStop={onIconClicked}
                handleDelete={onIconClicked}
                handleStart={onIconClicked}
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
