import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import styled from 'styled-components'
import Side_Menu from 'components/side_menu'
import Main_Container from 'components/container'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { Modal } from 'antd'
import { Upload } from 'components/form/uploads'
import TextField from 'components/form/textfield'
import { useDropzone } from 'react-dropzone'
import CancelIcon from '@material-ui/icons/Cancel'
import cloneDeep from 'lodash/cloneDeep'
import TimePicker from 'react-time-picker/dist/entry.nostyle'
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle'
import find from 'lodash/find'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import momentTZ from 'moment-timezone'
import moment from 'moment'
import isEmpty from 'lodash/isEmpty'
import { toBuddhistYear } from 'lib/buddhist-year'
import { DropzoneRootProps, DropzoneInputProps } from 'react-dropzone'

momentTZ.locale('th')

const finalSpaceCharacters = [
    {
        id: 'gary',
        name: 'Gary Goodspeed',
        thumb: '/images/gary.png'
    },
    {
        id: 'gary2',
        name: 'Gary Goodspeed2',
        thumb: '/images/gary.png'
    },
    {
        id: 'gary3',
        name: 'Gary Goodspeed3',
        thumb: '/images/gary.png'
    },
]

/* reorder items  */
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}

const Banner_index = () => {
    const [State, setState] = React.useState<any>(finalSpaceCharacters)
    const [ModalUpload, setModalOpen] = React.useState<any>(null)
    const [EndAddNewEventDate, setEndAddNewEventDate] = React.useState(new Date())

    const onDropImg = React.useCallback(
        (acceptedFiles) => {
            // let Val: any[] = []

            // acceptedFiles.map(file => {
            //     const Findduplicate = find(filesImg, { 'name': file.name }) /* check dulplicate file name */

            //     if (!Findduplicate) {
            //         /* if not duplicate file.name create blob URL */
            //         Val.push(Object.assign(file, {
            //             preview: URL.createObjectURL(file)
            //         }))
            //     }
            // }
            // )
            console.log(getRootProps)
            console.log(acceptedFiles)

        },
        []
    )

    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        onDrop: (accp) => {
            console.log(accp)
        }, accept: 'image/*'
    }) //more images

    const OnDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return
        }

        const items = reorder(
            State,
            result.source.index,
            result.destination.index
        )
        setState(items)
    }

    const grid = 8;

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        // background: isDragging ? "lightgreen" : "grey",

        // styles we need to apply on draggables
        ...draggableStyle
    })

    const getListStyle = isDraggingOver => ({
        // background: isDraggingOver ? "lightblue" : "lightgrey",
        padding: grid,
    })

    // console.log(State)
    return (
        <>

            {/* modal */}
            <Modal
                title="อัพโหลดรูป"
                visible={!isEmpty(ModalUpload)}
                onCancel={() => setModalOpen(null)}>

            </Modal>
            {/* end modal */}

            <Side_Menu />

            <Main_Container>

                <DragDropContext onDragEnd={OnDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {State.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                            >
                                                <Grid container>
                                                    <Grid item xs={12}>
                                                        <Grid container>
                                                            <NoBanner_Container item xs={12}>
                                                                kkk
                                                            </NoBanner_Container>
                                                        </Grid>
                                                        {/* <Upload name={item.id} getRootProps={getRootProps} getInputProps={getInputProps} isDragActive={isDragActive} isDragAccept={isDragAccept} isDragReject={isDragReject} multiple={true} object="image" /> */}
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <Grid container>

                                                            <Grid item xs={12} >
                                                                <Box display="flex">
                                                                    <URLInput>URL</URLInput>
                                                                    <Box><URLInput_TextFeild placeholder="http://" /></Box>
                                                                </Box>
                                                            </Grid>

                                                        </Grid>

                                                    </Grid>

                                                    <Grid item xs={12}>

                                                        <Grid container>
                                                            <Grid item xs={12} sm={6} md={2} className="mt-1">
                                                                <h5>เวลาเริ่มต้น</h5>
                                                            </Grid>
                                                            <Grid item xs={12} sm={6} md={4}>
                                                                <DateTimeContainer value={EndAddNewEventDate} locale="th" onChange={(e) => setEndAddNewEventDate(e)} name="endtime" />
                                                            </Grid>


                                                            <Grid item xs={12} sm={6} md={2} className="mt-1">
                                                                <h5>เวลาสิ้นสุด</h5>
                                                            </Grid>
                                                            <Grid item xs={12} sm={6} md={4}>
                                                                <DateTimeContainer value={EndAddNewEventDate} locale="th" onChange={(e) => setEndAddNewEventDate(e)} name="endtime" />
                                                            </Grid>
                                                        </Grid>

                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <Grid container>
                                                            <Grid item xs={12} sm={6} lg={6}>
                                                                จำนวนผู้รับชม : 50 ครั้ง
                                                            </Grid>
                                                            <Grid item xs={12} sm={6} lg={6}>
                                                                สถานะ
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

            </Main_Container>
        </>
    )
}
export default Banner_index

const URLInput = styled(Box)`
background-color:green;
color:white;
padding: 5px 20px;
`

const URLInput_TextFeild = styled(TextField)`
border: #a7a7a7 1px solid;
`

const DateTimeContainer = styled(DateTimePicker)`
/* z-index:2; */
`

const NoBanner_Container = styled(Grid)`
background-color:#a9a9a9;
height:200px;
`