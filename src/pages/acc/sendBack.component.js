
import React, { Component } from 'react';

import {
    Dialog, DialogContent,
    DialogActions, DialogTitle,
    Button, TextField, Grid, Select, FormControl, InputLabel
} from '@material-ui/core';

import { app_jsonInstance } from '../../configurations/instance';

import SuccessBar from '../../components/successBar/index.component';

// PROPS CONTEXT

// close=function
// id=[string]
// PROPS CONTEXT
class SendBack extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            selected: 'requester-prepare',
            success: false,
            message: '',
        };
        this.onBackingChange = this.onBackingChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.submitSendback = this.submitSendback.bind(this);
    }
    componentDidMount() {
        this.setState({ open: true });
        console.log(this.props);
    }
    onBackingChange(event) {
        this.setState({ selected: event.target.value })
    }
    async submitSendback() {
        try {
            const body = {
                id: this.props.id,
                commend: document.getElementById('sendBack_description').value,
                toStep: this.state.selected
            };

            // console.log(body);
            const response = await app_jsonInstance().post(`/acc/sendback`, body);
            this.setState({ success: true, message: response.data.message });

            setTimeout(() => {
                this.setState({ success: false });
                this.handleClose();
            }, 3000);
            // console.log(response.data);
        } catch (err) {
            console.log(err.stack);
        }
    }
    handleClose() {

        this.setState({ open: false, });
        setTimeout(() => {
            this.props.close();
        }, 300);
    }

    render() {
        let success;
        if (this.state.success === true) {
            success = <SuccessBar message={this.state.message} />
        }
        return (
            <>
                <Dialog open={this.state.open} fullWidth>
                    {success}
                    <DialogTitle style={{ backgroundColor: '#f55252', color: 'aliceblue' }}>Send back</DialogTitle>
                    <DialogContent>
                        <Grid container spacing>
                            <Grid item xs={5}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel>Send back to</InputLabel>
                                    <Select
                                        native
                                        value={this.state.selected}
                                        label="Send back to"
                                        onChange={this.onBackingChange}
                                        fullWidth
                                    >
                                        <option value="requester-prepare"> Requester </option>
                                        <option value="user-prepare"> User </option>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={5}>
                                <TextField label="description" variant="outlined" id="sendBack_description" />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" style={{ backgroundColor: '#009688', color: 'aliceblue' }} onClick={this.submitSendback}>send back</Button>
                        <Button variant="outlined" style={{ backgroundColor: '#ff5722', color: 'aliceblue' }} onClick={this.handleClose}>close</Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

export default SendBack;