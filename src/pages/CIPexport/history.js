
import React, { Component, } from 'react';

import { Grid, FormHelperText, NativeSelect, InputLabel, FormControl, Button, TextField } from '@material-ui/core';

import { DataGrid } from '@material-ui/data-grid';
import { app_jsonInstance, blob_response, none_headersInstance } from '../../configurations/instance';
import ErrorBar from '../../components/errorBar/index.component';

import Loading from '../../components/loading/index.component';
import SuccessBar from '../../components/successBar/index.component';

export default class ExportHistory extends Component {

    constructor() {
        super();

        this.state = {
            selectValue: 'none',
            data: [],
            all: [],
            loading: false,
            cc: '',
            invDate: '',
            cipNo: '',
            dataSelected: [],
        };
        this.selectChange = this.selectChange.bind(this);
        this.rowData = this.rowData.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.exportClick = this.exportClick.bind(this);
        this.onSelectionModelChange = this.onSelectionModelChange.bind(this);
        this.getAllData = this.getAllData.bind(this);
        this.ccChange = this.ccChange.bind(this);
        this.cipNoChange = this.cipNoChange.bind(this);
        this.invDateChange = this.invDateChange.bind(this);
    }
    onSelectionModelChange(rows) {
        this.setState({
            dataSelected: rows.selectionModel,
        });
    }
    componentDidMount() {
        this.getAllData();
    }

    async getAllData() {
        try {
            this.setState({ loading: true, });
            const response = await none_headersInstance().get(`/export/history`);

            this.setState({ loading: false, });

            this.setState({ data: response.data.data, all: response.data.data });
        } catch (err) {
            console.log(err.stack)
        }
    }
    selectChange(event) {
        this.setState({ selectValue: event.target.value })
    }
    ccChange(event) {
        this.setState({ cc: event.target.value })
        
        if (event.target.value !== '') {
            if (this.state.cipNo !== '') {
                this.setState({
                    data: this.state.all.filter((item) => {
                        return item.cc.indexOf(event.target.value) !== -1 && item.cipNo.indexOf(event.target.value) !== -1
                    })
                });
            } else {
                this.setState({
                    data: this.state.data.filter((item) => {
                        return item.cc.indexOf(event.target.value) !== -1
                    })
                });
            }
        } else {
            if (this.state.cipNo !== '') {
                this.setState({
                    data: this.state.all.filter((item) => {
    
                        return item.cipNo.indexOf(this.state.cipNo) !== -1 && item.cc.indexOf(event.target.value) !== -1
                    })
                });
            } else {
                this.setState({
                    data: this.state.all.filter((item) => {
    
                        return item.cc.indexOf(event.target.value) !== -1
                    })
                });
            }

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
    invDateChange(event) {
        this.setState({ invDate: event.target.value });

        if (event.target.value !== '') {
            this.setState({
                data: this.state.all.filter((item) => {
                    return item.cc.indexOf(this.state.cc) !== -1
                           && item.cipNo.indexOf(this.state.cipNo) !== -1
                           && item.invDate.indexOf(event.target.value) !== -1
                })
            });
        }

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
                // workType: this.state.selectValue
            };
            this.setState({ exportLoading: true, message: 'Exporting...' });

            const response = await blob_response().patch(`/cip/download`, body);

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
            this.setState({ success: true, message: 'Export excel success.', exportLoading: false });
            setTimeout(() => {
                this.setState({ success: false, });

            }, 3000);
        } catch (err) {
            console.log(err.stack);
            this.setState({ error: true, message: err.response.data.message, exportLoading: false });

            setTimeout(() => {
                this.setState({ error: false, })
            }, 3000);
        }
    }
    async rowData() {
        try {
            if (this.state.selectValue === 'none') {
                this.getAllData();
                return;
            }
            this.setState({ loading: true, rowData: [] })
            const body = {
                workType: this.state.selectValue,
            };
            const response = await app_jsonInstance().patch(`/export/history`, body);
            this.setState({ loading: false, data: response.data.data, all: response.data.data });
        } catch (err) {
            console.log(err.stack);
        }
    }
    async nextPage(params) {
        // console.log(params);
        if (params.page + 1 > this.state.page) {
            await this.setState({ page: this.state.page + 1 });

            const body = {
                workType: this.state.selectValue,
                page: this.state.page,
                perPage: this.state.perPage,
            };
            const response = await app_jsonInstance().patch(`/export/history`, body);
            await this.setState({ data: [...this.state.data, ...response.data.data] });
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
                    <Grid item xs={3}>
                        <FormControl>
                            <InputLabel htmlFor="uncontrolled-native">Work type</InputLabel>
                            <NativeSelect
                                defaultValue={this.state.selectValue}
                                onChange={this.selectChange}
                            >
                                <option value={'none'}>All</option>
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
                        <Button variant="outlined" size="medium" style={{ backgroundColor: '#2196f3', color: 'aliceblue' }} onClick={this.rowData}>Search</Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="outlined" size="medium" style={{ backgroundColor: '#009688', color: 'aliceblue' }} onClick={this.exportClick}>Exports</Button>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <TextField label="CIP No." onChange={this.cipNoChange} value={this.state.cipNo} />
                    </Grid>

                    <Grid item xs={3}>
                        <TextField label="CC" onChange={this.ccChange} value={this.state.cc} />
                    </Grid>

                    <Grid item xs={3}>
                        <TextField label="Inv.Date" onChange={this.invDateChange} value={this.state.invDate} />
                        {/* <Button variant="outlined" id="input" style={{ backgroundColor: 'rgb(63 81 181)', color: 'aliceblue', }} onClick={this.openDeptinput}> Input </Button> */}

                    </Grid>
                    <Grid item xs={3}>
                        {/* <Button variant="outlined" id="input" style={{ backgroundColor: 'rgb(63 81 181)', color: 'aliceblue', }} onClick={this.openDeptinput}> Input </Button> */}

                    </Grid>
                </Grid>
                <Grid container style={{ marginTop: 'calc(3%)' }}>
                    <Grid item xs={12}>
                        <div style={{ width: '100%', height: '600px' }}>
                            <DataGrid
                                rows={this.state.data}
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
                                // onPageChange={(params) => this.nextPage(params)}
                                pagination={true}
                            />
                        </div>
                    </Grid>
                </Grid>
            </>
        )
    }
}
