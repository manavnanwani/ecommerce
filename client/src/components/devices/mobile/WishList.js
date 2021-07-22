import React from 'react'
import Navigation from '../../static/Navigation';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    cardroot: {
        minWidth: 285,
        marginBottom: 8
    },
}));

const WishList = () => {
    const classes = useStyles();
    return (
        <div>
        <CssBaseline />
            <Navigation />
            <center>
                <Paper component="form" className={classes.root}>
                    <InputBase
                        className={classes.input}
                        placeholder="Search Products"
                        inputProps={{ 'aria-label': 'search products' }}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </center>
            <section style={{ marginTop: '29px' }}>
                <Card className={classes.cardroot} variant="outlined">
                    <CardContent>
                        <img style={{ float: 'right' }} src="https://img.icons8.com/color/28/000000/verified-badge.png"/>
                        <br />
                        <br />
                        <center>
                            <img style={{ width: '30vh' }} src = "https://images-na.ssl-images-amazon.com/images/I/613SYKy-XPL._UL1200_.jpg" alt = "product image" />
                        </center>
                        <Typography className={classes.pos} >
                        adjective
                        </Typography>
                        <center>
                            <img src="https://img.icons8.com/fluent/28/000000/star.png"/>
                            <img src="https://img.icons8.com/fluent/28/000000/star.png"/>
                            <img src="https://img.icons8.com/fluent/28/000000/star.png"/>
                            <img src="https://img.icons8.com/fluent/28/000000/star.png"/>
                            <p>
                                (4/5)
                            </p>
                        </center>
                        <Typography style={{ textAlign: 'center', marginTop: '4px' }} variant="body2" component="p">
                            some random text format is here for the product
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button href="https://www.amazon.in/ELISE-Womens-Green-Sneakers-5-EVAR-WT19-69/dp/B07X9S3BLM?ref_=Oct_DLandingS_D_9eb17ff7_61&smid=AT95IG9ONZD7S" size="large" style={{ backgroundColor: '#000000', color: '#ffffff' }} variant="outlined" fullWidth >View Item</Button>
                    </CardActions>
                </Card>

                <Card className={classes.cardroot} variant="outlined">
                    <CardContent>
                        <img style={{ float: 'right' }} src="https://img.icons8.com/color/28/000000/verified-badge.png"/>
                        <br />
                        <br />
                        <center>
                            <img style={{ width: '30vh' }} src = "https://images-na.ssl-images-amazon.com/images/I/613SYKy-XPL._UL1200_.jpg" alt = "product image" />
                        </center>
                        <Typography className={classes.pos} >
                        adjective
                        </Typography>
                        <center>
                            <img src="https://img.icons8.com/fluent/28/000000/star.png"/>
                            <img src="https://img.icons8.com/fluent/28/000000/star.png"/>
                            <img src="https://img.icons8.com/fluent/28/000000/star.png"/>
                            <img src="https://img.icons8.com/fluent/28/000000/star.png"/>
                            <p>
                                (4/5)
                            </p>
                        </center>
                        <Typography style={{ textAlign: 'center', marginTop: '4px' }} variant="body2" component="p">
                            some random text format is here for the product
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button href="https://www.amazon.in/ELISE-Womens-Green-Sneakers-5-EVAR-WT19-69/dp/B07X9S3BLM?ref_=Oct_DLandingS_D_9eb17ff7_61&smid=AT95IG9ONZD7S" size="large" style={{ backgroundColor: '#000000', color: '#ffffff' }} variant="outlined" fullWidth >View Item</Button>
                    </CardActions>
                </Card>
            </section>
                
        </div>
    )
}

export default WishList;
