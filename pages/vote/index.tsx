import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import styled from 'styled-components'
import Side_Menu from 'components/side_menu'
import Main_Container from 'components/container'
import { PieChart } from 'react-minimal-pie-chart'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { Modal } from 'antd'
import TextField from 'components/form/textfield'
import CancelIcon from '@material-ui/icons/Cancel'
import cloneDeep from 'lodash/cloneDeep'
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle'
import find from 'lodash/find'

//calendar
import '@fullcalendar/common/main.css' // @fullcalendar/react imports @fullcalendar/common
import '@fullcalendar/daygrid/main.css' // @fullcalendar/timegrid imports @fullcalendar/daygrid
import '@fullcalendar/timegrid/main.css' // @fullcalendar/timegrid is a direct import

import "react-time-picker/dist/TimePicker.css"
import 'react-datetime-picker/dist/DateTimePicker.css'


/* dumb data */
const Data = [
    {
        Head: "หัวข้อที่ 1",
        data: [
            { title: "หัวข้อย่อย 1", value: 5, color: "#ffcc80" },
            { title: "หัวข้อย่อย 2", value: 2, color: "#9fa8da" },
        ]
    },
    {
        Head: "หัวข้อที่ 2",
        data: [
            { title: "หัวข้อย่อย 1", value: 7, color: "#90caf9" },
            { title: "หัวข้อย่อย 2", value: 7, color: "#c5e1a5" },
        ]
    }
]
/* end dumb data */

const Vote_index = () => {
    const [data, setdata] = React.useState(Data)
    const [SelectViewData, setSelectViewData] = React.useState(null)
    const [AddModal, setAddModal] = React.useState(false)
    const [AddOptions, setAddOpions] = React.useState([{ name: 'te' }])
    const [TxtaddInput, setTxtaddInput] = React.useState("")
    const [EndAddNewEventDate, setEndAddNewEventDate] = React.useState(new Date())

    const OnAddOptions = () => {
        let cloneData = cloneDeep(AddOptions)
        cloneData.push({ name: TxtaddInput })
        setAddOpions(cloneData)
        setTxtaddInput("")
    }

    const OnDeleteAddOptions = (index) => {
        let cloneData = cloneDeep(AddOptions)
        cloneData.splice(index, 1)
        console.log(cloneData)
        setAddOpions(cloneData)
    }

    /* view data */
    const ViewData = (index) => {
        setSelectViewData(data[index])
    }

    return (
        <>
            <Side_Menu />

            {/* modal add */}
            <Modal
                title="เพิ่มโหวต"
                onCancel={() => setAddModal(false)}
                visible={AddModal}
            >

                <Grid container>
                    <Grid item xs={12}>
                        <TextField variant="outlined" label="หัวข้อ" />
                    </Grid>

                    {/* options content */}
                    <Container_Options item xs={12}>
                        <h4>ข้อย่อย</h4>
                        <Grid container>
                            {AddOptions.map((v, i) => (
                                <Grid key={i} id="Option_Container" item xs={12}>
                                    <Box display="flex" alignContent="stretch">
                                        <Box id="Name_Container">
                                            <h5>{v.name}</h5>
                                        </Box>
                                        <Box>
                                            <CancelIcon id="Btn_Remove" onClick={() => OnDeleteAddOptions(i)} />
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Container_Options>
                    {/* end options content */}

                    {/* add options input */}
                    <Grid item xs={12} className="pt-3">
                        <TextField variant="outlined" value={TxtaddInput} onChange={event => setTxtaddInput(event.target.value)} label="เพิ่มข้อย่อย" />
                        <Box display="flex" justifyContent="center" className="pt-2">
                            <Box><ButtonAdd onClick={OnAddOptions}><AddCircleOutlineIcon style={{ fontSize: "45px" }} /></ButtonAdd></Box>
                        </Box>
                    </Grid>
                    {/* end add options input */}

                    {/* date and time */}
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <h4>กำหนดเวลา</h4>
                            </Grid>

                            {/* start date and time */}
                            <Grid item xs={12} sm={6}>
                                <h5>เริ่ม</h5>  <DateTimeContainer value={EndAddNewEventDate} locale="th" onChange={(e) => setEndAddNewEventDate(e)} name="endtime" />

                            </Grid>

                            {/* end sub date and time */}
                            <Grid item xs={12} sm={6}>
                                <h5>สิ้นสุด</h5>  <DateTimeContainer value={EndAddNewEventDate} locale="th" onChange={(e) => setEndAddNewEventDate(e)} name="endtime" />

                            </Grid>

                        </Grid>
                    </Grid>
                    {/* end date and time */}
                </Grid>

            </Modal>
            {/* end modal add */}

            <Main_Container>
                <Grid container>
                    <Grid item xs={12} className="py-2">
                        <h1>โหวต</h1>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container>

                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Box display="flex" flexDirection="column">
                                    <Box>
                                        <ButtonAdd onClick={() => setAddModal(true)}><AddCircleOutlineIcon style={{ fontSize: "45px" }} /></ButtonAdd>
                                    </Box>
                                    <Box>
                                        <Box display="flex" flexDirection="column" style={{ overflowY: "scroll", maxHeight: "500px" }}>
                                            {
                                                data.map((v, i) => {
                                                    return (
                                                        <Container_List key={i} active={SelectViewData !== null ? SelectViewData.Head == v.Head ? true.toString() : false.toString() : false.toString()} onClick={() => ViewData(i)}>{v.Head}</Container_List>
                                                    )
                                                })
                                            }
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={6}>

                                {SelectViewData !== null ?
                                    SelectViewData.data && SelectViewData.data.length ?
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <ListPieDataContainer container className="p-2 m-2">
                                                    {SelectViewData.data.map((v, i) => (
                                                        <Grid key={i} item xs={12} className="py-2">
                                                            <Grid container>
                                                                <Grid item xs={2}><ItemPieDataColor colour={v.color} /></Grid>
                                                                <Grid item xs={6}>{v.title}</Grid>
                                                                <Grid item xs={4}>{v.value}</Grid>
                                                            </Grid>
                                                        </Grid>
                                                    ))}
                                                </ListPieDataContainer>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <PieChart
                                                    data={SelectViewData.data}
                                                />
                                            </Grid>


                                        </Grid>
                                        : <>ไม่มีข้อมูล</>
                                    : null}
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Main_Container>
        </>
    )
}

export default Vote_index

const ButtonAdd = styled.button`
border:none;
background:none;
:focus{
    outline:none;
}
`

const Container_List = styled(Box)`
padding:10px 30px;
background-color:${props => props.active == "true" ? "#888888" : "#efeef6"} ;
margin-bottom: 5px;
border:1px #d7d6dd solid;
border-radius:10px;
cursor: pointer;
color:${props => props.active == "true" ? "white" : ""};
:hover {
    background-color: ${props => props.active ? "#505050" : "#e1e0e6"} ;
}
`

const Container_Options = styled(Box)`
padding:10px 20px;
background-color:#efeef6;
margin: 25px 0px;
width:100%;

#Option_Container {
    background-color:white;
    padding:5px 10px;
    margin: 5px 0px;
}

#Name_Container {
    flex:1;
}

#Btn_Remove {
    cursor: pointer;
    color:#424242;
}

#Btn_Remove:hover {
    color:#6d6d6d;
}
`

const DateTimeContainer = styled(DateTimePicker)`
z-index:2;
`

const ListPieDataContainer = styled(Grid)`
background-color:#f5f5f5;
`

const ItemPieDataColor = styled(Grid) <{ colour: string }>`
width:30px;
height:30px;
background-color:${props => props.colour};

`