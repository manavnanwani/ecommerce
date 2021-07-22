import React from "react";
import Navigation from "../../static/Navigation";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Rating from "@material-ui/lab/Rating";
import queryString from "query-string";
import CryptoJS from "crypto";
import axios from "axios";
import NumberFormat from "react-number-format";
import { auth } from "../../../Firebase/index";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
// URI
import { API_SERVICE, SECRET_KEY } from "../../../config/URI";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 600,
    marginTop: "10px",
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
    marginTop: 12,
    color: "#000000",
    fontWeight: "bold",
    fontSize: "3vh",
  },
  cardroot: {
    minWidth: 275,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  feedbackcardroot: {
    maxWidth: "350vh",
    marginBottom: "4px",
  },
  starratingroot: {
    display: "flex",
    flexDirection: "column",
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
  },
}));

const ProductList = ({ comment }) => {
  const classes = useStyles();

  return (
    <Card className={classes.feedbackcardroot} variant="outlined">
      <CardContent>
        <Avatar alt={comment.username} src={comment.profilepic} />
        <Typography className={classes.pos}>{comment.username}</Typography>
        <Rating value={comment.rating} readOnly />
        <br />
        <br />
        <Typography variant="body2" component="p">
          {comment.comment}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Product = ({ location }) => {
  const classes = useStyles();
  const [imagePath, setImagePath] = React.useState(
    "https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12a.jpg"
  );
  const [items, setItems] = React.useState({});
  const [loading, setloading] = React.useState(true);
  const [userlogin, setUserLogin] = React.useState(false);
  const [rating, setrating] = React.useState(0);
  const [user, setUser] = React.useState({});
  const [productId, setproductId] = React.useState({});
  const [comment, setcomment] = React.useState("");
  const [allcomments, setallcomments] = React.useState([]);

  React.useEffect(() => {
    const { i } = queryString.parse(location?.search);
    var mykey = CryptoJS.createDecipher("aes-128-cbc", SECRET_KEY);
    var idE = mykey.update(i, "hex", "utf8");
    idE += mykey.final("utf8");
    setproductId(idE);
    axios
      .get(`${API_SERVICE}/api/v1/main/getitemdetails/${idE}`)
      .then((response) => {
        setItems(response.data);
        axios
          .get(`${API_SERVICE}/api/v1/main/getallusercomment/${idE}`)
          .then((response) => {
            setallcomments(response.data);
            setloading(false);
          });
      });

    auth.onAuthStateChanged(function (user) {
      if (user) {
        setUserLogin(true);
        setUser(user);
        console.log(user);
      } else {
        setUserLogin(false);
        setUser({});
      }
    });
  }, []);

  const [openProductReview, setOpenProductReview] = React.useState(false);
  const handleClickOpenProductReview = () => {
    setOpenProductReview(true);
  };
  const handleCloseProductReview = () => {
    setOpenProductReview(false);
  };

  const changeImage = (path) => {
    setImagePath(path);
  };

  const submitComment = () => {
    var uploadData = {
      username: user.displayName,
      profilepic: user.photoURL,
      comment,
      productId,
      rating,
    };
    axios
      .post(`${API_SERVICE}/api/v1/main/addproductcommentstore`, uploadData)
      .then((response) => {
        handleCloseProductReview();
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const showProductList = () => {
    return allcomments.map((comment) => {
      return <ProductList comment={comment} key={comment._id} />;
    });
  };

  return (
    <div>
      <Dialog
        open={openProductReview}
        onClose={handleCloseProductReview}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Review</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: "#000000" }}>
            Please Write Only Meaningful Comments. Your feedback to the product
            matters.
          </DialogContentText>
          <center>
            <Rating
              name="size-large"
              value={rating}
              size="large"
              onChange={(event, newValue) => {
                setrating(newValue);
              }}
            />
          </center>
          <TextField
            id="outlined-multiline-static"
            label="Comment"
            multiline
            rows={4}
            variant="outlined"
            value={comment}
            onChange={(e) => setcomment(e.target.value)}
            fullWidth
            style={{ marginTop: "10px", marginBottom: "10px" }}
          />
          <br />
          <Button
            onClick={submitComment}
            style={{ marginTop: "28px", marginBottom: "10px" }}
            size="large"
            style={{ backgroundColor: "#000000", color: "#ffffff" }}
            variant="outlined"
            fullWidth
          >
            Submit
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProductReview} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
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
      </center>
      <Container style={{ marginTop: "28px", marginLeft: "10%" }}>
        <Grid container spacing={6}>
          <Grid item xs={4}>
            <Carousel>
              {loading === false
                ? items.images.map((row) => (
                    <div>
                      <img src={row} />
                    </div>
                  ))
                : null}
            </Carousel>
          </Grid>
          <Grid item xs={6}>
            <h2 style={{ marginTop: "14px" }}>{items.name}</h2>
            <small>SHIRTS</small>
            <br />
            <img src="https://img.icons8.com/fluent/28/000000/star.png" />
            <img src="https://img.icons8.com/fluent/28/000000/star.png" />
            <img src="https://img.icons8.com/fluent/28/000000/star.png" />
            <img src="https://img.icons8.com/fluent/28/000000/star.png" />
            <br /> <br />
            <h1>
              <NumberFormat
                value={items.price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₹"}
                renderText={(value) => <div>{value}</div>}
              />
            </h1>
            <br />
            <p>{items.about}</p>
            <br />
            <table>
              <tr>
                <th style={{ float: "left" }}>Model</th>
                <th>Shirt 5407X</th>
              </tr>
              <tr>
                <th style={{ float: "left" }}>Color</th>
                <th>Black</th>
              </tr>
              <tr>
                <th style={{ float: "left" }}>Delivery</th>
                <th>India</th>
              </tr>
            </table>
            <br />
            <Divider />
            <br />
            <Button
              size="large"
              style={{ marginBottom: "8px" }}
              variant="outlined"
              fullWidth
            >
              Buy Item
            </Button>
          </Grid>
          <Divider />
        </Grid>
        {userlogin ? (
          <section style={{ marginLeft: "28px", marginBottom: "28px" }}>
            <Button onClick={handleClickOpenProductReview}>Add Comment</Button>

            {showProductList()}
          </section>
        ) : null}
      </Container>
    </div>
  );
};

export default Product;
