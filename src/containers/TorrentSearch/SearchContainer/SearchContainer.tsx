import React, { useRef } from 'react';
import { StyledPaper } from '../../../components/Common/StyledPaper/StyledPaper';
import { Table, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { SearchField } from '../../../components/SearchField/SearchField';
import { SelectField } from '../../../components/SelectField/SelectField';

type Props = {};
export const SearchContainer = (props: Props) => {
    const ref = useRef<number>();

    const onDelayComplete = () => {

    };

    const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        window.clearTimeout(ref.current);
        console.log('Cleared timeout');
        ref.current = window.setTimeout(onDelayComplete, 1000);
    };

    return (
        <StyledPaper>
            <Typography variant="h3">Search</Typography>
            <form style={{ display: 'flex' }}>
                <SearchField
                    name={'query'}
                    label={'search'}
                    handleChange={onChange}
                />
                <SelectField />
            </form>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Torrent name</TableCell>
                        <TableCell align="right">Category(s)</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
            </Table>
        </StyledPaper>
    );
};
