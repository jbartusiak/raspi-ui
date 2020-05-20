import * as React from 'react';
import { Paper as MaterialPaper } from '@material-ui/core';
import { PaperProps } from '@material-ui/core/Paper/Paper';
import { PropsWithChildren } from 'react';
import styles from './StyledPaper.module.scss';

export const StyledPaper = ({ children, ...otherProps }: PropsWithChildren<PaperProps>) => (
    <MaterialPaper className={styles.PaddedPaper} {...otherProps}>
        {children}
    </MaterialPaper>
);
