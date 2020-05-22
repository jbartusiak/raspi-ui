import React from 'react';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import classNames from 'classnames';

import styles from './TorrentCondition.module.scss';

interface ITorrentConditionProps {
    seeds?: number,
    leech?: number,
}

export const TorrentCondition = ({ seeds, leech }: ITorrentConditionProps) => {
    return (
        <>
            <div className={styles.Indicator}>
                <span>{seeds || 'unknown'}</span>
                <CloudUploadIcon
                    className={classNames(styles.Icon, styles.Seeds)}/>
            </div>
            <div className={styles.Indicator}>
                {leech || 'unknown'}
                <CloudDownloadIcon
                    className={classNames(styles.Icon, styles.Peers)}/>
            </div>
        </>
    );
};
