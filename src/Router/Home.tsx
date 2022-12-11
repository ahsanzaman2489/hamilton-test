import React, {FC, useCallback, useMemo, useState} from 'react';
import MaterialReactTable, {MRT_ColumnDef} from 'material-react-table';

import {
    ColumnFiltersState,
    PaginationState,
    SortingState,
} from '@tanstack/react-table';
import {
    useQuery,
} from '@tanstack/react-query';
import moment from "moment";
import {useNavigate, useSearchParams} from 'react-router-dom';
import {API} from "../Service";
import queryString from 'query-string';
import findIndex from 'lodash/findIndex';
import {Character, CharacterListApiResponse} from "../Types";

const Home: FC = () => {
    const sortingKeysMap: any = {
        nameStartsWith: 'name',
        modifiedSince: 'modified'
    };
    //Key map for sorting and filers

    const sortingKeysMapReverse: any = {
        name: 'nameStartsWith',
        modified: 'modifiedSince'
    };
    //Reverse Key map for sorting and filers

    const [searchParams] = useSearchParams();
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(() => {
        //Setting initial state of column search filters if available in URl
        const columnFiltersArray = [];
        if (searchParams.has('modifiedSince') || searchParams.has('nameStartsWith')) {

            for (let key in sortingKeysMap) {
                if (searchParams.has(key)) {
                    columnFiltersArray.push({
                        id: key,
                        value: searchParams.get(key)
                    })
                }
            }
        }

        return columnFiltersArray || []
    });
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<SortingState>(() => {
        //Setting initial state of sorting filters if available in URl
        let arrayOFOrderBy: any = [];

        if (searchParams.has('orderBy')) {
            arrayOFOrderBy = searchParams.get('orderBy')!.split(',').map((item) => {
                if (item.startsWith('-')) {
                    return {
                        id: sortingKeysMapReverse[item.slice(1)],
                        desc: true
                    }
                } else {
                    return {
                        id: sortingKeysMapReverse[item],
                        desc: false
                    }
                }
            });
        }

        return arrayOFOrderBy || []
    });
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: parseInt(searchParams.get('pageIndex')!, 10) || 0, // Current Page number
        pageSize: 10, // Limit for item per page
    });


    const navigate = useNavigate();

    const setSearchParams = useCallback(() => {
        searchParams.set(
            'pageIndex',
            `${pagination.pageIndex}`,
        ); // Setting page index for pagination
        searchParams.set(
            'offset',
            `${pagination.pageIndex * pagination.pageSize}`,
        ); // Setting items offset for pagination

        searchParams.set('limit', `${pagination.pageSize}`); // Setting items limit per page

        if (globalFilter) searchParams.set('nameStartsWith', globalFilter); // Setting global search for name

        for (let key in sortingKeysMap) { // Setting Column Search filers
            const indexOfParams = findIndex(columnFilters, (o: any) => {
                return o.id.replace("-", "") == key
            });

            if (indexOfParams !== -1) {
                searchParams.set(columnFilters[indexOfParams]?.id, `${columnFilters[indexOfParams]?.value}`)
            } else {
                searchParams.delete(key)
            }
        }


        const newSortingArray = sorting.map((item) => item.desc ? '-' + sortingKeysMap[item.id].toString() : sortingKeysMap[item.id]);
        if (newSortingArray.length) { // Setting Sorting filters
            searchParams.set('orderBy', newSortingArray.join(','));
        } else {
            searchParams.delete('orderBy');
        }

        return searchParams.toString();
    }, [columnFilters,
        globalFilter,
        pagination.pageIndex,
        pagination.pageSize,
        sorting]); // Setting all search query params for URL to persist the state on load and with new interaction

    const {data, isError, isFetching, isLoading} =
        useQuery<CharacterListApiResponse>(
            [
                columnFilters,
                globalFilter,
                pagination.pageIndex,
                pagination.pageSize,
                sorting,
            ],
            async () => {

                const getAllSearchParams = setSearchParams();

                navigate({
                    pathname: '/',
                    search: getAllSearchParams
                }, {replace: true});

                const url = queryString.exclude('characters?' + getAllSearchParams, ['pageIndex']);
                const response = await API(url);

                return (await response.data) as CharacterListApiResponse;
            },
            {keepPreviousData: true},
        );

    const columns = useMemo<MRT_ColumnDef<Character>[]>(
        () => [
            {
                accessorKey: 'name',
                header: 'Full Name',
                id: 'nameStartsWith',
                muiTableHeadCellFilterTextFieldProps: {
                    placeholder: 'Ex: Spider',
                },
            },
            {
                accessorKey: 'description',
                header: 'Description',
                accessorFn: (row) => `${row.description.length > 50 ? row.description.substring(0, 50) + "..." : row.description}`,
                enableColumnFilter: false,
                enableSorting: false,
            },
            {
                accessorFn: (row) => `${row.series.available}`, //accessorFn used to join multiple data into a single cell
                id: 'series', //id is still required when using accessorFn instead of accessorKey
                header: 'Series',
                enableColumnFilter: false,
                enableSorting: false
            },
            {
                accessorFn: (row) => `${row.comics.available}`, //accessorFn used to join multiple data into a single cell
                id: 'comics', //id is still required when using accessorFn instead of accessorKey
                header: 'Comics',
                enableColumnFilter: false,
                enableSorting: false
            },
            {
                accessorFn: (row) => `${row.stories.available}`, //accessorFn used to join multiple data into a single cell
                id: 'stories', //id is still required when using accessorFn instead of accessorKey
                header: 'Stories',
                enableColumnFilter: false,
                enableSorting: false
            },
            {
                accessorFn: (row) => `${row.events.available}`, //accessorFn used to join multiple data into a single cell
                id: 'events', //id is still required when using accessorFn instead of accessorKey
                header: 'Events',
                enableColumnFilter: false,
                enableSorting: false
            },
            {
                accessorFn: (row) => `${moment(row.modified).format('MM-DD-YYYY')}`, //accessorFn used to join multiple data into a single cell
                id: 'modifiedSince', //id is still required when using accessorFn instead of accessorKey
                header: 'Last Modified',
                muiTableHeadCellFilterTextFieldProps: {
                    placeholder: 'MM-DD-YYYY',
                }
            },
        ],
        [],
    );

    const handleCharacterClick = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>, row: any) => {
        navigate(`../details/${row.original.id}`);
    };

    return (
        <MaterialReactTable
            columns={columns}
            data={data?.data?.results ?? []} //data is undefined on first render
            initialState={{showColumnFilters: false}}
            manualFiltering
            manualPagination
            manualSorting
            muiToolbarAlertBannerProps={
                isError
                    ? {
                        color: 'error',
                        children: 'Error loading data',
                    }
                    : undefined
            }
            onColumnFiltersChange={setColumnFilters}
            onGlobalFilterChange={setGlobalFilter}
            onPaginationChange={setPagination}
            onSortingChange={setSorting}
            rowCount={data?.data?.total ?? 0}
            enableFullScreenToggle={false}
            enableDensityToggle={false}
            muiTableBodyRowProps={({row}) => ({
                onClick: (e) => handleCharacterClick(e, row),
                sx: {cursor: 'pointer'}
            })}
            state={{
                columnFilters,
                globalFilter,
                isLoading,
                pagination,
                showAlertBanner: isError,
                showProgressBars: isFetching,
                sorting,
            }}
        />
    );
};

export default Home;