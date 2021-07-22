import React from 'react'
import Navigation from '../../static/Navigation';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
    
}))(LinearProgress);

const useStyles = makeStyles((theme) => ({
    divider: {
      height: 28,
      margin: 4,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '3vh'
    },
    cardroot: {
        marginBottom: 2,
    },
}));

const Compare = () => {
    const classes = useStyles();
    return (
        <>
            <Navigation />
            <section style={{ margin: '28px 4px 4px 4px' }}>
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
                        <section style={{ marginTop: '10px' }}>
                            <br />
                            <small>Price 240/-</small>
                            <BorderLinearProgress variant="determinate" value={82} />
                            <br /> <hr /> <br />
                            <small>Treding 240</small>
                            <BorderLinearProgress variant="determinate" value={20} />
                            <br /> <hr /> <br />
                            <small>Market Place 240</small>
                            <BorderLinearProgress variant="determinate" value={98} />
                            <br /> <hr /> <br />
                            <small>Quality 240</small>
                            <BorderLinearProgress variant="determinate" value={65} />
                            <br />
                        </section>
                    </CardContent>
                    <CardActions>
                        <Button href="https://www.amazon.in/ELISE-Womens-Green-Sneakers-5-EVAR-WT19-69/dp/B07X9S3BLM?ref_=Oct_DLandingS_D_9eb17ff7_61&smid=AT95IG9ONZD7S" size="large" style={{ backgroundColor: '#000000', color: '#ffffff' }} variant="outlined" fullWidth >View Item</Button>
                    </CardActions>
                </Card>
                <Card className={classes.cardroot} variant="outlined">
                    <CardContent>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                width="28" height="28"
                                viewBox="0 0 172 172"
                                style={{ float: 'right' }}
                                ><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><path d="M0,172v-172h172v172z" fill="none"></path><g><path d="M86,7.16667l16.125,17.91667l23.29167,-7.16667l5.375,23.29167l23.29167,5.375l-7.16667,23.29167l17.91667,16.125l-17.91667,16.125l7.16667,23.29167l-23.29167,5.375l-5.375,23.29167l-23.29167,-7.16667l-16.125,17.91667l-16.125,-17.91667l-23.29167,7.16667l-5.375,-23.29167l-23.29167,-5.375l7.16667,-23.29167l-17.91667,-16.125l17.91667,-16.125l-7.16667,-23.29167l23.29167,-5.375l5.375,-23.29167l23.29167,7.16667z" fill="#666666"></path><path d="M123.98333,52.31667l-48.73333,48.73333l-20.06667,-20.06667l-10.03333,10.03333l30.1,30.1l58.76667,-58.76667z" fill="#e3f2fd"></path></g></g></svg>
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
                                <img src="https://img.icons8.com/fluent/28/000000/star-half.png"/>
                                <p>
                                    (3.5/5)
                                </p>
                            </center>
                            <Typography style={{ textAlign: 'center', marginTop: '4px' }} variant="body2" component="p">
                                some random text format is here for the product
                            </Typography>
                            <section style={{ marginTop: '10px' }}>
                                <br />
                                <small>Price 240/-</small>
                                <BorderLinearProgress variant="determinate" value={12} />
                                <br /> <hr /> <br />
                                <small>Treding 240</small>
                                <BorderLinearProgress variant="determinate" value={43} />
                                <br /> <hr /> <br />
                                <small>Market Place 240</small>
                                <BorderLinearProgress variant="determinate" value={67} />
                                <br /> <hr /> <br />
                                <small>Quality 240</small>
                                <BorderLinearProgress variant="determinate" value={67} />
                                <br />
                            </section>
                        </CardContent>
                        <CardActions>
                            <Button href="https://www.amazon.in/ELISE-Womens-Green-Sneakers-5-EVAR-WT19-69/dp/B07X9S3BLM?ref_=Oct_DLandingS_D_9eb17ff7_61&smid=AT95IG9ONZD7S" size="large" style={{ backgroundColor: '#000000', color: '#ffffff' }} variant="outlined" fullWidth >View Item</Button>
                        </CardActions>
                    </Card>
            </section>
        </>
    )
}

export default Compare
