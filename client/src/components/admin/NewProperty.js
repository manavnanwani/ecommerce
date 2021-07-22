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
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems } from './listItems';
import TextField from '@material-ui/core/TextField';
import Dropzone from 'react-dropzone';
import Snackbar from '@material-ui/core/Snackbar';
import { v4 as uuid4 } from 'uuid';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
// URI
import { API_SERVICE } from '../../config/URI';
// Firebase
import { storage } from '../../Firebase/index';
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

export default function NewProperty() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [file, setFile] = React.useState([]);
    const [file2, setFile2] = React.useState([]);
    const [file3, setFile3] = React.useState([]);
    const [file4, setFile4] = React.useState([]);
    const [file5, setFile5] = React.useState([]);
    const [file6, setFile6] = React.useState([]);
    const [file7, setFile7] = React.useState([]);
    const [openMessage, setOpenMessage] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [photoDownloadUrl1, setphotoDownloadUrl1] = React.useState('https://cdn.dribbble.com/users/422934/screenshots/3194943/t11_dribbble.png');
    const [photoDownloadUrl2, setphotoDownloadUrl2] = React.useState('https://cdn.dribbble.com/users/422934/screenshots/3194943/t11_dribbble.png');
    const [photoDownloadUrl3, setphotoDownloadUrl3] = React.useState('https://cdn.dribbble.com/users/422934/screenshots/3194943/t11_dribbble.png');
    const [photoDownloadUrl4, setphotoDownloadUrl4] = React.useState('https://cdn.dribbble.com/users/422934/screenshots/3194943/t11_dribbble.png');
    const [photoDownloadUrl5, setphotoDownloadUrl5] = React.useState('https://cdn.dribbble.com/users/422934/screenshots/3194943/t11_dribbble.png');
    const [photoDownloadUrl6, setphotoDownloadUrl6] = React.useState('https://cdn.dribbble.com/users/422934/screenshots/3194943/t11_dribbble.png');
    const [photoDownloadUrl7, setphotoDownloadUrl7] = React.useState('https://cdn.dribbble.com/users/422934/screenshots/3194943/t11_dribbble.png');

    const [name, setname] = React.useState('');
    const [price, setprice] = React.useState('');
    const [bedroom, setbedroom] = React.useState('');
    const [kitchen, setkitchen] = React.useState('');
    const [garden, setgarden] = React.useState('');
    const [restroom, setrestroom] = React.useState('');
    const [address, setaddress] = React.useState('');
    const [googlemaps, setgooglemaps] = React.useState('NA');
    const [about, setabout] = React.useState('');
    const [percentage, setpercentage] = React.useState('');
    const [category, setCategory] = React.useState('Condominium');
    const [amountCharged, setAmountCharged] = React.useState(0);
    
    const handleChangeCategory = (event) => {
      setCategory(event.target.value);
    };


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

    React.useEffect(() => {
        if (file2.length > 0) {
            onSubmit2();
        } else {
            console.log("N");
        }
    }, [file2])

    React.useEffect(() => {
        if (file3.length > 0) {
            onSubmit3();
        } else {
            console.log("N");
        }
    }, [file3])

    React.useEffect(() => {
        if (file4.length > 0) {
            onSubmit4();
        } else {
            console.log("N");
        }
    }, [file4])

    React.useEffect(() => {
        if (file5.length > 0) {
            onSubmit5();
        } else {
            console.log("N");
        }
    }, [file5])

    React.useEffect(() => {
        if (file6.length > 0) {
            onSubmit6();
        } else {
            console.log("N");
        }
    }, [file6])

    React.useEffect(() => {
        if (file7.length > 0) {
            onSubmit7();
        } else {
            console.log("N");
        }
    }, [file7])

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

    const handleDrop2 = async (acceptedFiles) => {
        setFile2(acceptedFiles.map(file => file));
    }

    const handleDrop3 = async (acceptedFiles) => {
        setFile3(acceptedFiles.map(file => file));
    }

    const handleDrop4 = async (acceptedFiles) => {
        setFile4(acceptedFiles.map(file => file));
    }

    const handleDrop5 = async (acceptedFiles) => {
        setFile5(acceptedFiles.map(file => file));
    }

    const handleDrop6 = async (acceptedFiles) => {
        setFile6(acceptedFiles.map(file => file));
    }

    const handleDrop7 = async (acceptedFiles) => {
        setFile7(acceptedFiles.map(file => file));
    }

    const onSubmit = () => {
        if (file.length > 0) {
            file.forEach(file => {
                var file_name = file.name; 
                var fileExtension = file_name.split('.').pop();
                if ( fileExtension === 'png' || fileExtension === 'jpeg' || fileExtension === 'jpg' || fileExtension === 'PNG' || fileExtension === 'JPG' ) {
                    var uniquetwoKey = uuid4();
                    const uploadTask = storage.ref(`photos/${uniquetwoKey}/${file.name}`).put(file);
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

    const onSubmit2 = () => {
        if (file2.length > 0) {
            file2.forEach(file => {
                var file_name = file.name; 
                var fileExtension = file_name.split('.').pop();
                if ( fileExtension === 'png' || fileExtension === 'jpeg' || fileExtension === 'jpg' || fileExtension === 'PNG' || fileExtension === 'JPG' ) {
                    var uniquetwoKey = uuid4();
                    const uploadTask = storage.ref(`photos/${uniquetwoKey}/${file.name}`).put(file);
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
                        setphotoDownloadUrl2(filePath);
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

    const onSubmit3 = () => {
        if (file3.length > 0) {
            file3.forEach(file => {
                var file_name = file.name; 
                var fileExtension = file_name.split('.').pop();
                if ( fileExtension === 'png' || fileExtension === 'jpeg' || fileExtension === 'jpg' || fileExtension === 'PNG' || fileExtension === 'JPG' ) {
                    var uniquetwoKey = uuid4();
                    const uploadTask = storage.ref(`photos/${uniquetwoKey}/${file.name}`).put(file);
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
                        setphotoDownloadUrl3(filePath);
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

    const onSubmit4 = () => {
        if (file4.length > 0) {
            file4.forEach(file => {
                var file_name = file.name; 
                var fileExtension = file_name.split('.').pop();
                if ( fileExtension === 'png' || fileExtension === 'jpeg' || fileExtension === 'jpg' || fileExtension === 'PNG' || fileExtension === 'JPG' ) {
                    var uniquetwoKey = uuid4();
                    const uploadTask = storage.ref(`photos/${uniquetwoKey}/${file.name}`).put(file);
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
                        setphotoDownloadUrl4(filePath);
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

    const onSubmit5 = () => {
        if (file5.length > 0) {
            file5.forEach(file => {
                var file_name = file.name; 
                var fileExtension = file_name.split('.').pop();
                if ( fileExtension === 'png' || fileExtension === 'jpeg' || fileExtension === 'jpg' || fileExtension === 'PNG' || fileExtension === 'JPG' ) {
                    var uniquetwoKey = uuid4();
                    const uploadTask = storage.ref(`photos/${uniquetwoKey}/${file.name}`).put(file);
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
                        setphotoDownloadUrl5(filePath);
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

    const onSubmit6 = () => {
        if (file6.length > 0) {
            file6.forEach(file => {
                var file_name = file.name; 
                var fileExtension = file_name.split('.').pop();
                if ( fileExtension === 'png' || fileExtension === 'jpeg' || fileExtension === 'jpg' || fileExtension === 'PNG' || fileExtension === 'JPG' ) {
                    var uniquetwoKey = uuid4();
                    const uploadTask = storage.ref(`photos/${uniquetwoKey}/${file.name}`).put(file);
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
                        setphotoDownloadUrl6(filePath);
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

    const onSubmit7 = () => {
        if (file7.length > 0) {
            file7.forEach(file => {
                var file_name = file.name; 
                var fileExtension = file_name.split('.').pop();
                if ( fileExtension === 'png' || fileExtension === 'jpeg' || fileExtension === 'jpg' || fileExtension === 'PNG' || fileExtension === 'JPG' ) {
                    var uniquetwoKey = uuid4();
                    const uploadTask = storage.ref(`photos/${uniquetwoKey}/${file.name}`).put(file);
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
                        setphotoDownloadUrl7(filePath);
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

    const addnewproperty = () => {
        var uploadData = {
            name,
            price,
            bedroom,
            kitchen,
            garden,
            restroom,
            address,
            googlemaps,
            about,
            photoDownloadUrl1,
            photoDownloadUrl2,
            photoDownloadUrl3,
            photoDownloadUrl4,
            photoDownloadUrl5,
            photoDownloadUrl6,
            photoDownloadUrl7,
            category,
            percentage,
            amountCharged
        }
        axios.post(`${API_SERVICE}/api/v1/main/addnewproperty`, uploadData)
        .then((response) => {
            
        }).catch(err => console.log(err));
        setTimeout(function(){ 
            window.location.href = "/admin/dashboard?n=s";
        }, 1500);
    }

    const calculatepercentage = (e) => {
        var per = e.target.value;
        var charge = (per/100) * Number(price);
        setAmountCharged(charge.toFixed(0));
        setpercentage(per);
    }

    return (
        <div className={classes.root}>
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
        <CssBaseline />
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
            <Container className={classes.container}>
                <CssBaseline />
                <Typography style={{ float: 'right' }} component="h1" variant="h5">
                    Amount To be Charged: {amountCharged}
                </Typography>
                <br />
                <br />
                <div className={classes.paper}>
                    <Typography style={{ marginBottom: '12px' }} component="h1" variant="h5">
                    Add New Property
                    </Typography>
                    <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="Property Name"
                            onChange={(event) => setname(event.target.value)}
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="Price"
                            type="number"
                            onChange={(event) => setprice(event.target.value)}
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="Percentage"
                            type="number"
                            onChange={(event) => calculatepercentage(event)}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="Bed Room"
                            type="number"
                            onChange={(event) => setbedroom(event.target.value)}
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="Kitchen"
                            type="number"
                            onChange={(event) => setkitchen(event.target.value)}
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="Garden"
                            type="number"
                            onChange={(event) => setgarden(event.target.value)}
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="Rest Room"
                            type="number"
                            onChange={(event) => setrestroom(event.target.value)}
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="Address"
                            type="text"
                            onChange={(event) => setaddress(event.target.value)}
                        />
                        </Grid>
                        {/* <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="Google Maps Link"
                            type="text"
                            onChange={(event) => setgooglemaps(event.target.value)}
                        />
                        </Grid> */}
                        {/* <Grid item xs={12}>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select-outlined"
                                value={category}
                                onChange={handleChangeCategory}
                                fullWidth
                            >
                            <MenuItem value='Detached House'>Detached House</MenuItem>
                            <MenuItem value='Condominium'>Condominium</MenuItem>
                            <MenuItem value='Town House'>Town House</MenuItem>
                            </Select>
                        </Grid> */}
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="About Property"
                            multiline
                            onChange={(event) => setabout(event.target.value)}
                            rows={4}
                        />
                        </Grid>
                        <Grid item xs={12}>
                            <center>
                                <img style={{ width: '20vh', marginTop: '4px' }} src={photoDownloadUrl1} alt="Image 1" />
                                <Dropzone onDrop={handleDrop}>
                                    {({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps({ className: "dropzone" })}>
                                            <input accept="image/*" {...getInputProps()} />
                                            <Button size="large" color="primary" variant="outlined">Upload Primary Photo #1</Button>
                                        </div>
                                    )}
                                </Dropzone>
                            </center>
                        </Grid>
                        <Grid item xs={12}>
                            <center>
                                <img style={{ width: '20vh', marginTop: '4px' }} src={photoDownloadUrl2} alt="Image 1" />
                                <Dropzone onDrop={handleDrop2}>
                                    {({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps({ className: "dropzone" })}>
                                            <input accept="image/*" {...getInputProps()} />
                                            <Button size="large" color="primary" variant="outlined">Upload Photo #2</Button>
                                        </div>
                                    )}
                                </Dropzone>
                            </center>
                        </Grid>
                        <Grid item xs={12}>
                            <center>
                                <img style={{ width: '20vh', marginTop: '4px' }} src={photoDownloadUrl3} alt="Image 1" />
                                <Dropzone onDrop={handleDrop3}>
                                    {({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps({ className: "dropzone" })}>
                                            <input accept="image/*" {...getInputProps()} />
                                            <Button size="large" color="primary" variant="outlined">Upload Photo #3</Button>
                                        </div>
                                    )}
                                </Dropzone>
                            </center>
                        </Grid>
                        <Grid item xs={12}>
                            <center>
                                <img style={{ width: '20vh', marginTop: '4px' }} src={photoDownloadUrl4} alt="Image 1" />
                                <Dropzone onDrop={handleDrop4}>
                                    {({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps({ className: "dropzone" })}>
                                            <input accept="image/*" {...getInputProps()} />
                                            <Button size="large" color="primary" variant="outlined">Upload Photo #4</Button>
                                        </div>
                                    )}
                                </Dropzone>
                            </center>
                        </Grid>
                        <Grid item xs={12}>
                            <center>
                                <img style={{ width: '20vh', marginTop: '4px' }} src={photoDownloadUrl5} alt="Image 1" />
                                <Dropzone onDrop={handleDrop5}>
                                    {({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps({ className: "dropzone" })}>
                                            <input accept="image/*" {...getInputProps()} />
                                            <Button size="large" color="primary" variant="outlined">Upload Photo #5</Button>
                                        </div>
                                    )}
                                </Dropzone>
                            </center>
                        </Grid>
                        <Grid item xs={12}>
                            <center>
                                <img style={{ width: '20vh', marginTop: '4px' }} src={photoDownloadUrl6} alt="Image 1" />
                                <Dropzone onDrop={handleDrop6}>
                                    {({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps({ className: "dropzone" })}>
                                            <input accept="image/*" {...getInputProps()} />
                                            <Button size="large" color="primary" variant="outlined">Upload Photo #6</Button>
                                        </div>
                                    )}
                                </Dropzone>
                            </center>
                        </Grid>
                        <Grid item xs={12}>
                            <center>
                                <img style={{ width: '20vh', marginTop: '4px' }} src={photoDownloadUrl7} alt="Image 1" />
                                <Dropzone onDrop={handleDrop7}>
                                    {({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps({ className: "dropzone" })}>
                                            <input accept="image/*" {...getInputProps()} />
                                            <Button size="large" color="primary" variant="outlined">Upload Photo #7</Button>
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
                        onClick={addnewproperty}
                    >
                        Submit
                    </Button>
                    </form>
                </div>
            <Box pt={4}>
                <Copyright />
            </Box>
            </Container>
        </main>
        </div>
    );
}