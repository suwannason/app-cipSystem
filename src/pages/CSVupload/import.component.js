
import React, { Component } from 'react';

import { DropzoneArea, } from 'material-ui-dropzone';

import { Grid, Button, Card } from '@material-ui/core';

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
        };
        this.save = this.save.bind(this);
    }

    componentDidMount() {

        let element;

        if (localStorage.getItem('dept') === 'ACC') {
            element = <DropzoneArea
                onChange={this.handleChange.bind(this)}
                filesLimit={1}
                showFileNames={true}
                showAlerts={false}
                dropzoneText="Accouting upload"

            />
        } else {
            element = <DropzoneArea
                onChange={this.handleChange.bind(this)}
                filesLimit={1}
                showFileNames={true}
                showAlerts={false}
                dropzoneText="User Upload"

            />
        }
        this.setState({ element })
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
                formdata.append('file', this.state.files[0]);
                await form_dataInstance().post(`/cip/upload`, formdata);

                this.setState({ success: true, message: 'Upload success.'})
            } else {
                this.setState({ message: 'No file selected.', error: true, });
            }

            setTimeout(() => {
                this.setState({ error: false, success: false, })
                reload();
            }, 2000);
        } catch (error) {
            if (error.response) {
                this.setState({ error: true, message: error.response.data.message })
            }
            setTimeout(() => {
                this.setState({ error: false,})
            }, 3000);
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
                <Grid item xs={12} style={{}}>
                    {this.state.element}
                </Grid>
                <Card style={{ flexGrow: 1, padding: '10px' }} elevation={0}>
                    <center>
                        <Button
                            variant="outlined"
                            style={{ marginRight: 'calc(2%)', backgroundColor: '#03a9f4', color: 'aliceblue' }}
                            onClick={this.save}>Upload</Button>

                    </center>

                </Card>
            </Grid >
        )
    }
}

export default Import;