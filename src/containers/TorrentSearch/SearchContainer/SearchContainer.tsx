import React from 'react';
import { StyledPaper } from '../../../components/Common/StyledPaper/StyledPaper';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { SearchField } from '../../../components/SearchField/SearchField';
import { SelectField } from '../../../components/SelectField/SelectField';
import { useDispatch, useSelector } from 'react-redux';
import { performSearch, updateQuery } from '../../../redux/actions/torrentApiActions';
import { IApplicationState } from '../../../redux/reducers/Types';
import { performSearch as torrentSearchRoute } from './../../../routes/routes';

export const SearchContainer = () => {

    const { options, results, selected } = useSelector((state: IApplicationState) => ({
        options: state.torrentApi.categories,
        selected: state.torrentApi.category,
        results: state.torrentApi.results,
    }));

    const dispatch = useDispatch();

    const handleQueryChanged = (query: string) => {
        dispatch(updateQuery(query));
        dispatch(performSearch(torrentSearchRoute, query));
    };

    const handleCategoryChanged = (category: string) => {
        console.log(category);
    }

    return (
        <StyledPaper>
            <Typography variant="h3">Search</Typography>
            <form style={{ display: 'flex' }}>
                <SearchField
                    handleChange={handleQueryChanged}
                    label={'search'}
                    name={'query'}
                />
                <SelectField
                    handleChange={handleCategoryChanged}
                    options={options}
                    selected={selected}
                />
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
                <TableBody>
                    <TableRow>
                        {results.map(el=>el.name)}
                    </TableRow>
                </TableBody>
            </Table>
        </StyledPaper>
    );
};
