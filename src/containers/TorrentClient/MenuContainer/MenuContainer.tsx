import React from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AddIcon from '@material-ui/icons/Add';
import { Button, Checkbox, createStyles, Divider, Fab, IconButton, Paper, Theme, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            margin: '12px'
        },
        'root *': {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1)
        },
        divider: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1)
        },
        menuButton: {
            marginRight: theme.spacing(2)
        },
        title: {
            flexGrow: 1
        },
        fab: {
            position: 'absolute',
            bottom: '40px',
            right: '40px'
        }
    })
);

interface MenuProperties {
    onStart?: (evt: React.MouseEvent) => void;
    onPause?: (evt: React.MouseEvent) => void;
    onStop?: (evt: React.MouseEvent) => void;
    onAdd?: (evt: React.MouseEvent) => void;
    onDelete?: (evt: React.MouseEvent) => void;
    onChecked?: (evt: React.ChangeEvent<HTMLInputElement>) => void;

    checked?: boolean;
}

export const MenuContainer = (props: MenuProperties) => {
    const classes = useStyles();
    return (
        <Paper style={{ marginBottom: '16px' }}>
            <Toolbar>
                <Checkbox
                    onChange={props.onChecked}
                    checked={props.checked}
                    icon={(
                        <IconButton edge="start">
                            <CheckCircleOutlineIcon/>
                        </IconButton>
                    )}
                    checkedIcon={(
                        <IconButton edge="start" color="primary">
                            <CheckCircleIcon/>
                        </IconButton>
                    )}
                />
                <Divider orientation="vertical" flexItem className={classes.divider}/>
                <div className={classes.root}>
                    <Button
                        color="primary"
                        variant="contained"
                        startIcon={(
                            <PlayArrowIcon/>
                        )}>
                        Start
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        startIcon={(
                            <PauseIcon/>
                        )}>
                        Pause
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        startIcon={(
                            <StopIcon/>
                        )}>
                        Stop
                    </Button>
                </div>
                <div>
                    <IconButton>
                        <DeleteIcon/>
                    </IconButton>
                </div>
            </Toolbar>
            <Fab color="secondary" aria-label="add" className={classes.fab}>
                <AddIcon/>
            </Fab>
        </Paper>
    );
};
