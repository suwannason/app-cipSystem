
import React, { Component } from 'react';

import { Grid, Card, Button } from '@material-ui/core';
import PreviewIcon from '@material-ui/icons/Pageview'
import { DataGrid, } from '@material-ui/data-grid';
import { app_jsonInstance, form_dataInstance, blob_response } from '../../configurations/instance';
import { reload } from '../../middleware/index';
import ErrorBar from '../../components/errorBar/index.component';
import Preview from '../approval/components/moreDetail.component';
import Loading from '../../components/loading/index.component';
import Success from '../../components/successBar/index.component';

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
            boiConfig: [],
        };
        this.openSetroute = this.openSetroute.bind(this);
        this.onSelectionModelChange = this.onSelectionModelChange.bind(this);
        this.check = this.check.bind(this);
        this.reject = this.reject.bind(this);
        this.preview = this.preview.bind(this);
        this.close = this.close.bind(this);
        this.boiSelectionChange = this.boiSelectionChange.bind(this);
        this.download = this.download.bind(this);
        this.sendApproveUpload = this.sendApproveUpload.bind(this)
    }

    componentDidMount() {
        this.getData();
    }


    openSetroute() {
        this.setState({ setroute: true })
    }
    async getData() {
        try {
            const response = await app_jsonInstance().get(`/itc/waiting`);

            this.setState({
                data: response.data.data,
                all: response.data.data
            });
        } catch (error) {
            console.log(error.stack);

            if (error.response.status === 401) {
                localStorage.clear();
                reload();
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
            const id = [];
            this.state.all.forEach((item) => {
                id.push(item.id);
            });
            body.id = id;
            const response = await blob_response().patch(`/approval/download`, body);

            if (window.navigator.msSaveBlob) //IE & Edge
            { //msSaveBlob only available for IE & Edge
                console.log("IE & Edge")
                // const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const blob = new File([response.data], "itc-confirm.xlsx")
                window.navigator.msSaveBlob(blob, `itc-confirm.xlsx`);
            }
            else //Chrome & FF
            {
                console.log("Chrome")
                const url = window.URL.createObjectURL(new File([response.data], "itc-confirm.xlsx"));
                // const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `itc-confirm.xlsx`);
                document.body.appendChild(link);
                link.click();
            }

        } catch (err) {
            console.log(err.stack);
        }
    }
    async check() {
        this.setState({ loading: true, message: 'Approving CIP.' });
        if (this.state.boiConfig.length === 0) {
            this.setState({ error: true, message: 'Please select CIP to check.' })
            setTimeout(() => {
                this.setState({ error: false, })
            }, 3000);
            return;
        }
        const body = {
            confirm: this.state.boiConfig,
        };
        try {
            const response = await app_jsonInstance().put(`/itc/confirm`, body);
            this.setState({ message: response.data.message, success: true, loading: false, });
            setTimeout(() => {
                this.setState({ success: false, });
                this.getData();
            }, 2000);
        } catch (err) {
            if (err.response.status === 400) {
                this.setState({ error: true, message: err.response.data.message, loading: false, })
                setTimeout(() => {
                    this.setState({ error: false, })
                }, 3000);
            }
        }

    }
    onSelectionModelChange(rows) {
        this.setState({
            dataSelected: rows.selectionModel,
        });

    }
    uploadClick() {
        document.getElementById('itc_upload').click();
    }
    async sendApproveUpload() {
        try {
            let body = new FormData();
            let element = document.querySelector('#itc_upload');

            body.append('file', element.files[0]);
            const response = await form_dataInstance().post(`/itc/upload`, body);
            
            this.setState({ success: true, message: response.data.message });

            setTimeout(() => {
                this.setState({ success: false,})
                this.getData();
            }, 2000);

        } catch (err) {
            console.log(err.stack);
        }
    }
    close() {
        this.setState({ preview: false, })
    }
    preview(data) {
        this.setState({ preview: true, rowclick: data.id })
    }
    boiSelectionChange(id, boiType) {
        let filter = this.state.boiConfig.filter(item => item.id !== id);
        filter.push({ id, boiType, })

        this.setState({
            boiConfig: filter
        })
        // console.log(id, boiType)
    }
    render() {
        const columns = [
            { field: 'cipNo', headerName: 'CIP No.', width: 100 },
            { field: 'subCipNo', headerName: 'Sub CIP No.', width: 95 },
            // { field: 'vendor', headerName: 'Vendor', width: 130 },
            { field: 'name', headerName: 'Name', width: 320, },
            { field: 'qty', headerName: 'Qty.', width: 80 },
            { field: 'totalThb', headerName: 'Total (THB)', width: 120 },
            {
                field: 'select', headerName: 'Confirm', width: 180, headerAlign: 'center',
                renderCell: (params) => {
                    return <>
                        <Grid container>
                            <Grid item xs={6} style={{ padding: '10px 10px 10px 0px' }}>
                                <select style={{ padding: '5px' }} onChange={(event) => this.boiSelectionChange(params.id, event.target.value)}>
                                    <option selected value="-">-</option>
                                    <option value="BOI">BOI</option>
                                    <option value="NON BOI">NON BOI</option>
                                </select>
                            </Grid>
                            <Grid item xs={6} style={{ padding: '20px 10px 10px 30px' }}>
                                <PreviewIcon
                                    style={{ right: 'calc(3%)', top: 'calc(10%)', cursor: 'pointer', color: '#228fe6', width: '30px', height: '30px' }}
                                    onClick={() => this.preview(params)}
                                />
                            </Grid>
                        </Grid>

                    </>
                }
            },
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
                        <input type="file" id="itc_upload" hidden onChange={this.sendApproveUpload} />
                        <Button
                            style={{ marginRight: 'calc(1%)', backgroundColor: '#3f51b5', color: 'aliceblue' }}
                            variant="contained"
                            onClick={this.uploadClick}
                        >upload</Button>
                        <Button variant="contained"
                            style={{ backgroundColor: '#2196f3', color: 'aliceblue' }}
                            onClick={this.download}
                        >download</Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Card elevation={0} style={{ padding: 'calc(2%)', textAlign: "center", backgroundColor: 'rgb(238 235 243)' }} variant="outlined" >
                            <Button variant="outlined" style={{ marginRight: 'calc(2%)', backgroundColor: 'rgb(128 214 145)' }} onClick={this.check}>
                                Approve
                            </Button>
                            <Button variant="outlined" style={{ backgroundColor: '#e48989' }} onClick={this.reject}>
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
                        checkboxSelection={false}
                        // onRowClick={(row) => this.preview(row)}
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