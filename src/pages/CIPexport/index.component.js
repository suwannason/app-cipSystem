
import React, { Component } from 'react';

import { Grid, Card, CardActions, CardActionArea, CardContent, Button, Typography, CardMedia } from '@material-ui/core';

import { DataGrid } from '@material-ui/data-grid';

import Loading from '../../components/loading/index.component';

class CIPexport extends Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            message: 'Downloading CSV'
        }
    }
    render() {
        let loading;
        if (this.state.loading === true) {
            loading = <Loading message={this.state.message} />
        }
        return (

            <Grid container spacing={1}>
                {loading}
                <Grid item xs={6}>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                image={`${process.env.REACT_APP_FILES_PATH}/icons/it.png`}
                                title="Contemplative Reptile"
                            />

                            <CardContent>
                                <Typography gutterBottom variant="h5"> Accounting </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                    across all continents except Antarctica</Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button style={{ backgroundColor: '#7a57ce', color: 'aliceblue' }}>Download</Button>
                        </CardActions>
                    </Card>
                </Grid>


                <Grid item xs={6}>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                image={`${process.env.REACT_APP_FILES_PATH}/icons/it.png`}
                                title="Contemplative Reptile"
                            />

                            <CardContent>
                                <Typography gutterBottom variant="h5"> Accounting </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                    across all continents except Antarctica</Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button style={{ backgroundColor: '#7a57ce', color: 'aliceblue' }}>Download</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

export default CIPexport;