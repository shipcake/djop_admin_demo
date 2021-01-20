import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import styled from 'styled-components'
import faker from 'faker'
import Typography from "@material-ui/core/Typography"
import Side_Menu from 'components/side_menu'
import Main_Container from 'components/container'
import Table from 'components/table_normal'
import makeData from 'lib/makeData'

const Posts_Page = () => {
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [pageCount, setPageCount] = React.useState(0)
    const fetchIdRef = React.useRef(0)

    const data2 = React.useMemo(() => makeData(100), [])

    const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
        // This will get called when the table needs new data
        // You could fetch your data from literally anywhere,
        // even a server. But for this example, we'll just fake it.

        // Give this fetch an ID
        const fetchId = ++fetchIdRef.current

        // Set the loading state
        setLoading(true)

        // We'll even set a delay to simulate a server here
        setTimeout(() => {
            // Only update the data if this is the latest fetch
            if (fetchId === fetchIdRef.current) {
                const startRow = pageSize * pageIndex
                const endRow = startRow + pageSize
                setData(data2.slice(startRow, endRow))

                // Your server could send back total page count.
                // For now we'll just fake it, too
                setPageCount(Math.ceil(data2.length / pageSize))

                setLoading(false)
            }
        }, 1000)
    }, [])


    const columns = React.useMemo(
        () => [
            {
                Header: "หัวข้อ",
                accessor: "title"
            },
            {
                Header: "หมวดหมู่",
                accessor: "categories"
            },
            {
                Header: "วันที่",
                accessor: "date"
            },
            {
                Header: () => <div className="text-center">แก้ไข</div>,
                accessor: "edit",
                Cell: (cellProps) => (
                    <div className="text-center"><img style={{ width: "20px" }} src="/edit1.png" /> </div>
                )
            },
            {
                Header: () => <div className="text-center">ลบ</div>,
                accessor: "delete",

                Cell: (cellProps) => (
                    <div className="text-center"><img style={{ width: "20px" }} src="/delete1.png" /></div>
                )
            }

        ], []
    )



    return <>
        <Side_Menu />
        <Main_Container>
            <Grid container>

                <Grid item xs={12} className="py-2">
                    <h1>โพสต์</h1>
                </Grid>

                <Grid item xs={12}>
                    <Table
                        columns={columns}
                        data={data}
                        loading={loading}
                        pageCount={pageCount}
                        fetchData={fetchData}
                    />
                </Grid>
            </Grid>
        </Main_Container>
    </>
}
export default Posts_Page