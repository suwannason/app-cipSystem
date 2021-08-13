import React, { Component } from 'react';

import { none_headersInstance, } from '../../../configurations/instance';
import { Grid, TextField, Card, Tooltip, } from '@material-ui/core';

import { ArrowDropDown } from '@material-ui/icons';

import AccountEdit from './accoutEdit.component';

// PROPS CONTEXT

// id=string
// submit=function(cip)
// readonly=bool

// PROPS CONTEXT

export default class UserEdit extends Component {
    constructor() {
        super();

        this.state = {
            success: false,
            accElement: null,
            disabled: false,
        }
        this.getCipUpdate = this.getCipUpdate.bind(this);
        this.accConfirm = this.accConfirm.bind(this);
    }

    componentDidMount() {
        this.setState({ disabled: this.props.readonly })
        this.getCipUpdate();
    }
    componentWillUnmount() {
        const cipUpdate = {};
        cipUpdate.actDate = document.getElementById('actDate').value;
        cipUpdate.addCipBfmNo = document.getElementById('addCipBfmNo').value;
        cipUpdate.costCenterOfUser = document.getElementById('costCenterOfUser').value;
        cipUpdate.fixAssetName = document.getElementById('fixAssetName').value;
        cipUpdate.fixedAssetCode = document.getElementById('fixedAssetCode').value;
        cipUpdate.model = document.getElementById('model_update').value;
        cipUpdate.newBFMorAddBFM = document.getElementById('newBFMorAddBFM').value;
        cipUpdate.partNumberDieNo = document.getElementById('partNumberDieNo').value;
        cipUpdate.planDate = document.getElementById('planDate').value;
        cipUpdate.processDie = document.getElementById('processDie').value;
        cipUpdate.classFixedAsset  = document.getElementById('classFixedAsset').value;
        cipUpdate.reasonDiff = document.getElementById('reasonDiff').value;
        cipUpdate.reasonForDelay = document.getElementById('reasonForDelay').value;
        cipUpdate.remark = document.getElementById('remark').value;
        cipUpdate.result = document.getElementById('result').value;
        cipUpdate.serialNo = document.getElementById('serialNo').value;
        cipUpdate.tranferToSupplier = document.getElementById('tranferToSupplier').value;
        cipUpdate.upFixAsset = document.getElementById('upFixAsset').value;
        cipUpdate.id = this.props.id;

        this.props.submit(cipUpdate);

    }
    async accConfirm() {
        await this.setState({ accElement: 'Loading....' })
        await this.setState({ accElement: <AccountEdit submit={this.accNoaction} id={this.props.id} readonly={true} /> })
    }
    accNoaction(body) {
        console.log('accNoaction: ',body);
    }

    async getCipUpdate() {
        try {
            const response = await none_headersInstance().get(`/cipUpdate/${this.props.id}`);

            document.getElementById('actDate').value = response.data.data.actDate;
            document.getElementById('addCipBfmNo').value = response.data.data.addCipBfmNo;
            document.getElementById('boiType').value = response.data.data.boiType;
            document.getElementById('costCenterOfUser').value = response.data.data.costCenterOfUser;
            document.getElementById('fixAssetName').value = response.data.data.fixAssetName;
            document.getElementById('fixedAssetCode').value = response.data.data.fixedAssetCode;
            document.getElementById('model_update').value = response.data.data.model;
            document.getElementById('newBFMorAddBFM').value = response.data.data.newBFMorAddBFM;
            document.getElementById('partNumberDieNo').value = response.data.data.partNumberDieNo;
            document.getElementById('planDate').value = response.data.data.planDate;
            document.getElementById('classFixedAsset').value = response.data.data.classFixedAsset;
            document.getElementById('processDie').value = response.data.data.processDie;
            document.getElementById('reasonDiff').value = response.data.data.reasonDiff;
            document.getElementById('reasonForDelay').value = response.data.data.reasonForDelay;
            document.getElementById('remark').value = response.data.data.remark;
            document.getElementById('result').value = response.data.data.result;
            document.getElementById('serialNo').value = response.data.data.serialNo;
            document.getElementById('tranferToSupplier').value = response.data.data.tranferToSupplier;
            document.getElementById('upFixAsset').value = response.data.data.upFixAsset;

            setTimeout(async () => {
                await this.setState({ success: true, })
            }, 200);

        } catch (err) {
            console.log(err.stack)
        }
    }
    render() {
        return (
            <>
                <Grid container>
                    <Grid item xs={12}>
                        <Card style={{ padding: '20px', boxShadow: '1px 1px 1px 2px #eca0dc' }} variant="outlined">
                            CIP user confirm
                        </Card>

                    </Grid>
                </Grid>
                <Grid container spacing={0} style={{ marginTop: 'calc(2%)' }}>

                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Operating Date (Plan)" size="small" id="planDate" InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Operating Date (Act)" size="small" id="actDate" InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Result" size="small" id="result" InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label={'Reason diff (NG)'} size="small" id="reasonDiff" InputLabelProps={{ shrink: true }} />
                    </Grid>
                </Grid>

                <Grid container spacing={0} style={{ marginTop: 'calc(2%)' }}>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Fixed asset code" size="small" id="fixedAssetCode" InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Class fixed asset" size="small" id="classFixedAsset" InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Fix asset name (English only)" size="small" id="fixAssetName" InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Serial No." size="small" id="serialNo" InputLabelProps={{ shrink: true }} />
                    </Grid>
                </Grid>

                <Grid container spacing={0} style={{ marginTop: 'calc(2%)' }}>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Part number Die no." size="small" id="partNumberDieNo" InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Process Die" size="small" id="processDie" InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Model" size="small" id="model_update" InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Cost center of user" size="small" id="costCenterOfUser" InputLabelProps={{ shrink: true }} />
                    </Grid>
                </Grid>

                <Grid container spacing={0} style={{ marginTop: 'calc(2%)' }}>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Transfer to supplier" size="small" id="tranferToSupplier" InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="ให้ขึ้น Fix asset กี่ตัว" size="small" id="upFixAsset" InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        {/* <TextField variant="outlined" label="New BFM or Add BFM" size="small" id="newBFMorAddBFM" InputLabelProps={{ shrink: true }} /> */}
                        <select id="newBFMorAddBFM" style={{ width: 'calc(73%)', height: 'calc(100%)', borderRadius: '5px', borderColor: '#bfc5c3' }}>
                            <option value="Add BFM">Add BFM</option>
                            <option value="NEW BFM">New BFM</option>
                        </select>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Reason for delay" size="small" id="reasonForDelay" InputLabelProps={{ shrink: true }} />
                    </Grid>
                </Grid>

                <Grid container spacing={0} style={{ marginTop: 'calc(2%)' }}>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Add CIP/BFM No." size="small" id="addCipBfmNo" InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="Remark (Add CIP/BFM No.)" size="small" id="remark" InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField variant="outlined" label="BOI type" size="small" id="boiType" disabled />
                    </Grid>
                </Grid>

                {
                    (this.state.disabled === false) ?
                        <>                <Grid container style={{ marginTop: 'calc(2%)' }}>
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <Tooltip title="Expand Accounting input">
                                    <ArrowDropDown style={{ color: '#000000', width: '60px', height: '60px', cursor: 'pointer' }} onClick={this.accConfirm} />
                                </Tooltip>

                            </Grid>
                        </Grid>

                            <Grid container>
                                {this.state.accElement}
                            </Grid></> : ''
                }

            </>
        )
    }
}
