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
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { API_SERVICE, SECRET_KEY } from '../../../config/URI';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';
import { firestore } from '../../../Firebase/index';

import {
    BrowserView,
    MobileView
} from "react-device-detect";

const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 600,
      marginTop: '10px'
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
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
        minWidth: 285,
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const CartItemList = ({ deleteItem, addItem, allItem }) => {
    const classes = useStyles();
    var aboutallItem = `${allItem.product.about}`;
    if (allItem.product.about !== '') {
        aboutallItem = aboutallItem.substring(0, 50);
    }
    var photo1 = allItem.product.photo[0];
    var photo2 = allItem.product.photo[1];
    var photo3 = allItem.product.photo[2];
    var photo4 = allItem.product.photo[3];

    var priceOf = allItem.product.price/100;
    return (
        <>
            <Grid item xs={3}>
                <Card className={classes.cardroot} variant="outlined">
                    <CardContent>
                        <IconButton onClick={() => deleteItem(allItem._id)} color="primary" aria-label="upload picture" component="span">
                            <DeleteIcon color="secondary" />
                        </IconButton>
                        {
                            allItem.product.verified ? (
                                <img style={{ float: 'right' }} src="https://img.icons8.com/color/28/000000/verified-badge.png" />
                            ) : null
                        }
                        <br />
                        <br />
                        <center>
                            <img style={{ width: '30vh' }} src = {photo1} alt = "product image" />
                        </center>
                        <Typography className={classes.pos} >
                            {allItem.product.name}
                        </Typography>
                        <center>
                            
                            <img src="https://img.icons8.com/fluent/28/000000/star.png"/>
                            <img src="https://img.icons8.com/fluent/28/000000/star.png"/>
                            <img src="https://img.icons8.com/fluent/28/000000/star.png"/>
                            <img src="https://img.icons8.com/fluent/28/000000/star.png"/>
                            
                            <p>
                                {`(${allItem.product.rating}/5)`}
                            </p>
                        </center>
                        <Typography style={{ textAlign: 'center', marginTop: '4px' }} variant="body2" component="p">
                            {aboutallItem}
                        </Typography>
                    </CardContent>
                    <div style={{ padding: '4px' }}>
                        <Button onClick={() => addItem(allItem)} variant="outlined" fullWidth >Add to Compare</Button>
                        <Button target="_blank" href={allItem.product.url} size="large" style={{ marginTop: '2px', backgroundColor: '#000000', color: '#ffffff' }} variant="outlined" fullWidth >View Item</Button>
                    </div>
                </Card>
            </Grid>
        </>
    )
}

const WishList = () => {
    const classes = useStyles();
    const [allItems, setAllItems] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [message, setmessage] = React.useState('');

    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };

    React.useEffect(() => {
        var uid = sessionStorage.getItem("userId");
        axios.get(`${API_SERVICE}/api/v1/main/findallwishlishtcartitems/${uid}`)
            .then(response => {
                setAllItems(response.data);
                setLoading(false);
            })
    }, []);


    const refreshList = () => {
        var uid = sessionStorage.getItem("userId");
        axios.get(`${API_SERVICE}/api/v1/main/findallwishlishtcartitems/${uid}`)
            .then(response => {
                setAllItems(response.data);
                setLoading(false);
            })
    }

    const deleteItem = (documentId) => {
        setLoading(true);
        var uid = sessionStorage.getItem("userId");
        axios.get(`${API_SERVICE}/api/v1/main/removeitemwishlisttocart/${documentId}`)
            .then((response) => {
                if (response.status === 200) {
                    refreshList();
                    handleClick();
                    setmessage('Item Removed from Wish List');
                } 
            }).catch(err => console.log(err));
    }

    const addItem = (product) => {
        var uid = sessionStorage.getItem("userId");
        var docRef = firestore.collection("cart").doc(uid);
        var myproduct = product.product;
        docRef.get().then(function(doc) {
            if (doc.exists) {
                var items = doc.data().items;
                if (items === 4) {
                    handleClick();
                    setmessage('Maximum Items in Cart Exceeded');
                } else {
                    // Send Item to the Card in Database
                    var uploadData = {
                        productId: product._id,
                        userId: uid,
                        product: myproduct
                    }
                    axios.post(`${API_SERVICE}/api/v1/main/additemtocart`, uploadData)
                        .then((response) => {
                            if (response.status === 200) {
                                handleClick();
                                setmessage('Item Added for Compare');
                                items = items + 1;
                                docRef.set({
                                    items 
                                }, { merge: true });
                            } else if (response.status === 201) {
                                handleClick();
                                setmessage('Item Already Added for Compare');
                            }
                        }).catch(err => console.log(err));
                }
            } else {
                docRef.set({
                    items: 1 
                }, { merge: true });
                var uploadData = {
                    productId: product._id,
                    userId: uid,
                    product: myproduct
                }
                axios.post(`${API_SERVICE}/api/v1/main/additemtocart`, uploadData)
                    .then((response) => {
                        if (response.status === 200) {
                            handleClick();
                            setmessage('Item Added for Compare');
                        } 
                    }).catch(err => console.log(err));
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }

    const showCartItemList = () => {
        return allItems.map(allItem => {
            return <CartItemList deleteItem={deleteItem} addItem={addItem} allItem={allItem} key={allItem._id}  />
        })
    }
    
    return (
        <div>
        <Snackbar
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            action={
            <React.Fragment>
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
                </IconButton>
            </React.Fragment>
            }
        >
            <Alert onClose={handleClose} severity="success">
                {message}
            </Alert>
        </Snackbar>
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
                <BrowserView>
                    <Container style={{ marginTop: '20px' }}>
                    {
                        loading === true ? (
                            <center style={{ marginTop: '10%' }}>
                                <CircularProgress />
                            </center>
                        ) : (
                            allItems && allItems.length ? (
                            <>
                                <Grid container spacing={3}>
                                    {showCartItemList()}
                                </Grid>
                            </>
                            ) : (
                                <>
                                    <center style={{ marginTop: '5%' }}>
                                        <h1>
                                            Empty Wish List
                                        </h1>
                                        <img alt="Empty Cart" alt="Cart" src="https://cdn.dribbble.com/users/2046015/screenshots/4591856/first_white_girl_drbl.gif" />
                                    </center>
                                </>
                            )
                        )
                    }
                    </Container>
                </BrowserView>
        </div>
    )
}

export default WishList;
