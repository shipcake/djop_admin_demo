import React, { useRef, createRef, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { Row, Col } from 'antd'
import DefTabs from '@material-ui/core/Tabs'
import DefTab from '@material-ui/core/Tab'
import styled from 'styled-components'
import AppBar from '@material-ui/core/AppBar'
import faker from 'faker'
import Typography from "@material-ui/core/Typography"
import { StickyContainer, Sticky } from 'react-sticky'
// import { Tabs } from 'antd'

import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'

import Side_Menu from 'components/side_menu'
import Main_Container from 'components/container'
import momentTZ from 'moment-timezone'
import moment from 'moment'
import { toBuddhistYear } from 'lib/buddhist-year'
momentTZ.locale('th')

//calendar
import '@fullcalendar/common/main.css' // @fullcalendar/react imports @fullcalendar/common
import '@fullcalendar/daygrid/main.css' // @fullcalendar/timegrid imports @fullcalendar/daygrid
import '@fullcalendar/timegrid/main.css' // @fullcalendar/timegrid is a direct import

/** end mokeup dummy data */

const Index_page = () => {
  const [PositionTab, setPositionTab] = React.useState(0)
  const [calendarTitle, setcalendarTitle] = React.useState("")

  const calendarRef: any = useRef()

  // useEffect(() => {
  //   console.log(calendarRef.current.getApi().view.title)
  // }, [calendarRef])

  const ChangeMonth = (month) => {
    let title = calendarRef.current.getApi().view.title

    switch (month) {
      case "next":
        calendarRef.current.getApi().next()
        title = calendarRef.current.getApi().view.title

        break

      case "prev":
        calendarRef.current.getApi().prev()
        title = calendarRef.current.getApi().view.title
        break

    }

    setcalendarTitle(title)
  }

  const RandomData = () => {
    /** mokeup dummy data */

    return [...Array(5)].map((v, i) => {

      return ({
        title: faker.lorem.sentence(),
        date: toBuddhistYear(moment(faker.date.past()), "DD/MM/YYYY"),
        auther: faker.name.jobType()
      })
    })

  }


  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const onChangeTab = (event, newValue) => {
    setPositionTab(newValue)
  }

  /** information */
  const ShowInformation = () => (
    <Container_info container>

      <Grid item xs={12} className="Table">
        {/* header */}
        <Grid container className="Header">
          <Grid item xs={8}>
            <p>หัวข้อ</p>
          </Grid>
          <Grid item xs={2}>
            <p>วันที่</p>
          </Grid>
          <Grid item xs={2}>
            <p>โดย</p>
          </Grid>
        </Grid>

        {/* content */}
        {RandomData().map((v, i) => (
          <Grid container className="Content" key={i}>
            <Grid item xs={8}>
              <p>{v.title}</p>
            </Grid>
            <Grid item xs={2}>
              <Box display="flex" justifyContent="center">
                <Box><p>{v.date}</p></Box>
              </Box>

            </Grid>
            <Grid item xs={2}>
              <Box display="flex" justifyContent="center">
                <Box><p>{v.auther}</p></Box>
              </Box>
            </Grid>
            <Grid item xs={12} className="end-line" />
          </Grid>
        ))}

      </Grid>

    </Container_info>
  )

  /* mini calendar */
  const MiniCalendar = () => (
    <FullCalendar
      ref={calendarRef}
      locale="th"
      plugins={[interactionPlugin, timeGridPlugin, dayGridPlugin]}
      initialView='dayGridMonth'
      nowIndicator={true}
      editable={true}
      initialEvents={[
        { title: 'nice event', start: new Date() }
      ]}
      eventColor="#378006"
      customButtons={{
        customNextButton: {
          text: `next`,
          click: () => {
            // console.log(calendarRef.current.getApi())
            calendarRef.current.getApi().next()
          }
        }
      }}

      headerToolbar={{
        left: "prev",
        center:"title",
        right: "next"
      }}
      views={{
        
      }}
    />
  )

  return (
    <>

      <Side_Menu />

      <Main_Container>
        <Grid container>
          <Grid item xs={12}>

            {/* information */}
            <Grid container>
              <Grid item xs={12} md={12} lg={8}>
                <AppBar position="static" style={{ background: "#F1F2F2", color: "black" }}>
                  <Tabs value={PositionTab} onChange={onChangeTab} centered >
                    <Tab label="ข่าวประกาศ" />
                    <Tab label="ข่าวประชาสัมพันธ์" />
                    <Tab label="ข่าวจัดซื้อ/จัดจ้าง" />
                  </Tabs>
                </AppBar>

                <TabPanel value={PositionTab} index={0}>

                  <ShowInformation />

                </TabPanel>
                <TabPanel value={PositionTab} index={1}>Item Two</TabPanel>
                <TabPanel value={PositionTab} index={2}>Item Three</TabPanel>
              </Grid>

              {/* calendar */}
              <Grid item xs={12} md={12} lg={4} className="p-2">
                {/* {calendarTitle}
                <button
                  onClick={() => ChangeMonth("prev")}
                >
                  ย้อน
                </button>
                <button
                  onClick={() => ChangeMonth("next")}
                >
                  ไป
                </button> */}
                <MiniCalendar />
              </Grid>
            </Grid>



          </Grid>
        </Grid>
      </Main_Container>


    </>

  )
}

export default Index_page

const Tab = styled(DefTab)`
:focus {
  outline:none
}
`
const Tabs = styled(DefTabs)`
.MuiTabs-flexContainer {
}
`

/** show information */
const Container_info = styled(Grid)`
font-family: 'Kanit', sans-serif;
.Table {

padding:5px 10px;
border-radius: 10px 10px 0 0
}
.Header {
  background:#d3dbe1;
  padding:10px;
  text-align:center;
  font-weight:bold
}
.Content {
  padding:10px;
  background:white;
}
.end-line {
  border-bottom: 1px solid #eeeeee;
}
`