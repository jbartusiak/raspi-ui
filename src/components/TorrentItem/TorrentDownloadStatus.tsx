import React from 'react';
import classes from './TorrentDownloadStatus.module.scss';
import classNames from 'classnames';

interface ITorrentDownloadStatusProps {
    status: number;
    progress: number;
    total: number;
}

enum ETransmissionTorrentStatus {
    Stopped, // Torrent is stopped
    'Pending filecheck', // Queued to check files
    'Checking files', // Checking files
    'Pending download', // Queued for download
    Downloading, // Downloading
    'Pending seed', // Queued to seed
    Seeding, // Seeding
    'No peers found' // No peers found
}

type TTransmissionTorrentStatus = keyof typeof ETransmissionTorrentStatus;

const megabyte = 1048576;
const gigabyte = 1073741824;

const convert = (value: number) => {
    if (value>gigabyte) {
        return `${(value/gigabyte).toFixed(2)}GB`;
    }
    else {
        return `${(value/megabyte).toFixed(2)}MB`;
    }
}

const percent = (progress:number, total: number) => Math.round((progress/total) * 100);

export const TorrentDownloadStatus = ({ status, progress, total }: ITorrentDownloadStatusProps) => {

    if (progress+total===0){
        return (
            <div className={classes.Container}>size yet unknown</div>
        )
    }

    return (
        <div className={classNames(classes.Container, classes.Marquee)}>
            <div> {ETransmissionTorrentStatus[status]} </div>
            <div>{percent(progress, total)}%</div>
            <div>{convert(progress)} out of {convert(total)}</div>
        </div>
    );
};
