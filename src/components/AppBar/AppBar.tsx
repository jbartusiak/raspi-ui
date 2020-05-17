import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { LinearProgress, Link, Toolbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { IApplicationState, IService } from '../../redux/reducers/Types';
import { FadeDiv } from '../AnimationComponents/FadeDiv';
import styles from './AppBar.module.scss';
import { Link as ReactRouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

export const ApplicationBar = () => {
    const apiCallsInProgress = useSelector(({ api }: IApplicationState) => api.apiCallsInProgress);
    const services = useSelector((state: IApplicationState) => state.services);

    const ViaReactRouter = React.forwardRef<any, RouterLinkProps>((props, ref) => (
        <ReactRouterLink ref={ref} to={props.to} {...props} />
    ));

    const singleFeatureRoute = (service: IService) => {
        if (service.featureRoute) {
            const { name, route } = service.featureRoute;
            return (
                <Link
                    className={styles.SingleLink}
                    color="inherit"
                    component={ViaReactRouter}
                    to={route}
                >
                    {name}
                </Link>
            );
        } else return null;
    };
    const featureRoutes = () => Object.values(services).map(singleFeatureRoute);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography>Raspberry PI</Typography>
                <div className={styles.Links}>
                    <Link
                        className={styles.SingleLink}
                        color="inherit"
                        component={ViaReactRouter}
                        to={'/'}
                    >
                        Homepage
                    </Link>
                    {featureRoutes()}
                </div>
            </Toolbar>
            <FadeDiv shouldDisplay={apiCallsInProgress > 0}>
                <LinearProgress color="secondary"/>
            </FadeDiv>
        </AppBar>
    );
};
