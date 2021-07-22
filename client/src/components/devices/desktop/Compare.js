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
import LinearProgress from '@material-ui/core/LinearProgress';
import { API_SERVICE, SECRET_KEY } from '../../../config/URI';
import { firestore } from '../../../Firebase/index';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';

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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    gridroot: {
        flexGrow: 1
    }
}));

const CartItemList = ({ deleteItem, allItem }) => {
    const classes = useStyles();
    var aboutallItem = `${allItem.product.about}`;
    if (allItem.product.about !== '') {
        aboutallItem = aboutallItem.substring(0, 50);
    }
    var photo1 = allItem.product.images[0];

    var priceOf = 3442/100;
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
                            <img style={{ width: '180px', height: '220px' }} src = {photo1} alt = "product image" />
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
                        
                        <section style={{ marginTop: '10px' }}>
                            <br />
                            <small>Price {allItem.product.price}/-</small>
                            <BorderLinearProgress variant="determinate" value={priceOf} />
                            <br /> <hr /> <br />
                            <small>Treding 240</small>
                            <BorderLinearProgress variant="determinate" value={20} />
                            <br /> <hr /> <br />
                            <small>Brand {allItem.product.brand}</small>
                            <BorderLinearProgress variant="determinate" value={98} />
                            <br /> <hr /> <br />
                            <small>Quality {allItem.product.rating} / 100</small>
                            <BorderLinearProgress variant="determinate" value={allItem.product.rating} />
                            <br />
                        </section>
                    </CardContent>
                    <CardActions>
                        <Button target="_blank" href={allItem.product.url} size="large" style={{ backgroundColor: '#000000', color: '#ffffff' }} variant="outlined" fullWidth >View Item</Button>
                    </CardActions>
                </Card>
            </Grid>
        </>
    )
  }

const Compare = () => {
    const classes = useStyles();
    const [allItems, setAllItems] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [message, setmessage] = React.useState('');
    const [open, setOpen] = React.useState(false);
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
        axios.get(`${API_SERVICE}/api/v1/main/findallthecartitems/${uid}`)
            .then(response => {
                setAllItems(response.data);
                setLoading(false);
            })
    }, []);

    
    const refreshList = () => {
        var uid = sessionStorage.getItem("userId");
        axios.get(`${API_SERVICE}/api/v1/main/findallthecartitems/${uid}`)
            .then(response => {
                setAllItems(response.data);
                setLoading(false);
            })
    }


    const deleteItem = (documentId) => {
        setLoading(true);
        var uid = sessionStorage.getItem("userId");
        var docRef = firestore.collection("cart").doc(uid);
        docRef.get().then(function(doc) {
            var items = doc.data().items;
            axios.get(`${API_SERVICE}/api/v1/main/removeitemtocart/${documentId}`)
                .then((response) => {
                    if (response.status === 200) {
                        refreshList();
                        handleClick();
                        setmessage('Item Removed from Compare');
                        items = items - 1;
                        docRef.set({
                            items 
                        }, { merge: true });
                    } 
                }).catch(err => console.log(err));
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }


    const showCartItemList = () => {
        return allItems.map(allItem => {
            return <CartItemList deleteItem={deleteItem} allItem={allItem} key={allItem._id}  />
        })
    }

    return (
        <>
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
                                            Empty Compare Box
                                        </h1>
                                    </center>
                                </>
                            )
                        )
                    }
                </Container>
        </>
    )
}

export default Compare
