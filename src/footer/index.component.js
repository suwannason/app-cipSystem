
import React, { Component } from 'react';

import './footer.css';

import { Grid } from '@material-ui/core';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <Grid container spacing={1}>
                    <Grid itex xs={4}>
                        <center>
                            Canon prachinburi Thailand
                        </center>
                    </Grid>

                    <Grid itex xs={4}>
                        <center>
                            CIP system
                        </center>
                    </Grid>
                    <Grid itex xs={4}>
                        <center>
                            Contact 5211 (Au ICD)
                        </center>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Footer;