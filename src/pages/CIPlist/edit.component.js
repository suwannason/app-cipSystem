
import React, { Component } from 'react';

import {
    Dialog, DialogActions,
    DialogContent, DialogTitle, Button, Slide
} from '@material-ui/core';

import AccountEdit from './components/accoutEdit.component';
import UserEdit from './components/userEdit.component';
import { none_headersInstance, app_jsonInstance } from '../../configurations/instance';

import SuccessBar from '../../components/successBar/index.component';
import ErrorBar from '../../components/errorBar/index.component';

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
            userDept: '',
            error: '',
        };
        this.verifyUser = this.verifyUser.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.editCipUpdate = this.editCipUpdate.bind(this);
    }
    async componentDidMount() {
        this.setState({
            open: true,
            slid: React.forwardRef((props, ref) => {
                return <Slide direction="up" ref={ref} {...props} />
            }),
        });
        await this.verifyUser();
    }
    async verifyUser() {
        try {
            const response = await none_headersInstance().get(`/user/verify/permission`);

            const tmp = {};
            this.setState({ userDept: response.data.data.dept.toLowerCase() })
            if (response.data.data.dept.toLowerCase() === 'acc') {
                tmp.element = <AccountEdit id={this.props.id} submit={this.handleSave} readonly={false} />
            } else {
                tmp.element = <UserEdit id={this.props.id} submit={this.editCipUpdate} readonly={false} />
            }
            await this.setState(tmp)
        } catch (err) {
            console.log(err.stack);
        }
    }
    async editCipUpdate(body) {
        try {
            const response = await app_jsonInstance().put(`/cipUpdate`, body);

            this.setState({ success: true, message: response.data.message });
            setTimeout(() => {
                this.setState({ success: false, })
                this.handleClose();
            }, 3000);

        } catch (err) {
            console.log(err.stack)
        }
    }

    async handleSave(body) {
        try {
            this.setState({ element: 'Loading.....' });
            if (this.state.closeAction !== true) {
                if (body.cipNo) {

                    const response = await app_jsonInstance().put(`/cip`, body);

                    this.setState({ success: true, message: response.data.message });
                    setTimeout(() => {
                        this.setState({ success: false, })
                        this.handleClose();
                    }, 3000);
                } else {
                    try {
                        await app_jsonInstance().put(`/cipUpdate`, body);

                    } catch (err) {
                        if (err.response.status === 400) {
                            this.setState({ error: true, message: err.response.data.message });

                            setTimeout(() => {
                                this.setState({ error: false, });

                            }, 3000);
                        }
                    }
                }
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
        let error;

        if (this.state.error === true) {
            error = <ErrorBar message={this.state.message} />
        }
        return (
            <Dialog open={this.state.open} fullScreen TransitionComponent={this.state.slid}>
                {success}{error}
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
