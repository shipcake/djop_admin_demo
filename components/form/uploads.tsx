import styled from 'styled-components'
import { DropzoneRootProps, DropzoneInputProps } from 'react-dropzone'

const getColor = (props) => {
    if (props.isDragAccept) {
        return '#00e676';
    }
    if (props.isDragReject) {
        return '#ff1744';
    }
    if (props.isDragActive) {
        return '#2196f3';
    }
    return '#eeeeee';
}

const Dropzone_div = styled.div`
flex: 1;
display: flex;
flex-direction: column;
align-items: center;
padding: 50px;
border-width: 2px;
border-radius: 2px;
border-color: ${props => getColor(props)};
border-style: dashed;
background-color: #e0f2f1;
color: #4db6ac;
outline: none;
transition: border .24s ease-in-out;
cursor: pointer;
`

interface Props {
    getRootProps(props?: DropzoneRootProps): DropzoneRootProps
    getInputProps(props?: DropzoneInputProps): DropzoneInputProps
    isDragActive: boolean
    isDragAccept: boolean
    isDragReject: boolean
    multiple?: boolean
    object: string
    name?: string
}

const RenderObject = ({ object, isDragActive }) => {
    switch (object) {
        case "image":
            return (
                <ImgContainer>
                    <img src="/upload_icon.png" draggable={false} />
                    {isDragActive ?
                        <p>วางรูปที่นี่</p>
                        :
                        <p>คลิ๊กเลือกหรือวางรูปลงที่นี่</p>}
                </ImgContainer>
            )
        case "video":
            return (
                <ImgContainer>
                    <img src="/upload_icon_video.png" draggable={false} />
                    {isDragActive ?
                        <p>วางวีดีโอที่นี่</p>
                        :
                        <p>คลิ๊กเลือกหรือวางวีดีโอที่นี่</p>
                    }
                </ImgContainer>
            )
        case "file":
            return (
                <ImgContainer>
                    <img src="/upload_icon_file.png" draggable={false} />
                    {isDragActive ?
                        <p>วางไฟล์ที่นี่</p>
                        :
                        <p>คลิ๊กเลือกหรือไฟล์ที่นี่</p>}
                </ImgContainer>
            )
        default:
            return <></>
    }
}

export const Upload = (props: Props) =>
(
    <Dropzone_div {...props.getRootProps({ isDragActive: props.isDragActive, isDragAccept: props.isDragAccept, isDragReject: props.isDragReject })}>
        <input {...props.getInputProps()} multiple={props.multiple} />
        <RenderObject object={props.object} isDragActive={props.isDragActive} />
    </Dropzone_div >
)


const ImgContainer = styled.div`
text-align:center;
user-select:none;
img {
    
    max-width:150px;
}
`