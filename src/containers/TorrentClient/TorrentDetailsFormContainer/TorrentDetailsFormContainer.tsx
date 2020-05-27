import React from 'react';
import { Button, createStyles, InputAdornment, TextField, Theme } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import { SelectField } from '../../../components/SelectField/SelectField';
import { makeStyles } from '@material-ui/core/styles';
import { Torrent } from 'torrent-search-api';

type Props = {
    magnet: string;
    torrent: Torrent;
    directories?: string[];
    categories?: string[];
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: 0,
                marginBottom: theme.spacing(2),
            },
        },
    }),
);

export const TorrentDetailsFormContainer = ({ directories, categories, torrent, magnet }: Props) => {
    const classes = useStyles();
    return (
        <form className={classes.root}>
            <TextField
                name="magnet"
                variant="outlined"
                label="magnet"
                disabled={!!magnet}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="start">
                            <GetAppIcon/>
                        </InputAdornment>
                    )
                }}
                fullWidth
                value={magnet}
            />
            <TextField
                variant="outlined"
                value={torrent.title}
                label="Item title"
                disabled
                fullWidth/>
            <TextField
                variant="outlined"
                value={torrent.size}
                label="Approximate size"
                disabled
                fullWidth/>
            <SelectField
                label="directories"
                selected={directories ? directories[0] : 'hd1'}
                options={directories ? directories : ['hd1']}
                handleChange={()=>{}}
                fullWidth
            />
            <SelectField
                label="categories"
                selected={categories ? categories[0] : 'Others'}
                options={categories ? categories : ['Others']}
                handleChange={()=>{}}
                fullWidth/>
            <Button variant="contained" color="primary">OK</Button>
        </form>
    );
};
