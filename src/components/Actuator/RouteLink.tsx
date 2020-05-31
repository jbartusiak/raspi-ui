import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styles from './Actuator.module.scss';

interface RouteLinkProps {
    route: string;
    name: string;
}

export const RouteLink: React.FC<RouteLinkProps> = ({ name, route }) => (
    <Link to={route} className={styles.RouteLink}>
        <Button variant="outlined" color="primary">
            {name}
        </Button>
    </Link>
);
