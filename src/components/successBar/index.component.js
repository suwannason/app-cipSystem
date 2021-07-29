
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';

class SuccessBar extends React.Component {

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
                <MuiAlert variant="filled" severity="success" elevation={6} style={{ backgroundColor: 'rgb(180 255 234)', color: 'rgb(9 7 121)' }}>{this.state.message}</MuiAlert>
            </Snackbar>
        )
    }
}

export default SuccessBar;