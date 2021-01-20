import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import styled from 'styled-components'
import { Modal } from 'antd'
import isEmpty from 'lodash/isEmpty'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
// import thLocale from '@fullcalendar/core/locales/th'
import TextField from 'components/form/textfield'
import TimePicker from 'react-time-picker/dist/entry.nostyle'
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle'
import "react-time-picker/dist/TimePicker.css"
import 'react-datetime-picker/dist/DateTimePicker.css'

import { useForm, Controller } from "react-hook-form"
import Side_Menu from 'components/side_menu'
import Main_Container from 'components/container'
import momentTZ from 'moment-timezone'
import moment from 'moment'
import { toBuddhistYear } from 'lib/buddhist-year'
import Timeline from '@material-ui/lab/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent'
import TimelineDot from '@material-ui/lab/TimelineDot'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Editor } from '@tinymce/tinymce-react'
momentTZ.locale('th')

//calendar
import '@fullcalendar/common/main.css' // @fullcalendar/react imports @fullcalendar/common
import '@fullcalendar/daygrid/main.css' // @fullcalendar/timegrid imports @fullcalendar/daygrid
import '@fullcalendar/timegrid/main.css' // @fullcalendar/timegrid is a direct import


const Calendar_page = () => {
    const [Data, setData] = React.useState([{title:"ทดสอบครับ",start:"2020-12-07",end:"2020-12-14"},{title:"ทดสอบ2",start:"2020-12-08"},{title:"ทดสอบ2",start:"2020-12-08"},{title:"ทดสอบ2",start:"2020-12-08"}])
    const [EndAddNewEventDate,setEndAddNewEventDate] = React.useState(new Date())
    const [ViewEvent, setViewEvent] = React.useState({ dateStr: "" })
    /* add useForm */
    const { register, handleSubmit, control, setValue } = useForm()

    const Handle = (event) => {

        setViewEvent(event)
    }

    const SubmitHandle = (event) => {
        console.log(event)
    }

    // const Data = [
    //     {
    //         title:"ทดสอบระบบจ้า",
    //         start :"2020-12-03"
    //     }
    // ]
    const CustomDayHeader = ({ event, view }) => {

        return (
            <div style={{ textOverflow: "ellipsis", overflow: "hidden", color: "black" }}>{event.title}</div>
        )
    }

    const CustomDayCell = ({ date, dayNumberText }) => {
        return (
            <div>{dayNumberText}</div>
        )
    }

    return (
        <>

            <Side_Menu />

            {/* modal */}
            <Modal
                title="กิจกรรม"
                visible={!isEmpty(ViewEvent.dateStr)}
                onCancel={() => setViewEvent({dateStr:""})}>

                {/* render */}
                <Grid container>
                    <Grid item xs={12}>
                        <Timeline align="left">
                            {/* item 1 */}
                            <TimelineItem>

                                <TimelineOppositeContent>
                                    <Typography variant="body2" color="textSecondary" >9:30 am</Typography>
                                </TimelineOppositeContent>

                                <TimelineSeparator>
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>

                                <TimelineContent>

                                    <PaperContainer>
                                        <PaperContent>
                                            <Grid container>
                                                <Grid item xs={11}>
                                                    <h5>dff</h5>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <div className="action-calenlar-item">
                                                        <Grid container>
                                                            <Grid item xs={12}>
                                                                <EditIcon className="btn-calendar-item" />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <DeleteIcon className="btn-calendar-item" />
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                </Grid>
                                            </Grid>

                                        </PaperContent>
                                    </PaperContainer>
                                </TimelineContent>

                            </TimelineItem>
                            {/* end item 1 */}

                        </Timeline>
                    </Grid>
                </Grid>
                {/* end render */}

                <h1 className="text-center"> {toBuddhistYear(moment(ViewEvent.dateStr), "DD/MM/YYYY")}</h1>

                <form onSubmit={handleSubmit(SubmitHandle)}>
                    <Grid container>

                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item md={2} xs={12} sm={6} className="mt-1">
                                    <h5>เวลาเริ่มต้น</h5>
                                </Grid>
                                <Grid item md={3}  sm={6} xs={12}>
                                    <TimePicker disableClock={true} name="starttime" value="10:30" />
                                </Grid>
                                <Grid item md={2} sm={6} xs={12} className="mt-1">
                                    <h5>เวลาสิ้นสุด</h5>
                                </Grid>
                                <Grid item md={3} sm={6} xs={12}>
                                    <DateTimeContainer value={EndAddNewEventDate} locale="th"  onChange={(e) => setEndAddNewEventDate(e)} name="endtime" />
                                </Grid>
                            </Grid>

                        </Grid>

                        <Grid item xs={12} className="pt-2">
                            <Controller
                                name="title"
                                as={<TextField variant="outlined" label="หัวข้อ" />}
                                control={control}
                                defaultValue=""
                            />

                        </Grid>
                        <Grid item xs={12} className="pt-2">

                            <Editor
                                init={{
                                    plugins: 'image',
                                    toolbar: 'image'
                                }}
                                ref={() => register({ name: 'description' })}
                                onChange={description => setValue('description', description.target.getContent())}
                            />

                        </Grid>

                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit">เพิ่ม</Button>
                        </Grid>
                    </Grid>
                </form>

            </Modal>
            {/* end modal */}

            <Main_Container>
                <Grid container>
                    <Grid item>
                        <h1>ปฏิทินกิจกรรม</h1>
                    </Grid>
                </Grid>

                <FullCalendar
                    locale="th"
                    plugins={[interactionPlugin, timeGridPlugin, dayGridPlugin]}
                    initialView='dayGridMonth'
                    nowIndicator={true}
                    // editable={true}
                    events={Data}
                    eventContent={CustomDayHeader}
                    dayCellContent={CustomDayCell}
                    dateClick={Handle}
                    eventClick={Handle}
                    eventMouseEnter={(e) => console.log(e.el.innerText)}

                />
            </Main_Container>

        </>
    )
}
export default Calendar_page

const PaperContainer = styled.div`
border-radius: 10px;
border-color:red;
background:#f5f5f5;
`

const PaperContent = styled.div`
padding: 6px 16px;
.action-calenlar-item {
    display:none;
}

:hover .action-calenlar-item {
    display:block;
}

.btn-calendar-item {
    color:#757575;
}
`

const DateTimeContainer = styled(DateTimePicker)`
z-index:2;
`