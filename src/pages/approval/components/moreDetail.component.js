
import React, { Component } from 'react';

import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core';

class MoreDetail extends Component {
    render() {
        return (
            <Dialog open={true} maxWidth>
                <DialogTitle>CIP detail</DialogTitle>
                <DialogContent>
                    Area detail
                </DialogContent>
                <DialogActions>
                    <Button color="primary" variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default MoreDetail;