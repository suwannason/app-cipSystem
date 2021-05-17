
import React, { Component } from 'react'
import { Grid, Card } from '@material-ui/core';


// PROPS CONTEXT
// approval=
//     { prepare: { empNo: '', date: '' }
//     { check: { empNo: '', date: '' }
//     { approve: { empNo: '', date: '' }
// }

// PROPS CONTEXT
export default class Signature extends Component {
    constructor() {
        super();
        this.state = {
            gridItem: 4,
        }
    }
    componentDidMount() {
        if (this.props.approval.prepare.empNo === '-') {
            this.setState({ gridItem: 6 });
        }
    }

    render() {
        return (
            <Grid container spacing={0} style={{ marginTop: 'calc(2%)', }}>
                <Grid item xs={8}></Grid>
                <Grid item xs={4}>
                    <Card variant="outlined" style={{ padding: '5px 0px 10px 0px', borderColor: '#2196f3', borderWidth: '2px' }}>

                        <Grid container spacing={0}>

                            {(this.props.approval.prepare.empNo !== '-') ?
                                <Grid item xs={this.state.gridItem} style={{ borderRightStyle: 'groove', textAlign: 'center' }}>
                                    {this.props.approval.prepare.empNo} <br /> {this.props.approval.prepare.date}
                                </Grid>
                                : ''}


                            <Grid item xs={this.state.gridItem} style={{ borderRightStyle: 'groove', textAlign: 'center' }}>
                                {this.props.approval.check.empNo} <br /> {this.props.approval.check.date}
                            </Grid>
                            <Grid item xs={this.state.gridItem} style={{ textAlign: 'center' }}>
                                {this.props.approval.approve.empNo} <br /> {this.props.approval.approve.date}
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        )
    }
}
