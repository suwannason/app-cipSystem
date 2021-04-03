
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';

class ErrorBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: true,
            message: props.message
        }
    }
    handleClose() {

    }
    render() {
        return (
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                open={this.state.open}
                onClose={this.handleClose}
                TransitionComponent={(props) => <><Slide {...props} direction="left" /></>}
            >
                <MuiAlert variant="filled" severity="error" elevation={6} style={{ backgroundColor: 'rgb(220 42 140)', color: 'rgb(2 21 49)' }}>{this.state.message}</MuiAlert>
            </Snackbar>
        )
    }
}

export default ErrorBar;