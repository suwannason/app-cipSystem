
import React, { Component } from 'react';

import { Grid, Card, Button } from '@material-ui/core';
import { DataGrid, } from '@material-ui/data-grid';
import { app_jsonInstance, blob_response, form_dataInstance } from '../../../configurations/instance';
import { reload } from '../../../middleware/index';
import ErrorBar from '../../../components/errorBar/index.component';
import Preview from '../components/moreDetail.component';
import Loading from '../../../components/loading/index.component';
import Success from '../../../components/successBar/index.component';
import TextInput from '../../../components/SingleTexfield/index.component';

class Approve extends Component {
    constructor() {
        super();

        this.state = {
            setroute: false,
            loading: false,
            success: false,
            data: [],
            all: [],
            dataSelected: [],
            error: false,
            preview: false,
            message: 'Have some error.',
            rowclick: null,
            headerMessage: '...',
            textInput: false,
        };
        this.openSetroute = this.openSetroute.bind(this);
        this.onSelectionModelChange = this.onSelectionModelChange.bind(this);
        this.check = this.check.bind(this);
        this.reject = this.reject.bind(this);
        this.preview = this.preview.bind(this);
        this.close = this.close.bind(this);
        this.uploadApprove = this.uploadApprove.bind(this);
        this.download = this.download.bind(this);
        this.openTextInput = this.openTextInput.bind(this);
    }

    componentDidMount() {
        this.getData();
    }


    openSetroute() {
        this.setState({ setroute: true })
    }
    async getData() {
        try {
            const response = await app_jsonInstance().get(`/approval/costCenter`);

            this.setState({
                data: response.data.data,
                all: response.data.data,
                headerMessage: response.data.message
            });
        } catch (error) {
            console.log(error.stack);

            if (error.response.status === 401) {
                localStorage.clear();
                reload();
            }
        }
    }
    async reject(text) {
        if (this.state.dataSelected.length === 0) {
            this.setState({ error: true, message: 'Please select CIP to reject.' })
            setTimeout(() => {
                this.setState({ error: false, });
            }, 3000);
            return;
        }
        const body = {
            id: this.state.dataSelected,
            commend: text,
        };
        try {
            this.setState({ textInput: false, });
            const response = await app_jsonInstance().post(`/cip/reject/user`, body);
            this.setState({ success: true, message: response.data.message });
            this.setState({ success: false, });
            this.getData();
        } catch (err) {
            console.log(err.stack);
        }

    }
    openTextInput() {
        if (this.state.dataSelected.length === 0) {
            this.setState({ error: true, message: 'Please select CIP to reject.' });

            setTimeout(() => {
                this.setState({ error: false, })
            }, 3000);
            return;
        }
        this.setState({ textInput: true, })
    }
    async check() {
        try {
            this.setState({ loading: true, message: 'Approving CIP.' });
            if (this.state.dataSelected.length === 0) {
                this.setState({ error: true, message: 'Please select CIP to check.' })
                setTimeout(() => {
                    this.setState({ error: false, })
                }, 3000);
                return;
            }
            const body = {
                id: this.state.dataSelected,
            };

            const response = await app_jsonInstance().put(`/approval/approve/costCenter`, body);
            this.setState({ message: response.data.message, success: true, loading: false, });
            setTimeout(() => {
                this.setState({ success: false, });
                this.getData();
            }, 2000);
        } catch (err) {
            console.log(err.message)
            console.log(err.stack);
        }

    }
    onSelectionModelChange(rows) {
        this.setState({
            dataSelected: rows.selectionModel,
        });

    }
    async download() {
        try {
            const body = {};
            if (this.state.dataSelected.length === 0) {
                const id = [];
                this.state.all.forEach((item) => {
                    id.push(item.id);
                });
                body.id = id;
            } else {
                body.id = this.state.dataSelected;
            }
            const response = await blob_response().patch(`/approval/download`, body);

            if (window.navigator.msSaveBlob) //IE & Edge
            { //msSaveBlob only available for IE & Edge
                console.log("IE & Edge")
                // const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const blob = new File([response.data], "cost-center.xlsx")
                window.navigator.msSaveBlob(blob, `CIP.xlsx`);
            }
            else //Chrome & FF
            {
                console.log("Chrome")
                const url = window.URL.createObjectURL(new File([response.data], "cost-center.xlsx"));
                // const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `CIP.xlsx`);
                document.body.appendChild(link);
                link.click();
            }

        } catch (err) {
            console.log(err.stack);
        }
    }
    uploadClick() {
        document.getElementById('prepare-upload').click();
    }
    async uploadApprove(event) {
        try {
            if (event.target.files.length !== 0) {
                let formdata = new FormData();
                formdata.append('file', event.target.files[0]);
                await form_dataInstance().post(`/approval/costCenter/prepare`, formdata);

                this.setState({ success: true, message: 'Upload success.' })

                setTimeout(() => {
                    this.getData();
                }, 1500);
            } else {
                this.setState({ message: 'No file selected.', error: true, });
            }

            setTimeout(() => {
                this.setState({ error: false, success: false, })
                // reload();
            }, 2000);
        } catch (err) {

        }
    }
    close() {
        this.setState({ preview: false, textInput: false, })
    }
    preview(data) {
        this.setState({ preview: true, rowclick: data.id })
    }
    render() {
        const columns = [
            {
                field: 'cipNo', headerName: 'CIP No.', width: 100, renderCell: (params) => {
                    if (params.row.commend !== null) {
                        return <div style={{ color: 'rgb(243 1 1)' }}>{params.row.cipNo}</div>
                    }
                }
            },
            { field: 'subCipNo', headerName: 'Sub CIP No.', width: 95, renderCell: (params) => {
                if (params.row.commend !== null) {
                    return <div style={{ color: 'rgb(243 1 1)' }}>{params.row.subCipNo}</div>
                }
            } },
            // { field: 'vendor', headerName: 'Vendor', width: 130 },
            { field: 'name', headerName: 'Name', width: 375, renderCell: (params) => {
                if (params.row.commend !== null) {
                    return <div style={{ color: 'rgb(243 1 1)' }}>{params.row.name}</div>
                }
            } },
            { field: 'qty', headerName: 'Qty.', width: 80, renderCell: (params) => {
                if (params.row.commend !== null) {
                    return <div style={{ color: 'rgb(243 1 1)' }}>{params.row.qty}</div>
                }
            } },
            { field: 'totalOfCip', headerName: 'Total (THB)', width: 120, renderCell: (params) => {
                if (params.row.commend !== null) {
                    return <div style={{ color: 'rgb(243 1 1)' }}>{params.row.totalOfCip}</div>
                }
            } },
            { field: 'cc', headerName: 'CC', width: 80, renderCell: (params) => {
                if (params.row.commend !== null) {
                    return <div style={{ color: 'rgb(243 1 1)' }}>{params.row.cc}</div>
                }
            } },
        ];
        let error;
        if (this.state.error === true) {
            error = <ErrorBar message={this.state.message} />
        }
        let preview;
        if (this.state.preview === true) {
            preview = <Preview close={this.close} id={this.state.rowclick} />
        }
        let loading; let success;
        if (this.state.loading === true) {
            loading = <Loading message={this.state.message} />
        }
        if (this.state.success === true) {
            success = <Success message={this.state.message} />
        }
        let textInput;
        if (this.state.textInput === true) {
            textInput = <TextInput close={this.close} submit={this.reject} />
        }
        return (
            <>
                {error}{preview}{loading}{success}{textInput}

                <Grid container spacing={0}>
                    <Grid item xs={12} style={{ marginBottom: 'calc(2%)' }}>
                        {this.state.headerMessage}
                    </Grid>

                    <Grid item xs={9}>
                        <input type="file" id="prepare-upload" hidden onChange={this.uploadApprove} />
                        <Button variant="outlined" id="input" style={{ backgroundColor: '#03a9f4', color: 'aliceblue', marginRight: 'calc(2%)' }} onClick={this.download}> Download </Button>
                        {(this.state.headerMessage.indexOf('prepare') !== -1)
                            ?
                            <Button variant="outlined" id="input" style={{ backgroundColor: '#8bc34a', color: 'aliceblue', }} onClick={this.uploadClick}> {'upload & approve'} </Button> : ''}
                    </Grid>
                    <Grid item xs={3}>
                        <Card elevation={0} style={{ padding: 'calc(2%)', textAlign: "center", backgroundColor: 'rgb(238 235 243)', color: 'aliceblue' }} variant="outlined" >
                            <Button variant="outlined" style={{ marginRight: 'calc(2%)', backgroundColor: 'rgb(128 214 145)', color: 'aliceblue' }} onClick={this.check}>
                                Approve
                            </Button>
                            <Button variant="outlined" style={{ backgroundColor: '#f44336', color: 'aliceblue' }} onClick={this.openTextInput}>
                                reject
                            </Button>
                        </Card>
                    </Grid>
                </Grid>
                <div style={{ height: 600, width: 'calc(100%)', marginTop: 'calc(1%)' }}>
                    <DataGrid
                        rows={this.state.data}
                        columns={columns}
                        pageSize={10}
                        checkboxSelection
                        onRowClick={(row) => this.preview(row)}
                        // onRowSelected={(row) => this.selectionRow(row)}
                        onSelectionModelChange={(row) => this.onSelectionModelChange(row)}
                        disableSelectionOnClick={true}
                    />
                </div>
            </>
        );
    }
}

export default Approve;