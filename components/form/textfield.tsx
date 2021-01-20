import React from 'react'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'

const CssTextField = withStyles({
    root: {  
          width:'100%',
        '& label.Mui-focused': {
            // color: 'green',
            color:'black'
        },
        
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#f3e5e5',
                // backgroundColor:"#cacac8",
            },
            '&:hover fieldset': {
                borderColor: '#faa52d',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#d96627',
            },
        },
    }
})(TextField)

const ModifiedTextField = (props) => (
    <CssTextField {...props} />
)

export default ModifiedTextField