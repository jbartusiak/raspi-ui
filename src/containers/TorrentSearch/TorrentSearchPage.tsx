import * as React from 'react';
import { Grid } from '@material-ui/core';
import { FadeDiv } from '../../components/AnimationComponents/FadeDiv';
import { ProvidersContainer } from './Providers/ProvidersContainer';
import { SearchContainer } from './SearchContainer/SearchContainer';

export const TorrentSearchPage = () => {
    return (
        <FadeDiv shouldDisplay={true}>
            <Grid container style={{ maxWidth: '100vw', margin: 'auto' }} spacing={3}>
                <Grid item xs={12} md={4}>
                    <ProvidersContainer />
                </Grid>
                <Grid item xs={12} md={8}>
                    <SearchContainer />
                </Grid>
            </Grid>
        </FadeDiv>
    );
};
