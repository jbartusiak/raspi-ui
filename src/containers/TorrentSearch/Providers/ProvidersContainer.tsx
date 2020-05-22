import React, { useEffect } from 'react';
import { StyledPaper } from '../../../components/Common/StyledPaper/StyledPaper';
import { Typography } from '@material-ui/core';
import { CheckboxGroup, IOptions } from '../../../components/CheckboxGroup/CheckboxGroup';
import { IApplicationState } from '../../../redux/reducers/Types';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllProviders,
    getEnabledProviders,
    performSearch,
    updateEnabledProviders
} from '../../../redux/actions/torrentApiActions';
import {
    getAllProviders as allProvidersRoute,
    getEnabledProviders as enabledProvidersRoute, performSearch as torrentSearchRoute,
    updateProviders as updateProvidersRoute
} from '../../../routes/routes';

export const ProvidersContainer = () => {
    const torrentAPI = useSelector((state: IApplicationState) => state.torrentApi);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!torrentAPI.allProviders.length) {
            dispatch(getAllProviders(allProvidersRoute));
            dispatch(getEnabledProviders(enabledProvidersRoute));
        }
    }, [dispatch, torrentAPI]);

    const handleOptionsChanged = (options: IOptions) => {
        dispatch(updateEnabledProviders(updateProvidersRoute, options));
        if (torrentAPI.query) {
            dispatch(performSearch(torrentSearchRoute, torrentAPI.query, torrentAPI.category));
        }
    };

    return (
        <StyledPaper>
            <Typography variant="h3">Providers</Typography>
            <CheckboxGroup
                checked={torrentAPI.enabledProviders}
                handleChange={handleOptionsChanged}
                options={torrentAPI.allProviders.map(el=>el.name)} />
        </StyledPaper>
    );
};
