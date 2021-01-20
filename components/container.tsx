import React from 'react'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
const Main_Container = (props) => (
    <Container halfcontent={props.content ? true : false}>
        <Box display="flex" justifyContent="center" style={{backgroundColor:"#efeef6"}}>
            <Content_Container>

                <Grid container >
                    <Grid item xs={12} id="test">
                         {props.children}
                    </Grid>
                </Grid>

            </Content_Container>
        </Box>

    </Container>
)
export default Main_Container

const Container = styled.div<{halfcontent:boolean}>`
    max-width:${props => props.halfcontent? "1000px" : ""};
    margin:${props => props.halfcontent? "auto !important" : ""};
    
@media (max-width:600px) {
    margin-left:0px;
}

@media (min-width:600px) {
    margin-left:200px;
}

`
const Content_Container = styled(Box)`
background-color:white;
border-radius: 20px;
padding:30px;
max-width:1000px;
width:100%;
`