
import React, { Component } from 'react';

import { DropzoneArea, } from 'material-ui-dropzone';

import { Grid, Button, Card } from '@material-ui/core';

import { form_dataInstance } from '../../configurations/instance';

import ErrorBar from '../../components/errorBar/index.component';


class Import extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            error: false,
            message: '',
        };
        this.save = this.save.bind(this);
    }
    handleChange(files) {

        this.setState({
            files,
        });
    }
    save() {

        try {
            if (this.state.files.length !== 0) {
                let formdata = new FormData();
                formdata.padding('files', this.state.files);
                form_dataInstance().post(``, formdata)
            } else {
                this.setState({ message: 'No file selected.', error: true, })
            }

            setTimeout(() => {
                this.setState({ error: false, })
            }, 2000);
        } catch (error) {
            console.log(error.stack);
        }
    }
    render() {

        let error;
        if (this.state.error === true) {

            error = <ErrorBar message={this.state.message} />
        }
        return (
            <Grid container spacing={0}>
                {error}
                <Grid item xs={12} style={{}}>
                    <DropzoneArea
                        onChange={this.handleChange.bind(this)}
                        filesLimit={3}
                        showFileNames={true}

                    />
                </Grid>
                <Card style={{ flexGrow: 1, padding: '10px' }} elevation={0}>
                    <center>
                        <Button
                        variant="outlined"
                        style={{ marginRight: 'calc(2%)', backgroundColor: '#7a57ce', color: 'aliceblue' }}
                        onClick={this.save}>Upload</Button>
                      
                    </center>

                </Card>
            </Grid >
        )
    }
}

export default Import;