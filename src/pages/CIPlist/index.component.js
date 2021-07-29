
import React, { Component, } from 'react';

import { Grid, TextField, Button, Card } from '@material-ui/core';
import { app_jsonInstance, blob_response } from '../../configurations/instance';

import { reload } from '../../middleware/index';
import Error from '../../components/errorBar/index.component';

import { DataGrid } from '@material-ui/data-grid';

import DeptInput from './deptInput.component';

import EditCIP from './edit.component';

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
            edit: false,
        };
        this.getData = this.getData.bind(this);
        this.close = this.close.bind(this);
        this.openDeptinput = this.openDeptinput.bind(this);
        this.cipNoChange = this.cipNoChange.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.onSelectionModelChange = this.onSelectionModelChange.bind(this);
        this.download = this.download.bind(this);
        this.rowClicked = this.rowClicked.bind(this);
        this.openEdit = this.openEdit.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    close() {
        this.setState({ deptInput: false, edit: false, })
        this.getData();
    }
    openEdit() {
        if (this.state.dataSelected.length === 1) {
            this.setState({ edit: true });
        } else {
            this.setState({ error: true, message: 'Please select CIP for edit 1 record.' });
            setTimeout(() => {
                this.setState({ error: false, })
            }, 3000);
        }

    }
    openDeptinput() {
        const idOnSelect = [];
        for (const item of this.state.dataSelected) {
            idOnSelect.push(parseInt(item, 10))
        }
        if (idOnSelect.length === 1) {
            this.setState({ deptInput: true, idSelected: idOnSelect, })
        } else {
            this.setState({ error: true, message: 'Please select 1 row to input. ' })
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
    rowClicked(event) {
        if (event.row.status === 'reject') {
            this.setState({ error: true, message: event.row.commend });

            setTimeout(() => {
                this.setState({ error: false, })
            }, 5000);
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
        let edit;
        if (this.state.edit === true) {
            edit = <EditCIP close={this.close} id={this.state.dataSelected[0]} />
        }
        const columns = [
            {
                field: 'cipNo', headerName: 'CIP No.', width: 100, renderCell: (params) => {
                    if (params.row.status === 'reject') {
                        return <div style={{ color: 'rgb(243 1 1)' }}>{params.row.cipNo}</div>
                    }
                }
            },
            {
                field: 'subCipNo', headerName: 'Sub CIP No.', width: 95, renderCell: (params) => {
                    if (params.row.status === 'reject') {
                        return <div style={{ color: 'rgb(243 1 1)' }}>{params.row.subCipNo}</div>
                    }
                }
            },
            // { field: 'vendor', headerName: 'Vendor', width: 130 },
            {
                field: 'name', headerName: 'Name', width: 375, renderCell: (params) => {
                    if (params.row.status === 'reject') {
                        return <div style={{ color: 'rgb(243 1 1)' }}>{params.row.name}</div>
                    }
                }
            },
            {
                field: 'qty', headerName: 'Qty.', width: 80, renderCell: (params) => {
                    if (params.row.status === 'reject') {
                        return <div style={{ color: 'rgb(243 1 1)' }}>{params.row.qty}</div>
                    }
                }
            },
            {
                field: 'totalThb', headerName: 'Total (THB)', width: 120, renderCell: (params) => {
                    if (params.row.status === 'reject') {
                        return <div style={{ color: 'rgb(243 1 1)' }}>{params.row.totalThb}</div>
                    }
                }
            },
            {
                field: 'cc', headerName: 'CC', width: 80, renderCell: (params) => {
                    if (params.row.status === 'reject') {
                        return <div style={{ color: 'rgb(243 1 1)' }}>{params.row.cc}</div>
                    }
                }
            },
        ];
        return (
            <>
                {deptInput}{error}{edit}
                {this.state.hiddenInput}
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Card elevation={1} variant="outlined" style={{ padding: '5px', textAlign: 'center' }}>
                            CIP List
                        </Card>
                    </Grid>
                </Grid>
                <Grid container spacing={0} style={{ marginTop: 'calc(1%)', textAlign: 'center' }}>
                    <Grid item xs={12} style={{ textAlign: 'right' }}>
                        <Button variant="outlined" id="input" style={{ backgroundColor: '#03a9f4', color: 'aliceblue', marginRight: 'calc(1%)' }} onClick={this.download}> Download </Button>
                        <Button variant="outlined" id="edit" style={{ backgroundColor: '#FF9800', color: 'aliceblue', }} onClick={this.openEdit}> Edit </Button>
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
                        onRowClick={(row) => this.rowClicked(row)}
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