import * as React from 'react';
import { useEffect } from 'react';
import {
    Avatar,
    Checkbox,
    Container,
    IconButton,
    LinearProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { StyledPaper } from '../../components/Common/StyledPaper/StyledPaper';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '../../redux/reducers/Types';
import { getActiveTorrents } from '../../redux/actions/torrentClientApiActions';
import { getActiveTorrents as getActiveTorrentsRoute } from '../../routes/routes';
import { MenuContainer } from './MenuContainer/MenuContainer';

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
            <MenuContainer/>
            <StyledPaper>
                <List>
                    {torrentClientAPI.torrents?.map(torrent => (
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
            </StyledPaper>
        </Container>
    );
};
