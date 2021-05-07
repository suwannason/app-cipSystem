
import React, { Component } from 'react'
import { Grid, Card } from '@material-ui/core';

export default class Signature extends Component {
    render() {
        return (
            <Grid container spacing={0} style={{ marginTop: 'calc(2%)'}}>
                <Grid item xs={8}></Grid>
                <Grid item xs={4}>
                    <Card variant="outlined">
                        <Grid container spacing={0}>
                            <Grid item xs={4} style={{ borderRightStyle: 'groove', textAlign: 'center' }}>
                                Prepare <br /> date prepare
                        </Grid>
                            <Grid item xs={4} style={{ borderRightStyle: 'groove', textAlign: 'center' }}>
                                Check <br /> date check
                        </Grid>
                            <Grid item xs={4} style={{ textAlign: 'center' }}>
                                Approve <br /> date approve
                        </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        )
    }
}
