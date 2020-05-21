import React, { useEffect, useState } from 'react';
import { StyledPaper } from '../../../components/Common/StyledPaper/StyledPaper';
import { Table, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { SearchField } from '../../../components/SearchField/SearchField';
import { SelectField } from '../../../components/SelectField/SelectField';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuery } from '../../../redux/actions/torrentApiActions';
import { IApplicationState } from '../../../redux/reducers/Types';

export const SearchContainer = () => {

    const [ selected, setSelected ] = useState<string>('');
    const [ categories, setCategories ] = useState<string[]>([]);
    const stateCategories = useSelector((state: IApplicationState) => state.torrentApi.categories);
    const stateCategory = useSelector((state: IApplicationState) => state.torrentApi.category);

    const dispatch = useDispatch();

    const handleQueryChanged = (query: string) => {
        dispatch(updateQuery(query));
    };

    useEffect(() => {
        setCategories(stateCategories);
        setSelected(stateCategory)
    }, [setCategories, setSelected, stateCategories, stateCategory])

    return (
        <StyledPaper>
            <Typography variant="h3">Search</Typography>
            <form style={{ display: 'flex' }}>
                <SearchField
                    name={'query'}
                    label={'search'}
                    handleChange={handleQueryChanged}
                />
                <SelectField selected={selected} options={categories}/>
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
