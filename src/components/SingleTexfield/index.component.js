
import React, { Component } from 'react';

import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@material-ui/core';

class TextInput extends Component {

    constructor() {
        super();

        this.state = {
            open: true,
            message: '',
        };
        this.handleClose = this.handleClose.bind(this);
        this.onMessageChange = this.onMessageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
         this.setState({ open: true });
    }
    onMessageChange(event) {
        this.setState({
            message: event.target.value,
        });
    }
    handleClose() {
        this.setState({ open: false, });
    }
    handleSubmit() {

    }
    
    render() {
        return (
            <Dialog open={this.state.open} fullWidth>
                <DialogTitle style={{ backgroundColor: '#79b5e4', color: 'aliceblue' }}>
                    Please input message
                </DialogTitle>
                <DialogContent>
                    <TextField fullWidth onChange={this.onMessageChange} value={this.state.message} />
                </DialogContent>

                <DialogActions>
                    <Button variant="contained" style={{ backgroundColor: '#6475d4', color: 'aliceblue' }}>submit</Button>
                    <Button variant="contained" style={{ backgroundColor: '#e87070', color: 'aliceblue'}} onClick={this.handleClose}>close</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default TextInput;