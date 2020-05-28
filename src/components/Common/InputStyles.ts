import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            margin: '8px 16px',
        },
        grow: {
            flexGrow: 1,
        },
        growProportional: {
            flexGrow: 2,
        },
        minWidth: {
            minWidth: '150px',
        },
        alignFlexEnd: {
            alignSelf: 'flex-end',
        },
    })
);

export { useStyles as inputStyles };
