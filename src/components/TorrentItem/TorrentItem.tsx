import React from 'react';
import { ITorrentClientAPITorrentItem } from '../../redux/reducers/Types';
import {
    Avatar,
    Checkbox,
    IconButton,
    LinearProgress,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText
} from '@material-ui/core';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import InfoIcon from '@material-ui/icons/Info';
import { TorrentDownloadStatus } from './TorrentDownloadStatus';

interface ITorrentItemProps {
    torrent: ITorrentClientAPITorrentItem
    handleClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export const TorrentItem = ({ handleClick, torrent }: ITorrentItemProps) => {

    const normalize = () => torrent.downloadedEver > 0 ? (torrent.downloadedEver / torrent.totalSize) * 100 : 0;

    const onClick = (event: React.MouseEvent<HTMLElement>) => {
        handleClick(event);
    }

    return (
        <ListItem button onClick={onClick}>
            <ListItemAvatar style={{marginRight: '8px', marginLeft: '8px'}}>
                <Checkbox
                    id={`checkbox-${torrent.id}`}
                    icon={(
                        <Avatar style={{ backgroundColor: '#C51A4A', color: '#FFF' }}>
                            <MusicNoteIcon/>
                        </Avatar>
                    )}
                    checkedIcon={(
                        <Avatar style={{ backgroundColor: '#6CC04A', color: '#FFF' }}>
                            <MusicNoteIcon/>
                        </Avatar>
                    )}
                />
            </ListItemAvatar>
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
