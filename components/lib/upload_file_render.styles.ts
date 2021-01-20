import styled from 'styled-components'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import {TS_MDBIcon} from 'lib/typescript/MDBIcon'


export const MDBIcon_img_del = styled(HighlightOffIcon)<TS_MDBIcon>`
color:#c9c9c9;
:hover{
    color:red;
}
`