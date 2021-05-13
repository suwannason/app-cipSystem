
import React from 'react';

import Grid from '@material-ui/core/Grid';
import moment from 'moment';

// import 'date-fns'
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogActions from '@material-ui/core/DialogActions';

class DatePickerRange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            startDate: new Date(),
            endDate: new Date(),
        }
        this.startDateSelect = this.startDateSelect.bind(this);
        this.endDateSelect = this.endDateSelect.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onclose = this.onclose.bind(this);
    }
    startDateSelect(date) {
        this.setState({
            startDate: new Date(date),
        })
    }
    endDateSelect(date) {
        this.setState({
            endDate: new Date(date),
        })
    }
    componentDidMount() {
        this.setState({ open: true, })
    }

    onclose() {
        this.props.callBackClose(false)
    }
    handleClose() {
        const body = {
            selectedDateStart: moment(this.state.startDate).format('YYYY/MM/DD'),
            selectedDateEnd: moment(this.state.endDate).format('YYYY/MM/DD'),
            status:true
        }
        // console.log(body)
        this.props.callBackClose(body)
    }
    render() {
        const DialogContent = withStyles((theme) => ({
            root: {
                padding: theme.spacing(2),
            },
        }))(MuiDialogContent);
        const DialogActions = withStyles((theme) => ({
            root: {
                margin: 0,
                padding: theme.spacing(1),
            },
        }))(MuiDialogActions);
        return (
            <>
                <Dialog onClose={this.onclose} open={this.state.open} maxWidth="md">
                    <DialogContent style={{ minWidth: '400px', backgroundColor: 'rgb(207 188 226)' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Grid item xs={12} style={{ textAlign: 'center', color: '#55056f' }}>Select Start date</Grid>
                                <center>
                                    <Calendar date={this.state.startDate} onChange={this.startDateSelect} maxDate={this.state.endDate} />
                                </center>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid item xs={12} style={{ textAlign: 'center',color: '#55056f' }}>Select End date</Grid>
                                <center>
                                    <Calendar date={this.state.endDate} onChange={this.endDateSelect} minDate={this.state.startDate} />
                                </center>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions style={{ backgroundColor: 'rgb(166 102 202 / 80%)', }}>
                        <Button autoFocus onClick={this.handleClose} variant="contained" color="primary" style={{ backgroundColor: 'rgb(121 14 181)' }}>
                            OK
          </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}

export default DatePickerRange;
