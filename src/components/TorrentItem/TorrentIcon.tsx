import React from 'react';
import { Avatar, Checkbox, createStyles, ListItemAvatar, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MovieIcon from '@material-ui/icons/Movie';
import TvIcon from '@material-ui/icons/Tv';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

interface TorrentIconProps {
    id: number;
    dir: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        checked: {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
        },
        unchecked: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText
        },
    })
);

const getIconBasedOnTorrentPath = (directory: string) => {
    if (directory.includes('Movies')) {
        return <MovieIcon />
    }
    else if (directory.includes('Series')) {
        return <TvIcon />
    }
    else if (directory.includes('Games')) {
        return <SportsEsportsIcon />
    }
    else return <MoreHorizIcon />
}

export const TorrentIcon = ({ dir, id }: TorrentIconProps) => {
    const classes = useStyles();

    const getChecked = () => {
        return (
            <Avatar className={classes.checked}>
                {getIconBasedOnTorrentPath(dir)}
            </Avatar>
        );
    }

    const getUnchecked = () => {
        return (
            <Avatar className={classes.unchecked}>
                {getIconBasedOnTorrentPath(dir)}
            </Avatar>
        );
    }

    return (
        <ListItemAvatar style={{marginRight: '16px', marginLeft: '0px'}}>
            <Checkbox
                id={`checkbox-${id}`}
                icon={getUnchecked()}
                checkedIcon={getChecked()}
            />
        </ListItemAvatar>
    )
};
