
import React, { Component } from 'react';

import { DropzoneArea, } from 'material-ui-dropzone';

import { Grid, Button, Card, FormControl, InputLabel, Select } from '@material-ui/core';

import { form_dataInstance } from '../../configurations/instance';

import ErrorBar from '../../components/errorBar/index.component';
import SuccessBar from '../../components/successBar/index.component';

import { reload } from '../../middleware/index';


class Import extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            error: false,
            success: false,
            message: '',
            element: null,
            formName: '',
            accDisable: false,
        };
        this.save = this.save.bind(this);
        this.onformselectChange = this.onformselectChange.bind(this)
    }

    componentDidMount() {
        let element;
        let formName = ''; let disable = false;
        if (localStorage.getItem('dept') === 'ACC') {
            element = <DropzoneArea
                onChange={this.handleChange.bind(this)}
                filesLimit={1}
                showFileNames={true}
                showAlerts={false}
                dropzoneText="Accouting upload"

            />
            formName = 'Accounting';
            disable = false;
        } else {
            element = <DropzoneArea
                onChange={this.handleChange.bind(this)}
                filesLimit={1}
                showFileNames={true}
                showAlerts={false}
                dropzoneText="User Upload"

            />
            formName = 'User';
            disable = true;
        }
        this.setState({ element, formName, accDisable: disable })
    }
    onformselectChange(event) {
        const tmp = {};
        if (event.target.value === 'User') {
            tmp.element = <DropzoneArea
                onChange={this.handleChange.bind(this)}
                filesLimit={1}
                showFileNames={true}
                showAlerts={false}
                dropzoneText="User Upload"

            />
        } else {
            tmp.element = <DropzoneArea
                onChange={this.handleChange.bind(this)}
                filesLimit={1}
                showFileNames={true}
                showAlerts={false}
                dropzoneText="Accouting upload"

            />
        }
        tmp.formName = event.target.value
        this.setState(tmp)
    }

    handleChange(files) {

        this.setState({
            files,
        });
    }
    async save() {
        try {
            if (this.state.files.length !== 0) {
                let formdata = new FormData();
                formdata.append('type', this.state.formName);
                formdata.append('file', this.state.files[0]);
                await form_dataInstance().post(`/cip/upload`, formdata);

                this.setState({ success: true, message: 'Upload success.' })
            } else {
                this.setState({ message: 'No file selected.', error: true, });
            }

            setTimeout(() => {
                this.setState({ error: false, success: false, })
                reload();
            }, 2000);
        } catch (error) {
            if (error.response) {
                this.setState({ error: true, message: (error.response.data.message) ? error.response.data.message : 'Some record duplicated please remove from file before upload.' })
            }
            setTimeout(() => {
                this.setState({ error: false, })
            }, 5000);
        }
    }
    render() {

        let error; let success;
        if (this.state.error === true) {
            error = <ErrorBar message={this.state.message} />
        }
        if (this.state.success === true) {
            success = <SuccessBar message={this.state.message} />
        }
        return (
            <Grid container spacing={0}>
                {error}{success}
                <Grid item xs={2} style={{ marginTop: 'calc(10%)' }}>
                    <FormControl variant="filled">
                        <InputLabel htmlFor="form-input">Input form</InputLabel>
                        <Select
                            onChange={this.onformselectChange}
                            value={this.state.formName}
                            native
                            style={{ backgroundColor: 'white', boxShadow: '1px 1px 2px 1px #000000', borderRadius: '5px' }}
                            inputProps={{
                                name: 'form',
                                id: 'form-input',
                            }}
                        >
                            <option value={'Accounting'} disabled={this.state.accDisable}>Accounting</option>
                            <option value={'User'}>Requester</option>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={10}>
                    {this.state.element}
                </Grid>

                <Grid container>
                    <Grid item xs={2}>

                    </Grid>
                    <Grid item xs={10}>
                        <Card style={{ flexGrow: 1, padding: '10px' }} elevation={0}>
                            <center>
                                <Button
                                    variant="contained"
                                    style={{ marginRight: 'calc(2%)', backgroundColor: '#009688', color: 'aliceblue' }}
                                    onClick={this.save}>Upload</Button>

                            </center>

                        </Card>
                    </Grid>
                </Grid>

            </Grid >
        )
    }
}

export default Import;