
import React, { Component, } from 'react';

import { app_jsonInstance, blob_response } from '../../configurations/instance';

import { reload } from '../../middleware/index';

import { Card, Tabs, Tab } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { PersonPin, People } from '@material-ui/icons';

import HistoryRequester from './requester';
import HistryUser from './user';

class CIPlist extends Component {
    constructor() {
        super();

        this.state = {
            dataSelected: [],
            tabValue: 0,
            requesterData: [],
            userData: [],
        };
        this.getData = this.getData.bind(this);
        this.download = this.download.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this)
    }

    componentDidMount() {
        this.getData();
    }
    
    async getData() {
        try {
            const response = await app_jsonInstance().get(`/cip/history`);

            this.setState({
                requesterData: response.data.data.requester,
                userData: response.data.data.user,
            })
            console.log(response.data);

        } catch (error) {
            console.log(error.stack);

            if (error.response.status === 401) {
                localStorage.clear();
                reload();
            }
        }
    }
    async download() {
        try {
            const body = { id: this.state.dataSelected }
            const response = await blob_response().patch(`/cip/download`, body);

            if (window.navigator.msSaveBlob) //IE & Edge
            { //msSaveBlob only available for IE & Edge
                console.log("IE & Edge")
                // const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const blob = new File([response.data], "cip.xlsx")
                window.navigator.msSaveBlob(blob, `cip.xlsx`);
            }
            else //Chrome & FF
            {
                console.log("Chrome")
                const url = window.URL.createObjectURL(new File([response.data], "cip.xlsx"));
                // const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `cip.xlsx`);
                document.body.appendChild(link);
                link.click();
            }

        } catch (err) {
            console.log(err.stack);
        }
    }
    handleTabChange(event, value) {
        this.setState({ tabValue: value })
    }
    render() {

        return (
            <>
                <Card variant="outlined">
                    <Tabs
                        value={this.state.tabValue}
                        onChange={this.handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                        selectionFollowsFocus
                    >
                        <Tab label="Requester" icon={<PersonPin />} />
                        <Tab label="User" icon={<People />} />
                    </Tabs>
                </Card>

                <SwipeableViews index={this.state.tabValue}>

                    <HistoryRequester data={this.state.requesterData} />
                    <HistryUser data={this.state.userData} />

                </SwipeableViews>
            </>
        );
    }
}

export default CIPlist;