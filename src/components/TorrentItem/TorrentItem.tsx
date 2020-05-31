import React from 'react';
import { ITorrentClientAPITorrentItem } from '../../redux/reducers/Types';
import { IconButton, LinearProgress, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { TorrentDownloadStatus } from './TorrentDownloadStatus';
import { TorrentIcon } from './TorrentIcon';

interface ITorrentItemProps {
    torrent: ITorrentClientAPITorrentItem;
    selected: boolean;
    handleClick: (event: React.MouseEvent<HTMLElement>) => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TorrentItem = ({ handleChange, handleClick, selected, torrent }: ITorrentItemProps) => {

    const normalize = () => torrent.downloadedEver > 0 ? (torrent.downloadedEver / torrent.totalSize) * 100 : 0;

    const onClick = (event: React.MouseEvent<HTMLElement>) => {
        handleClick(event);
    }

    return (
        <ListItem button onClick={onClick} >
            <TorrentIcon
                selected={selected}
                onChange={handleChange}
                dir={torrent.downloadDir}
                id={torrent.id}
                torrentStatus={torrent.status}/>
            <ListItemText
                primary={torrent.name}
                secondary={
                    <>
                        <LinearProgress variant={'determinate'}
                                        value={normalize()}/>
                        <TorrentDownloadStatus
                            progress={torrent.downloadedEver}
                            status={torrent.status}
                            total={torrent.totalSize}
                            peers={torrent.peersConnected}
                            seeds={torrent.peersSendingToUs}
                        />
                    </>
                }
            />
            <ListItemSecondaryAction>
                <IconButton href="#"
                            edge="end" aria-label="comments"
                onClick={onClick}>
                    <InfoIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};
