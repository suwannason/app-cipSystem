
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

class ErrorBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            message: 'Action on processing...'
        }
    }
    componentDidMount() {
        if (this.props.message) {
            this.setState({ message: this.props.message })
        }
        this.setState({ open: true, })
    }
    componentWillUnmount() {
        this.setState({ open: false, })
    }
    render() {
        return (
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                open={this.state.open}
                // onClose={this.handleClose}
            >
                <MuiAlert variant="standard"
                    icon={<CircularProgress style={{ width: '20px', height: '20px', color: 'rgb(228 113 188)' }} />}
                    elevation={6} style={{ backgroundColor: 'rgb(53 27 84)', color: 'rgb(120 222 208)' }}
                >{this.state.message}
                </MuiAlert>
            </Snackbar>
        )
    }
}

export default ErrorBar;