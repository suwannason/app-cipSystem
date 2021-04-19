
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

class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            startDate: new Date(),
        }
        this.startDateSelect = this.startDateSelect.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onclose = this.onclose.bind(this);
    }
    startDateSelect(date) {
        this.setState({
            startDate: new Date(date),
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
            selectedDate: moment(this.state.startDate).format('YYYY/MM/DD'),
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
                    <DialogContent style={{ minWidth: '400px', backgroundColor: 'rgb(242 234 255)' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Grid item xs={12} style={{ textAlign: 'center' }}>Select date</Grid>
                                <center>
                                    <Calendar date={this.state.startDate} onChange={this.startDateSelect} />
                                </center>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions style={{ backgroundColor: 'rgb(214 204 239)'}}>
                        <Button autoFocus onClick={this.handleClose} variant="contained" color="primary" style={{ backgroundColor: 'rgb(214 95 210)' }}>
                            OK
          </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}
export default DatePicker;
