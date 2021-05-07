
import React, { Component } from 'react';

import {
    Dialog, DialogActions, DialogContent,
    DialogTitle, Button, Card, Slide, Grid,
} from '@material-ui/core';

import { none_headersInstance } from '../../../configurations/instance';

import Signature from './signature.component';

import './style.css';


// PROPS CONTEXT

// id=int
// close=function
// PROPS CONTEXT
class MoreDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            db: null,
            transition: null,
        };

        this.handleClose = this.handleClose.bind(this);
        this.getData = this.getData.bind(this);
    }
    componentDidMount() {

        this.getData();
        this.setState({
            transition: React.forwardRef((props, ref) => {
                return <Slide direction="down" ref={ref} {...props} />
            }),
            open: true,
        });
    }

    async getData() {
        try {
            const response = await none_headersInstance().get(`/cip/${this.props.id.toString()}`);

            this.setState({ db: response.data })
        } catch (error) {
            console.log(error.stack)
        }
    }

    handleClose() {
        this.setState({ open: false, });

        setTimeout(() => {
            this.props.close();
        }, 300);
    }
    render() {

        return (
            <Dialog open={this.state.open} fullScreen TransitionComponent={this.state.transition}>
                <DialogTitle style={{ backgroundColor: '#e2d0f9', color: '#1c1679' }}>CIP detail</DialogTitle>
                <DialogContent>
                    <Card style={{ padding: 'calc(3%)', margin: '10px', boxShadow: '1px 0px 12px 0px rebeccapurple' }} variant="outlined">
                        <Grid container spacing={1}>
                            <Grid item xs={2}>
                                <strong>CIP No:</strong> {this.state.db?.data?.cipNo || "-" }
                            </Grid>
                            <Grid item xs={2}>
                                <strong>sub CIP No:</strong> {this.state.db?.data?.subCipNo || "-" }
                            </Grid>
                            <Grid item xs={3}>
                                <strong>PO no: </strong> {this.state.db?.data?.poNo || "-" }
                            </Grid>
                            <Grid item xs={2}>
                                <strong>Vendor code:</strong> {this.state.db?.data?.vendorCode || "-" }
                            </Grid>
                            <Grid item xs={3} style={{ textAlign: 'center' }}>
                                <strong>Vendor:</strong> {this.state.db?.data?.vendor || "-" }
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={2}>
                                <strong>ACQ date:</strong> {this.state.db?.data?.acqDate || "-" }
                            </Grid>
                            <Grid item xs={2}>
                                <strong>INV date:</strong> {this.state.db?.data?.invDate || "-" }
                            </Grid>
                            <Grid item xs={3}>
                                <strong>Received date: </strong> {this.state.db?.data?.receivedDate || "-" }
                            </Grid>
                            <Grid item xs={2}>
                                <strong>INV no:</strong> {this.state.db?.data?.invNo || "-" }
                            </Grid>
                        </Grid>

                        <Grid container spacing={1} style={{ marginTop: 'calc(1%)'}}>
                        <Grid item xs={12}>
                                <strong>Name:</strong> {this.state.db?.data?.name || "-" }
                            </Grid>
                        </Grid>

                        <Grid container spacing={1} style={{ marginTop: 'calc(1%)'}}>
                            <Grid item xs={3}>
                                <strong>Qty:</strong> {this.state.db?.data?.qty || "-" }
                            </Grid>
                            <Grid item xs={3}>
                                <strong>EX.Rate:</strong> {this.state.db?.data?.exRate || "-" }
                            </Grid>
                            <Grid item xs={3}>
                                <strong>Cur: </strong> {this.state.db?.data?.cur || "-" }
                            </Grid>
                            <Grid item xs={3}>
                                <strong>PER UNIT:</strong> {this.state.db?.data?.perUnit || "-" }
                            </Grid>
                            <Grid item xs={4}>
                                <strong>TOTAL (JPY/USD):</strong> {this.state.db?.data?.totalJpy || "-" }
                            </Grid>
                        </Grid>

                        <Grid container spacing={1}>
                            <Grid item xs={3}>
                                <strong>TOTAL (JPY/USD):</strong> {this.state.db?.data?.totalJpy_1 || "-" }
                            </Grid>
                            <Grid item xs={3}>
                                <strong>TOTAL (THB):</strong> {this.state.db?.data?.totalThb || "-" }
                            </Grid>
                            <Grid item xs={3}>
                                <strong>PER UNIT (THB): </strong> {this.state.db?.data?.perUnitThb || "-" }
                            </Grid>
                            <Grid item xs={3}>
                                <strong>CC:</strong> {this.state.db?.data?.cc || "-" }
                            </Grid>
                        </Grid>


                        <Grid container spacing={1} style={{ marginTop: 'calc(2%)', }}>
                        <Grid item xs={4}>
                                <strong>TOTAL OF CIP (THB):</strong> {this.state.db?.data?.totalOfCip || "-" }
                            </Grid>
                            <Grid item xs={3}>
                                <strong>Budget code:</strong> {this.state.db?.data?.budgetCode || "-" }
                            </Grid>
                            <Grid item xs={3}>
                                <strong>PR.DIE/JIG:</strong> {this.state.db?.data?.prDieJig || "-" }
                            </Grid>
                            <Grid item xs={2}>
                                <strong>Model: </strong> {this.state.db?.data?.model || "-" }
                            </Grid>
                            
                        </Grid>
                        
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <strong>TOTAL (THB):</strong> {this.state.db?.data?.totalThb || "-" }
                            </Grid>
                            <Grid item xs={4}>
                                <strong>AVERAGE FREIGHT (JPY/USD):</strong> {this.state.db?.data?.averageFreight || "-" }
                            </Grid>
                            <Grid item xs={4}>
                                <strong>AVERAGE INSURANCE (JPY/USD): </strong> {this.state.db?.data?.averageInsurance || "-" }
                            </Grid>
                        </Grid>
                    </Card>


                    {/* CONST CENTER DATA */}
                    <Card style={{ padding: 'calc(1%)', marginTop: 'calc(2%)', boxShadow: '1px 0px 12px 0px rebeccapurple'}} variant="outlined">

                        <Grid container spacing={0}>
                            <Grid item xs={3}>
                                <Card style={{ padding: '5px' }} variant="outlined">
                                    <strong>Operating Date (Plan):</strong> {this.state.db?.data?.cipUpdate.planDate || "-" }
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Card style={{ padding: '5px' }} variant="outlined">
                                    <strong>Operating Date (Act):</strong> {this.state.db?.data?.cipUpdate.actDate || "-" }
                                </Card>
                            </Grid>
                            <Grid item xs={2}>
                                <Card style={{ padding: '5px' }} variant="outlined">
                                    <strong>Result: </strong> {this.state.db?.data?.cipUpdate.result || "-" }
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card style={{ padding: '5px' }} variant="outlined">
                                    <strong>Reason diff (NG) Budget Actual: </strong> {this.state.db?.data?.cipUpdate.reasonDiff || "-" }
                            </Card>
                            </Grid>
                        </Grid>

                        <Grid container spacing={0}>
                            <Grid item xs={3}>
                                <Card style={{ padding: '5px' }} variant="outlined">
                                    <strong>Fixed Asset Code: </strong> {this.state.db?.data?.cipUpdate.fixedAssetCode || "-" }
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Card style={{ padding: '5px' }} variant="outlined">
                                    <strong>Class fixed asset: </strong> {this.state.db?.data?.cipUpdate.classFixedAsset || "-" }
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Card style={{ padding: '5px' }} variant="outlined">
                                    <strong>Fixed asset name: </strong> {this.state.db?.data?.cipUpdate.fixAssetName || "-" }
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Card style={{ padding: '5px' }} variant="outlined">
                                    <strong>Serial no: </strong> {this.state.db?.data?.cipUpdate.serialNo || "-" }
                                </Card>
                            </Grid>
                        </Grid>

                        <Grid container spacing={0}>
                            <Grid item xs={3}>
                                <Card style={{ padding: '5px' }} variant="outlined">
                                    <strong>Process Die: </strong> {this.state.db?.data?.cipUpdate.processDie || "-" }
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Card style={{ padding: '5px' }} variant="outlined">
                                    <strong>Model: </strong> {this.state.db?.data?.cipUpdate.model || "-" }
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Card style={{ padding: '5px' }} variant="outlined">
                                    <strong>Cost center of User: </strong> {this.state.db?.data?.cipUpdate.costCenterOfUser || "-" }
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Card style={{ padding: '5px' }} variant="outlined">
                                    <strong>Transfer to supplier: </strong> {this.state.db?.data?.cipUpdate.tranferToSupplier || "-" }
                                </Card>
                            </Grid>
                        </Grid>

                        <Grid container spacing={0}>
                            <Grid item xs={3}>
                                <Card style={{ padding: '5px' }} variant="outlined">
                                    <strong>ให้ขึ้น Fix Asset  กี่ตัว: </strong> {this.state.db?.data?.cipUpdate.upFixAsset || "-" }
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Card style={{ padding: '5px' }} variant="outlined">
                                    <strong>New BFMor Add BFM: </strong> {this.state.db?.data?.cipUpdate.newBFMorAddBFM || "-" }
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <Card style={{ padding: '5px' }} variant="outlined">
                                    <strong>Reason for delay: </strong> {this.state.db?.data?.cipUpdate.reasonForDelay || "-" }
                                </Card>
                            </Grid>
                        </Grid>

                        <Grid container spacing={0}>
                            <Grid item xs={5}>
                                <Card style={{ padding: '5px' }} variant="outlined">
                                    <strong>REMARK (Add CIP/BFM No.): </strong> {this.state.db?.data?.cipUpdate.remark || "-" }
                                </Card>
                            </Grid>
                            <Grid item xs={7}>
                                <Card style={{ padding: '5px' }} variant="outlined">
                                    <strong>ITC BOI type: </strong> {this.state.db?.data?.cipUpdate.boiType || "-" }
                                </Card>
                            </Grid>
                        </Grid>

                        <Signature />
                    </Card>


                    {/* SIGNATURE  */}
                    <Signature />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" variant="contained" onClick={this.handleClose} style={{ backgroundColor: '#e48989' }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default MoreDetail;