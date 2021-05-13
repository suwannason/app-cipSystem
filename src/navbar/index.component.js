import React, { Component } from 'react';

import {
    Grid, Typography, AppBar, Button, Toolbar,
    IconButton, Container, Badge, Popper, Fade, Paper
} from '@material-ui/core';

import { TreeView, TreeItem } from '@material-ui/lab';

import { Menu, ExpandMore, ChevronRight, Notifications } from '@material-ui/icons';

import CIPlist from '../pages/CIPlist/index.component';
import CIPhistpry from '../pages/CIPhistory/index.component';
import CIPimport from '../pages/CSVupload/import.component';

import CIPexport from '../pages/CIPexport/index.component';
import ITC from '../pages/itc/index.component';
import ACC from '../pages/acc/index.component';
import Department from '../pages/approval/approve/department.component';
import CostCenter from '../pages/approval/approve/costCenter.component';
import Cancellation from '../pages/approval/cancel/index.component';

import { reload } from '../middleware/index';

class Navbar extends Component {
    constructor() {
        super();

        this.state = {
            element: null,
            style: null,
            noti: false,
            anchorEl: null,
            navIndex: 1
        };

        this.cipList = this.cipList.bind(this);
        this.cipHistory = this.cipHistory.bind(this);
        this.cipImport = this.cipImport.bind(this);
        this.cipExport = this.cipExport.bind(this);
        this.itc = this.itc.bind(this);
        this.acc = this.acc.bind(this);
        this.department = this.department.bind(this);
        this.cancellation = this.cancellation.bind(this);
        this.costCenter = this.costCenter.bind(this);
        this.notificationClick = this.notificationClick.bind(this);
    }

    componentDidMount() {
        this.cipList();
    }
    costCenter() {
        this.setState({ element: <CostCenter /> })
    }

    department() {
        this.setState({ element: <Department /> })
    }
    cancellation() {
        this.setState({ element: <Cancellation /> })

    }
    cipList() {
        this.setState({ element: <CIPlist /> })
    }
    acc(page) {
        this.setState({ element: <ACC page={page} /> })
    }
    cipHistory() {
        this.setState({ element: <CIPhistpry /> })
    }
    cipImport() {
        this.setState({ element: <CIPimport /> })
    }
    cipExport() {
        this.setState({ element: <CIPexport /> })
    }
    itc(page) {
        this.setState({ element: <ITC page={page} /> })
    }
    notificationClick(event) {
        if (this.state.navIndex === 1) {
            this.setState({ navIndex: -1 })
        }
        if (this.state.navIndex === -1) {
            this.setState({ navIndex: 1 })
        }
        this.setState({
            anchorEl: event.currentTarget,
            noti: !this.state.noti,

        })
    }
    logout() {
        localStorage.clear();

        reload();
    }
    render() {
        return (
            <>
                <AppBar style={{ zIndex: this.state.navIndex }}>
                    <Toolbar style={{ background: 'linear-gradient(90deg, rgba(98,172,231,1) 19%, rgba(135,229,242,1) 44%, rgba(147,224,219,1) 81%)', }}>
                        <IconButton> <Menu style={{ color: '#3f51b5' }} /> </IconButton>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>CIP system</Typography>
                        <Badge badgeContent={4} color="secondary" style={{ marginRight: 'calc(75%)' }}>
                            <Notifications style={{ color: '#081648', cursor: 'pointer' }} onClick={this.notificationClick} />
                        </Badge>
                        <Button style={{ backgroundColor: '#e91e63', color: 'aliceblue', }} onClick={this.logout}> logout </Button>
                    </Toolbar>
                </AppBar>

                <Popper open={this.state.noti} anchorEl={this.state.anchorEl} placement="bottom" transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper style={{ padding: '10px', zIndex: 3 }}>
                                The content of the Popper.
                            </Paper>
                        </Fade>
                    )}
                </Popper>
                {/* #d9eef1 */}
                <Grid container spacing={0} style={{ flexGrow: 1 }}>
                    <Grid item xs={3} style={{ marginTop: 'calc(5.5%)', }}>
                        <Paper style={{ position: 'absolute', width: '25%', height: '100%', backgroundColor: '#d9eef1' }} elevation={0}>
                            <Container maxWidth="xl" style={{ height: 100, flexGrow: 1 }}>

                                <TreeView defaultCollapseIcon={<ExpandMore />} defaultExpandIcon={<ChevronRight />}>
                                    <TreeItem nodeId="a" label="Search">
                                        <TreeItem nodeId="1" label="CIP List" onClick={this.cipList} />
                                        <TreeItem nodeId="2" label="CIP History" onClick={this.cipHistory} />
                                    </TreeItem>
                                </TreeView>

                                <TreeView defaultCollapseIcon={<ExpandMore />} defaultExpandIcon={<ChevronRight />}>
                                    <TreeItem nodeId="b" label="CSV upload">
                                        <TreeItem nodeId="3" label="Import confirm CIP" onClick={this.cipImport} />
                                        <TreeItem nodeId="4" label="Export confirm CIP" onClick={this.cipExport} />
                                    </TreeItem>
                                </TreeView>

                                <TreeView defaultCollapseIcon={<ExpandMore />} defaultExpandIcon={<ChevronRight />}>
                                    <TreeItem nodeId="c" label="Approval">
                                        <TreeItem nodeId="5" label="CC" onClick={() => this.department('department')} />
                                        <TreeItem nodeId="10" label="Cost center" onClick={() => this.costCenter('costCenter')} />
                                        <TreeItem nodeId="6" label="Cancellation" onClick={() => this.cancellation('cancellation')} />
                                    </TreeItem>
                                </TreeView>

                                <TreeView defaultCollapseIcon={<ExpandMore />} defaultExpandIcon={<ChevronRight />}>
                                    <TreeItem nodeId="d" label="ACC">
                                        <TreeItem nodeId="7" label="Waiting FA after approval" onClick={() => this.acc('waitingFA')} />
                                        <TreeItem nodeId="8" label={'On waiting GM & MGR'} onClick={() => this.acc('waitingGM')} />
                                        <TreeItem nodeId="9" label={'Approval budget code diff'} onClick={() => this.acc('approvalBudget')} />
                                    </TreeItem>
                                </TreeView>


                                <TreeView defaultCollapseIcon={<ExpandMore />} defaultExpandIcon={<ChevronRight />}>
                                    <TreeItem nodeId="e" label="ITC">
                                        <TreeItem nodeId="10" label="Waiting confirm" onClick={() => this.itc('waiting')} />
                                        <TreeItem nodeId="11" label={'On confirmed'} onClick={() => this.itc('confirmed')} />
                                    </TreeItem>
                                </TreeView>

                            </Container>
                        </Paper>
                    </Grid>
                    <Grid item xs={9} style={{ marginBottom: 'calc(5%)', marginTop: 'calc(7%)' }}>
                        <Container maxWidth="xl">
                            {this.state.element}
                        </Container>

                    </Grid>
                </Grid>
            </>
        );
    }
}

export default Navbar;