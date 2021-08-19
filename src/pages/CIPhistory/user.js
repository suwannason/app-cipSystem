
import React, { Component, } from 'react';


import { Grid, TextField } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

import MoreDetail from '../approval/components/moreDetail.component';

// PROPS CONTEXT
// data=[{cipSchema}]
// PROPS CONTEXT

class HistryUser extends Component {
    constructor() {
        super();

        this.state = {
            cipNo: '',
            name: '',
            data: [],
            all: [],
            preview: false,
            rowclick: '',
            loading: false,
        };
        this.cipNoChange = this.cipNoChange.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.preview = this.preview.bind(this);
        this.close = this.close.bind(this)
    }
    componentDidMount() {
        this.setState({ loading: true, });

        setTimeout(() => {
            this.setState({ data: this.props.data, all: this.props.data, loading: false, })
        }, 1200);
    }
    close() {
        this.setState({ preview: false, })
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
    preview(data) {
        this.setState({ preview: true, rowclick: data.id })
    }

    render() {
        let preview;

        if (this.state.preview === true) {
            preview = <MoreDetail close={this.close} id={this.state.rowclick} />
        }
        return (
            <>
                <Grid container spacing={1}>
                    {preview}
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
                <Grid container>
                    <Grid item xs={12}>
                        <div style={{ height: 600, width: '100%', marginTop: 'calc(1%)' }}>
                            <DataGrid
                                rows={this.state.data}
                                columns={[
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
                                        field: 'totalOfCip', headerName: 'Total (THB)', width: 130, renderCell: (params) => {
                                            if (params.row.status === 'reject') {
                                                return <div style={{ color: 'rgb(243 1 1)' }}>{params.row.totalOfCip}</div>
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
                                ]}
                                pageSize={10}
                                // checkboxSelection
                                loading={this.state.loading}
                                onRowClick={(row) => this.preview(row)}
                                // onRowSelected={(row) => this.selectionRow(row)}
                                // onSelectionModelChange={(row) => this.onSelectionModelChange(row)}
                                disableSelectionOnClick={true}
                            />
                        </div>
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default HistryUser;