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
import { performSearch as torrentSearchRoute, getMagnet } from './../../../routes/routes';
import { SlideInDiv } from '../../../components/AnimationComponents/SlideInDiv';
import { useHistory } from 'react-router-dom';
import { doPost } from '../../../redux/actions/actuatorActions';

export const SearchContainer = () => {

    const { options, results, selected, query } = useSelector((state: IApplicationState) => ({
        options: state.torrentApi.categories,
        selected: state.torrentApi.category,
        results: state.torrentApi.results,
        query: state.torrentApi.query
    }));

    const history = useHistory();

    const dispatch = useDispatch();

    const handleQueryChanged = (query: string) => {
        console.log(query);
        dispatch(updateQuery(query));
        dispatch(performSearch(torrentSearchRoute, query, selected));
    };

    const handleCategoryChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const category = event.target.value;
        dispatch(updateCategory(category));
        if (query) dispatch(performSearch(torrentSearchRoute, query, category));
    };

    const onTorrentResultSelected = async (index: number) => {
        const torrent = results[index];
        let magnet = torrent.magnet;
        if (!magnet) {
            console.log('Magnet does not exist on this torrent');
            const url = `http://${getMagnet.host}:${getMagnet.port}${getMagnet.uri}`;
            const result = await doPost(url, torrent).then(result=>result.json());
            magnet = result.magnet;
        }
        history.push('/pi-tor', {
            magnet,
            torrent,
        });
    };

    const torrentRow = (torrent: Torrent & { seeds?: number, peers?: number }, idx: number) => {
        const { seeds, peers } = torrent;

        return (
            <TableRow key={idx}>
                <TableCell style={{ maxWidth: '300px', overflow: 'hidden' }}>
                    <Link target="_blank" href={torrent.desc}>{torrent.title}</Link>
                </TableCell>
                <TableCell>
                    <Link
                        onClick={() => onTorrentResultSelected(idx)}>
                        <GetAppIcon/>
                    </Link>
                </TableCell>
                <TableCell>{torrent.time}</TableCell>
                <TableCell>{torrent.size}</TableCell>
                <TableCell>
                    <TorrentCondition seeds={seeds} leech={peers}/>
                </TableCell>
                <TableCell>{torrent.provider}</TableCell>
            </TableRow>
        );
    };

    const formHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <StyledPaper>
            <Typography variant="h3">Search</Typography>
            <form style={{ display: 'flex' }} onSubmit={formHandler}>
                <SearchField
                    handleChange={handleQueryChanged}
                    label={'search'}
                    name={'query'}
                />
                <SelectField
                    label="Categories"
                    handleChange={handleCategoryChanged}
                    options={options}
                    selected={selected}
                />
            </form>
            {
                results.length > 0 && <SlideInDiv>
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
                </SlideInDiv>
            }
        </StyledPaper>
    );
};
