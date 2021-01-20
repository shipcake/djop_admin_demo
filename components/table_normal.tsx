import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import styled from 'styled-components'
import { useTable, usePagination } from 'react-table'

const Table = ({ columns, data, fetchData, loading, pageCount: controlledPageCount }) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },

    } = useTable({
        columns,
        data,
        manualPagination: true,
        pageCount: controlledPageCount,
    },
        usePagination
    )

    // Listen for changes in pagination and use the state to fetch our new data
    React.useEffect(() => {
        fetchData({ pageIndex, pageSize })
    }, [fetchData, pageIndex, pageSize])

    return (
        <div style={{ boxShadow: "0 2px 3px 0 #E8E8E8" }}>
            <TableContainer {...getTableProps()}>
                <TrHeader>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </TrHeader>
                <TBody {...getTableBodyProps()} loading={loading}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>

                                        {cell.render('Cell')}


                                    </td>
                                })}
                            </tr>
                        )
                    })}
                </TBody>
            </TableContainer>

            {/* page navigation */}
            <Pageination className="pagination">

                <Grid container alignItems="center">

                    <Grid item xs={12} md={4} >
                        <span id="text_pageof"><p className="text-center text-md-left">หน้าที่ {pageIndex + 1} ของ {pageOptions.length} </p>

                        </span>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Box display="flex" justifyContent="center">
                            <Box>
                                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                                    {'<<'}
                                </button>
                                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                                    {'<'}
                                </button>

                                <button onClick={() => nextPage()} disabled={!canNextPage}>
                                    {'>'}
                                </button>

                                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                                    {'>>'}
                                </button>
                            </Box>
                        </Box>

                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Box display="flex" justifyContent="flex-end">
                            <Box>
                                <select
                                    value={pageSize}
                                    onChange={e => {
                                        setPageSize(Number(e.target.value))
                                    }}
                                >
                                    {[10, 20, 30, 40, 50].map(pageSize => (
                                        <option key={pageSize} value={pageSize}>
                                            Show {pageSize}
                                        </option>
                                    ))}
                                </select>
                            </Box>
                        </Box>
                    </Grid>

                </Grid>

            </Pageination>
            {/* end page navigation */}


        </div>
    )
}
export default Table

const TableContainer = styled.table`
width:100%;
border-collapse:separate;

`

const TrHeader = styled.thead`
background-color:#eeeeee;
th{
    padding:10px;
    color:#757575;
}
`

const TBody = styled.tbody<{loading:boolean}>`
filter: ${props => props.loading?"blur(8px)":"none"} ;
tr {
    background-color:#fafafa;
    /* box-shadow: 0 2px 3px 0 #E8E8E8;
    border-radius: 10px; */
}
td {
    padding:15px 10px;
    /* background-color:red; */
}
`

const Pageination = styled.div`
padding:10px 5px;
#text_pageof {
    color:#9e9e9e;
}
button {
    border: 1px solid #e0e0e0;
    background-color:white;
    margin: 0px 5px;
    border-radius:50%;
    width:40px;
    height:40px;
}

button:focus {
    outline:none;
}
button:disabled {
    background-color:#fafafa;
    color:#e0e0e0;
}
`

