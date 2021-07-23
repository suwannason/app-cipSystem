
import React, { Component } from 'react';

import { Grid, FormHelperText, NativeSelect, InputLabel, FormControl, Button, Card } from '@material-ui/core';

import { DataGrid } from '@material-ui/data-grid';
import { app_jsonInstance } from '../../configurations/instance';
export default class ExportProplus extends Component {

    constructor() {
        super();

        this.state = {
            selectValue: 'none',
            rowData: [],
            loading: false,
        };
        this.selectChange = this.selectChange.bind(this);
        this.search = this.search.bind(this);
    }
    selectChange(event) {
        this.setState({ selectValue: event.target.value })
    }
    async search() {
        try {
            if (this.state.selectValue === 'none') {
                return;
            }

            this.setState({ loading: true, })
            const response = await app_jsonInstance().post(`/export`, { workType: this.state.selectValue });

            this.setState({ loading: false, rowData: response.data.data });

        } catch (err) {
            console.log(err.stack);
        }
    }
    rowClicked() {
        
    }
    render() {
        return (
            <>
                <Grid container>
                    <Grid item xs={12}>
                        <Card variant="outlined" style={{ padding: '10px' }}>
                            Export csv data
                        </Card>
                    </Grid>

                    <Grid container style={{ marginTop: 'calc(3%)'}}>
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
                            <Button variant="outlined" size="medium" style={{ backgroundColor: '#009688', color: 'aliceblue' }}>Exports</Button>
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
                                    { field: 'totalThb', headerName: 'Total (THB)', width: 130 },
                                    { field: 'cc', headerName: 'CC', width: 80 },
                                ]}
                                loading={this.state.loading}
                                disableSelectionOnClick={true}
                                checkboxSelection={true}
                                pageSize={10}
                            />
                        </div>
                    </Grid>
                </Grid>
            </>
        )
    }
}
