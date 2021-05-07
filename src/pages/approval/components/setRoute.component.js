
import React, { Component } from 'react';

import {
    Dialog, DialogActions, DialogContent,
    DialogTitle, Button, Grid, Card, Chip, Avatar,
    List, ListItem, ListItemAvatar, ListItemText
} from '@material-ui/core';

import { Close } from '@material-ui/icons';

class SetRoute extends Component {
    constructor() {
        super();

        this.state = {
            open: true,
            checker: [],
            approver: [],

        };
        this.handleClose = this.handleClose.bind(this);
    }

    async getUserDept() {

        try {

        } catch (err) {

        }
    }

    handleClose() {
        this.setState({ open: false, });
    }

    handleDelete() {
        console.log('Delete')
    }
    render() {
        return (
            <Dialog open={this.state.open} fullWidth>
                <DialogTitle style={{ backgroundColor: 'rgb(239 215 255)', boxShadow: '1px -9px 10px 10px #902cea', color: '#321b77' }}>
                    Set Route
                </DialogTitle>
                <DialogContent>
                <img src={`${process.env.REACT_APP_FILES_PATH}/icons/check.png`} alt="check" width={45} height={40} />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Card style={{ padding: '10px', height: 200 }}>
                                <Chip
                                    avatar={<Avatar>M</Avatar>}
                                    label="Primary clickable"
                                    onDelete={this.handleDelete}
                                    color="primary"
                                    deleteIcon={<Close />}
                                />
                            </Card>
                        </Grid>

                        <Grid item xs={6}>
                            <Card style={{ padding: '10px', height: 200, overflowY: 'scroll' }}>
                                <List dense>
                                    <ListItem button>
                                        <ListItemAvatar>
                                            <Avatar style={{ width: '25px', height: '25px', backgroundColor: '#de48c1' }}>M</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText> Suwannason sisuk</ListItemText>
                                    </ListItem>

                                    <ListItem button>
                                        <ListItemAvatar>
                                            <Avatar style={{ width: '25px', height: '25px', backgroundColor: '#de48c1' }}>M</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText> Suwannason sisuk</ListItemText>
                                    </ListItem>
                                </List>
                            </Card>
                        </Grid>
                    </Grid>

                    <img src={`${process.env.REACT_APP_FILES_PATH}/icons/approved.png`} alt="approve" width={50} height={50} />
                    <Grid container spacing={2}>

                        <Grid item xs={6}>
                            <Card style={{ padding: '10px', height: 200 }}>
                                <Chip
                                    avatar={<Avatar >M</Avatar>}
                                    label="Primary clickable"
                                    onDelete={this.handleDelete}
                                    color="primary"
                                    deleteIcon={<Close />}
                                />
                            </Card>
                        </Grid>

                        <Grid item xs={6}>
                            <Card style={{ padding: '10px', height: 200, overflowY: 'scroll' }}>
                                <List dense>
                                    <ListItem button>
                                        <ListItemAvatar>
                                            <Avatar style={{ width: '25px', height: '25px' }}>M</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText> Suwannason sisuk</ListItemText>
                                    </ListItem>

                                    <ListItem button>
                                        <ListItemAvatar>
                                            <Avatar style={{ width: '25px', height: '25px' }}>M</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText> Suwannason sisuk</ListItemText>
                                    </ListItem>
                                </List>
                            </Card>

                        </Grid>
                    </Grid>

                </DialogContent>

                <DialogActions style={{ backgroundColor: 'rgb(212 179 224)' }}>
                    <Button style={{ backgroundColor: 'rgb(5 11 64)', color: 'aliceblue' }}>OK</Button>
                    <Button style={{ backgroundColor: 'rgb(111 11 11)', color: 'aliceblue' }}>close</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default SetRoute;