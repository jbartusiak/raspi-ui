import * as React from 'react';
import { Button } from '@material-ui/core';
import { IService } from '../../redux/reducers/Types';
import { Link } from 'react-router-dom';
import styles from './Actuator.module.scss';

export const RouteLink = ({ featureRoute }: IService) => {
    if (!featureRoute) return null;

    return (
        <Link to={featureRoute.route} className={styles.RouteLink}>
            <Button variant="outlined" color="primary">
                {featureRoute.name}
            </Button>
        </Link>
    );
};
