import React from 'react'
import Navigation from '../../static/Navigation';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { auth, storage } from '../../../Firebase/index';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dropzone from 'react-dropzone';
import { v4 as uuid4 } from 'uuid';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));


const Profile = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [message, setmessage] = React.useState(false);
    const [user, setUser] = React.useState({});
    const [fullName, setFullName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [verifyEmail, setVerifyEmail] = React.useState(false);
    const [file, setFile] = React.useState([]);
    const [btnMessage, setBtnMessage] = React.useState('Change Profile Picture');
    const [loading, setLoading] = React.useState(true);

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
        auth.onAuthStateChanged(function(user) {
            if (user) {
                setUser(user);
                setFullName(user.displayName);
                setEmail(user.email);
                if (!user.emailVerified) {
                    setVerifyEmail(true);
                }
                setLoading(false);
            } else {
                console.log("No");
            }
        });
    }, []);

    React.useEffect(() => {
        if (file.length > 0) {
            onSubmit();
        } else {
            console.log("N");
        }
    }, [file]);

    const onSubmit = () => {
        if (file.length > 0) {
            file.forEach(file => {
                var uniquetwoKey = uuid4() + Date.now();
                const uploadTask = storage.ref(`profilepic/${uniquetwoKey}/${file.name}`).put(file);
                uploadTask.on('state_changed', (snapshot) => {
                    const progress =  Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setBtnMessage(`Uploading ${progress} %`);
                    
                },
                (error) => {
                    console.log(error);
                },
                async () => {
                    // When the Storage gets Completed
                    const filePath = await uploadTask.snapshot.ref.getDownloadURL();
                    setBtnMessage('Upload Photo');
                    setTimeout(() => setFile([]), 1000);
                    auth.onAuthStateChanged(function(user) {
                        if (user) {
                            user.updateProfile({
                                photoURL: filePath
                            }).then(function() {
                                // Update successful.
                            }).catch(function(error) {
                                // An error happened.
                            });
                        } else {
                            console.log("No");
                        }
                    });
                });
            })
        }
    }

    const logOut = () => {
        auth.signOut().then(function() {
            setUser({});
            sessionStorage.setItem("login", false);
            sessionStorage.setItem("userId", false);
            sessionStorage.setItem("userEmail", false);
            window.location.href = "/";
        }).catch(function(error) {
            console.log(error);
        });
    }

    // Style Avatar
    const avatar = {
        verticalAlign: 'middle',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        marginLeft: '8%',
        marginBottom: '4px'
    }

    const handleDrop = async (acceptedFiles) => {
        setFile(acceptedFiles.map(file => file));
    }

    return (
        <>
        <Snackbar
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            open={open}
            autoHideDuration={3000}
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
            <Navigation />
            <Container style={{ marginTop: '10%' }}>
                {
                    loading === true ? (
                        <center style={{ marginTop: '10%' }}>
                            <CircularProgress />
                        </center>
                    ) : (
                        <div className={classes.root}>
                            <Grid container spacing={3}>
                                <Grid item xs>
                                    <center>
                                        <img src={user.photoURL} alt="File Adventure Avatar" style={avatar} />
                                            {
                                                <Dropzone onDrop={handleDrop}>
                                                    {({ getRootProps, getInputProps }) => (
                                                        <div {...getRootProps({ className: "dropzone" })}>
                                                        <input {...getInputProps()} />
                                                            <Button style={{ marginLeft: '8%' }}  color="primary">
                                                            {
                                                                file.length > 0 ? (
                                                                    <>
                                                                        {btnMessage}
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {btnMessage}
                                                                    </>
                                                                )
                                                            }
                                                            </Button>
                                                        </div>
                                                    )}
                                                </Dropzone>
                                            }
                                    </center>
                                </Grid>
                                <Grid item xs>
                                    <h1 style={{ fontWeight: 'bold' }}>
                                        Welcome {fullName}
                                    </h1>
                                    <br />
                                    <TextField
                                        id="outlined-number"
                                        label="Display Name"
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        value={fullName}
                                        onChange={(event) => setFullName(event.target.value)}
                                        style={{ marginBotom: '10px' }}
                                    />
                                    <TextField
                                        id="outlined-number"
                                        label="Email"
                                        type="email"
                                        variant="outlined"
                                        fullWidth
                                        value={email}
                                        style={{ marginTop: '10px' }}
                                        disabled
                                    />
                                    <Button size="large" style={{ backgroundColor: '#000000', color: '#ffffff', marginTop: '10px' }} variant="outlined" fullWidth >Update Profile</Button>
                                    <Button onClick={logOut} size="large" style={{ marginTop: '10px' }} color="secondary" variant="outlined" fullWidth >Logout</Button>
                                </Grid>
                            </Grid>
                        </div>
                    )
                }
            </Container>
        </>
    )
}

export default Profile
