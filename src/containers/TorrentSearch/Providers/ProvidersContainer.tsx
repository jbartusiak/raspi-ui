import React from 'react';
import { StyledPaper } from '../../../components/Common/StyledPaper/StyledPaper';
import { Typography } from '@material-ui/core';
import { CheckboxGroup, IOptions } from '../../../components/CheckboxGroup/CheckboxGroup';
import { ITorrentProvider } from '../../../redux/reducers/Types';
import { useDispatch } from 'react-redux';
import { updateEnabledProviders } from '../../../redux/actions/torrentApiActions';
import { updateProviders } from '../../../routes/routes';

interface ProvidersContainerProps {
    providers: ITorrentProvider[];
    enabled: string[];
}

export const ProvidersContainer = ({ providers, enabled }: ProvidersContainerProps) => {
    const options = providers.map(provider => provider.name);

    const dispatch = useDispatch();

    const handleOptionsChanged = (options: IOptions) => {
        dispatch(updateEnabledProviders(updateProviders, options));
    };

    return (
        <StyledPaper>
            <Typography variant="h3">Providers</Typography>
            <CheckboxGroup
                checked={enabled}
                handleChange={handleOptionsChanged}
                options={options} />
        </StyledPaper>
    );
};
