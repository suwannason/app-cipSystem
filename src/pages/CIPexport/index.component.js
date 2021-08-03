
import React, { Component } from 'react';

import { Grid, FormHelperText, NativeSelect, InputLabel, FormControl, Button, Card } from '@material-ui/core';

import { DataGrid } from '@material-ui/data-grid';
import { app_jsonInstance } from '../../configurations/instance';
import ErrorBar from '../../components/errorBar/index.component';

import Loading from '../../components/loading/index.component';
import SuccessBar from '../../components/successBar/index.component';

export default class ExportProplus extends Component {

    constructor() {
        super();

        this.state = {
            selectValue: 'none',
            rowData: [],
            loading: false,
            success: false,
            message: '',
            error: false,
            dataSelected: [],
            exportLoading: false,
        };
        this.selectChange = this.selectChange.bind(this);
        this.search = this.search.bind(this);
        this.onSelectionModelChange = this.onSelectionModelChange.bind(this);
        this.exportClick = this.exportClick.bind(this);
    }
    selectChange(event) {
        this.setState({ selectValue: event.target.value })
    }
    async search() {
        try {
            if (this.state.selectValue === 'none') {
                this.setState({ error: true, message: 'Please select work type for search.' });
                setTimeout(() => {
                    this.setState({ error: false, })
                }, 3000);
                return;
            }

            this.setState({ loading: true, })
            const response = await app_jsonInstance().post(`/export/finished`, { workType: this.state.selectValue });

            this.setState({ loading: false, rowData: response.data.data });

        } catch (err) {
            console.log(err.stack);
        }
    }
    onSelectionModelChange(rows) {
        this.setState({
            dataSelected: rows.selectionModel,
        });

    }
    async exportClick() {
        try {
            if (this.state.dataSelected.length === 0) {
                this.setState({ error: true, message: 'Please select CIP to export.' });
                setTimeout(() => {
                    this.setState({ error: false, })
                }, 3000);
                return;
            }
            const body = {
                id: this.state.dataSelected,
                workType: this.state.selectValue
            };
            this.setState({ exportLoading: true, message: 'Exporting...' });

            const response = await app_jsonInstance().post(`/export/wrtiing`, body);
            this.setState({ success: true, message: response.data.message, exportLoading: false });
            setTimeout(() => {
                this.setState({ success: false, });
                this.search();
            }, 3000);
        } catch (err) {
            this.setState({ error: true, message: err.response.data.message, exportLoading: false });

            setTimeout(() => {
                this.setState({ error: false, })
            }, 3000);
        }
    }
    render() {
        let error;

        if (this.state.error === true) {
            error = <ErrorBar message={this.state.message} />
        }
        let loading;
        if (this.state.exportLoading === true) {
            loading = <Loading message={this.state.message} />
        }
        let success;
        if (this.state.success === true) {
            success = <SuccessBar message={this.state.message} />
        }
        return (
            <>
                <Grid container>
                    {error}{loading}{success}
                    <Grid item xs={12}>
                        <Card variant="outlined" style={{ padding: '10px' }}>
                            Export csv data
                        </Card>
                    </Grid>

                    <Grid container style={{ marginTop: 'calc(3%)' }}>
                        <Grid item xs={3}>
                            <FormControl>
                                <InputLabel htmlFor="uncontrolled-native">Work type</InputLabel>
                                <NativeSelect
                                    defaultValue={this.state.selectValue}
                                    onChange={this.selectChange}
                                >
                                    <option value={'none'}>-</option>
                                    <option value={'Domestic-DIE'}>Domestic-DIE</option>
                                    <option value={'Domestic'}>Domestic</option>
                                    <option value={'Oversea'}>Oversea</option>
                                    <option value={'Project ENG3'}>Project ENG3</option>
                                    <option value={'Project-MSC'}>Project-MSC</option>
                                </NativeSelect>
                                <FormHelperText>Select work type for preview</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={7}>
                            <Button variant="outlined" size="medium" style={{ backgroundColor: '#2196f3', color: 'aliceblue' }} onClick={this.search}>Search</Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="outlined" size="medium" style={{ backgroundColor: '#009688', color: 'aliceblue' }} onClick={this.exportClick}>Exports</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container style={{ marginTop: 'calc(3%)' }}>

                    <Grid item xs={12}>
                        <div style={{ width: '100%', height: '600px' }}>
                            <DataGrid
                                rows={this.state.rowData}
                                columns={[
                                    { field: 'cipNo', headerName: 'CIP No.', width: 120 },
                                    { field: 'subCipNo', headerName: 'Sub CIP No.', width: 130 },
                                    { field: 'vendor', headerName: 'Vendor', width: 130 },
                                    { field: 'name', headerName: 'Name', width: 200, },
                                    { field: 'qty', headerName: 'Qty.', width: 80 },
                                    { field: 'totalOfCip', headerName: 'Total (THB)', width: 130 },
                                    { field: 'cc', headerName: 'CC', width: 80 },
                                ]}
                                loading={this.state.loading}
                                disableSelectionOnClick={true}
                                checkboxSelection={true}
                                onSelectionModelChange={(row) => this.onSelectionModelChange(row)}
                                pageSize={10}
                            />
                        </div>
                    </Grid>
                </Grid>
            </>
        )
    }
}
