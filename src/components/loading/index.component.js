
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

class Loading extends React.Component {

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
                anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                open={this.state.open}
                // onClose={this.handleClose}
            >
                <MuiAlert variant="standard"
                    icon={<CircularProgress style={{ width: '20px', height: '20px', color: 'rgb(13 60 97)' }} />}
                    elevation={6} style={{ backgroundColor: '#ffc107', color: '#1d2429' }}
                >{this.state.message}
                </MuiAlert>
            </Snackbar>
        )
    }
}

export default Loading;