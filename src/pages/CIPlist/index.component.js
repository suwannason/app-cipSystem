
import React, { Component, } from 'react';

import { Grid, TextField, Button, Card } from '@material-ui/core';
import { app_jsonInstance, blob_response } from '../../configurations/instance';

import { reload } from '../../middleware/index';
import Error from '../../components/errorBar/index.component';

import { DataGrid } from '@material-ui/data-grid';

import DeptInput from './deptInput.component';

class CIPlist extends Component {
    constructor() {
        super();

        this.state = {
            idSelected: [],
            data: [],
            all: [],
            dataSelected: [],
            deptInput: false,
            cipNo: '',
            name: '',
            error: false,
            message: 'Error',
        };
        this.getData = this.getData.bind(this);
        this.close = this.close.bind(this);
        this.openDeptinput = this.openDeptinput.bind(this);
        this.cipNoChange = this.cipNoChange.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.onSelectionModelChange = this.onSelectionModelChange.bind(this);
        this.download = this.download.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    close() {
        this.setState({ deptInput: false, })
        this.getData();
    }
    openDeptinput() {
        const idOnSelect = [];
        for (const item of this.state.dataSelected) {
            idOnSelect.push(parseInt(item, 10))
        }
        if (idOnSelect.length === 1) {
            this.setState({ deptInput: true, idSelected: idOnSelect, })
        } else {
            this.setState({ error: true, message: 'Please select 1 row to input. '})
        }

        setTimeout(() => {
            this.setState({ error: false, })
        }, 3000);
        // }, 1000);
    }
    async onSelectionModelChange(rows) {

        console.log('onSelectionModelChange: ', rows);
        // const input = document.getElementById('input');
        this.setState({
            dataSelected: rows.selectionModel
        });

    }
    cipNoChange(event) {
        this.setState({ cipNo: event.target.value });

        if (event.target.value !== '') {
            if (this.state.cipNo.length > event.target.value.length) {
                this.setState({
                    data: this.state.all.filter((item) => {

                        return item.cipNo.indexOf(event.target.value) !== -1
                    })
                });
            } else {
                this.setState({
                    data: this.state.data.filter((item) => {

                        return item.cipNo.indexOf(event.target.value) !== -1
                    })
                });
            }
        } else {
            this.setState({
                data: this.state.all.filter((item) => {

                    return item.cipNo.indexOf(event.target.value) !== -1
                })
            });
        }
    }
    nameChange(event) {
        this.setState({ name: event.target.value });

        if (event.target.value !== '') {
            if (this.state.cipNo !== '') {
                if (event.target.value < this.state.name.length) {

                    this.setState({
                        data: this.state.all.filter((item) => {
                            return item.cipNo.indexOf(this.state.cipNo) !== -1
                        })
                    });
                } else {
                    this.setState({
                        data: this.state.data.filter((item) => {
                            return item.name.indexOf(event.target.value) !== -1
                        })
                    });
                }
            } else {
                this.setState({
                    data: this.state.data.filter((item) => {
                        return item.name.indexOf(event.target.value) !== -1
                    })
                })
            }
        } else {
            this.setState({
                data: this.state.all.filter((item) => {
                    return item.cipNo.indexOf(this.state.cipNo) !== -1
                })
            })
        }
    }
    async getData() {
        try {
            const response = await app_jsonInstance().get(`/cip/list`);

            this.setState({ data: response.data.data, all: response.data.data })
        } catch (error) {
            console.log(error.stack);

            if (error.response.status === 401) {
                localStorage.clear();
                reload();
            }
        }
    }
    async download() {
        try {
            const body = { id: this.state.dataSelected }
            const response = await blob_response().patch(`/cip/download`, body);

            if (window.navigator.msSaveBlob) //IE & Edge
            { //msSaveBlob only available for IE & Edge
                console.log("IE & Edge")
                // const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const blob = new File([response.data], "cip.xlsx")
                window.navigator.msSaveBlob(blob, `cip.xlsx`);
            }
            else //Chrome & FF
            {
                console.log("Chrome")
                const url = window.URL.createObjectURL(new File([response.data], "cip.xlsx"));
                // const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `cip.xlsx`);
                document.body.appendChild(link);
                link.click();
            }

        } catch (err) {
            console.log(err.stack);
        }
    }
    render() {
        let deptInput;

        if (this.state.deptInput === true) {
            deptInput = <DeptInput close={this.close} id={this.state.idSelected} />
        }
        let error;
        if (this.state.error === true) {
            error = <Error message={this.state.message} />
        }
        const columns = [
            { field: 'cipNo', headerName: 'CIP No.', width: 120 },
            { field: 'subCipNo', headerName: 'Sub CIP No.', width: 130 },
            { field: 'vendor', headerName: 'Vendor', width: 130 },
            { field: 'name', headerName: 'Name', width: 200, },
            { field: 'qty', headerName: 'Qty.', width: 80 },
            { field: 'totalThb', headerName: 'Total (THB)', width: 130 },
            { field: 'cc', headerName: 'CC', width: 80 },
        ];
        return (
            <>
                {deptInput}{error}
                {this.state.hiddenInput}
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Card elevation={1} variant="outlined" style={{ padding: '5px', textAlign: 'center' }}>
                            CIP List
                        </Card>
                    </Grid>
                </Grid>
                <Grid container spacing={0} style={{ marginTop: 'calc(1%)', textAlign: 'center' }}>
                    <Grid item xs={12} style={{ textAlign: 'right'}}>
                        <Button variant="outlined" id="input" style={{ backgroundColor: '#03a9f4', color: 'aliceblue', }} onClick={this.download}> Download </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <TextField label="CIP No." onChange={this.cipNoChange} value={this.state.cipNo} />
                    </Grid>

                    <Grid item xs={3}>
                        <TextField label="Name" onChange={this.nameChange} value={this.state.name} />
                    </Grid>

                    <Grid item xs={6}>
                        {/* <Button variant="outlined" id="input" style={{ backgroundColor: 'rgb(63 81 181)', color: 'aliceblue', }} onClick={this.openDeptinput}> Input </Button> */}

                    </Grid>
                </Grid>
                <div style={{ height: 600, width: '100%', marginTop: 'calc(1%)' }}>
                    <DataGrid
                        rows={this.state.data}
                        columns={columns}
                        pageSize={10}
                        checkboxSelection
                        // onRowSelected={(row) => this.selectionRow(row)}
                        onSelectionModelChange={(row) => this.onSelectionModelChange(row)}
                        disableSelectionOnClick={true}
                    />
                </div>

            </>
        );
    }
}

export default CIPlist;