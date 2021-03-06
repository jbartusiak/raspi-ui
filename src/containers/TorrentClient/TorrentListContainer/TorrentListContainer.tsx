import React from 'react';
import { List, Paper } from '@material-ui/core';
import { ITorrentClientAPITorrentItem } from '../../../redux/reducers/Types';
import { TorrentItem } from '../../../components/TorrentItem/TorrentItem';

interface ITorrentListContainerProps {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    torrents: ITorrentClientAPITorrentItem[];
    selected: { [key: number]: boolean };
}

export const TorrentListContainer = ({  handleChange, torrents, selected }: ITorrentListContainerProps) => {
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        console.log(event);
    };

    return (
        <Paper>
            <List>
                {
                    torrents.map((torrent) => (
                        <TorrentItem
                            selected={selected[torrent.id]}
                            handleChange={handleChange}
                            handleClick={handleClick}
                            torrent={torrent}
                        />)
                    )
                }
            </List>
        </Paper>
    );
};
