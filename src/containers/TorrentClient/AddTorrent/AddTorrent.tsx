import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { Torrent } from 'torrent-search-api';
import { TorrentDetailsForm } from '../../../components/TorrentDetailsForm/TorrentDetailsForm';
import { useDispatch } from 'react-redux';
import { addTorrent } from '../../../redux/actions/torrentClientApiActions';
import { addNewTorrent } from '../../../routes/routes';
import { INewTorrentForm } from '../../../redux/reducers/Types';

interface Props {
    directories: string[];
    categories: string[];
}
export const AddTorrent = (props: Props) => {
    const history = useHistory();
    const { state } = useLocation<{ magnet: string, torrent: Torrent }>();
    const dispatch = useDispatch();

    const handleClose = () => {
        history.replace('/pi-tor', {});
    };

    const handleSubmit = (form: INewTorrentForm) => {
        console.log(form);
        handleClose();
        dispatch(addTorrent(addNewTorrent, form));
    }

    if (!state || !state.magnet || !state.torrent) {
        return null;
    }

    return (
        <Dialog
            maxWidth="sm"
            open={!!state.magnet}
            onClose={handleClose}
            fullWidth
        >
            <DialogTitle>Add a new torrent</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please provide the torrent details as needed.
                    Select destination and kind of media you're downloading.
                </DialogContentText>
                <TorrentDetailsForm
                    handleSubmit={handleSubmit}
                    magnet={state.magnet}
                    torrent={state.torrent}
                    {...props}/>
            </DialogContent>

        </Dialog>
    );
};
