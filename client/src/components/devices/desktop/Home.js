import React from "react";
import Navigation from "../../static/Navigation";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import Slider from "@material-ui/core/Slider";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import axios from "axios";
import CryptoJS from "crypto";
import Footer from "../../static/Footer";
// API Service
import { API_SERVICE, SECRET_KEY } from "../../../config/URI";
import { firestore } from "../../../Firebase/index";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";
import queryString from "query-string";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const ex3 = {
  width: "100%",
  height: "125px",
  overflow: "auto",
};

const ex28 = {
  height: "108vh",
  overflow: "auto",
  marginBottom: "2vh",
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 600,
    marginTop: "10px",
  },
  priceroot: {
    width: 300,
  },
  slideroot: {
    margin: "10px",
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
    color: "#000000",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "3vh",
  },
  cardroot: {
    minWidth: 230,
  },
  gridroot: {
    flexGrow: 1,
  },
}));

function valuetext(value) {
  return `${value}°C`;
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ProductList = ({ addWishlist, addItem, product }) => {
  const classes = useStyles();
  var mykey = CryptoJS.createCipher("aes-128-cbc", SECRET_KEY);
  var eE = mykey.update(product._id, "utf8", "hex");
  eE += mykey.final("hex");

  return (
    <Grid item xs={3}>
      <Card className={classes.cardroot} variant="outlined">
        <CardContent>
          <center>
            <a href={`/product?i=${eE}`}>
              <img
                style={{ width: "150px", height: "220px" }}
                src={product.images[0]}
                alt="product image"
              />
            </a>
          </center>
          <Typography className={classes.pos}>{product.name}</Typography>
          <Typography
            style={{ textAlign: "center" }}
            variant="body2"
            component="p"
          >
            {product.about}
          </Typography>
        </CardContent>
        <div style={{ padding: "4px" }}>
          <Button onClick={() => addItem(product)} variant="outlined" fullWidth>
            Add to Compare
          </Button>
          <br />
          <Button
            onClick={() => addWishlist(product)}
            style={{
              marginTop: "2px",
              backgroundColor: "#000000",
              color: "#ffffff",
            }}
            variant="outlined"
            fullWidth
          >
            Add to Wishlist
          </Button>
        </div>
      </Card>
    </Grid>
  );
};

const Home = ({ location }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState([0, 37]);
  const [products, setProducts] = React.useState([]);
  const [message, setmessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [filter, setfilter] = React.useState("");

  const [openDialog, setOpenDialog] = React.useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  React.useEffect(() => {
    const { q } = queryString.parse(location?.search);
    setfilter(q);
    if (q) {
      axios
        .get(`${API_SERVICE}/api/v1/main/productsfilters/${q}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`${API_SERVICE}/api/v1/main/products`)
        .then((response) => {
          setProducts(response.data);
          console.log(response.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const primaryOptions = {
    type: "loop",
    height: 350,
    perPage: 1,
    perMove: 1,
    gap: "1rem",
    autoplay: true,
    pagination: false,
  };

  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    checkedF: false,
    checkedG: false,
  });

  const handleChangeOptions = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const addItem = (product) => {
    var uid = sessionStorage.getItem("userId");
    var docRef = firestore.collection("cart").doc(uid);
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          var items = doc.data().items;
          if (items === 4) {
            handleClickOpenDialog();
            setmessage(
              "You can only add 4 items max in the compare cart list."
            );
          } else {
            // Send Item to the Card in Database
            var uploadData = {
              productId: product._id,
              userId: uid,
              product,
            };
            axios
              .post(`${API_SERVICE}/api/v1/main/additemtocart`, uploadData)
              .then((response) => {
                if (response.status === 200) {
                  handleClick();
                  setmessage("Item Added for Compare");
                  items = items + 1;
                  docRef.set(
                    {
                      items,
                    },
                    { merge: true }
                  );
                } else if (response.status === 201) {
                  handleClick();
                  setmessage("Item Already Added for Compare");
                }
              })
              .catch((err) => console.log(err));
          }
        } else {
          docRef.set(
            {
              items: 1,
            },
            { merge: true }
          );
          var uploadData = {
            productId: product._id,
            userId: uid,
            product,
          };
          axios
            .post(`${API_SERVICE}/api/v1/main/additemtocart`, uploadData)
            .then((response) => {
              if (response.status === 200) {
                handleClick();
                setmessage("Item Added for Compare");
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  };

  const addWishlist = (product) => {
    var uid = sessionStorage.getItem("userId");
    var uploadData = {
      productId: product._id,
      userId: uid,
      product,
    };
    axios
      .post(`${API_SERVICE}/api/v1/main/addtowishlistitemcart`, uploadData)
      .then((response) => {
        if (response.status === 200) {
          handleClick();
          setmessage("Item Added to Wish List");
        }
      })
      .catch((err) => console.log(err));
  };

  const showProductList = () => {
    return products.map((product) => {
      return (
        <ProductList
          addWishlist={addWishlist}
          addItem={addItem}
          product={product}
          key={product._id}
        />
      );
    });
  };

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">
          {"Compare Cart Limit Exceeded?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            style={{ color: "#000" }}
            id="alert-dialog-description"
          >
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Okay
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
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
            inputProps={{ "aria-label": "search products" }}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        <Paper className={classes.slideroot}>
          <Splide options={primaryOptions}>
            <SplideSlide>
              <img
                width="100%"
                src="https://www.samuel-windsor.co.uk/images/73/choose-formal-shirt-header.jpg"
                alt="Image 1"
              />
            </SplideSlide>
            <SplideSlide>
              <img
                width="100%"
                src="https://www.samuel-windsor.co.uk/images/73/choose-formal-shirt-header.jpg"
                alt="Image 2"
              />
            </SplideSlide>
          </Splide>
        </Paper>
      </center>
      <Container style={{ marginTop: "20px" }}>
        {/* <Button 
                        onClick={handleExpandClick}
                        aria-expanded={expanded} 
                        style={{ marginBottom: '2px', marginTop: '2px' }} 
                        startIcon={<FilterListIcon />
                        }>
                        Filter
                    </Button> */}

        <div className={classes.gridroot}>
          <Grid container spacing={3}>
            <Grid style={ex28} item xs={3}>
              <Card
                style={{ minWidth: "100%", padding: "6px" }}
                variant="outlined"
              >
                <h3>FILTER BY</h3>
                <hr
                  style={{
                    borderTop: "3px solid #000000",
                    marginTop: "6px",
                    marginBottom: "6px",
                  }}
                />
                <h4>Brand</h4>
                <div style={ex3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        onChange={handleChangeOptions}
                        name="checkedB"
                        style={{ color: "#000000" }}
                      />
                    }
                    label="BODYCON"
                  />
                  <br />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        onChange={handleChangeOptions}
                        name="checkedB"
                        style={{ color: "#000000" }}
                      />
                    }
                    label="BODYSUIT"
                  />
                  <br />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        onChange={handleChangeOptions}
                        name="checkedB"
                        style={{ color: "#000000" }}
                      />
                    }
                    label="BODYSUIT"
                  />
                  <br />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        onChange={handleChangeOptions}
                        name="checkedB"
                        style={{ color: "#000000" }}
                      />
                    }
                    label="BODYSUIT"
                  />
                  <br />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        onChange={handleChangeOptions}
                        name="checkedB"
                        style={{ color: "#000000" }}
                      />
                    }
                    label="BODYSUIT"
                  />
                  <br />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        onChange={handleChangeOptions}
                        name="checkedB"
                        style={{ color: "#000000" }}
                      />
                    }
                    label="BODYSUIT"
                  />
                </div>

                <hr
                  style={{
                    borderTop: "3px solid #000000",
                    marginTop: "4px",
                    marginBottom: "4px",
                  }}
                />
                <h4>Colour</h4>
                <div style={ex3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        onChange={handleChangeOptions}
                        name="checkedB"
                        style={{ color: "#000000" }}
                      />
                    }
                    label="BLACK"
                  />
                  <FormControlLabel
                    style={{ marginLeft: "-2px" }}
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        onChange={handleChangeOptions}
                        name="checkedB"
                        style={{ color: "#000000" }}
                      />
                    }
                    label="NUDE"
                  />
                  <FormControlLabel
                    style={{ float: "left" }}
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        onChange={handleChangeOptions}
                        name="checkedB"
                        style={{ color: "#000000" }}
                      />
                    }
                    label="BLUE"
                  />
                  <FormControlLabel
                    style={{ float: "left", marginLeft: "9px" }}
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        onChange={handleChangeOptions}
                        name="checkedB"
                        style={{ color: "#000000" }}
                      />
                    }
                    label="ORANGE"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        onChange={handleChangeOptions}
                        name="checkedB"
                        style={{ color: "#000000" }}
                      />
                    }
                    label="BROWN"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        onChange={handleChangeOptions}
                        name="checkedB"
                        style={{ color: "#000000" }}
                      />
                    }
                    label="PINK"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        onChange={handleChangeOptions}
                        name="checkedB"
                        style={{ color: "#000000" }}
                      />
                    }
                    label="CREAM"
                  />
                  <FormControlLabel
                    style={{ marginLeft: "-8px" }}
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        onChange={handleChangeOptions}
                        name="checkedB"
                        style={{ color: "#000000" }}
                      />
                    }
                    label="PURPLE"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        onChange={handleChangeOptions}
                        name="checkedB"
                        style={{ color: "#000000" }}
                      />
                    }
                    label="GREEN"
                  />
                  <FormControlLabel
                    style={{ marginLeft: "-6px" }}
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        onChange={handleChangeOptions}
                        name="checkedB"
                        style={{ color: "#000000" }}
                      />
                    }
                    label="RED"
                  />
                  <FormControlLabel
                    style={{ marginLeft: "-4px" }}
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        onChange={handleChangeOptions}
                        name="checkedB"
                        style={{ color: "#000000" }}
                      />
                    }
                    label="GREY"
                  />
                  <FormControlLabel
                    style={{ float: "left" }}
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        onChange={handleChangeOptions}
                        name="checkedB"
                        style={{ color: "#000000" }}
                      />
                    }
                    label="WHITE"
                  />
                  <FormControlLabel
                    style={{ float: "left" }}
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        onChange={handleChangeOptions}
                        name="checkedB"
                        style={{ color: "#000000" }}
                      />
                    }
                    label="WHITE"
                  />
                </div>

                <hr
                  style={{
                    borderTop: "3px solid #000000",
                    marginTop: "4px",
                    marginBottom: "4px",
                  }}
                />
                <h4>On sale</h4>
                <div style={ex3}>
                  <table>
                    <tr>
                      <th style={{ float: "left" }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state.checkedB}
                              onChange={handleChangeOptions}
                              name="checkedB"
                              style={{ color: "#000000" }}
                            />
                          }
                          label="6"
                        />
                      </th>
                      <th>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state.checkedB}
                              onChange={handleChangeOptions}
                              name="checkedB"
                              style={{ color: "#000000" }}
                            />
                          }
                          label="14"
                        />
                      </th>
                    </tr>

                    <tr>
                      <th style={{ float: "left" }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state.checkedB}
                              onChange={handleChangeOptions}
                              name="checkedB"
                              style={{ color: "#000000" }}
                            />
                          }
                          label="8"
                        />
                      </th>
                      <th>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state.checkedB}
                              onChange={handleChangeOptions}
                              name="checkedB"
                              style={{ color: "#000000" }}
                            />
                          }
                          label="16"
                        />
                      </th>
                    </tr>

                    <tr>
                      <th style={{ float: "left" }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state.checkedB}
                              onChange={handleChangeOptions}
                              name="checkedB"
                              style={{ color: "#000000" }}
                            />
                          }
                          label="10"
                        />
                      </th>
                      <th>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state.checkedB}
                              onChange={handleChangeOptions}
                              name="checkedB"
                              style={{ color: "#000000" }}
                            />
                          }
                          label="18"
                        />
                      </th>
                    </tr>

                    <tr>
                      <th style={{ float: "left" }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state.checkedB}
                              onChange={handleChangeOptions}
                              name="checkedB"
                              style={{ color: "#000000" }}
                            />
                          }
                          label="12"
                        />
                      </th>
                      <th>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state.checkedB}
                              onChange={handleChangeOptions}
                              name="checkedB"
                              style={{ color: "#000000" }}
                            />
                          }
                          label="20"
                        />
                      </th>
                    </tr>
                  </table>
                </div>

                <hr
                  style={{
                    borderTop: "3px solid #000000",
                    marginTop: "6px",
                    marginBottom: "6px",
                  }}
                />
                <h4>Others</h4>

                <div style={ex3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        onChange={handleChangeOptions}
                        name="checkedB"
                        style={{ color: "#000000" }}
                      />
                    }
                    label="On sale"
                  />
                  <br />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        onChange={handleChangeOptions}
                        name="checkedB"
                        style={{ color: "#000000" }}
                      />
                    }
                    label="Black owned"
                  />
                  <br />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        onChange={handleChangeOptions}
                        name="checkedB"
                        style={{ color: "#000000" }}
                      />
                    }
                    label="Free return"
                  />
                </div>

                {filter === "brazilian" ||
                filter === "cambodian" ||
                filter === "synthetic" ||
                filter === "vietnamese" ||
                filter === "peruvian" ||
                filter === "mongolian" ||
                filter === "european" ||
                filter === "indian" ||
                filter === "malaysian" ? (
                  <>
                    <hr
                      style={{
                        borderTop: "3px solid #000000",
                        marginTop: "6px",
                        marginBottom: "6px",
                      }}
                    />
                    <h4>Product Type</h4>
                    <div style={ex3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Product Type 1"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Product Type 2"
                      />
                    </div>

                    <hr
                      style={{
                        borderTop: "3px solid #000000",
                        marginTop: "6px",
                        marginBottom: "6px",
                      }}
                    />
                    <h4>Texture</h4>
                    <div style={ex3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Body Wave"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Deep Wave"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Loose Deep Wave"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Loose Wave"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Natural Wave"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Kinky Curly"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Jerry Curl"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Deep Curly"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Kinky Straight"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Afro Hair"
                      />
                    </div>
                  </>
                ) : filter === "bodywave" ||
                  filter === "deepwave" ||
                  filter === "loosedeepwave" ||
                  filter === "loosewave" ||
                  filter === "naturalwave" ||
                  filter === "kinkycurly" ||
                  filter === "jerrycurly" ||
                  filter === "deepcurly" ||
                  filter === "kinkystright" ||
                  filter === "afrohair" ? (
                  <>
                    <hr
                      style={{
                        borderTop: "3px solid #000000",
                        marginTop: "6px",
                        marginBottom: "6px",
                      }}
                    />
                    <h4>Product Type</h4>
                    <div style={ex3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Product Type 1"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Product Type 2"
                      />
                    </div>

                    <hr
                      style={{
                        borderTop: "3px solid #000000",
                        marginTop: "6px",
                        marginBottom: "6px",
                      }}
                    />
                    <h4>Origin</h4>
                    <div style={ex3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Origin 1"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Origin 2"
                      />
                    </div>
                  </>
                ) : filter === "44closures" ||
                  filter === "55closures" ||
                  filter === "66closures" ||
                  filter === "77closures" ||
                  filter === "134frontals" ||
                  filter === "136frontals" ||
                  filter === "360frontals" ||
                  filter === "singlebundle" ||
                  filter === "4bw66c" ||
                  filter === "4bw134c" ||
                  filter === "3bw44c" ||
                  filter === "3bw55c" ||
                  filter === "3bw66c" ||
                  filter === "3bw136c" ||
                  filter === "3bw134c" ||
                  filter === "4bw44c" ||
                  filter === "4bw55c" ? (
                  <>
                    <hr
                      style={{
                        borderTop: "3px solid #000000",
                        marginTop: "6px",
                        marginBottom: "6px",
                      }}
                    />
                    <h4>Texture</h4>
                    <div style={ex3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Texture 1"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Texture 2"
                      />
                    </div>

                    <hr
                      style={{
                        borderTop: "3px solid #000000",
                        marginTop: "6px",
                        marginBottom: "6px",
                      }}
                    />
                    <h4>Origin</h4>
                    <div style={ex3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Origin 1"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Origin 2"
                      />
                    </div>

                    <hr
                      style={{
                        borderTop: "3px solid #000000",
                        marginTop: "6px",
                        marginBottom: "6px",
                      }}
                    />
                    <h4>Base Material</h4>
                    <div style={ex3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Silk"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Lace"
                      />
                    </div>

                    <hr
                      style={{
                        borderTop: "3px solid #000000",
                        marginTop: "6px",
                        marginBottom: "6px",
                      }}
                    />
                    <h4>Lace Type</h4>
                    <div style={ex3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Brown"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Transparent"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="HD"
                      />
                    </div>

                    <hr
                      style={{
                        borderTop: "3px solid #000000",
                        marginTop: "6px",
                        marginBottom: "6px",
                      }}
                    />
                    <h4>Preplucked</h4>
                    <div style={ex3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Preplucked 1"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Preplucked 2"
                      />
                    </div>

                    <hr
                      style={{
                        borderTop: "3px solid #000000",
                        marginTop: "6px",
                        marginBottom: "6px",
                      }}
                    />
                    <h4>Bleached Knots</h4>
                    <div style={ex3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Bleached Knots 1"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Bleached Knots 2"
                      />
                    </div>

                    <hr
                      style={{
                        borderTop: "3px solid #000000",
                        marginTop: "6px",
                        marginBottom: "6px",
                      }}
                    />
                    <h4>Baby Hairs</h4>
                    <div style={ex3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Baby Hairs 1"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Baby Hairs 2"
                      />
                    </div>

                    <hr
                      style={{
                        borderTop: "3px solid #000000",
                        marginTop: "6px",
                        marginBottom: "6px",
                      }}
                    />
                    <h4>Parting</h4>
                    <div style={ex3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Free"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Middle"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Three Part"
                      />
                    </div>
                  </>
                ) : filter === "singlebundle" ||
                  filter === "2bundle" ||
                  filter === "3bundle" ||
                  filter === "4bundle" ||
                  filter === "upartwigs" ||
                  filter === "nanorings" ||
                  filter === "clipins" ||
                  filter === "ponytails" ||
                  filter === "microlinks" ? (
                  <>
                    <hr
                      style={{
                        borderTop: "3px solid #000000",
                        marginTop: "6px",
                        marginBottom: "6px",
                      }}
                    />
                    <h4>Origin</h4>
                    <div style={ex3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Origin 1"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Origin 2"
                      />
                    </div>

                    <hr
                      style={{
                        borderTop: "3px solid #000000",
                        marginTop: "6px",
                        marginBottom: "6px",
                      }}
                    />
                    <h4>Texture</h4>
                    <div style={ex3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Texture 1"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Texture 2"
                      />
                    </div>
                  </>
                ) : filter === "44cw" ||
                  filter === "55cw" ||
                  filter === "66cw" ||
                  filter === "lacefrontwigs" ||
                  filter === "fulllacewigs" ||
                  filter === "360" ? (
                  <>
                    <hr
                      style={{
                        borderTop: "3px solid #000000",
                        marginTop: "6px",
                        marginBottom: "6px",
                      }}
                    />
                    <h4>Origin</h4>
                    <div style={ex3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Origin 1"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Origin 2"
                      />
                    </div>

                    <hr
                      style={{
                        borderTop: "3px solid #000000",
                        marginTop: "6px",
                        marginBottom: "6px",
                      }}
                    />
                    <h4>Texture</h4>
                    <div style={ex3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Texture 1"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Texture 2"
                      />
                    </div>

                    <hr
                      style={{
                        borderTop: "3px solid #000000",
                        marginTop: "6px",
                        marginBottom: "6px",
                      }}
                    />
                    <h4>Base Material</h4>
                    <div style={ex3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Base Material 1"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Base Material 2"
                      />
                    </div>

                    <hr
                      style={{
                        borderTop: "3px solid #000000",
                        marginTop: "6px",
                        marginBottom: "6px",
                      }}
                    />
                    <h4>Lace Type</h4>
                    <div style={ex3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Lace Type 1"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Lace Type 2"
                      />
                    </div>

                    <hr
                      style={{
                        borderTop: "3px solid #000000",
                        marginTop: "6px",
                        marginBottom: "6px",
                      }}
                    />
                    <h4>Preplucked</h4>
                    <div style={ex3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Preplucked 1"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Preplucked 2"
                      />
                    </div>

                    <hr
                      style={{
                        borderTop: "3px solid #000000",
                        marginTop: "6px",
                        marginBottom: "6px",
                      }}
                    />
                    <h4>Bleached Knots</h4>
                    <div style={ex3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Bleached Knots 1"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Bleached Knots 2"
                      />
                    </div>

                    <hr
                      style={{
                        borderTop: "3px solid #000000",
                        marginTop: "6px",
                        marginBottom: "6px",
                      }}
                    />
                    <h4>Baby Hairs</h4>
                    <div style={ex3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Baby Hairs 1"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Baby Hairs 2"
                      />
                    </div>

                    <hr
                      style={{
                        borderTop: "3px solid #000000",
                        marginTop: "6px",
                        marginBottom: "6px",
                      }}
                    />
                    <h4>Parting</h4>
                    <div style={ex3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Parting 1"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="Parting 2"
                      />
                    </div>

                    <hr
                      style={{
                        borderTop: "3px solid #000000",
                        marginTop: "6px",
                        marginBottom: "6px",
                      }}
                    />
                    <h4>Closure size</h4>
                    <div style={ex3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="4 x 4"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="5 x 5"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="6 x 6"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="7 x 7"
                      />
                    </div>

                    <hr
                      style={{
                        borderTop: "3px solid #000000",
                        marginTop: "6px",
                        marginBottom: "6px",
                      }}
                    />
                    <h4>Frontal size</h4>
                    <div style={ex3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="13 x 4"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="13 x 6"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="360"
                      />
                    </div>

                    <hr
                      style={{
                        borderTop: "3px solid #000000",
                        marginTop: "6px",
                        marginBottom: "6px",
                      }}
                    />
                    <h4>Density</h4>
                    <div style={ex3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="130%"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="150%"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="180%"
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeOptions}
                            name="checkedB"
                            style={{ color: "#000000" }}
                          />
                        }
                        label="200%"
                      />
                    </div>
                  </>
                ) : null}

                <hr
                  style={{
                    borderTop: "3px solid #000000",
                    marginTop: "4px",
                    marginBottom: "4px",
                  }}
                />
                <h4>Price</h4>
                <div
                  style={{
                    marginTop: "12px",
                    marginRight: "4px",
                    marginLeft: "4px",
                  }}
                >
                  <Slider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    style={{ color: "#000000" }}
                  />
                </div>
                <hr
                  style={{
                    borderTop: "3px solid #000000",
                    marginTop: "4px",
                    marginBottom: "4px",
                  }}
                />
                <h4>Length</h4>
                <div
                  style={{
                    marginTop: "12px",
                    marginRight: "4px",
                    marginLeft: "4px",
                  }}
                >
                  <Slider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    style={{ color: "#000000" }}
                  />
                </div>
              </Card>
            </Grid>
            <Grid item xs={9}>
              <Grid container spacing={2}>
                {showProductList()}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
