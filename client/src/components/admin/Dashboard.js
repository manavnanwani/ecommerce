import React, { useContext } from "react";
import { DataContext } from "./context/dataContext";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems } from "./listItems";
import AddIcon from "@material-ui/icons/Add";
import queryString from "query-string";
import { API_SERVICE } from "../../config/URI";
import axios from "axios";
import { Alert, AlertTitle } from "@material-ui/lab";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import { v4 as uuid4 } from "uuid";
import Dropzone from "react-dropzone";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

// Firebase
import { firestore, storage } from "../../Firebase/index";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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

export default function Dashboard({ location }) {
  const [currentData, setCurrentData] = useContext(DataContext);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [name, setname] = React.useState(currentData.name);
  const [price, setprice] = React.useState("");
  const [url, seturl] = React.useState("");
  const [category, setCategory] = React.useState(currentData.category);
  const [file, setFile] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [openSnack, setOpenSnack] = React.useState(false);
  const [downloadUrl, setDownloadUrl] = React.useState("");
  const [bookUploaded, setbookUploaded] = React.useState(false);

  const [rating, setrating] = React.useState(currentData.rating);
  const [brand, setbrand] = React.useState("");
  const [instocks, setinstocks] = React.useState("");
  const [onsale, setonsale] = React.useState("");
  const [freeshipping, setfreeshipping] = React.useState("");
  const [freereturn, setfreereturn] = React.useState("");
  const [shipfrom, setshipfrom] = React.useState("");
  const [length, setlength] = React.useState("");
  const [color, setcolor] = React.useState("");
  const [blackowned, setblackowned] = React.useState("");
  const [producttype, setproducttype] = React.useState("");
  const [origin, setorigin] = React.useState("");
  const [texture, settexture] = React.useState("");
  const [basematerial, setbasematerial] = React.useState("");
  const [lacetype, setlacetype] = React.useState("");
  const [preplucked, setpreplucked] = React.useState("");
  const [bleachedKnots, setbleachedKnots] = React.useState("");
  const [babyHairs, setbabyHairs] = React.useState("");
  const [parting, setparting] = React.useState("");
  const [closureSize, setclosureSize] = React.useState("");
  const [frontalSize, setfrontalSize] = React.useState("");
  const [density, setdensity] = React.useState("");

  React.useEffect(() => {
    if (file.length > 0) {
      onSubmit();
    } else {
      console.log("N");
    }
  }, [file]);

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleClick = () => {
    setOpenSnack(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  const onSubmit = () => {
    if (file.length > 0) {
      file.forEach((file) => {
        const timeStamp = Date.now();
        var uniquetwoKey = uuid4();
        uniquetwoKey = uniquetwoKey + timeStamp;
        const uploadTask = storage
          .ref(`pictures/products/${uniquetwoKey}/${file.name}`)
          .put(file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
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
            setMessage("File Uploaded");
            setDownloadUrl(filePath);
            setbookUploaded(true);
          }
        );
      });
    } else {
      setMessage("No File Selected Yet");
    }
  };

  const handleDrop = async (acceptedFiles) => {
    setFile(acceptedFiles.map((file) => file));
  };

  const addProduct = () => {
    var uploadData = {
      name,
      url,
      rating,
      category,
      brand,
      instocks,
      onsale,
      freeshipping,
      freereturn,
      shipfrom,
      length,
      color,
      blackowned,
      producttype,
      origin,
      texture,
      basematerial,
      lacetype,
      preplucked,
      bleachedKnots,
      babyHairs,
      parting,
      closureSize,
      frontalSize,
      density,
      downloadUrl,
      price,
    };
    axios
      .post(`${API_SERVICE}/api/v1/main/addproduct`, uploadData)
      .then((response) => {})
      .catch((err) => console.log(err));
    // setTimeout(function () {
    //   window.location.href = "/admindashboard?a=s";
    // }, 1800);
  };

  const updateProduct = () => {
    const _id = currentData._id;
    var uploadData = {
      name,
      url,
      rating,
      category,
      brand,
      instocks,
      onsale,
      freeshipping,
      freereturn,
      shipfrom,
      length,
      color,
      blackowned,
      producttype,
      origin,
      texture,
      basematerial,
      lacetype,
      preplucked,
      bleachedKnots,
      babyHairs,
      parting,
      closureSize,
      frontalSize,
      density,
      downloadUrl,
      price,
    };
    axios
      .patch(`${API_SERVICE}/api/v1/main/editproduct/${_id}`, uploadData)
      .then((response) => {})
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.root}>
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
            {currentData.name === undefined ? "Dashboard" : "Edit Product"}
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
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                value={name}
                fullWidth
                label="Name"
                onChange={(event) => setname(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                // required
                fullWidth
                label="URL"
                onChange={(event) => seturl(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Rating Out of 10"
                value={rating}
                onChange={(event) => setrating(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-outlined"
                value={category}
                onChange={handleChangeCategory}
                fullWidth
              >
                <MenuItem value="brazilian">Brazilian Hair</MenuItem>
                <MenuItem value="cambodian">Cambodian Hair</MenuItem>
                <MenuItem value="european">European Hair</MenuItem>
                <MenuItem value="indian">Indian Hair</MenuItem>
                <MenuItem value="malaysian">Malaysian Hair</MenuItem>
                <MenuItem value="mongolian">Mongolian Hair</MenuItem>
                <MenuItem value="peruvian">Peruvian Hair</MenuItem>
                <MenuItem value="vietnamese">Vietnamese Hair</MenuItem>
                <MenuItem value="synthetic">Synthetic Hair</MenuItem>
                <MenuItem value="bodywave">Body Wave</MenuItem>
                <MenuItem value="deepwave">Deep Wave</MenuItem>
                <MenuItem value="loosedeepwave">Loose Deep Wave</MenuItem>
                <MenuItem value="loosewave">Loose Wave</MenuItem>
                <MenuItem value="naturalwave">Natural Wave</MenuItem>
                <MenuItem value="kinkycurly">Kinky Curly</MenuItem>
                <MenuItem value="jerrycurly">Jerry Curl</MenuItem>
                <MenuItem value="deepcurly">Deep Curly</MenuItem>
                <MenuItem value="kinkystright">Kinky Straight</MenuItem>
                <MenuItem value="afrohair">Afro Hair</MenuItem>
                <MenuItem value="44closures">4 x 4 Closures</MenuItem>
                <MenuItem value="55closures">5 x 5 Closures</MenuItem>
                <MenuItem value="66closures">6 x 6 Closures</MenuItem>
                <MenuItem value="77closures">7 x 7 Closures</MenuItem>
                <MenuItem value="134frontals">13 x 4 Frontals</MenuItem>
                <MenuItem value="136frontals">13 x 6 Frontals</MenuItem>
                <MenuItem value="360frontals">360 Frontals</MenuItem>
                <MenuItem value="singlebundle">Single Bundle</MenuItem>
                <MenuItem value="2bundle">2 Bundles</MenuItem>
                <MenuItem value="3bundle">3 Bundles</MenuItem>
                <MenuItem value="4bundle">4 Bundles</MenuItem>
                <MenuItem value="3bw44c">3 Bundles with 4 x 4 closure</MenuItem>
                <MenuItem value="3bw55c">3 Bundles with 5 x 5 closure</MenuItem>
                <MenuItem value="3bw66c">3 Bundles with 6 x 6 closure</MenuItem>
                <MenuItem value="3bw134c">
                  3 Bundles with 13 x 4 frontal
                </MenuItem>
                <MenuItem value="3bw136c">
                  3 Bundles with 13 x 6 frontal
                </MenuItem>
                <MenuItem value="4bw44c">4 Bundles with 4 x 4 closure</MenuItem>
                <MenuItem value="4bw55c">4 Bundles with 5 x 5 closure</MenuItem>
                <MenuItem value="4bw66c">4 Bundles with 6 x 6 closure</MenuItem>
                <MenuItem value="4bw134c">
                  4 Bundles with 13 x 4 frontal
                </MenuItem>
                <MenuItem value="4bw136c">
                  4 Bundles with 13 x 6 frontal
                </MenuItem>
                <MenuItem value="44cw">4 x 4 Closure Wigs</MenuItem>
                <MenuItem value="55cw">5 x 5 Closure Wigs</MenuItem>
                <MenuItem value="66cw">6 x 6 Closure Wigs</MenuItem>
                <MenuItem value="lacefrontwigs">Lace Front Wigs</MenuItem>
                <MenuItem value="fulllacewigs">Full Lace Wigs</MenuItem>
                <MenuItem value="360">360</MenuItem>
                <MenuItem value="upartwigs">U Part Wigs</MenuItem>
                <MenuItem value="clipins">Clip Ins</MenuItem>
                <MenuItem value="ponytails">Ponytails</MenuItem>
                <MenuItem value="microlinks">Microlinks</MenuItem>
                <MenuItem value="nanorings">Nano rings</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                // required
                fullWidth
                label="Brand"
                value={brand}
                onChange={(event) => setbrand(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="demo-simple-select-label">In Stock</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-outlined"
                fullWidth
                onChange={(event) => setinstocks(event.target.value)}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="demo-simple-select-label">On Sale</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-outlined"
                fullWidth
                onChange={(event) => setonsale(event.target.value)}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="demo-simple-select-label">
                Free Shipping
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-outlined"
                fullWidth
                onChange={(event) => setfreeshipping(event.target.value)}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="demo-simple-select-label">Free Return</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-outlined"
                fullWidth
                onChange={(event) => setfreereturn(event.target.value)}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                // required
                fullWidth
                label="Ship From"
                onChange={(event) => setshipfrom(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                // required
                fullWidth
                label="Length"
                onChange={(event) => setlength(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                // required
                fullWidth
                label="Color"
                onChange={(event) => setcolor(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                // required
                fullWidth
                label="Price"
                onChange={(event) => setprice(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="demo-simple-select-label">Black Owned</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-outlined"
                fullWidth
                onChange={(event) => setblackowned(event.target.value)}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="demo-simple-select-label">
                Product Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-outlined"
                fullWidth
                onChange={(event) => setproducttype(event.target.value)}
              >
                <MenuItem value="Product Type 1">Product Type 1</MenuItem>
                <MenuItem value="Product Type 2">Product Type 2</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                // required
                fullWidth
                label="Origin"
                onChange={(event) => setorigin(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="demo-simple-select-label">Texture</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-outlined"
                fullWidth
                onChange={(event) => settexture(event.target.value)}
              >
                <MenuItem value="Texture 1">Texture 1</MenuItem>
                <MenuItem value="Texture 2">Texture 2</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="demo-simple-select-label">
                Base Material
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-outlined"
                fullWidth
                onChange={(event) => setbasematerial(event.target.value)}
              >
                <MenuItem value="Base Material 1">Base Material 1</MenuItem>
                <MenuItem value="Base Material 2">Base Material 2</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="demo-simple-select-label">Lace Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-outlined"
                fullWidth
                onChange={(event) => setlacetype(event.target.value)}
              >
                <MenuItem value="Lace Type 1">Lace Type 1</MenuItem>
                <MenuItem value="Lace Type 2">Lace Type 2</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="demo-simple-select-label">Preplucked</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-outlined"
                fullWidth
                onChange={(event) => setpreplucked(event.target.value)}
              >
                <MenuItem value="Preplucked 1">Preplucked 1</MenuItem>
                <MenuItem value="Preplucked 2">Preplucked 2</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                // required
                fullWidth
                label="Bleached Knots"
                onChange={(event) => setbleachedKnots(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                // required
                fullWidth
                label="Baby Hairs"
                onChange={(event) => setbabyHairs(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                // required
                fullWidth
                label="Parting"
                onChange={(event) => setparting(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                // required
                fullWidth
                label="Closure Size"
                onChange={(event) => setclosureSize(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                // required
                fullWidth
                label="Frontal Size"
                onChange={(event) => setfrontalSize(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                // required
                fullWidth
                label="Density"
                onChange={(event) => setdensity(event.target.value)}
              />
            </Grid>

            <center>
              <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <Button size="large" color="primary" variant="contained">
                      Upload Image
                    </Button>
                  </div>
                )}
              </Dropzone>
            </center>
            {currentData.name === undefined ? (
              <Button
                disabled={!bookUploaded}
                onClick={addProduct}
                color="secondary"
                style={{ marginTop: "4vh", height: "8vh" }}
                variant="contained"
                fullWidth
                component={Link}
                to="/admindashboard/view"
              >
                Submit
              </Button>
            ) : (
              <Button
                disabled={!bookUploaded}
                component={Link}
                to="/admindashboard/view"
                onClick={updateProduct}
                color="secondary"
                style={{ marginTop: "4vh", height: "8vh" }}
                variant="contained"
                fullWidth
              >
                Update
              </Button>
            )}
          </Grid>
        </Container>
      </main>
    </div>
  );
}
