import React from 'react';
import {
    Avatar,
    Checkbox, IconButton,
    LinearProgress, List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText
} from '@material-ui/core';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import InfoIcon from '@material-ui/icons/Info';
import { ITorrentClientAPITorrentItem } from '../../../redux/reducers/Types';

type Props = {
    torrents: ITorrentClientAPITorrentItem[];
};
export const TorrentListContainer = ({ torrents }: Props) => {
    return (
        <List>
            {torrents.map(torrent => (
                <ListItem button onClick={() => console.log('clicked!')}>
                    <ListItemAvatar>
                        <Checkbox
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
                                <LinearProgress variant={'determinate'} value={torrent.id}/>
                                <div>
                                    40% / 400MB out of {torrent.totalSize}
                                </div>
                            </>
                        }
                    />
                    <ListItemSecondaryAction>
                        <IconButton href="#"
                                    edge="end" aria-label="comments">
                            <InfoIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    );
};
