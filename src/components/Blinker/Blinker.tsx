import React from 'react';
import classes from './Blinker.module.scss';
import classnames from 'classnames';
import { ServiceStatus } from '../../redux/reducers/Types';

type TBlinkerProps = {
    status: ServiceStatus;
}

const Blinker: React.FC<TBlinkerProps> = ({ status}) => {
    const mapStateToClasses = classnames({
        [classes.Blinker]: true,
        [classes.yellow]: status === ServiceStatus.UNKNOWN,
        [classes.red]: status === ServiceStatus.DOWN,
        [classes.green]: status === ServiceStatus.UP,
    });

    return (
        <span className={mapStateToClasses} />
    );
};

export default Blinker;
