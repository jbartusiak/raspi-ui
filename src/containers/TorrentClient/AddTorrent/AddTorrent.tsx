import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { Torrent } from 'torrent-search-api';
import { TorrentDetailsFormContainer } from '../TorrentDetailsFormContainer/TorrentDetailsFormContainer';

interface Props {
    directories: string[];
    categories: string[];
}
export const AddTorrent = (props: Props) => {
    const history = useHistory();
    const location = useLocation<{ magnet: string, torrent: Torrent }>();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        history.replace('/pi-tor', {});
    };

    useEffect(() => {
        console.log(location);
    }, [location]);

    if (!location?.state?.magnet || !location?.state?.torrent) {
        return null;
    }

    return (
        <Dialog
            maxWidth="sm"
            open={!!location?.state?.magnet}
            onClose={handleClose}
            fullWidth
        >
            <DialogTitle>Add a new torrent</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please provide the torrent details as needed.
                    Select destination and kind of media you're downloading.
                </DialogContentText>
                <TorrentDetailsFormContainer
                    magnet={location.state.magnet}
                    torrent={location.state.torrent}
                    {...props}/>
            </DialogContent>

        </Dialog>
    );
};
