import { Select } from 'antd'
import { withStyles } from '@material-ui/core/styles'

const CssSelect = withStyles({
    root: {
          width:'100%',
        
    }
})(Select)

const MofifiedSelect = (props) => (
    <CssSelect {...props}>
        {props.children}
    </CssSelect>
)
export default MofifiedSelect