import React from 'react';
import image from './../../static/raspi.png';

import scss from './RaspiLoader.module.scss';
import { FadeDiv } from '../AnimationComponents/FadeDiv';

interface RaspiLoaderProps {
    show: boolean;
}

export const RaspiLoader = ({ show }: RaspiLoaderProps) => {
    return (
        <FadeDiv shouldDisplay={show} >
            <div className={scss.RaspiLoader}>
                <div className={scss.Spinner} />
                <img alt="raspberry icon" src={image} />
            </div>
        </FadeDiv>
    );
};
