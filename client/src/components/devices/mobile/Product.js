import React from 'react';
import Navigation from '../../static/Navigation';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { Carousel } from 'react-responsive-carousel';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    feedbackcardroot: {
        maxWidth: '350vh',
        marginBottom: '4px'
    },
    starratingroot: {
        display: 'flex',
        flexDirection: 'column',
        '& > * + *': {
            marginTop: theme.spacing(1),
        },
    }
}));


const Product = () => {
    const classes = useStyles();

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [openProductReview, setOpenProductReview] = React.useState(false);
    const handleClickOpenProductReview = () => {
        setOpenProductReview(true);
    };
    const handleCloseProductReview = () => {
        setOpenProductReview(false);
    };

    return (
        <>
            <Dialog open={openProductReview} onClose={handleCloseProductReview} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Review</DialogTitle>
                <DialogContent>
                <DialogContentText style={{ color: '#000000' }}>
                    Please Write Only Meaningful Comments. Your feedback to the product matters.
                </DialogContentText>
                <Avatar>H</Avatar>
                <center>
                    <Rating name="size-large" defaultValue={0} size="large" />
                </center>
                <TextField
                    id="outlined-multiline-static"
                    label="Comment"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: '10px', marginBottom: '10px' }}
                />
                <br />
                <Button style={{ marginTop: '28px', marginBottom: '10px' }} size="large" style={{ backgroundColor: '#000000', color: '#ffffff' }} variant="outlined" fullWidth >Submit</Button>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseProductReview} color="primary">
                    Cancel
                </Button>
                </DialogActions>
            </Dialog>
            <Navigation />
            <section style={{ margin: '8px 4px 4px 4px' }}>
                    <Carousel>
                        <div>
                            <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/13a.jpg" />
                        </div>
                        <div>
                            <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/13a.jpg" />
                        </div>
                        <div>
                            <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/13a.jpg" />
                        </div>
                        <div>
                            <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/13a.jpg" />
                        </div>
                    </Carousel>
                <div style={{ marginLeft: '12px', marginTop: '8px' }}>
                    <h3>
                        Adidas Men's Plain Regular Fit T-Shirt
                    </h3>
                    <small>SHIRTS</small>
                    <br /> <br />
                    <img src="https://img.icons8.com/fluent/28/000000/star.png"/>
                    <img src="https://img.icons8.com/fluent/28/000000/star.png"/>
                    <img src="https://img.icons8.com/fluent/28/000000/star.png"/>
                    <img src="https://img.icons8.com/fluent/28/000000/star.png"/>
                    <br /> <br />
                    <h1>₹ 1,200</h1>
                    <br />
                    <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, sapiente illo. Sit error voluptas repellat rerum quidem, soluta enim perferendis voluptates laboriosam. Distinctio, officia quis dolore quos sapiente tempore alias.
                    </p>
                    <br />
                    <table>
                    <tr>
                        <th style={{ float: 'left' }}>Model</th>
                        <th >Shirt 5407X</th>
                    </tr>
                    <tr>
                        <th style={{ float: 'left' }}>Color</th>
                        <th >Black</th>
                    </tr>
                    <tr>
                        <th style={{ float: 'left' }}>Delivery</th>
                        <th >India</th>
                    </tr>
                    </table>
                    <br />
                </div>
                <br />
                <Divider />
                <Button size="large" style={{ marginBottom: '8px' }} variant="outlined" fullWidth >Buy Item</Button>
                <Button size="large" style={{ backgroundColor: '#000000', color: '#ffffff', marginBottom: '10px' }} variant="outlined" fullWidth >Add to Compare</Button>
                <br />
                <Divider />

                    <section style={{ marginBottom: '28px' }}>
                        <Button onClick={handleClickOpenProductReview} startIcon={<AddIcon />} fullWidth style={{ marginBottom: '4px', marginTop: '4px' }}>
                            Write Product Review
                        </Button>
                        <Card className={classes.feedbackcardroot} variant="outlined">
                            <div style={{ float: 'right', marginTop: '8px', marginRight: '8px' }}>
                                <img src="https://img.icons8.com/fluent/28/000000/star.png"/>
                                <img src="https://img.icons8.com/fluent/28/000000/star.png"/>
                                <img src="https://img.icons8.com/fluent/28/000000/star.png"/>
                                <img src="https://img.icons8.com/fluent/28/000000/star.png"/>
                                <img src="https://img.icons8.com/fluent/28/000000/star.png"/>
                            </div>
                            <CardHeader
                                avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    R
                                </Avatar>
                                }
                                title="Duke Kage"
                                subheader="September 14, 2016"
                            />
                            
                            <CardContent>
                                
                                <Typography style={{ color: '#000' }} variant="body2" color="textSecondary" component="p">
                                This impressive paella is a perfect party dish and a fun meal to cook together with your
                                guests. Add 1 cup of frozen peas along with the mussels, if you like.
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                
                            </CardActions>
                        </Card>

                        <Card className={classes.feedbackcardroot} variant="outlined">
                            <div style={{ float: 'right', marginTop: '8px', marginRight: '8px' }}>
                                <img src="https://img.icons8.com/fluent/28/000000/star.png"/>
                                <img src="https://img.icons8.com/fluent/28/000000/star.png"/>
                                <img src="https://img.icons8.com/fluent/28/000000/star.png"/>
                                <img src="https://img.icons8.com/fluent/28/000000/star.png"/>
                                <img src="https://img.icons8.com/fluent/28/000000/star.png"/>
                            </div>
                            <CardHeader
                                avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    R
                                </Avatar>
                                }
                                title="Duke Kage"
                                subheader="September 14, 2016"
                            />
                            
                            <CardContent>
                                
                                <Typography style={{ color: '#000' }} variant="body2" color="textSecondary" component="p">
                                This impressive paella is a perfect party dish and a fun meal to cook together with your
                                guests. Add 1 cup of frozen peas along with the mussels, if you like.
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                
                            </CardActions>
                        </Card>
                    </section>
            </section>
        </>
    )
}

export default Product
