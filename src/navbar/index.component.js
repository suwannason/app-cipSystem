import React, { Component } from 'react';

import { Grid, Typography, AppBar, Button, Toolbar, IconButton, Container } from '@material-ui/core';

import { TreeView, TreeItem } from '@material-ui/lab';

import { Menu, ExpandMore, ChevronRight } from '@material-ui/icons';

import CIPlist from '../pages/CIPlist/index.component';
import CIPhistpry from '../pages/CIPhistory/index.component';
import CIPimport from '../pages/CSVupload/import.component';

import CIPexport from '../pages/CIPexport/index.component';

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
    }

    componentDidMount() {
        this.cipList();
    }
    
    cipList() {
        this.setState({ element: <CIPlist /> })
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

                <Grid container spacing={0} style={{ marginTop: 'calc(6%)', flexGrow: 1 }}>
                    <Grid item xs={3} style={{ padding: '10px' }}>
                        <Container maxWidth="sm">

                            <TreeView defaultCollapseIcon={<ExpandMore />} defaultExpandIcon={<ChevronRight />}>
                                <TreeItem nodeId="a" label="Search">
                                    <TreeItem nodeId="2" label="CIP List" onClick={this.cipList} />
                                    <TreeItem nodeId="3" label="CIP History" onClick={this.cipHistory} />
                                </TreeItem>
                            </TreeView>

                            <TreeView defaultCollapseIcon={<ExpandMore />} defaultExpandIcon={<ChevronRight />}>
                                <TreeItem nodeId="b" label="CSV upload">
                                    <TreeItem nodeId="2" label="Import confirm CIP" onClick={this.cipImport} />
                                    <TreeItem nodeId="3" label="Export confirm CIP" onClick={this.cipExport} />
                                </TreeItem>
                            </TreeView>

                            <TreeView defaultCollapseIcon={<ExpandMore />} defaultExpandIcon={<ChevronRight />}>
                                <TreeItem nodeId="c" label="Approval">
                                    <TreeItem nodeId="2" label="Approval" />
                                    <TreeItem nodeId="3" label="Cancellation" />
                                </TreeItem>
                            </TreeView>

                            <TreeView defaultCollapseIcon={<ExpandMore />} defaultExpandIcon={<ChevronRight />}>
                                <TreeItem nodeId="d" label="ACC">
                                    <TreeItem nodeId="2" label="Waiting FA after approval" />
                                    <TreeItem nodeId="3" label={'On waiting GM & MGR'} />
                                    <TreeItem nodeId="4" label={'Approval budget code diff'} />
                                </TreeItem>
                            </TreeView>

                        </Container>
                    </Grid>
                    <Grid item xs={9} style={{ paddingRight: 'calc(2%)', }}>

                       
                            {this.state.element}

                    </Grid>
                </Grid>
            </>
        );
    }
}

export default Navbar;