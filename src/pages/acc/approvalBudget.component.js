
import React, { Component } from 'react';

import { Grid, Card, Button } from '@material-ui/core';
import { DataGrid, } from '@material-ui/data-grid';
import { app_jsonInstance, blob_response } from '../../configurations/instance';
import { reload } from '../../middleware/index';
import ErrorBar from '../../components/errorBar/index.component';
import Preview from '../approval/components/moreDetail.component';
import Loading from '../../components/loading/index.component';
import Success from '../../components/successBar/index.component';

class ApprovalBudget extends Component {
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
        };
        this.openSetroute = this.openSetroute.bind(this);
        this.onSelectionModelChange = this.onSelectionModelChange.bind(this);
        this.check = this.check.bind(this);
        this.reject = this.reject.bind(this);
        this.preview = this.preview.bind(this);
        this.close = this.close.bind(this);
        this.download = this.download.bind(this)
    }

    componentDidMount() {
        this.getData();
    }


    openSetroute() {
        this.setState({ setroute: true })
    }
    async getData() {
        try {
            const response = await app_jsonInstance().get(`/acc/diff`);

            this.setState({
                data: response.data.data,
                all: response.data.data
            });
        } catch (error) {
            console.log(error.stack);

            if (error.response.status === 401) {
                localStorage.clear();
                reload();
            } else if (error.response.status === 409) {
                this.setState({ error: true, message: error.response.data.message })
            }
        }
    }
    reject() {
        if (this.state.dataSelected.length === 0) {
            this.setState({ error: true, message: 'Please select CIP to reject.' })
            setTimeout(() => {
                this.setState({ error: false, })
            }, 3000);
            return;
        }
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

        }
    }
    async check() {
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

        const response = await app_jsonInstance().put(`/acc/approve/diff`, body);
        this.setState({ message: response.data.message, success: true, loading: false, });
        setTimeout(() => {
            // this.setState({ success: false, });
            reload();
        }, 3500);

    }
    onSelectionModelChange(rows) {
        this.setState({
            dataSelected: rows.selectionModel,
        });

    }
    close() {
        this.setState({ preview: false, })
    }
    preview(data) {
        this.setState({ preview: true, rowclick: data.id })
    }
    render() {
        const columns = [
            // { field: 'preview', headerName: 'show', width: 80 },
            { field: 'cipNo', headerName: 'CIP No.', width: 120 },
            { field: 'subCipNo', headerName: 'Sub CIP No.', width: 120 },
            { field: 'vendor', headerName: 'Vendor', width: 130 },
            { field: 'name', headerName: 'Name', width: 270, },
            { field: 'qty', headerName: 'Qty.', width: 80 },
            { field: 'totalThb', headerName: 'Total (THB)', width: 130, },
            // { field: 'cc', headerName: 'CC', width: 80 },
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
        return (
            <>
                {error}{preview}{loading}{success}

                <Grid container spacing={0}>
                    <Grid item xs={9}>
                        <Button variant="contained" style={{ backgroundColor: '#2196f3', color: 'aliceblue' }} onClick={this.download}>Download</Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Card elevation={0} style={{ padding: 'calc(2%)', textAlign: "center", backgroundColor: 'rgb(238 235 243)' }} variant="outlined" >
                            <Button variant="outlined" style={{ marginRight: 'calc(2%)', backgroundColor: '#4caf50', color: 'aliceblue' }} onClick={this.check}>
                                Approve
                            </Button>
                            <Button variant="outlined" style={{ backgroundColor: '#f44336', color: 'aliceblue' }} onClick={this.reject}>
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

export default ApprovalBudget;