import React, { useState, useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  Divider,
  IconButton,
  List,
  Typography,
  Toolbar,
  AppBar,
  Snackbar,
  CssBaseline,
  Container,
  CardContent,
  Card,
  Grid,
  Button,
} from "@material-ui/core";
import { mainListItems } from "./listItems.js";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

import { API_SERVICE, SECRET_KEY } from "../../config/URI";
import axios from "axios";
import { DataContext } from "./context/dataContext";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  pos: {
    marginBottom: 12,
    color: "#000000",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "3vh",
  },
  cardroot: {
    minWidth: 230,
  },
}));

const ViewProducts = () => {
  const [currentData, setCurrentData] = useContext(DataContext);
  const [message, setMessage] = React.useState("");
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [products, setProducts] = React.useState([]);

  //
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };
  //

  React.useEffect(() => {
    axios
      .get(`${API_SERVICE}/api/v1/main/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            All Products
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
          {products.length === 0 && <h1>Loading</h1>}
          <Grid style={{ display: "flex" }} spacing={3} container>
            {products.length > 0 &&
              products.map((p) => (
                <Grid item md={4} sm={6}>
                  <Card>
                    <CardContent>
                      <center>
                        <a href={p.url}>
                          <img
                            style={{ width: "30vh", height: "240px" }}
                            src={p.images[0]}
                            alt="product image"
                          />
                        </a>
                      </center>
                      <Typography className={classes.pos}>{p.name}</Typography>
                      <Typography
                        style={{ textAlign: "center" }}
                        variant="body2"
                        component="p"
                      >
                        Rating : {p.rating}
                      </Typography>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: "10px" }}
                        component={Link}
                        to="/admindashboard/add"
                        onClick={() =>
                          setCurrentData({
                            name: `${p.name}`,
                            category: `${p.category}`,
                            rating: `${p.rating}`,
                            _id: `${p._id}`,
                          })
                        }
                      >
                        Edit
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default ViewProducts;
