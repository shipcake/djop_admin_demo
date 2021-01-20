import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { slide as Menu, push as PushMenu } from 'react-burger-menu'
import { Collapse, Drawer } from 'antd'
import MenuIcon from '@material-ui/icons/Menu'
import Hidden from '@material-ui/core/Hidden'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Tooltip from '@material-ui/core/Tooltip'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'

const Side_Menu = () => {
    /** isOpen for mobile */
    const [isOpen, setisOpen] = React.useState(false)

    const CustomIcon = (props) => {
        // console.log(props)
        return (
            <Box display="flex" textAlign="center">
                <Box>
                    <ArrowDropUpIcon />
                </Box>
            </Box>
        )
    }

    return (

        <>
            {/* desktop */}
            <Hidden xsDown>
                <MenuBack />

                <MenuWrap>
                    <Box display="flex" flexDirection="column">

                        {/* logo */}
                        <Box flex="1">
                            <Box display="flex" justifyContent="center">
                                <Box> <img className="ImgLogo" src="/logo.png" /> </Box>
                            </Box>
                        </Box>

                        {/* menu -> home */}
                        <Container_Menu flex="1">

                            <Collapse >
                                <Link href="/"><a>  <div className="static_menu">หน้าหลัก</div></a></Link>

                                <Collapse.Panel header="โพสต์" key="1">
                                    <Link href="/posts/add"><a><p>เพิ่มโพส</p></a></Link>
                                    <Link href="/posts"><a><p>โพสทั้งหมด</p></a></Link>
                                </Collapse.Panel>

                                <Link href="/calendar"><a><div className="static_menu">ปฏิทิน</div></a></Link>
                                <Link href="/vote"><a><div className="static_menu">โหวต</div></a></Link>

                            </Collapse> 
                        </Container_Menu>

                    </Box>

                    <Logon_Container>
                        <Box display="flex">
                            <Box><img className="img-avatar" src="/cat.jpg" /></Box>
                            <Box className="px-1" flexGrow={1}>UserName</Box>
                            <Box>
                                <Tooltip title="ออกจากระบบ" placement="top">
                                    <Logout_Icn />
                                </Tooltip>

                            </Box>
                        </Box>

                    </Logon_Container>

                </MenuWrap>

            </Hidden>
            {/* end desktop */}

            {/* mobile */}
            <Hidden smUp>
                <Grid container >
                    <Grid item xs={12}>
                        <MenuIcon onClick={() => setisOpen(true)} />
                    </Grid>
                </Grid>
            </Hidden>

            <Hidden smUp>
                <Drawer
                    title="เมนู"
                    placement="left"
                    onClose={() => setisOpen(false)}
                    visible={isOpen}
                >

                </Drawer>
            </Hidden>
            {/* end mobile */}
        </>

    )
}
export default Side_Menu




const Container_Menu = styled(Box)`
font-family: 'Pridi';
/* font-size:20px; */
padding:30px 0px 0px 10px;
font-size:min(max(10px, 5vw), 20px);
.ant-collapse  {
    font-size:17px;
    background-color:rgba(229,229,229,0.5);
    border:none;
    color:none;
}
.ant-collapse-item-active {
    background-color:rgba(255,255,255,1);
}
.ant-collapse-arrow {
    top: 17px !important;
}
.static_menu {
    padding:12px 16px 12px 40px;
}
`

const MenuBack = styled.div`
    position: fixed;
    top: 0;
    bottom: 0px;
    z-index: 1;
    width: 200px;
    background-color: #ffd369;
`

const MenuWrap = styled.div`
color:white;
    z-index:2;
    position: fixed;
    width: 200px;
    height:100vh;
    background-color: #ffd369;
.ImgLogo {
    width:100%;
    /* align-items:center; */
    max-width:150px;
}
a {
    color:#424242
}
`

const Logon_Container = styled.div`
font-family: 'Pridi';
color:#464646;
width:100%;
padding:5px;
position:absolute;
bottom:0;
background:rgba(255,255,255,0.5);
.img-avatar {
    border-radius: 50%;
    width:30px;
}
`

const Logout_Icn = styled(ExitToAppIcon)`
color:#808080;
cursor: pointer;
:hover {
    color:#b6b6b6
}
`

