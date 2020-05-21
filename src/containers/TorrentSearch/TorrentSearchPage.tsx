import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { ProvidersContainer } from './Providers/ProvidersContainer';
import { SearchContainer } from './SearchContainer/SearchContainer';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '../../redux/reducers/Types';
import { getAllProviders, getEnabledProviders } from '../../redux/actions/torrentApiActions';
import {
    getAllProviders as allProvidersRoute,
    getEnabledProviders as enabledProvidersRoute
} from './../../routes/routes';

export const TorrentSearchPage = () => {
    const torrentAPI = useSelector((state: IApplicationState) => state.torrentApi);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!torrentAPI.allProviders.length) {
            dispatch(getAllProviders(allProvidersRoute));
            dispatch(getEnabledProviders(enabledProvidersRoute));
        }
    }, [dispatch, torrentAPI]);

    return (
        <Grid container style={{ maxWidth: '100vw', margin: 'auto' }} spacing={3}>
            <Grid item xs={12} md={4}>
                <ProvidersContainer enabled={torrentAPI.enabledProviders} providers={torrentAPI.allProviders}/>
            </Grid>
            <Grid item xs={12} md={8}>
                <SearchContainer />
            </Grid>
        </Grid>
    );
};
