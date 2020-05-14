import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { LinearProgress, Toolbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { IApplicationState } from '../../redux/reducers/Types';
import { FadeDiv } from '../AnimationComponents/FadeDiv';

export const ApplicationBar = () => {
    const apiCallsInProgress = useSelector(({ api }: IApplicationState) => api.apiCallsInProgress);
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography>Interfejsy sieciowe Raspberry PI</Typography>
            </Toolbar>
            <FadeDiv shouldDisplay={apiCallsInProgress > 0}>
                <LinearProgress color="secondary"/>
            </FadeDiv>
        </AppBar>
    );
};
