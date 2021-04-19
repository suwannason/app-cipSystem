
import React, { Component, } from 'react';

import { Grid, TextField, Button } from '@material-ui/core';
import { app_jsonInstance } from '../../configurations/instance';

import { reload } from '../../middleware/index';

import { DataGrid } from '@material-ui/data-grid';

import DeptInput from './deptInput.component';


class CIPlist extends Component {
    constructor() {
        super();

        this.state = {
            data: [],
            all: [],
            dataSelected: [],
            deptInput: false,
            cipNo: '',
            name: '',
        };
        this.getData = this.getData.bind(this);
        this.selectionRow = this.selectionRow.bind(this);
        this.close = this.close.bind(this);
        this.openDeptinput = this.openDeptinput.bind(this);
        this.cipNoChange = this.cipNoChange.bind(this);
        this.nameChange = this.nameChange.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    close() {
        this.setState({ deptInput: false, })
    }
    openDeptinput() {
        this.setState({ deptInput: true, })
    }
    onSelectionModelChange(rows) {
        console.log(rows);
    }
    async selectionRow(row) {

        if (row.isSelected === true) {
            this.state.dataSelected.push(row.data)
        } else {

            await this.setState({
                dataSelected: this.state.dataSelected.filter(item => item.id !== row.data.id)
            });
        }

        const input = document.getElementById('input');
        if (this.state.dataSelected.length === 1) {
            input.style.display = 'block'
        } else {
            input.style.display = 'none'
        }

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
    download() {

        alert('download')
    }
    render() {
        let deptInput;

        if (this.state.deptInput === true) {
            deptInput = <DeptInput close={this.close} />
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
                {deptInput}
                {this.state.hiddenInput}
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <TextField label="CIP No." onChange={this.cipNoChange} value={this.state.cipNo} />
                    </Grid>

                    <Grid item xs={3}>
                        <TextField label="Name" onChange={this.nameChange} value={this.state.name} />
                    </Grid>

                    <Grid item xs={6}>
                        <Button variant="outlined" id="input" style={{ backgroundColor: '#82b1da', color: 'aliceblue', display: 'none' }} onClick={this.openDeptinput}> Input </Button>

                    </Grid>
                </Grid>
                <div style={{ height: 550, width: '100%', marginTop: 'calc(1%)' }}>
                    <DataGrid
                        rows={this.state.data}
                        columns={columns}
                        pageSize={10}
                        checkboxSelection
                        onRowSelected={(row) => this.selectionRow(row)}
                        // onSelectionModelChange={(row) => this.onSelectionModelChange(row)}
                        disableSelectionOnClick={true}
                    />
                </div>

                <Grid container spacing={0} style={{ marginTop: 'calc(1%)', textAlign: 'center' }}>
                    <Grid item xs={12}>
                        <Button variant="outlined" id="input" style={{ backgroundColor: 'rgb(63 93 177)', color: 'aliceblue', }} onClick={this.download}> Download </Button>
                    </Grid>
                </Grid>

            </>
        );
    }
}

export default CIPlist;