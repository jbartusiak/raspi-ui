import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';

import { Torrent } from 'torrent-search-api';

import { IApplicationState } from '../../../redux/reducers/Types';
import { TorrentCondition } from '../../../components/TorrentCondition/TorrentCondition';
import { StyledPaper } from '../../../components/Common/StyledPaper/StyledPaper';
import { SearchField } from '../../../components/SearchField/SearchField';
import { SelectField } from '../../../components/SelectField/SelectField';
import { performSearch, updateCategory, updateQuery } from '../../../redux/actions/torrentApiActions';
import { performSearch as torrentSearchRoute } from './../../../routes/routes';

export const SearchContainer = () => {

    const { options, results, selected, query } = useSelector((state: IApplicationState) => ({
        options: state.torrentApi.categories,
        selected: state.torrentApi.category,
        results: state.torrentApi.results,
        query: state.torrentApi.query
    }));

    const dispatch = useDispatch();

    const handleQueryChanged = (query: string) => {
        console.log(query);
        dispatch(updateQuery(query));
        dispatch(performSearch(torrentSearchRoute, query, selected));
    };

    const handleCategoryChanged = (category: string) => {
        dispatch(updateCategory(category));
        if (query) dispatch(performSearch(torrentSearchRoute, query, category));
    };

    const torrentRow = (torrent: Torrent & { seeds?: number, peers?: number }) => {
        const { seeds, peers } = torrent;

        return (
            <TableRow key={torrent.magnet}>
                <TableCell style={{ maxWidth: '300px', overflow: 'hidden' }}>
                    <Link target="_blank" href={torrent.desc}>{torrent.title}</Link>
                </TableCell>
                <TableCell><Link href="#"><GetAppIcon/></Link></TableCell>
                <TableCell>{torrent.time}</TableCell>
                <TableCell>{torrent.size}</TableCell>
                <TableCell>
                    <TorrentCondition seeds={seeds} leech={peers}/>
                </TableCell>
                <TableCell>{torrent.provider}</TableCell>
            </TableRow>
        );
    };

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
            <Table size="small" style={{ maxWidth: '100%' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell> </TableCell>
                        <TableCell>Uploaded</TableCell>
                        <TableCell>Size</TableCell>
                        <TableCell>Condition</TableCell>
                        <TableCell>Provider</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {results.map(torrentRow)}
                </TableBody>
            </Table>
        </StyledPaper>
    );
};
