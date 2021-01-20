import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import styled from 'styled-components'
import faker from 'faker'
import { Input, Row, Col } from 'antd'
import Typography from "@material-ui/core/Typography"
import Side_Menu from 'components/side_menu'
import Main_Container from 'components/container'
import TextField from 'components/form/textfield'
import SelectComponent from 'components/form/select'
import { Select } from 'antd'
const Option = Select.Option
import { Editor } from '@tinymce/tinymce-react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Upload } from 'components/form/uploads'
import { useDropzone } from 'react-dropzone'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { Video } from 'video-metadata-thumbnails'
import CheckIcon from '@material-ui/icons/Check'
import find from 'lodash/find'
import filter from 'lodash/filter'
import findIndex from 'lodash/findIndex'
import cloneDeep from 'lodash/cloneDeep'
import Upload_File_Render from 'components/lib/upload_file_render'
import Button from '@material-ui/core/Button'
import {TS_MDBIcon} from 'lib/typescript/MDBIcon'


const Posts_Add_Page = () => {
    //upload imgaes
    const [filesImg, setfilesImg] = React.useState([])
    //upload videos
    const [filesVideo, setfilesVideo] = React.useState([])
    //upload files
    const [filesArchive, setfilesArchive] = React.useState([])

    const CreateVideoThumbnail = async (Data) => {
        let FileVdo = cloneDeep(Data)

        if (FileVdo.length) {
            const Fx = () => {

                const Fxmap = FileVdo.map(async (file, i) => {

                    const video = new Video(file)
                    const Thumbnails = await video.getThumbnails({
                        start: 0, quality: 0.6, interval: 10
                    })

                    const CreateThumbnailURL = Thumbnails.map(v => {
                        return { preview: URL.createObjectURL(v.blob) }
                    })

                    return Object.assign(file, {
                        preview: URL.createObjectURL(file),
                        thumbnail: CreateThumbnailURL,
                        cover: CreateThumbnailURL[0].preview
                    })

                })

                return Promise.all(Fxmap)
            }
            // console.log(await test())
            setfilesVideo(await Fx())
        }

    }

    const ChangeThumbnailVideo = (blob, Fileposition, position) => {
        let FileVdo: [any] = cloneDeep(filesVideo)

        const Test = FileVdo.map((file, i) => {
            if (i == Fileposition) {
                return Object.assign(file, {
                    cover: blob
                })
            }
            else return file

        })

        setfilesVideo(Test)

    }

    const onDropImg = React.useCallback(
        (acceptedFiles) => {
            let Val: any[] = []

            acceptedFiles.map(file => {
                const Findduplicate = find(filesImg, { 'name': file.name }) /* check dulplicate file name */

                if (!Findduplicate) {
                    /* if not duplicate file.name create blob URL */
                    Val.push(Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    }))
                }
            }
            )

            setfilesImg([...filesImg, ...Val])
        },
        [filesImg]
    )

    const onDropVideo = React.useCallback(
        async (acceptedFiles) => {

            let Val: any[] = []

            acceptedFiles.map(file => {
                try {
                    const Findduplicate = find(filesVideo, { 'name': file.name }) /* check dulplicate file name */

                    if (!Findduplicate) {
                        /* if not duplicate file.name create blob URL */
                        Val.push(Object.assign(file, {
                            preview: URL.createObjectURL(file),

                        }))

                    }

                } catch (err) {
                    console.log(err)
                }

            })

            setfilesVideo([...filesVideo, ...Val])

            CreateVideoThumbnail([...filesVideo, ...Val])
        },
        [filesVideo]
    )

    const onDeleteInputImage = (props) => {
        /* delete selected upload image (from input images) */
        let NewVal = filesImg /* copy state */
        const FindIndex = findIndex(filesImg, { 'name': props.name }) /* find position */
        NewVal.splice(FindIndex, 1) /* remove by position */
        setfilesImg([...NewVal]) /* set newel */
    }

    const onDeleteInputVideo = (props) => {
        /* delete selected upload image (from input images) */
        let NewVal = cloneDeep(filesVideo) /* copy state */
        const FindIndex = findIndex(filesVideo, { 'name': props.name }) /* find position */
        NewVal.splice(FindIndex, 1) /* remove by position */
        // console.log(NewVal)
        setfilesVideo([...NewVal]) /* set newel */
    }

    const onDeleteInputFile = (props) => {
        /* delete selected upload files (from input files) */
        let NewVal = cloneDeep(filesArchive) /* copy state */
        const FindIndex = findIndex(NewVal, { 'name': props.name }) /* find position */
        NewVal.splice(FindIndex, 1) /* remove by position */
        setfilesArchive([...NewVal]) /* set newel */
    }

    const onDropArchive = React.useCallback(
        (acceptedFiles) => {

            let Val: any[] = []

            acceptedFiles.map(file => {

                const Findduplicate = find(filesArchive, { 'name': file.name }) /* check dulplicate file name */

                if (!Findduplicate) {
                    /* if not duplicate file.name create blob URL */
                    Val.push(Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    }))
                }

            })

            setfilesArchive([...filesArchive, ...Val])

        },
        [filesArchive]
    )

    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({ onDrop: onDropImg, accept: 'image/*' }) //more images
    const { getRootProps: getRootPropsVideo, getInputProps: getInputPropsVideo, isDragActive: isDragActiveVideo, isDragAccept: isDragAcceptVideo, isDragReject: isDragRejectVideo } = useDropzone({ onDrop: onDropVideo, accept: 'video/*' }) //more video
    const { getRootProps: getRootPropsArchive, getInputProps: getInputPropsArchive, isDragActive: isDragActiveArchive, isDragAccept: isDragAcceptArchive, isDragReject: isDragRejectArchive } = useDropzone({ onDrop: onDropArchive }) //more file

    return <>
        <Side_Menu />
        <Main_Container>
            <Grid container>

                <Grid item xs={12} className="py-2">
                    <h1>เพิ่มโพสต์</h1>
                </Grid>

                <Grid item xs={12} className="py-2">
                    <TextField variant="outlined" label="หัวข้อ" />
                </Grid>

                <Grid item xs={12} className="py-2">
                    <SelectComponent placeholder="หมวดหมู่" style={{ width: "100%" }} >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                    </SelectComponent>
                </Grid>

                <Grid item xs={12} className="py-2">
                    <Editor />
                </Grid>

                {/* image upload and preview section */}
                <Grid item xs={12} className="py-2">
                    <Grid container>
                        <Grid item xs={12}>
                            <TransitionGroup>
                                {filesImg.map(file => (
                                    <CSSTransition
                                        key={file.name}
                                        timeout={100}
                                        classNames="item"
                                    >

                                        <div className="UploadthumbContainerInput">
                                            <img src={file.preview} className="UploadimgInput" style={{maxWidth:"150px"}} />
                                            <div className="DelIcon"><MDBIcon_img_del far icon="times-circle" size="2x" onClick={() => onDeleteInputImage({ name: file.name })} /></div>
                                        </div>
                                    </CSSTransition>
                                ))}
                            </TransitionGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <Upload getRootProps={getRootProps} getInputProps={getInputProps} isDragActive={isDragActive} isDragAccept={isDragAccept} isDragReject={isDragReject} multiple={true} object="image" />
                        </Grid>
                    </Grid>
                </Grid>
                {/* end image upload and preview section */}

                {/* video upload and preview section */}
                <Grid item xs={12} className="py-2">
                    <Grid container>
                        <Grid item xs={12}>
                            <TransitionGroup>
                                {filesVideo.length && filesVideo.map((file, filei) => (
                                    <CSSTransition
                                        key={file.name}
                                        timeout={100}
                                        classNames="item"
                                    >
                                        <Grid container className="py-2">
                                            <Grid item md={4} xs={12}>

                                                <div className="UploadthumbContainerInput" >
                                                    <video poster={file.cover} style={{ width: "100%" }} controls>
                                                        <source src={file.preview} />
                                                    </video>
                                                    <div className="DelIcon" ><MDBIcon_img_del far icon="times-circle" size="2x" onClick={() => onDeleteInputVideo({ name: file.name })} /></div>
                                                </div>

                                            </Grid>

                                            {/* Thumbnail Container */}
                                            <Grid item md={8} xs={12}>
                                                <Grid container>
                                                    <Box display="flex" overflow="auto" >
                                                        {
                                                            file.thumbnail && file.thumbnail.map((v, i) => (
                                                                <ImgContainer isActive={v.preview == file.cover} onClick={() => ChangeThumbnailVideo(v.preview, filei, i)}>
                                                                    <div className="box1">
                                                                        <div className="btn1">

                                                                        </div>

                                                                        <div id="img_container">
                                                                            <div id="img_img">
                                                                                <div>
                                                                                    <img src={v.preview} style={{ width: "100%" }} />
                                                                                </div>
                                                                                <div className="btn3">
                                                                                    <button className="btn4">  <img src="/check.svg" /></button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </ImgContainer>
                                                            ))
                                                        }
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                            {/* end Thumbnail Container */}

                                        </Grid>
                                    </CSSTransition>
                                ))}
                            </TransitionGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <Upload getRootProps={getRootPropsVideo} getInputProps={getInputPropsVideo} isDragActive={isDragActiveVideo} isDragAccept={isDragAcceptVideo} isDragReject={isDragRejectVideo} multiple={true} object="video" />
                        </Grid>
                    </Grid>
                </Grid>
                {/* end video upload and preview section */}

                {/* file archive upload preview */}
                <Grid item xs={12} className="py-2">
                    <Grid container>
                        <Grid item xs={12}>
                            <Upload_File_Render data={filesArchive} onDeleteInputFile={onDeleteInputFile} />
                        </Grid>
                        <Grid item xs={12}>
                            <Upload getRootProps={getRootPropsArchive} getInputProps={getInputPropsArchive} isDragActive={isDragActiveArchive} isDragAccept={isDragAcceptArchive} isDragReject={isDragRejectArchive} multiple={true} object="file" />
                        </Grid>
                    </Grid>
                </Grid>
                {/* end file archive upload preview */}

                <Grid item xs={12}>
                    <div className="d-flex flex-row-reverse">
                        <button className="button-submit">บันทึก</button>
                    </div>
                    
                </Grid>

            </Grid>
        </Main_Container>
    </>
}
export default Posts_Add_Page

const MDBIcon_img_del = styled(HighlightOffIcon)<TS_MDBIcon>`
color:#c9c9c9;
:hover{
    color:red;
}
`

/** image lists */
const ImgContainer = styled(Grid) <{ isActive: Boolean }>`
padding:0 10px;
.box1 {
    border: 1px solid #cccccc;
    background: white;
    border-radius: 10px;
    width:100%;
    position: relative;
    overflow:hidden;
    transition:all 0.4s;
    cursor: pointer;
}
.btn3 {
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    background:none;
    border:none;
    cursor: pointer;
}
.btn4{
    background:none;
    border:none;
    color:black;
    transition:${props => props.isActive ? '0.3' : '0.3'};
    opacity:${props => props.isActive ? '1' : '0'};
    cursor: pointer;
    :focus{
        outline:none;
    }
    width:150px;
}
.box1:hover {
    box-shadow: 5px 10px 18px #e6e6e6;
    transition: all 0.2s;
}
.btn2 {
    padding: 3px 10px;
    border: 1px solid black;
    border-radius: 50%;
    cursor: pointer;
}
.btn2:focus {
    outline: none;
}
.btn2_container {
    opacity: 0.5;
    transition:all  0.2s;
}
.btn2_container:hover {
    opacity: 1;
    transition:all 0.2s;
}
.btn1 {
    position: absolute;
    top: 0px;
    right: 0px;
    transition:all 0.2s;
}
.btn1_container {
    display:flex;
}

#desc_img {
    width:100%;
    font-size:12px;
    padding:5px;
    background:rgba(0,0,0,0.5);
    color:white;
    position:absolute;
    bottom:0px
}
#img_container {
    display: flex;
    justify-content: center; 
    height:100%;
    padding:10px;
 #img_img {
    width:300px;
    height:150px;
    /* width:100%; */
    /* max-height:150px; */
    display:flex;
    align-items:center;
    justify-content: center; 
    img {
        opacity:${props => props.isActive ? '0.5' : '1'};
    }
 }
}
#path_img {
    position:absolute;
    top:0;
    left:0;
    background:rgba(0,0,0,0.5);
    padding:5px;
    color:white;
}
#preview_ico {
opacity:0.5;
cursor:pointer;
}
#preview_ico:hover {
opacity:1;
}
`