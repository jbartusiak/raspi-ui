import React from 'react';
import { List, Paper } from '@material-ui/core';
import { ITorrentClientAPITorrentItem } from '../../../redux/reducers/Types';
import { TorrentItem } from '../../../components/TorrentItem/TorrentItem';

interface ITorrentListContainerProps {
    torrents: ITorrentClientAPITorrentItem[];
}

export const TorrentListContainer = ({ torrents }: ITorrentListContainerProps) => {
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        console.log(event);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(`${event.target.id}: ${event.target.checked}`)
    }

    return (
        <Paper>
            <List>
                {
                    torrents.map(torrent => (
                        <TorrentItem
                            handleChange={onChange}
                            handleClick={handleClick}
                            torrent={torrent}
                        />)
                    )
                }
            </List>
        </Paper>
    );
};
