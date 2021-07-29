import React, { Component } from 'react';

import { Grid, TextField, Card, } from '@material-ui/core';
import { none_headersInstance } from '../../../configurations/instance'

// PROPS CONTEXT

// id=string
// submit=function(cip)

// PROPS CONTEXT

class AccountEdit extends Component {
    constructor() {
        super();

        this.state = {
            cip: null,
            workType: '',
        };
        this.getData = this.getData.bind(this);
    }
    componentDidMount() {
        this.getData();
    }

    async getData() {
        try {
            const response = await none_headersInstance().get(`/cip/${this.props.id}`)

            document.getElementById('acqDate').value = response.data.data.acqDate;
            document.getElementById('averageFreight').value = response.data.data.averageFreight;
            document.getElementById('averageInsurance').value = response.data.data.averageInsurance;
            document.getElementById('budgetCode').value = response.data.data.budgetCode;
            document.getElementById('cc').value = response.data.data.cc;
            document.getElementById('cipNo').value = response.data.data.cipNo;
            document.getElementById('cur').value = response.data.data.cur;
            document.getElementById('exRate').value = response.data.data.exRate;
            document.getElementById('invDate').value = response.data.data.invDate;
            document.getElementById('invNo').value = response.data.data.invNo;
            document.getElementById('model').value = response.data.data.model;
            document.getElementById('name').value = response.data.data.name;
            document.getElementById('partNoDieNo').value = response.data.data.partNoDieNo;
            document.getElementById('perUnit').value = response.data.data.perUnit;
            document.getElementById('perUnitThb').value = response.data.data.perUnitThb;
            document.getElementById('poNo').value = response.data.data.poNo;
            document.getElementById('prDieJig').value = response.data.data.prDieJig;
            document.getElementById('projectNo').value = response.data.data.projectNo;
            document.getElementById('qty').value = response.data.data.qty;
            document.getElementById('subCipNo').value = response.data.data.subCipNo;
            document.getElementById('receivedDate').value = response.data.data.receivedDate;
            document.getElementById('totalJpy').value = response.data.data.totalJpy;
            document.getElementById('totalJpy_1').value = response.data.data.totalJpy_1;
            document.getElementById('totalOfCip').value = response.data.data.totalOfCip;
            document.getElementById('totalThb').value = response.data.data.totalThb;
            document.getElementById('totalThb_1').value = response.data.data.totalThb_1;
            document.getElementById('vendor').value = response.data.data.vendor;
            document.getElementById('vendorCode').value = response.data.data.vendorCode;
            document.getElementById('workType').value =response.data.data.workType;

        } catch (err) {
            console.log(err.stack);
        }
    }
    componentWillUnmount() {
        const cipChanged = {};
        cipChanged.id = parseInt(this.props.id, 10);
        cipChanged.acqDate = document.getElementById('acqDate').value;
        cipChanged.averageFreight = document.getElementById('averageFreight').value;
        cipChanged.averageInsurance = document.getElementById('averageInsurance').value;
        cipChanged.budgetCode = document.getElementById('budgetCode').value;
        cipChanged.cc = document.getElementById('cc').value;
        cipChanged.cipNo = document.getElementById('cipNo').value;
        cipChanged.cur = document.getElementById('cur').value;
        cipChanged.invDate = document.getElementById('invDate').value;
        cipChanged.invNo = document.getElementById('invNo').value;
        cipChanged.model = document.getElementById('model').value;
        cipChanged.name = document.getElementById('name').value;
        cipChanged.exRate = document.getElementById('exRate').value;
        cipChanged.partNoDieNo = document.getElementById('partNoDieNo').value;
        cipChanged.perUnit = document.getElementById('perUnit').value;
        cipChanged.perUnitThb = document.getElementById('perUnitThb').value;
        cipChanged.poNo = document.getElementById('poNo').value;
        cipChanged.prDieJig = document.getElementById('prDieJig').value;
        cipChanged.projectNo = document.getElementById('projectNo').value;
        cipChanged.qty = document.getElementById('qty').value;
        cipChanged.subCipNo = document.getElementById('subCipNo').value;
        cipChanged.receivedDate = document.getElementById('receivedDate').value;
        cipChanged.totalJpy = document.getElementById('totalJpy').value;
        cipChanged.totalJpy_1 = document.getElementById('totalJpy_1').value;
        cipChanged.totalOfCip = document.getElementById('totalOfCip').value;
        cipChanged.totalThb = document.getElementById('totalThb').value;
        cipChanged.totalThb_1 = document.getElementById('totalThb_1').value;
        cipChanged.vendor = document.getElementById('vendor').value;
        cipChanged.vendorCode = document.getElementById('vendorCode').value;
        cipChanged.workType = document.getElementById('workType').value;

        this.props.submit(cipChanged);
    }

    render() {
        return (
            <>
                <Grid container spacing={0} style={{ marginBottom: 'calc(2%)' }}>
                    <Grid item xs={12}>
                        <Card style={{ padding: '20px', }} variant="outlined">
                            Accounting edit CIP record
                        </Card>
                    </Grid>
                </Grid>

                <Grid container spacing={0}>
                    <Grid item xs={3}>
                        <select id="workType" style={{ width: 'calc(73%)', height: 'calc(100%)', borderRadius: '5px', borderColor: '#bfc5c3' }}>
                            <option value="Domestic">Domestic</option>
                            <option value="Domestic-DIE">Domestic-DIE</option>
                            <option value="Oversea">Oversea</option>
                            <option value="Project ENG3">Project ENG3</option>
                            <option value="Project-MSC">Project-MSC</option>
                        </select>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" id="projectNo" label="Project No." size="small" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" id="cipNo" label="CIP No." size="small" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Sub CIP No." id="subCipNo" size="small" />
                    </Grid>
                </Grid>

                <Grid container spacing={0} style={{ marginTop: 'calc(2%)' }}>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="PO No." size="small" id="poNo" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Vendor code" size="small" id="vendorCode" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Vendor" size="small" id="vendor" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="ACQ-DATE (ETD)" size="small" id="acqDate" />
                    </Grid>
                </Grid>

                <Grid container spacing={0} style={{ marginTop: 'calc(3%)' }}>
                    <Grid item xs={12}>
                        <TextField style={{ width: 'calc(85%)' }} variant="outlined" label="Name (English)" size="small" id="name" />
                    </Grid>
                </Grid>

                <Grid container spacing={0} style={{ marginTop: 'calc(3%)' }}>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="INV date" size="small" id="invDate" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Received date" size="small" id="receivedDate" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="INV No." size="small" id="invNo" />
                    </Grid>

                    <Grid item xs={3}>
                        <TextField variant="outlined" label="CC" size="small" id="cc" />
                    </Grid>

                </Grid>

                <Grid container spacing={0} style={{ marginTop: 'calc(2%)' }}>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Qty." size="small" id="qty" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Ex.Rate" size="small" id="exRate" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Cur" size="small" id="cur" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Per unit (JPY/USD)" size="small" id="perUnit" />
                    </Grid>
                </Grid>

                <Grid container spacing={0} style={{ marginTop: 'calc(2%)' }}>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Total (JPY/USD)" size="small" id="totalJpy" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Total (THB)" size="small" id="totalThb" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Average freight (JPY/USD)" size="small" id="averageFreight" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Avage insurance (JPY/USD)" size="small" id="averageInsurance" />
                    </Grid>
                </Grid>

                <Grid container spacing={0} style={{ marginTop: 'calc(2%)' }}>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Grand total (JPY/USD)" size="small" id="totalJpy_1" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Grand total (THB)" size="small" id="totalThb_1" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Per unit (THB)" size="small" id="perUnitThb" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Total of CIP (THB)" size="small" id="totalOfCip" />
                    </Grid>
                </Grid>

                <Grid container spacing={0} style={{ marginTop: 'calc(2%)' }}>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Budget code" size="small" id="budgetCode" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="PR.DIE/JIG" size="small" id="prDieJig" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Model" size="small" id="model" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Part No./DIE No." size="small" id="partNoDieNo" />
                    </Grid>
                </Grid>

            </>
        );
    }
}

export default AccountEdit;