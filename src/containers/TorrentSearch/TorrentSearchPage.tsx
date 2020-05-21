import * as React from 'react';
import { Grid } from '@material-ui/core';
import { FadeDiv } from '../../components/AnimationComponents/FadeDiv';
import { ProvidersContainer } from './Providers/ProvidersContainer';
import { SearchContainer } from './SearchContainer/SearchContainer';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '../../redux/reducers/Types';
import { useEffect } from 'react';
import { getAllProviders, getEnabledProviders } from '../../redux/actions/torrentApiActions';

export const TorrentSearchPage = () => {
    const torrentAPI = useSelector((state: IApplicationState) => state.torrentApi);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!torrentAPI.allProviders.length) {
            dispatch(getAllProviders({
                    host: '192.168.0.254',
                    port: '3001',
                    uri: '/providers'
                })
            );
            dispatch(getEnabledProviders({
                host: '192.168.0.254',
                port: '3001',
                uri: '/providers/enabled',
            }));
        }
    }, [dispatch, torrentAPI]);

    return (
        <FadeDiv shouldDisplay={true}>
            <Grid container style={{ maxWidth: '100vw', margin: 'auto' }} spacing={3}>
                <Grid item xs={12} md={4}>
                    <ProvidersContainer enabled={torrentAPI.enabledProviders} providers={torrentAPI.allProviders}/>
                </Grid>
                <Grid item xs={12} md={8}>
                    <SearchContainer/>
                </Grid>
            </Grid>
        </FadeDiv>
    );
};
