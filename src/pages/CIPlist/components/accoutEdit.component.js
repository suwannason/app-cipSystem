import React, { Component } from 'react';

import { Grid, TextField, Card, Tooltip } from '@material-ui/core';
import { none_headersInstance, app_jsonInstance } from '../../../configurations/instance';

import { ArrowDropDown, RemoveCircleOutlineRounded } from '@material-ui/icons';
import UserEdit from './userEdit.component';

import ErrorBar from '../../../components/errorBar/index.component';
// PROPS CONTEXT

// id=string
// submit=function(cip)
// readonly=bool

// PROPS CONTEXT

class AccountEdit extends Component {
    constructor() {
        super();

        this.state = {
            cip: null,
            workType: '',
            userConfirmData: null,
            success: false,
            disable: false,
            message: '',
            error: '',
        };
        this.getData = this.getData.bind(this);
        this.userConfirmData = this.userConfirmData.bind(this)
    }
    async componentDidMount() {
        this.setState({ disable: this.props.readonly })
        await this.getData();
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
            document.getElementById('workType').value = response.data.data.workType;

            await this.setState({ success: false, })
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

    async updateUserConfirm(body) {
        try {
            await app_jsonInstance().put(`/cipUpdate`, body);

        } catch (err) {
            if (err.response.status === 400) {
                this.setState({ error: true, message: err.response.data.message });

                setTimeout(() => {
                    this.setState({ error: false, });

                }, 3000);
            }
        }
    }
    async userConfirmData() {
        try {
            const response = await none_headersInstance().get(`/cipUpdate/${this.props.id}`);

            const element = {};
            if (response.data.data !== null && response.data.data) {
                element.userConfirmData = <UserEdit id={this.props.id} submit={this.updateUserConfirm} readonly={true} />
            } else {
                element.userConfirmData = <div
                style={{ fontSize: '26px', fontFamily: 'emoji', color: 'red', padding: '10px'}}>
                    No User confirm data <RemoveCircleOutlineRounded />
                </div>
            }

            this.setState(element)
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        let error;

        if (this.state.error === true) {
            error = <ErrorBar message={this.state.message} />
        }
        return (
            <>
                <Grid container spacing={0} style={{ marginBottom: 'calc(3%)' }}>
                    {error}
                    <Grid item xs={12}>
                        <Card style={{ padding: '20px', boxShadow: '1px 1px 1px 2px #93d9dc' }} variant="outlined">
                            Accounting edit CIP record
                        </Card>
                    </Grid>
                </Grid>

                <Grid container spacing={0}>
                    <Grid item xs={3}>
                        <select id="workType" style={{ width: 'calc(73%)', height: 'calc(100%)', borderRadius: '5px', borderColor: '#bfc5c3' }} disabled={this.state.disable}>
                            <option value="Domestic">Domestic</option>
                            <option value="Domestic-DIE">Domestic-DIE</option>
                            <option value="Oversea">Oversea</option>
                            <option value="Project ENG3">Project ENG3</option>
                            <option value="Project-MSC">Project-MSC</option>
                        </select>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" id="projectNo" label="Project No." size="small" disabled={this.state.disable} InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" id="cipNo" label="CIP No." size="small" disabled={this.state.disable} InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Sub CIP No." id="subCipNo" size="small" disabled={this.state.disable} InputLabelProps={{ shrink: true }} />
                    </Grid>
                </Grid>

                <Grid container spacing={0} style={{ marginTop: 'calc(2%)' }}>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="PO No." size="small" id="poNo" disabled={this.state.disable} InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Vendor code" size="small" id="vendorCode" disabled={this.state.disable} InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Vendor" size="small" id="vendor" disabled={this.state.disable} InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="ACQ-DATE (ETD)" size="small" id="acqDate" disabled={this.state.disable} InputLabelProps={{ shrink: true }} />
                    </Grid>
                </Grid>

                <Grid container spacing={0} style={{ marginTop: 'calc(3%)' }}>
                    <Grid item xs={12}>
                        <TextField style={{ width: 'calc(85%)' }} variant="outlined" label="Name (English)" size="small" id="name" disabled={this.state.disable} InputLabelProps={{ shrink: true }} />
                    </Grid>
                </Grid>

                <Grid container spacing={0} style={{ marginTop: 'calc(3%)' }}>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="INV date" size="small" id="invDate" disabled={this.state.disable} InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Received date" size="small" id="receivedDate" disabled={this.state.disable} InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="INV No." size="small" id="invNo" disabled={this.state.disable} InputLabelProps={{ shrink: true }} />
                    </Grid>

                    <Grid item xs={3}>
                        <TextField variant="outlined" label="CC" size="small" id="cc" disabled={this.state.disable} InputLabelProps={{ shrink: true }} />
                    </Grid>

                </Grid>

                <Grid container spacing={0} style={{ marginTop: 'calc(2%)' }}>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Qty." size="small" id="qty" disabled={this.state.disable} InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Ex.Rate" size="small" id="exRate" disabled={this.state.disable} InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Cur" size="small" id="cur" disabled={this.state.disable} InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Per unit (JPY/USD)" size="small" id="perUnit" disabled={this.state.disable} InputLabelProps={{ shrink: true }} />
                    </Grid>
                </Grid>

                <Grid container spacing={0} style={{ marginTop: 'calc(2%)' }}>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Total (JPY/USD)" size="small" id="totalJpy" disabled={this.state.disable} InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Total (THB)" size="small" id="totalThb" disabled={this.state.disable} InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Average freight (JPY/USD)" size="small" id="averageFreight" disabled={this.state.disable} InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Avage insurance (JPY/USD)" size="small" id="averageInsurance" disabled={this.state.disable} InputLabelProps={{ shrink: true }} />
                    </Grid>
                </Grid>

                <Grid container spacing={0} style={{ marginTop: 'calc(2%)' }}>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Grand total (JPY/USD)" size="small" id="totalJpy_1" disabled={this.state.disable} InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Grand total (THB)" size="small" id="totalThb_1" disabled={this.state.disable} InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Per unit (THB)" size="small" id="perUnitThb" disabled={this.state.disable} InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Total of CIP (THB)" size="small" id="totalOfCip" disabled={this.state.disable} InputLabelProps={{ shrink: true }} />
                    </Grid>
                </Grid>

                <Grid container spacing={0} style={{ marginTop: 'calc(2%)' }}>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Budget code" size="small" id="budgetCode" disabled={this.state.disable} InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="PR.DIE/JIG" size="small" id="prDieJig" disabled={this.state.disable} InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Model" size="small" id="model" disabled={this.state.disable} InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Part No./DIE No." size="small" id="partNoDieNo" disabled={this.state.disable} InputLabelProps={{ shrink: true }} />
                    </Grid>
                </Grid>
                {(this.state.disable === false) ?
                    <>
                        <Grid container style={{ marginTop: 'calc(2%)' }}>
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <Tooltip title="Expand user confirm">
                                    <ArrowDropDown style={{ color: '#000000', width: '60px', height: '60px', cursor: 'pointer' }} onClick={this.userConfirmData} />
                                </Tooltip>

                            </Grid>
                        </Grid>

                        <Grid container>
                            {this.state.userConfirmData}
                        </Grid></> : ''}

            </>
        );
    }
}

export default AccountEdit;