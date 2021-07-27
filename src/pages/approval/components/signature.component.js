
import React, { Component } from 'react'
import { Grid, Card } from '@material-ui/core';
import axios from 'axios';


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
            prepare: '-',
            check: '-',
            approve: '-',
        }
        this.getProfile = this.getProfile.bind(this);
    }
    componentDidMount() {
        if (this.props.approval.prepare.empNo === '-') {
            this.setState({ gridItem: 6 });
        }
        this.getProfile();
    }

    async getProfile() {
        try {
            const instance = axios.create({
                baseURL: process.env.REACT_APP_API
            });

            const response = await Promise.all([
                instance.get(`/user/profile/${this.props?.approval?.prepare?.empNo}`),
                instance.get(`/user/profile/${this.props?.approval?.check?.empNo}`),
                instance.get(`/user/profile/${this.props?.approval?.approve?.empNo}`),
            ]);

            const tmp = {};
            if (response[0].data.data !== null) {
                tmp.prepare = response[0].data.data.name;
            }
            if (response[1].data.data !== null) {
                tmp.check = response[1].data.data.name;
            }
            if (response[2].data.data !== null) {
                tmp.approve = response[2].data.data.name;
            }

            this.setState(tmp);
            console.log('Signature: ', response);

        } catch (err) {
            console.log(err.stack);
        }
    }

    render() {
        return (
            <Grid container spacing={0} style={{ marginTop: 'calc(3%)', }}>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                    <Card variant="outlined" style={{ padding: '5px 0px 10px 0px', borderColor: '#2196f3', borderWidth: '2px' }}>

                        <Grid container spacing={0}>
                            <Grid item xs={this.state.gridItem} style={{ borderRightStyle: 'groove', textAlign: 'center' }}>
                                {this.state.prepare} <br /> {this.props.approval.prepare.date}
                            </Grid>


                            <Grid item xs={this.state.gridItem} style={{ borderRightStyle: 'groove', textAlign: 'center' }}>
                                {this.state.check} <br /> {this.props.approval.check.date}
                            </Grid>
                            <Grid item xs={this.state.gridItem} style={{ textAlign: 'center' }}>
                                {this.state.approve} <br /> {this.props.approval.approve.date}
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        )
    }
}
