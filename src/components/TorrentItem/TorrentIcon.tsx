import React from 'react';

import { Avatar, Checkbox, createStyles, ListItemAvatar, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MovieIcon from '@material-ui/icons/Movie';
import TvIcon from '@material-ui/icons/Tv';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PublishIcon from '@material-ui/icons/Publish';

import scss from './TorrentDownloadStatus.module.scss';
import classNames from 'classnames';

interface TorrentIconProps {
    id: number;
    dir: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selected: boolean;
    torrentStatus: number;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        checked: {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText
        },
        unchecked: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText
        },
        border: {
            border: '1px solid black'
        }
    })
);

const getIconBasedOnTorrentPath = (directory: string) => {
    if (directory.includes('Movies')) {
        return <MovieIcon/>;
    } else if (directory.includes('Series')) {
        return <TvIcon/>;
    } else if (directory.includes('Games')) {
        return <SportsEsportsIcon/>;
    } else return <MoreHorizIcon/>;
};

export const TorrentIcon = ({ dir, id, onChange, selected, torrentStatus }: TorrentIconProps) => {
    const classes = useStyles();

    const getChecked = () => {
        if ([5, 6].includes(torrentStatus)) {
            return (
                <Avatar className={classes.checked}>
                    <PublishIcon />
                </Avatar>
            );
        }
        return (
            <Avatar className={classes.checked}>
                {getIconBasedOnTorrentPath(dir)}
            </Avatar>
        );
    };

    const getUnchecked = () => {
        if ([5, 6].includes(torrentStatus)) {
            return (
                <Avatar className={classes.unchecked}>
                    <PublishIcon />
                </Avatar>
            );
        }
        return (
            <Avatar className={classes.unchecked}>
                {getIconBasedOnTorrentPath(dir)}
            </Avatar>
        );
    };

    return (
        <ListItemAvatar style={{ marginRight: '16px', marginLeft: '0px' }}>
            <div className={classNames({
                [scss.Bounce]: [1, 2, 3, 4].includes(torrentStatus),
                [scss.Selected]: [1, 2, 3, 4].includes(torrentStatus) && selected
            })}>
                <Checkbox
                    id={`torrent-${id}`}
                    icon={getUnchecked()}
                    onChange={onChange}
                    checkedIcon={getChecked()}
                    checked={selected}
                />
            </div>
        </ListItemAvatar>
    );
};
