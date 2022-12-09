import React, {FC, useMemo, useState} from 'react';
import MaterialReactTable, {MRT_ColumnDef} from 'material-react-table';

import {
    ColumnFiltersState,
    PaginationState,
    SortingState,
} from '@tanstack/react-table';
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query';
import moment from "moment";

type UserApiResponse = {
    data: {
        results: Array<User>
        count: number,
        limit: number,
        offset: number,
        total: number
    };
};

type User = {
    name: string;
    description: string;
    modified: string;
    series: {
        available: string
    };
    comics: {
        available: string
    };
    stories: {
        available: string
    };
    events: {
        available: string
    };
};

const Table: FC = () => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const {data, isError, isFetching, isLoading, refetch} =
        useQuery<UserApiResponse>(
            [
                columnFilters,
                globalFilter,
                pagination.pageIndex,
                pagination.pageSize,
                sorting,
            ],
            async () => {
                const CryptoJS = require("crypto-js");
                const ts = new Date().getTime();
                const PRI_KEY = process.env.REACT_APP_API_PRIVATE_KEY;
                const PUB_KEY = process.env.REACT_APP_API_PUBLIC_KEY;
                const hash = CryptoJS.MD5(ts + PRI_KEY! + PUB_KEY!).toString();

                const url = new URL(
                    'characters',
                    process.env.NODE_ENV === 'production'
                        ? 'https://www.material-react-table.com'
                        : process.env.REACT_APP_API_PATH,
                );
                url.searchParams.set(
                    'offset',
                    `${pagination.pageIndex * pagination.pageSize}`,
                );
                url.searchParams.set('limit', `${pagination.pageSize}`);
                console.log(columnFilters, sorting)
                if (globalFilter) url.searchParams.set('nameStartsWith', globalFilter);
                columnFilters.forEach(filter => url.searchParams.set(filter.id, `${filter.value}`));
                if (sorting.length > 0) {
                    const sortingKeysMap: any = {
                        nameStartsWith: 'name',
                        modifiedSince: 'modified'
                    };

                    const newSortingArray = sorting.map((item) => item.desc ? '-' + sortingKeysMap[item.id].toString() : sortingKeysMap[item.id]);
                    console.log(newSortingArray)
                    url.searchParams.set('orderBy', newSortingArray.join(','));
                }

                url.searchParams.set('ts', `${ts}`);
                url.searchParams.set('apikey', `${process.env.REACT_APP_API_PUBLIC_KEY}`);
                url.searchParams.set('hash', `${hash}`);

                const response = await fetch(url.href);
                const json = (await response.json()) as UserApiResponse;
                return json;
            },
            {keepPreviousData: true},
        );

    const columns = useMemo<MRT_ColumnDef<User>[]>(
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

    console.log(data?.data)
    console.log(globalFilter)

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
                onClick: (event) => {
                    console.info(event, row);
                },
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

const queryClient = new QueryClient();

const ExampleWithReactQueryProvider = () => (
    <QueryClientProvider client={queryClient}>
        <Table/>
    </QueryClientProvider>
);

export default ExampleWithReactQueryProvider;