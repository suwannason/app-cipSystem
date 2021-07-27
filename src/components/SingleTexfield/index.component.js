
import React, { Component } from 'react';

import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@material-ui/core';

// PROPS CONTEXT

// close=function
// submit=function(text)

// PROPS CONTEXT

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

        setTimeout(() => {
            this.props.close();
        }, 100);
    }
    handleSubmit() {
        this.setState({ open: false, });
        this.props.submit(this.state.message);
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
                    <Button variant="contained" style={{ backgroundColor: '#6475d4', color: 'aliceblue' }} onClick={this.handleSubmit}>submit</Button>
                    <Button variant="contained" style={{ backgroundColor: '#e87070', color: 'aliceblue'}} onClick={this.handleClose}>close</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default TextInput;