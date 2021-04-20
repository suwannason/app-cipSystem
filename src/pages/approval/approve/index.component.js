
import React, { Component } from 'react';

import { Paper, Tab, Tabs, Container, Grid } from '@material-ui/core';

import SwipeableViews from 'react-swipeable-views';
import Draft from './draft.component';
import Approve from './approve.component';

class Approval extends Component {
    constructor() {
        super();

        this.state = {
            tab: 0,
        };
        this.tabChanged = this.tabChanged.bind(this);
    }
    tabChanged(event, newValue) {
        this.setState({ tab: newValue });
    }
    render() {
        return (
            <>
                <Paper style={{ flexGrow: 1, backgroundColor: '#e1d5ef', color: '#9009a9' }} elevation={0}>
                    <Tabs value={this.state.tab} onChange={this.tabChanged}>
                        <Tab label="Draft">
                            Draft
                    </Tab>
                        <Tab label="Approve">
                            Approve
                    </Tab>
                    </Tabs>
                </Paper>

                <Container maxWidth="md">
                    <SwipeableViews index={this.state.tab}>
                        <div>
                            <Grid container spacing={0}>
                                <Grid item xl={true} xs={12}>
                                    <Draft />
                                </Grid>
                            </Grid>
                        </div>
                        <div>
                            <Grid container spacing={0}>
                                <Grid item xl={true} xs={12}>
                                    <Approve />
                                </Grid>
                            </Grid>
                        </div>
                    </SwipeableViews>
                </Container>
            </>
        );
    }
}

export default Approval;