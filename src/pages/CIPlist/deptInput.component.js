
import React, { Component } from 'react';

import {
    Dialog, DialogActions, DialogContent,
    DialogTitle, TextField, Grid, Button, Select, FormControl, MenuItem, InputLabel
}
    from '@material-ui/core';

import DatePicker from '../../components/datepicker/index.component';

import { none_headersInstance, app_jsonInstance } from '../../configurations/instance';
import Success from '../../components/successBar/index.component';

// PROPS CONTEXT
// id=[1,2]
// close=function
// PROPS CONTEXT

class DeptInput extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            datePicker: false,
            planDate: '-',
            actDate: '-',
            writeText: null,
            ccUser: null,
            ccUservalue: '-',
            BFMvalue: '-',
            depts: null,
            success: false,
            boiText: '-',
            cipUpdate: null,
            focused: false,
        };

        this.handleClose = this.handleClose.bind(this);
        this.planDateActive = this.planDateActive.bind(this);
        this.dateSelected = this.dateSelected.bind(this);
        this.actDateActive = this.actDateActive.bind(this);
        this.ok = this.ok.bind(this);
        this.getDepartments = this.getDepartments.bind(this);
        this.ccUservalueChanged = this.ccUservalueChanged.bind(this);
        this.htmlCCuser = this.htmlCCuser.bind(this);
        this.BFMvalueChanged = this.BFMvalueChanged.bind(this);
        this.boiSelected = this.boiSelected.bind(this);
        this.saveDraft = this.saveDraft.bind(this);
        this.cipUpdateCheck = this.cipUpdateCheck.bind(this);
    }
    async componentDidMount() {
        this.setState({ open: true })
        await this.cipUpdateCheck();

    }

    async ccUservalueChanged(event) {
        await this.setState({ ccUservalue: event.target.value })
        await this.htmlCCuser();
    }
    BFMvalueChanged(event) {
        this.setState({ BFMvalue: event.target.value })
    }

    htmlCCuser() {
        this.setState({
            ccUser:
                <Select
                    labelId="demo-simple-select-label"
                    id="cc"
                    value={this.state.ccUservalue}
                    onChange={this.ccUservalueChanged}
                    autoFocus
                >
                    <MenuItem value={'-'} selected>-</MenuItem>
                    {this.state.depts.data.data.map((item) => (
                        <MenuItem value={item.depT_CODE}>{item.depT_CODE} - {item.depT_ABB_NAME}</MenuItem>
                    ))}
                </Select>

        })
    }
    async getDepartments() {
        try {

            const response = await none_headersInstance().get(`/user/dept`);
            console.log(this.state.ccUservalue)
            this.setState({
                ccUser: <>
                    <Select
                        labelId="demo-simple-select-label"
                        id="cc"
                        value={this.state.ccUservalue}
                        onChange={this.ccUservalueChanged}
                    // onChange={handleChange}
                    >
                        <MenuItem value={'-'}>-</MenuItem>
                        {response.data.data.map((item) => (
                            <MenuItem value={item.depT_CODE}>{item.depT_CODE} - {item.depT_ABB_NAME}</MenuItem>
                        ))}
                    </Select>
                </>,
                depts: response,
            })
        } catch (error) {
            console.log(error.stack)
        }
    }
    async dateSelected(date) {

        const tmp = {}
        if (this.state.writeText === 'plan') {
            tmp.planDate = date.selectedDate
        } else if (this.state.writeText === 'act') {
            tmp.actDate = date.selectedDate
        }
        tmp.datePicker = false;
        await this.setState(tmp)

    }
    planDateActive() {
        this.setState({ datePicker: true, writeText: 'plan' });
    }
    actDateActive() {
        this.setState({ datePicker: true, writeText: 'act' });
    }
    async cipUpdateCheck() {
        try {

            const response = await none_headersInstance().get(`/cip/cipUpdate/${this.props.id[0]}`);

            if (response.data.data !== null) {
                this.setState({
                    focused: true,
                    ccUservalue: response.data.data.costCenterOfUser,
                    boiText: response.data.data.boiType,
                    BFMvalue: response.data.data.newBFMorAddBFM,
                });

                setTimeout(() => {
                    this.setState({
                        cipUpdate: response.data.data,
                        planDate: response.data.data.planDate,
                        actDate: response.data.data.actDate,
                    });
                    document.getElementById('results').value = response.data.data.result
                    document.getElementById('reasonDiff').value = response.data.data.reasonDiff
                    document.getElementById('fixAssetCode').value = response.data.data.fixedAssetCode
                    document.getElementById('classFixAsset').value = response.data.data.classFixedAsset
                    document.getElementById('fixAssetName').value = response.data.data.fixAssetName
                    document.getElementById('serialNo').value = response.data.data.serialNo
                    document.getElementById('processDie').value = response.data.data.processDie
                    document.getElementById('model').value = response.data.data.model
                    document.getElementById('tranferToSupplier').value = response.data.data.tranferToSupplier
                    document.getElementById('fixAssetNum').value = response.data.data.upFixAsset
                    document.getElementById('reasonForDelay').value = response.data.data.reasonForDelay
                    document.getElementById('remark').value = response.data.data.remark
                }, 1000);

            }
            this.getDepartments();
        } catch (err) {
            console.log(err.stack);
        }
    }

    async saveDraft() {
        const body = {
            cipSchemaid: this.props.id,
            planDate: this.state.planDate,
            actDate: this.state.actDate,
            result: document.getElementById('results').value,
            reasonDiff: document.getElementById('reasonDiff').value,
            fixedAssetCode: document.getElementById('fixAssetCode').value,
            classFixedAsset: document.getElementById('classFixAsset').value,
            fixAssetName: document.getElementById('fixAssetName').value,
            serialNo: document.getElementById('serialNo').value,
            processDie: document.getElementById('processDie').value,
            model: document.getElementById('model').value,
            costCenterOfUser: this.state.ccUservalue,
            tranferToSupplier: document.getElementById('tranferToSupplier').value,
            upFixAsset: document.getElementById('fixAssetNum').value,
            newBFMorAddBFM: this.state.BFMvalue,
            reasonForDelay: document.getElementById('reasonForDelay').value,
            remark: document.getElementById('remark').value,
            boiType: this.state.boiText,

        }

        // console.log(body);
        await app_jsonInstance().post(`/cipUpdate/draft`, body);

        this.setState({ success: true, });
        setTimeout(() => {
            this.handleClose();
        }, 1000);
    }
    async ok() {
        const body = {
            cipSchemaid: this.props.id,
            planDate: this.state.planDate,
            actDate: this.state.actDate,
            result: document.getElementById('results').value,
            reasonDiff: document.getElementById('reasonDiff').value,
            fixedAssetCode: document.getElementById('fixAssetCode').value,
            classFixedAsset: document.getElementById('classFixAsset').value,
            fixAssetName: document.getElementById('fixAssetName').value,
            serialNo: document.getElementById('serialNo').value,
            processDie: document.getElementById('processDie').value,
            model: document.getElementById('model').value,
            costCenterOfUser: this.state.ccUservalue,
            tranferToSupplier: document.getElementById('tranferToSupplier').value,
            upFixAsset: document.getElementById('fixAssetNum').value,
            newBFMorAddBFM: this.state.BFMvalue,
            reasonForDelay: document.getElementById('reasonForDelay').value,
            remark: document.getElementById('remark').value,
            boiType: this.state.boiText,

        }

        // console.log(body);
        await app_jsonInstance().post(`/cipUpdate/save`, body);

        this.setState({ success: true, });
        setTimeout(() => {
            this.handleClose();
        }, 1000);
    }
    boiSelected(event) {
        this.setState({ boiText: event.target.value })
    }
    handleClose() {
        this.setState({ open: false, success: false, })
        setTimeout(() => {
            this.props.close();
        }, 200);
    }

    render() {

        let datePicker; let success;
        if (this.state.datePicker === true) {
            datePicker = <DatePicker callBackClose={this.dateSelected} />
        }
        if (this.state.success === true) {
            success = <Success message="Save CIP success" />
        }
        return (

            <Dialog open={this.state.open} fullWidth>
                {datePicker}{success}
                <DialogTitle style={{ backgroundColor: 'rgb(11 14 74)', color: 'aliceblue' }}>
                    Input
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField label="Operating Date (Plan)" id="odp" fullWidth onClick={this.planDateActive} value={this.state.planDate} focused required />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Operating Date (Act)" id="oda" fullWidth focused onClick={this.actDateActive} value={this.state.actDate} required />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Result" fullWidth id="results" focused={this.state.focused} />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField label={'Result Reason diff'} fullWidth id="reasonDiff" focused={this.state.focused} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Fixed Asset Code" fullWidth id="fixAssetCode" focused={this.state.focused} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="CLASS FIXED ASSET" fullWidth id="classFixAsset" focused={this.state.focused} />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField label="Fix Asset Name" fullWidth id="fixAssetName" focused={this.state.focused} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Serial No" fullWidth id="serialNo" focused={this.state.focused} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Process Die" fullWidth id="processDie" focused={this.state.focused} />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField label="Model" fullWidth id="model" focused={this.state.focused} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Transfer to supplier" id="tranferToSupplier" focused={this.state.focused} fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            {/* <TextField label="Cost Center of User" id="cc" fullWidth /> */}
                            <FormControl fullWidth>
                                <InputLabel>Cost Center of User</InputLabel>
                                {this.state.ccUser}
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField label="Fix Asset กี่ตัว" id="fixAssetNum" fullWidth focused={this.state.focused} />
                        </Grid>

                        <Grid item xs={6}>
                            {/* <TextField label="New BFMor Add BFM" fullWidth /> */}
                            <FormControl fullWidth>
                                <InputLabel>New BFMor Add BFM</InputLabel>
                                <Select
                                    id="bfm"
                                    value={this.state.BFMvalue}
                                    onChange={this.BFMvalueChanged}
                                >
                                    <MenuItem value={'-'}>-</MenuItem>
                                    <MenuItem value={'New BFM'}>New BFM</MenuItem>
                                    <MenuItem value={'Add BFM'}>Add BFM</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField label="Reason for Delay OPD date" fullWidth id="reasonForDelay" value={this.state.cipUpdate?.reasonForDelay} focused={this.state.focused} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="REMARK(Add CIP/BFM No.)" fullWidth id="remark" value={this.state.cipUpdate?.remark} focused={this.state.focused} />
                        </Grid>

                        <Grid item xs={6}>
                            {/* <TextField label="BOI TYPE" fullWidth /> */}
                            <FormControl fullWidth>
                                <InputLabel>BOI TYPE</InputLabel>
                                <Select
                                    id="boiType"
                                    value={this.state.boiText}
                                    onChange={this.boiSelected}
                                >
                                    <MenuItem value={'BOI'}>BOI</MenuItem>
                                    <MenuItem value={'NON BOI'}>NON BOI</MenuItem>
                                    <MenuItem value={'Die'}>Die</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>

                    <Grid container spacing={0}>
                        <Grid item xs={8}>
                            <Button variant="outlined" style={{ backgroundColor: '#795548', color: 'aliceblue' }} onClick={this.saveDraft}>save draft</Button>
                        </Grid>
                        <Grid item xs={4} spacing={2} style={{ textAlign: 'end' }}>
                            <Button variant="outlined" style={{ backgroundColor: '#8bc34a', color: 'aliceblue', marginRight: 'calc(3%)' }} onClick={this.ok}>submit</Button>
                            <Button variant="outlined" style={{ backgroundColor: '#f44336', color: 'aliceblue' }} onClick={this.handleClose}>close</Button>
                        </Grid>
                    </Grid>


                </DialogActions>
            </Dialog>
        );
    }
}

export default DeptInput;