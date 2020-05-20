import * as React from 'react';
import { StyledPaper } from '../../../components/Common/StyledPaper/StyledPaper';
import { Typography } from '@material-ui/core';
import { CheckboxGroup } from '../../../components/CheckboxGroup/CheckboxGroup';

interface ProvidersContainerProps {

}

export const ProvidersContainer = (props: ProvidersContainerProps) => {
    return (
        <StyledPaper>
            <Typography variant="h3">Providers</Typography>
            <CheckboxGroup />
        </StyledPaper>
    );
};
