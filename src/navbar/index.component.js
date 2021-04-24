import React, { Component } from 'react';

import { Grid, Typography, AppBar, Button, Toolbar, IconButton, Container } from '@material-ui/core';

import { TreeView, TreeItem } from '@material-ui/lab';

import { Menu, ExpandMore, ChevronRight } from '@material-ui/icons';

import CIPlist from '../pages/CIPlist/index.component';
import CIPhistpry from '../pages/CIPhistory/index.component';
import CIPimport from '../pages/CSVupload/import.component';

import CIPexport from '../pages/CIPexport/index.component';
import ITC from '../pages/itc/index.component';
import ACC from '../pages/acc/index.component';
import Approval from '../pages/approval/index.component';

import { reload } from '../middleware/index';

class Navbar extends Component {
    constructor() {
        super();

        this.state = {
            element: null,
            style: null,
        };

        this.cipList = this.cipList.bind(this);
        this.cipHistory = this.cipHistory.bind(this);
        this.cipImport = this.cipImport.bind(this);
        this.cipExport = this.cipExport.bind(this);
        this.itc = this.itc.bind(this);
        this.acc = this.acc.bind(this);
        this.approval = this.approval.bind(this);
    }

    componentDidMount() {
        this.cipList();
    }

    approval(page) {
        this.setState({ element: <Approval page={page}/>})
    }
    cipList() {
        this.setState({ element: <CIPlist /> })
    }
    acc(page) {
        this.setState({ element: <ACC page={page} />})
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
    logout() {
        localStorage.clear();

        reload();
    }
    render() {
        return (
            <>
                <AppBar>
                    <Toolbar style={{ backgroundColor: '#c1afe4' }}>
                        <IconButton> <Menu style={{ color: '#8565c4' }} /> </IconButton>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>CIP system</Typography>
                        <Button style={{ backgroundColor: '#d22e72c9', color: 'aliceblue' }} onClick={this.logout}> logout </Button>
                    </Toolbar>
                </AppBar>

                <Grid container spacing={0} style={{ marginTop: 'calc(8%)', flexGrow: 1 }}>
                    <Grid item xs={3}>
                        <Container maxWidth="xl">

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
                                    <TreeItem nodeId="5" label="Approval" onClick={() => this.approval('approval')} />
                                    <TreeItem nodeId="6" label="Cancellation" onClick={() => this.approval('cancellation')} />
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
                    </Grid>
                    <Grid item xs={9} style={{ overflow: 'scroll', marginBottom: 'calc(5%)'}}>
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