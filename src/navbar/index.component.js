import React, { Component } from 'react';

import {
    Grid, Typography, AppBar, Button, Toolbar,
    IconButton, Container, Badge, Paper
} from '@material-ui/core';

import { TreeView, TreeItem } from '@material-ui/lab';

import { Menu, ExpandMore, ChevronRight } from '@material-ui/icons';

import CIPlist from '../pages/CIPlist/index.component';
import CIPhistpry from '../pages/CIPhistory/index.component';
import CIPimport from '../pages/CSVupload/import.component';

import CIPexport from '../pages/CIPexport/index.component';
import ExportHistory from '../pages/CIPexport/history';
import ITC from '../pages/itc/index.component';
import ACC from '../pages/acc/index.component';
import Department from '../pages/approval/approve/department.component';
import CostCenter from '../pages/approval/approve/costCenter.component';
import Cancellation from '../pages/approval/cancel/index.component';
import Users from '../pages/users/index.component';

import { reload } from '../middleware/index';

import { app_jsonInstance } from '../configurations/instance';

class Navbar extends Component {
    constructor() {
        super();

        this.state = {
            element: null,
            style: null,
            ccRequester: null,
            ccUser: null,
            waitingFA: null,
            codeDiff: null,
            itcWating: null,
            itcConfirmed: null,
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
        this.exportHistory = this.exportHistory.bind(this);
        this.getNumber = this.getNumber.bind(this);
        this.users = this.users.bind(this);
    }

    componentDidMount() {
        this.cipList();
        this.getNumber();
    }
    async getNumber() {
        try {

            const response = await app_jsonInstance().get(`/notification`);

            this.setState({
                ccRequester: (response.data.data.ccRequester === '0') ? null : response.data.data.ccRequester,
                ccUser: (response.data.data.ccUser === '0') ? null : response.data.data.ccUser,
                waitingFA: (response.data.data.waitingFA === '0') ? null : response.data.data.waitingFA,
                codeDiff: (response.data.data.codeDiff === '0') ? null : response.data.data.codeDiff,
                itcWating: (response.data.data.itcConfirm === '0') ? null : response.data.data.itcConfirm,
                itcConfirmed: (response.data.data.itcConfirmed === '0') ? null : response.data.data.itcConfirmed,
            })
        } catch (err) {
            console.log(err.stack);
        }
    }
    costCenter() {
        this.setState({ element: <CostCenter /> })
    }
    users() {
        this.setState({ element: <Users /> })
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
    exportHistory() {
        this.setState({ element: <ExportHistory /> })
    }
    itc(page) {
        this.setState({ element: <ITC page={page} /> })
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
                        <Button style={{ backgroundColor: 'rgb(43 31 31)', color: 'aliceblue', }} onClick={this.logout}> logout </Button>
                    </Toolbar>
                </AppBar>

                <Grid container spacing={0} style={{ flexGrow: 1, }}>
                    <Grid item xs={3} style={{ marginTop: 'calc(5.5%)', }}>
                        <Paper style={{ position: 'absolute', width: '25%', height: '100%', backgroundColor: '#d9eef1', }} elevation={0}>
                            <Container maxWidth="xl" style={{ height: 100, flexGrow: 1 }}>

                                <TreeView defaultCollapseIcon={<ExpandMore />} defaultExpandIcon={<ChevronRight />} defaultExpanded={['a']}>
                                    <TreeItem nodeId="a" label="Search">
                                        <TreeItem nodeId="1" label="CIP List" onClick={this.cipList} />
                                        <TreeItem nodeId="2" label="CIP History" onClick={this.cipHistory} />
                                    </TreeItem>
                                </TreeView>

                                <TreeView defaultCollapseIcon={<ExpandMore />} defaultExpandIcon={<ChevronRight />} defaultExpanded={['b']}>
                                    <TreeItem nodeId="b" label="CSV upload">
                                        <TreeItem nodeId="3" label="Import confirm CIP" onClick={this.cipImport} />
                                        {/* <TreeItem nodeId="4" label="Export confirm CIP" onClick={this.cipExport} /> */}
                                    </TreeItem>
                                </TreeView>

                                <TreeView defaultCollapseIcon={<ExpandMore />} defaultExpandIcon={<ChevronRight />} defaultExpanded={['c']}>
                                    <TreeItem nodeId="c" label="Approval">

                                        <TreeItem nodeId="5" label={<Badge badgeContent={this.state.ccRequester} color="secondary">CC - Requester</Badge>} onClick={() => this.department('department')} />
                                        <TreeItem nodeId="10" label={<Badge badgeContent={this.state.ccUser} color="secondary">CC - User</Badge>} onClick={() => this.costCenter('costCenter')} />
                                        {/* <TreeItem nodeId="6" label="Cancellation" onClick={() => this.cancellation('cancellation')} /> */}
                                    </TreeItem>
                                </TreeView>

                                {(localStorage.getItem('dept') === 'ACC') ? <TreeView defaultCollapseIcon={<ExpandMore />} defaultExpandIcon={<ChevronRight />} defaultExpanded={['d']}>
                                    <TreeItem nodeId="d" label="ACC">
                                        <TreeItem nodeId="7" label={<Badge badgeContent={this.state.waitingFA} color="secondary">Waiting FA after approval</Badge>} onClick={() => this.acc('waitingFA')} />
                                        <TreeItem nodeId="8" label={'On waiting GM & MGR'} onClick={() => this.acc('waitingGM')} />
                                        <TreeItem nodeId="9" label={<Badge badgeContent={this.state.codeDiff} color="secondary">Approval budget code diff</Badge>} onClick={() => this.acc('approvalBudget')} />
                                    </TreeItem>
                                </TreeView> : ''}


                                {(localStorage.getItem('dept') === 'ITC BOI') || localStorage.getItem('dept') === 'ACC' ?
                                    <TreeView defaultCollapseIcon={<ExpandMore />} defaultExpandIcon={<ChevronRight />} defaultExpanded={['e']}>
                                        <TreeItem nodeId="e" label="ITC">
                                            <TreeItem nodeId="10" label={<Badge badgeContent={this.state.itcWating} color="secondary">Waiting confirm</Badge>} onClick={() => this.itc('waiting')} />
                                            {/* <TreeItem nodeId="11" label={<Badge badgeContent={this.state.itcConfirmed} color="secondary">On confirmed</Badge>} onClick={() => this.itc('confirmed')} /> */}
                                        </TreeItem>
                                    </TreeView> : ''}

                                {(localStorage.getItem('dept') === 'ACC') ? <TreeView defaultCollapseIcon={<ExpandMore />} defaultExpandIcon={<ChevronRight />} defaultExpanded={['f']}>
                                    <TreeItem nodeId="f" label="Export">
                                        <TreeItem nodeId="12" label="ProPlus" onClick={this.cipExport} />
                                        <TreeItem nodeId="13" label="History" onClick={this.exportHistory} />
                                        <TreeItem nodeId="14" label="Users management" onClick={this.users} />
                                    </TreeItem>
                                </TreeView> : ''}
                            </Container>
                        </Paper>
                    </Grid>
                    <Grid item xs={9} style={{ marginBottom: 'calc(5%)', marginTop: 'calc(7%)', }}>
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