import React, { HTMLAttributes, PropsWithChildren } from 'react';
import { IconButton } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import classes from './TorrentControls.module.scss';
import DeleteIcon from '@material-ui/icons/Delete';

interface TorrentControlsProps {
    controlsDisabled: boolean;
    onStart: (evt: React.MouseEvent<HTMLElement>) => void;
    onPause: (evt: React.MouseEvent<HTMLElement>) => void;
    onStop: (evt: React.MouseEvent<HTMLElement>) => void;
    onDelete: (evt: React.MouseEvent<HTMLElement>) => void;
}

export enum EButtonIds {
    PLAY= 'BUTTON_PLAY',
    PAUSE = 'BUTTON_PAUSE',
    STOP = 'BUTTON_STOP',
    DELETE = 'BUTTON_DELETE',
}

const { PLAY, DELETE, PAUSE, STOP} = EButtonIds;

export const TorrentControls = ({ controlsDisabled, ...handlers }: TorrentControlsProps) => {
    const StyledIconButton = (
        { id, children, handler }: PropsWithChildren<{ handler: (evt: React.MouseEvent<HTMLElement>) => void; } & HTMLAttributes<HTMLElement>>
    ) => (
        <IconButton
            id={id}
            color="primary"
            disabled={controlsDisabled}
            onClick={handler}
        >
            {children}
        </IconButton>
    );

    const PlayButton = () => (<StyledIconButton id={PLAY} handler={handlers.onStart}><PlayArrowIcon/></StyledIconButton>);
    const PauseButton = () => <StyledIconButton id={PAUSE} handler={handlers.onPause}><PauseIcon/></StyledIconButton>;
    const StopButton = () => <StyledIconButton id={STOP} handler={handlers.onStop}><StopIcon/></StyledIconButton>;
    const TrashButton = () => <StyledIconButton id={DELETE} handler={handlers.onDelete}><DeleteIcon/></StyledIconButton>;

    return (
        <div className={classes.Container}>
            <PlayButton/>
            <PauseButton/>
            <StopButton/>
            <TrashButton/>
        </div>
    );
};
