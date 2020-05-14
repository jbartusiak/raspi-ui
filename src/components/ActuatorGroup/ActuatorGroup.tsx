import * as React from 'react';
import { Paper, Typography } from '@material-ui/core';
import classes from './ActuatorGroup.module.scss';
import { SlideInDiv } from '../AnimationComponents/SlideInDiv';

interface ActuatorGroupProps {
    name: string;
}

export const ActuatorGroup: React.FC<React.PropsWithChildren<ActuatorGroupProps>> = ({ name, children }) => {
    return (
        <Paper className={classes.Container}>
            <SlideInDiv>
                <Typography className={classes.Heading} variant="h3">{name}</Typography>
            </SlideInDiv>
            {children}
        </Paper>
    );
};
