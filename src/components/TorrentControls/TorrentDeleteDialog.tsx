import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    Switch,
    Typography
} from '@material-ui/core';
import { ITorrentClientAPITorrentItem } from '../../redux/reducers/Types';
import scss from './TorrentControls.module.scss';

interface TorrentDeleteDialogProps {
    open: boolean;
    torrentsToDelete: ITorrentClientAPITorrentItem[];
    handleCancel: () => void;
    handleDeleteConfirmation: (deleteData: boolean) => void;
}

export const TorrentDeleteDialog = (props: TorrentDeleteDialogProps) => {
    const [checked, setChecked] = useState(false);

    return (
        <Dialog
            fullWidth
            style={{ textAlign: 'justify' }}
            maxWidth="sm"
            open={props.open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Delete torrent(s)</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Please confirm, that you want to delete the following item(s).
                    This will remove them from active torrent list, and you will have to
                    re-add them to continue downloading or seeding.
                </DialogContentText>
                <ul>
                    {props.torrentsToDelete.map(torrent => {
                        return <li>{torrent.name}</li>;
                    })}
                </ul>
                <FormControlLabel
                    control={
                        <Switch
                            color="primary"
                            name="autostart"
                            checked={checked}
                            onChange={() => setChecked(!checked)}
                        />
                    }
                    label="Delete downloaded data"
                />
                {
                    checked &&
                    <Typography style={{ marginTop: '16px' }} color="error">
                        Caution! This will remove downloaded data permanently without further
                        notice!
                    </Typography>
                }
            </DialogContent>
            <DialogActions className={scss.Buttons}>
                <Button color="primary" variant="outlined" onClick={props.handleCancel}>
                    Cancel
                </Button>
                <Button color="primary" variant="contained" onClick={() => props.handleDeleteConfirmation(checked)}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};
