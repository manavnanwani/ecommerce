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
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems } from './listItems';
import queryString from 'query-string';
import { API_SERVICE } from '../../config/URI';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

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
  listroot: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const PropertyList = ({ i, property }) => {
  return (
      <>
        <Grid item xs={3}>
          <div className="card">
            <div className="row p-2">
                <div className="col h6 font-weight-bold text-center">
                    THC <br />
                    {`${property.product.thc} %`}
                </div>
                <div className="col h6 font-weight-bold text-center">
                    CBD <br />
                    {`${property.product.cbd} %`}
                </div>
            </div>
            <center>
                <img style={{ width: '75%' }} src={property.product.photo} />
            </center>
            <center className="text-dark">
                <h6 className="font-weight-bold">
                    {property.product.type}
                </h6>
                <h5 className="font-weight-bold">
                    {property.product.name}
                </h5>
                <h6 className="font-weight-bold">
                    {property.product.category}
                </h6>
            </center>
            <center>
                <h5 className="font-weight-bold">
                    {`$ ${property.product.price}/g`}
                </h5>
            </center>
        </div>
        </Grid>
      </>
  )
}

export default function OrderInfo({ location }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [loading, setloading] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [property, setProperties] = React.useState({});
  const [reservecharges, setreservecharges] = React.useState('0');

  React.useEffect(() => {
    const { id } = queryString.parse(location.search);
    axios.get(`${API_SERVICE}/api/v1/main/getorderdetails/${id}`)
      .then(response => {
          setProperties(response.data);
          setloading(false);
          console.log(response.data);
      })
  }, []);


  const showPropertyList = () => {
      var i = 0; 
      return property.map(property => {
          i = i + 1;
          return <PropertyList i={i} property={property} key={property._id}  />
      })
  }

  return (
    <div className={classes.root}>
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
        <Container maxWidth="lg" className={classes.container}>
          <button className="btn btn-lg btn-primary btn-block mt-2">
            Mark as Out for Delivery
          </button>
          <button className="btn btn-lg btn-success btn-block mt-2">
            Mark as Out for Delivery
          </button>
          <br />
          {
            loading === false ? (
                <>
                  <Grid container spacing={3}>
                    {showPropertyList()}
                  </Grid>
                </>
            ) : null
          }
            
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}