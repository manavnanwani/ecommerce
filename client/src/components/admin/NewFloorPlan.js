import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { v4 as uuid4 } from 'uuid';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems } from './listItems';
// Firebase
import { storage } from '../../Firebase/index';
import { API_SERVICE } from '../../config/URI';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Dropzone from 'react-dropzone';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  pos: {
    marginBottom: 12,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '3vh'
  },
  cardroot: {
      minWidth: 230,
  },
}));



export default function NewFloorPlan({ location }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [file, setFile] = React.useState([]);
  const [photoDownloadUrl1, setphotoDownloadUrl1] = React.useState('https://waihihire.co.nz/perch/resources/categories/product-dummy-1-1-w768.jpg');
  const [openMessage, setOpenMessage] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const [suite, setsuite] = React.useState('');
  const [price, setprice] = React.useState('');
  const [sqft, setsqft] = React.useState('');
  const [baths, setbaths] = React.useState('');
  const [beds, setbeds] = React.useState('');
  const [maintenance, setmaintenance] = React.useState('');
  const [floor, setfloor] = React.useState('');
  const [occupancy, setoccupancy] = React.useState('');
  const [propertytax, setpropertytax] = React.useState('');
  const [view, setview] = React.useState('');


  const handleClick = () => {
    setOpenMessage(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenMessage(false);
    }

  React.useEffect(() => {
    if (file.length > 0) {
        onSubmit();
    } else {
        console.log("N");
    }
    }, [file])

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  
  const handleDrop = async (acceptedFiles) => {
    setFile(acceptedFiles.map(file => file));
    }

    const onSubmit = () => {
        if (file.length > 0) {
            file.forEach(file => {
                var file_name = file.name; 
                var fileExtension = file_name.split('.').pop();
                if ( fileExtension === 'png' || fileExtension === 'jpeg' || fileExtension === 'jpg' || fileExtension === 'PNG' || fileExtension === 'JPG' ) {
                    var uniquetwoKey = uuid4();
                    const uploadTask = storage.ref(`floorplans/${uniquetwoKey}/${file.name}`).put(file);
                    uploadTask.on('state_changed', (snapshot) => {
                        const progress =  Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        handleClick();
                        setMessage(`Uploading ${progress} %`);
                    },
                    (error) => {
                        setMessage(error);
                        handleClick();
                    },
                    async () => {
                        // When the Storage gets Completed
                        const filePath = await uploadTask.snapshot.ref.getDownloadURL();
                        handleClick();
                        setMessage('File Uploaded');
                        setphotoDownloadUrl1(filePath);
                    });
                } else {
                    handleClick();
                    setMessage('Please Upload Images Only');
                }
            })
        } else {
            setMessage('No File Selected Yet');
        }
    }


    const addnewfloorplan = () => {
        var uploadData = {
            suite,
            price,
            sqft,
            baths,
            beds,
            maintenance,
            floor,
            occupancy,
            propertytax,
            view,
            photoDownloadUrl1
        }
        axios.post(`${API_SERVICE}/api/v1/main/addnewfloorplan`, uploadData)
        .then((response) => {
            
        }).catch(err => console.log(err));
        setTimeout(function(){ 
            window.location.href = "/admin/floorplans?n=s";
        }, 1800);
    }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Snackbar
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            open={openMessage}
            autoHideDuration={10000}
            onClose={handleClose}
            message={message}
            action={
            <React.Fragment>
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </React.Fragment>
            }
        />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
            <Typography style={{ marginBottom: '12px' }} component="h1" variant="h5">
                Add New Floor Plan
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Suite"
                    onChange={(event) => setsuite(event.target.value)}
                />
                </Grid>
                <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Price From"
                    onChange={(event) => setprice(event.target.value)}
                />
                </Grid>
                <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="SQFT"
                    onChange={(event) => setsqft(event.target.value)}
                />
                </Grid>
                <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Beds"
                    onChange={(event) => setbeds(event.target.value)}
                />
                </Grid>
                <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Baths"
                    onChange={(event) => setbaths(event.target.value)}
                />
                </Grid>
                <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Maintenance"
                    onChange={(event) => setmaintenance(event.target.value)}
                />
                </Grid>
                <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Starting Floor"
                    onChange={(event) => setfloor(event.target.value)}
                />
                </Grid>
                <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Occupancy"
                    onChange={(event) => setoccupancy(event.target.value)}
                />
                </Grid>
                <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Property Tax"
                    onChange={(event) => setpropertytax(event.target.value)}
                />
                </Grid>
                <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="View"
                    onChange={(event) => setview(event.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                    <center>
                        <img style={{ width: '20vh', marginTop: '4px' }} src={photoDownloadUrl1} alt="Image 1" />
                        <Dropzone onDrop={handleDrop}>
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps({ className: "dropzone" })}>
                                    <input accept="image/*" {...getInputProps()} />
                                    <Button size="large" color="primary" variant="outlined">Click To Upload Floor Plan Image</Button>
                                </div>
                            )}
                        </Dropzone>
                    </center>
                </Grid>
            </Grid>
            <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                style={{ marginTop: '8px' }}
                className={classes.submit}
                onClick={addnewfloorplan}
            >
                Submit
            </Button>

          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}