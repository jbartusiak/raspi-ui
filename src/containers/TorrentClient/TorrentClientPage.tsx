import * as React from 'react';
import { useEffect } from 'react';
import {
    Avatar,
    Container,
    IconButton,
    LinearProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import { StyledPaper } from '../../components/Common/StyledPaper/StyledPaper';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '../../redux/reducers/Types';
import { getActiveTorrents } from '../../redux/actions/torrentClientApiActions';
import { getActiveTorrents as getActiveTorrentsRoute } from '../../routes/routes';

export const TorrentClientPage = () => {
    const dispatch = useDispatch();
    const torrentClientAPI = useSelector((state: IApplicationState) => state.torrentClientApi);

    useEffect(() => {
        if (torrentClientAPI.torrents === null) {
            dispatch(getActiveTorrents(getActiveTorrentsRoute));
        }
    }, [dispatch, torrentClientAPI]);

    return (
        <Container maxWidth={'xl'}>
            <StyledPaper>
                <Typography variant="h3">Torrents</Typography>
                <List>
                    <ListItem button onClick={() => console.log('clicked!')}>
                        <ListItemAvatar>
                            <Avatar style={{ backgroundColor: '#C51A4A', color: '#FFF' }}>
                                <MusicNoteIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            style={{ marginRight: '100px' }}
                            primary="The name of the torrent"
                            secondary={
                                <><LinearProgress variant={'determinate'} value={40}/>
                                    <div>40% / 400MB out of 1GB</div>
                                </>
                            }
                        />
                        <ListItemSecondaryAction>
                            <IconButton href="#"
                                        edge="end" aria-label="comments">
                                <PlayArrowIcon/>
                            </IconButton>
                            <IconButton edge="end" aria-label="comments">
                                <PauseIcon/>
                            </IconButton>
                            <IconButton edge="end" aria-label="comments">
                                <StopIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </StyledPaper>
        </Container>
    );
};
