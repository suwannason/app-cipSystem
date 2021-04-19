
import React, { Component } from 'react';

import {
    Dialog, DialogActions, DialogContent,
    DialogTitle, TextField, Grid, Button, Select, FormControl, MenuItem, InputLabel
}
    from '@material-ui/core';

import DatePicker from '../../components/datepicker/index.component';

class DeptInput extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            datePicker: false,
            planDate: null,
            actDate: null,
            writeText: null,
        };

        this.handleClose = this.handleClose.bind(this);
        this.planDateActive = this.planDateActive.bind(this);
        this.dateSelected = this.dateSelected.bind(this);
        this.actDateActive = this.actDateActive.bind(this);
    }
    componentDidMount() {
        this.setState({ open: true })
    }

    async getDepartments() {
        try {

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

    saveDraft() {

    }
    ok() {
        const body = {
            boiType: ''
        }
        console.log(body);
    }

    handleClose() {
        this.setState({ open: false, })
        setTimeout(() => {
            this.props.close();
        }, 200);
    }

    render() {

        let datePicker;
        if (this.state.datePicker === true) {
            datePicker = <DatePicker callBackClose={this.dateSelected} />
        }
        return (

            <Dialog open={this.state.open} fullWidth>
                {datePicker}
                <DialogTitle style={{ backgroundColor: '#37075a', color: 'aliceblue' }}>
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
                            <TextField label="Result" fullWidth id="results" />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField label={'Result Reason diff'} fullWidth id="reasonDiff" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Fixed Asset Code" fullWidth id="fixAssetCode" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="CLASS FIXED ASSET" fullWidth id="classFixAsset" />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField label="Fix Asset Name" fullWidth id="fixAssetName" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Serial No" fullWidth id="serialNo" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Process Die" fullWidth id="processDie" />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField label="Model" fullWidth id="model" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Transfer to supplier" id="tranferToSupplier" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            {/* <TextField label="Cost Center of User" id="cc" fullWidth /> */}
                            <FormControl fullWidth>
                                <InputLabel>Cost Center of User</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={age}
                                    // onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                                </FormControl>
                        </Grid>

                            <Grid item xs={6}>
                                <TextField label="Fix Asset กี่ตัว" id="fixAssetNum" fullWidth />
                            </Grid>

                            <Grid item xs={6}>
                                {/* <TextField label="New BFMor Add BFM" fullWidth /> */}
                                <FormControl fullWidth>
                                <InputLabel>New BFMor Add BFM</InputLabel>
                                <Select
                                    // value={age}
                                    // onChange={handleChange}
                                >
                                    <MenuItem value={'New BFM'}>New BFM</MenuItem>
                                    <MenuItem value={'Add BFM'}>Add BFM</MenuItem>
                                </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField label="Reason for Delay OPD date" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="REMARK(Add CIP/BFM No.)" fullWidth />
                            </Grid>

                            <Grid item xs={6}>
                                {/* <TextField label="BOI TYPE" fullWidth /> */}
                                <FormControl fullWidth>
                                <InputLabel>BOI TYPE</InputLabel>
                                <Select
                                    // value={age}
                                    // onChange={handleChange}
                                >
                                    <MenuItem value={'BOI'}>BOI</MenuItem>
                                    <MenuItem value={'NON BOI'}>NON BOI</MenuItem>
                                </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                </DialogContent>

                    <DialogActions>

                        <Grid container spacing={0}>
                            <Grid item xs={8}>
                                <Button variant="outlined" style={{ backgroundColor: 'rgb(191 112 31)', color: 'aliceblue' }} onClick={this.saveDraft}>save draft</Button>
                            </Grid>
                            <Grid item xs={4} spacing={2} style={{ textAlign: 'end' }}>
                                <Button variant="outlined" style={{ backgroundColor: '#46b73f', color: 'aliceblue', marginRight: 'calc(3%)' }} onClick={this.ok}>ok</Button>
                                <Button variant="outlined" style={{ backgroundColor: '#d85757', color: 'aliceblue' }} onClick={this.handleClose}>close</Button>
                            </Grid>
                        </Grid>


                    </DialogActions>
            </Dialog>
        );
    }
}

export default DeptInput;