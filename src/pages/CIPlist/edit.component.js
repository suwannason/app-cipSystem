
import React, { Component } from 'react';

import {
    Dialog, DialogActions,
    DialogContent, DialogTitle, Button, Slide
} from '@material-ui/core';

import AccountEdit from './components/accoutEdit.component';
import UserEdit from './components/userEdit.component';
import { none_headersInstance, app_jsonInstance } from '../../configurations/instance';

import SuccessBar from '../../components/successBar/index.component';

// PROPS CONTEXT

// close=function
// id=string

// PROPS CONTEXT



export default class EditCIP extends Component {
    constructor() {
        super();

        this.state = {
            open: true,
            slid: null,
            closeAction: false,
            element: '.....',
            message: '',
            success: false,
        };
        this.verifyUser = this.verifyUser.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this)
    }
    componentDidMount() {
        console.log(this.props);
        this.setState({
            open: true,
            slid: React.forwardRef((props, ref) => {
                return <Slide direction="up" ref={ref} {...props} />
            }),
        });
        this.verifyUser();
    }
    async verifyUser() {
        try {
            const response = await none_headersInstance().get(`/user/verify/permission`);

            const tmp = {};
            if (response.data.data.dept.toLowerCase() === 'acc') {
                tmp.element = <AccountEdit id={this.props.id} submit={this.handleSave} />
            } else {
                tmp.element = <UserEdit />
            }
            await this.setState(tmp)
        } catch (err) {
            console.log(err.stack);
        }
    }

    async handleSave(body) {
        try {
            this.setState({ element: 'Loading.....' })
            if (this.state.closeAction !== true) {
                const response = await app_jsonInstance().put(`/cip`, body);

                this.setState({ success: true, message: response.data.message });
                setTimeout(() => {
                    this.setState({ success: false, })
                    this.handleClose();
                }, 3000);

            } else {
                this.handleClose();
            }
        } catch (err) {
            console.log(err.stack)
        }
    }

    handleClose() {

        this.setState({ open: false, closeAction: true, })
        setTimeout(() => {
            this.props.close();
        }, 200);

    }

    render() {
        let success;

        if (this.state.success === true) {
            success = <SuccessBar message={this.state.message} />
        }
        return (
            <Dialog open={this.state.open} fullScreen TransitionComponent={this.state.slid}>
                {success}
                <DialogTitle style={{ backgroundColor: '#03a9f4', color: 'aliceblue', boxShadow: '1px 0px 11px 3px #0a658e' }}>Edit CIP</DialogTitle>
                <DialogContent>
                    {this.state.element}
                </DialogContent>
                <DialogActions>
                    <Button style={{ backgroundColor: '#4caf50', color: 'aliceblue', marginRight: 'calc(1%)' }} onClick={this.handleSave}>save</Button>
                    <Button onClick={this.handleClose} style={{ backgroundColor: '#e91e63', color: 'aliceblue' }}>close</Button>
                </DialogActions>
            </Dialog>
        )
    }
}
