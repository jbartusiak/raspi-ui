import React, { useState } from 'react';
import { Button, createStyles, FormControlLabel, InputAdornment, Switch, TextField, Theme } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';

import { makeStyles } from '@material-ui/core/styles';
import { Torrent } from 'torrent-search-api';
import { inputStyles } from '../Common/InputStyles';
import { SelectField } from '../SelectField/SelectField';
import { INewTorrentForm } from '../../redux/reducers/Types';
import classNames from 'classnames';

type ITorrentDetailsFormProps = {
    magnet: string;
    torrent: Torrent;
    directories: string[];
    categories: string[];
    handleSubmit: (form: INewTorrentForm) => void;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            display: 'flex',
            flexDirection: 'column'
        },
        button: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            marginLeft: 'auto',
            marginRight: 'auto',
            minWidth: '100px',
            maxWidth: '150px'
        }
    })
);

export const TorrentDetailsForm = ({ directories, categories, torrent, magnet, handleSubmit }: ITorrentDetailsFormProps) => {
    const classes = { ...useStyles(), ...inputStyles() };
    const [form, setForm] = useState<INewTorrentForm>({
        autostart: true,
        magnet,
        directory: directories[0],
        category: categories[0]
    });

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        handleSubmit(form);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value || event.target.checked
        });
    };

    return (
        <form className={classes.form} onSubmit={onSubmit}>
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
                className={classes.root}
                value={magnet}
                onChange={onChange}
            />
            <TextField
                className={classes.root}
                variant="outlined"
                value={torrent.title}
                label="Item title"
                disabled/>
            <TextField
                className={classes.root}
                variant="outlined"
                value={torrent.size}
                label="Approximate size"
                disabled/>
            <SelectField
                label="directory"
                selected={form.directory}
                options={directories ? directories : ['hd1']}
                handleChange={onChange}
                fullWidth
            />
            <SelectField
                label="category"
                selected={form.category}
                options={categories ? categories : ['Others']}
                handleChange={onChange}
                fullWidth/>
            <FormControlLabel
                className={classNames(classes.root, classes.alignFlexEnd)}
                control={
                    <Switch
                        color="primary"
                        name="autostart"
                        checked={form.autostart}
                        onChange={onChange}
                    />
                }
                label="Start immediately"
            />
            <Button type="submit" className={classes.button} variant="contained" color="primary">OK</Button>
        </form>
    );
};
