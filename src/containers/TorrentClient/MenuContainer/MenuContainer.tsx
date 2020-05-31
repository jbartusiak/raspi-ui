import React from 'react';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Checkbox, createStyles, Divider, IconButton, Paper, Theme, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TorrentControls } from '../../../components/TorrentControls/TorrentControls';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        divider: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1)
        },
    })
);

interface MenuProperties {
    handleStart: (evt: React.MouseEvent<HTMLElement>) => void;
    handlePause: (evt: React.MouseEvent<HTMLElement>) => void;
    handleStop: (evt: React.MouseEvent<HTMLElement>) => void;
    handleAdd: (evt: React.MouseEvent<HTMLElement>) => void;
    handleDelete: (evt: React.MouseEvent<HTMLElement>) => void;
    handleChecked: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    selected: boolean[];
}

export const MenuContainer = (props: MenuProperties) => {
    const classes = useStyles();

    const noItemsSelected = props.selected.every(el => !el);

    return (
        <Paper style={{ marginBottom: '16px' }}>
            <Toolbar>
                <Checkbox
                    onChange={props.handleChecked}
                    checked={props.selected.every(el => el)}
                    icon={(
                        <IconButton edge="start">
                            <CheckCircleOutlineIcon/>
                        </IconButton>
                    )}
                    checkedIcon={(
                        <IconButton edge="start" color="secondary">
                            <CheckCircleIcon/>
                        </IconButton>
                    )}
                />
                <Divider orientation="vertical" flexItem className={classes.divider}/>
                <TorrentControls
                    onStart={props.handleStart}
                    onStop={props.handleStop}
                    onPause={props.handlePause}
                    onDelete={props.handleDelete}
                    controlsDisabled={noItemsSelected}/>
            </Toolbar>
        </Paper>
    );
};
