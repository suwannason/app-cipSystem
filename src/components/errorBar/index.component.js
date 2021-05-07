
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
                anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                open={this.state.open}
                onClose={this.handleClose}
                TransitionComponent={(props) => <><Slide {...props} direction="left" /></>}
            >
                <MuiAlert variant="filled" severity="error" elevation={6} style={{ backgroundColor: '#f50057', color: '#eff2f7' }}>{this.state.message}</MuiAlert>
            </Snackbar>
        )
    }
}

export default ErrorBar;