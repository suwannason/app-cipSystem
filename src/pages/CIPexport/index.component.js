
import React, { Component } from 'react';

import { Grid, Card, CardActions, CardActionArea, CardContent, Button, Typography, CardMedia } from '@material-ui/core';

class CIPexport extends Component {
    render() {
        return (

            <Grid container spacing={1}>
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
                            <Button style={{ backgroundColor: '#7a57ce', color: 'aliceblue'}}>Download</Button>
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
                            <Button style={{ backgroundColor: '#7a57ce', color: 'aliceblue'}}>Download</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

export default CIPexport;