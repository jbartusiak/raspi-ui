import React from 'react';
import { List, Paper } from '@material-ui/core';
import { ITorrentClientAPITorrentItem } from '../../../redux/reducers/Types';
import { TorrentItem } from '../../../components/TorrentItem/TorrentItem';

interface ITorrentListContainerProps {
    torrents: ITorrentClientAPITorrentItem[];
}

export const TorrentListContainer = ({ torrents }: ITorrentListContainerProps) => {
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    };

    return (
        <Paper>
            <List>
                {
                    torrents.map(torrent => (
                        <TorrentItem
                            handleClick={handleClick}
                            torrent={torrent}
                        />)
                    )
                }
            </List>
        </Paper>
    );
};
