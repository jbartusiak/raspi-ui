import React from 'react';
import { List } from '@material-ui/core';
import { ITorrentClientAPITorrentItem } from '../../../redux/reducers/Types';
import { TorrentItem } from '../../../components/TorrentItem/TorrentItem';

interface ITorrentListContainerProps {
    torrents: ITorrentClientAPITorrentItem[];
}

export const TorrentListContainer = ({ torrents }: ITorrentListContainerProps) => {
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    };

    return (
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
    );
};
