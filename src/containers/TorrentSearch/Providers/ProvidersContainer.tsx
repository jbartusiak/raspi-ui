import React, { useEffect } from 'react';
import { StyledPaper } from '../../../components/Common/StyledPaper/StyledPaper';
import { Typography } from '@material-ui/core';
import { CheckboxGroup, IOptions } from '../../../components/CheckboxGroup/CheckboxGroup';
import { IApplicationState } from '../../../redux/reducers/Types';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProviders, getEnabledProviders, updateEnabledProviders } from '../../../redux/actions/torrentApiActions';
import {
    getAllProviders as allProvidersRoute,
    getEnabledProviders as enabledProvidersRoute,
    updateProviders
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
        dispatch(updateEnabledProviders(updateProviders, options, torrentAPI.allProviders));
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
