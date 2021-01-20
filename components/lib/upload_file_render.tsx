import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import {MDBIcon_img_del} from './upload_file_render.styles'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import prettyBytes from 'pretty-bytes'

const Upload_File_Render = ({ data, onDeleteInputFile }) => {

    const FileType = (loopdata) => {
        switch (loopdata.type) {
            case "application/pdf":
                return <img src="/pdf.svg" width="100px" />
            case "application/x-zip-compressed":
                return <img src="/zip.svg" width="100px" />
            default:
                return <img src="/file.svg" width="100px" />

        }
    }
    console.log(data)
    return (
        <TransitionGroup>
            {data.map(file => (
                <CSSTransition
                    key={file.name}
                    timeout={100}
                    classNames="item"
                >
                    <div className="UploadthumbContainerInput">
                        <a title={file.name}>
                            <Box display="block" style={{ maxWidth: "100px" }}>
                                <Box>
                                    {FileType(file)}
                                </Box>
                                <Box style={{ textOverflow: "ellipsis", maxWidth: "100px", height: "50px", overflow: "hidden" }}>{file.name}</Box>
                                <Box>{prettyBytes(file.size)}</Box>
                            </Box>
                            <div className="DelIcon"><MDBIcon_img_del far icon="times-circle" size="2x" onClick={() => onDeleteInputFile({ name: file.name })} /></div>
                        </a>
                    </div>
                </CSSTransition>
            ))}
        </TransitionGroup>
    )
}
export default Upload_File_Render

